import { Hono } from "hono";
import { dbCreateFavorite, dbDeleteFavorite, dbGetFavorites } from "./favorite.queries";
import { zValidator } from "@hono/zod-validator";
import z from "zod";

export const favorites = new Hono()

  .get("/", async (c) => {
    const user = c.get("user");

    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const data = await dbGetFavorites(user.id);

    return c.json(data);
  })

  .get("/:id", (c) => {
    const id = c.req.param("id");
    return c.json({ message: `Get user with ID: ${id}` });
  })

  .post(
    "/",
    zValidator(
      "form",
      z.object({
        url: z.url(),
      }),
    ),
    async (c) => {
      const { url } = c.req.valid("form");
      const user = c.get("user");

      if (!user) return c.json({ error: "Unauthorized" }, 401);

      const { data, error } = await dbCreateFavorite(user.id, url);

      if (error) return c.json({ error: "Database error" }, 500);

      return c.json(data);
    },
  )

  .delete("/", zValidator("json", z.object({ id: z.number() })), async (c) => {
    const { id } = c.req.valid("json");
    const user = c.get("user");

    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const { data, error } = await dbDeleteFavorite(user.id, id);

    if (error) return c.json({ error: "Database error" }, 500);

    return c.json(data);
  });
