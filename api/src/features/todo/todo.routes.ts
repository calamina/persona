import { Hono } from 'hono'
import { dbCreateTodo, dbDeleteTodo, dbGetTodos, dbUpdateTodo } from './todo.queries'
import { zValidator } from '@hono/zod-validator'
import { protectedRouteHelpers } from '../../middleware/protectedRouteHelper'
import { createTodoSchema, deleteTodoSchema } from './todo.schema'

export const todos = new Hono()
  .use('*', protectedRouteHelpers)

  .get('/', async (c) => {
    const user = c.get('user')
    const res = await dbGetTodos(user.id)

    return c.json(res)
  })

  .post('/', zValidator('json', createTodoSchema), async (c) => {
    const { title } = c.req.valid('json')
    const user = c.get('user')
    const res = await dbCreateTodo(user.id, title)

    return c.json(res)
  })

  .delete('/:id', zValidator('param', deleteTodoSchema), async (c) => {
    const { id } = c.req.valid('param')
    const user = c.get('user')
    const res = await dbDeleteTodo(user.id, id)

    return c.json(res)
  })

  .put('/:id', zValidator('param', deleteTodoSchema), async (c) => {
    const { id } = c.req.valid('param')
    const user = c.get('user')
    const res = await dbUpdateTodo(user.id, id)

    return c.json(res)
  })
