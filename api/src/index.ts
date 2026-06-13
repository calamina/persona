import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// app.use('/api/*', cors({
//   origin: ['https://persona.calamina.cafe', 'http://localhost:5173'],
//   credentials: true,
// }))

app.use('/*', cors({
  origin: 'http://localhost:5173', // Put your exact Vue local dev URL here
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}))

const routes = app.get('/', (c) => {
  return c.text('Hello Hono!')
})

console.debug(routes)

export default app
export type AppType = typeof routes