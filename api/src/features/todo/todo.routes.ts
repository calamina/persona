import { Hono } from 'hono'
import { dbCreateTodo, dbDeleteTodo, dbGetTodos, dbUpdateTodo } from './todo.queries'
import { zValidator } from '@hono/zod-validator'
import { protectedRouteHelpers } from '../../middleware/protectedRouteHelper'
import { sendError, sendSuccess } from '../../utils/api'
import { createTodoSchema, deleteTodoSchema } from './todo.schema'

export const todos = new Hono()
  .use('*', protectedRouteHelpers)

  .get('/', async (c) => {
    const user = c.get('user')

    const { data, error } = await dbGetTodos(user.id)
    if (error) {
      console.error('Failed to get todos in DB:', error)
      return c.json(sendError('Database error'), 500)
    }

    return c.json(sendSuccess(data))
  })

  .post('/', zValidator('json', createTodoSchema), async (c) => {
    const { title } = c.req.valid('json')
    const user = c.get('user')

    const { data, error } = await dbCreateTodo(user.id, title)
    if (error) {
      console.error('Failed to add todo in DB:', error)
      return c.json(sendError('Database error'), 500)
    }

    return c.json(sendSuccess(data))
  })

  .delete('/:id', zValidator('param', deleteTodoSchema), async (c) => {
    const { id } = c.req.valid('param')
    const user = c.get('user')

    const { data, error } = await dbDeleteTodo(user.id, id)
    if (error) {
      console.error('Failed to delete todo in DB:', error)
      return c.json(sendError('Database error'), 500)
    }

    return c.json(sendSuccess(data))
  })

  .put('/:id', zValidator('param', deleteTodoSchema), async (c) => {
    const { id } = c.req.valid('param')
    const user = c.get('user')

    const { data, error } = await dbUpdateTodo(user.id, id)
    if (error) {
      console.error('Failed to delete todo in DB:', error)
      return c.json(sendError('Database error'), 500)
    }

    return c.json(sendSuccess(data))
  })
