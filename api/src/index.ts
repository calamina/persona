import { Hono } from 'hono'
import { cors } from 'hono/cors'
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { usersTable } from './db/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DB_FILE_NAME!);
const app = new Hono()

app.use('/*', cors({
  origin: ['https://persona.calamina.cafe', 'http://localhost:5173'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}))

const routes = app.get('/', async (c) => {
  const res = await testDb()
  return c.json(res)
})

console.debug("routes:", routes.routes.length)

async function testDb() {
  const user: typeof usersTable.$inferInsert = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
  };

  await db.insert(usersTable).values(user);
  console.log('New user created!')

  const users = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', users)

  await db
    .update(usersTable)
    .set({
      age: 31,
    })
    .where(eq(usersTable.email, user.email));
  console.log('User info updated!')

  await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log('User deleted!')

  return users
}

export default app
export type AppType = typeof routes