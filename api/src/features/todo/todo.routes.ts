import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { dbCreateTodo, dbDeleteTodo, dbGetTodos, dbUpdateTodo } from './todo.queries'
import { zValidator } from '@hono/zod-validator'
import { protectedRouteHelpers } from '../../middleware/protectedRouteHelper'
import { createTodoSchema, deleteTodoSchema } from './todo.schema'

export const todos = new Hono()
  .use('*', protectedRouteHelpers)

  .get('/', async (c) => {
    const user = c.get('user')
    const res = await dbGetTodos(user.id)
    if (!res) {
      throw new HTTPException(404, { message: 'Failed to fetch todos' })
    }

    return c.json(res)
  })

  .post('/', zValidator('json', createTodoSchema), async (c) => {
    const { title } = c.req.valid('json')
    const user = c.get('user')
    const res = await dbCreateTodo(user.id, title)
    if (!res) {
      throw new HTTPException(400, { message: 'Failed to create todo' })
    }

    return c.json(res)
  })

  .delete('/:id', zValidator('param', deleteTodoSchema), async (c) => {
    const { id } = c.req.valid('param')
    const user = c.get('user')
    const res = await dbDeleteTodo(user.id, id)
    if (!res) {
      throw new HTTPException(404, { message: 'Todo not found or unauthorized to delete' })
    }

    return c.json(res)
  })

  .put('/:id', zValidator('param', deleteTodoSchema), async (c) => {
    const { id } = c.req.valid('param')
    const user = c.get('user')
    const res = await dbUpdateTodo(user.id, id)
    if (!res) {
      throw new HTTPException(404, { message: 'Todo not found or unauthorized to update' })
    }

    return c.json(res)
  })
