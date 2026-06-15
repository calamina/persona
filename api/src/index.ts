import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./utils/auth";
import "dotenv/config";
import { favorites } from "./features/favorites/favorites.routes";

export const app = new Hono();

app.use(
  "/*",
  cors({
    origin: ["https://persona.calamina.cafe", "http://localhost:5173"],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "DELETE", "PATCH", "PUT", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.use("*", async (c, next) => {
  const path = c.req.path;

  if (c.req.method === "OPTIONS" || path.startsWith("/api/auth/") || path === "/") {
    await next();
    return;
  }

  try {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
      c.set("user", null);
      c.set("session", null);
      await next();
      return;
    }

    c.set("user", session.user);
    c.set("session", session.session);
  } catch (err) {
    console.error("Session middleware caught an error:", err);
  }
  await next();
});

app.on(["POST", "GET", "OPTIONS"], "/api/auth/*", (c) => auth.handler(c.req.raw));

const routes = app
  .get("/", async (c) => {
    return c.json({ yo: "yo" });
  })
  .route("/favorites", favorites);
// .route('/products', productRoutes);

console.debug("routes:", routes.routes.length);
export type AppType = typeof routes;

app.notFound((c) => {
  c.header("Access-Control-Allow-Origin", "https://persona.calamina.cafe");
  c.header("Access-Control-Allow-Credentials", "true");
  return c.json({ error: "Route not found on backend" }, 404);
});

export default app;
