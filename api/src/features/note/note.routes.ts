import { Hono } from 'hono'
import { protectedRouteHelpers } from '../../middleware/protectedRouteHelper'
import { sendError, sendSuccess } from '../../utils/api'
import { zValidator } from '@hono/zod-validator'
import { dbGetNote, dbUpdateNote } from './note.queries'
import { updateNoteSchema } from './note.schema'

export const noteRoute = new Hono()
  .use('*', protectedRouteHelpers)

  .get('/', async (c) => {
    const user = c.get('user')
    const { data, error } = await dbGetNote(user.id)
    if (error) {
      console.error('Failed to get note in DB:', error)
      return c.json(sendError('Database error'), 500)
    }
    return c.json(sendSuccess(data))
  })

  .put('/', zValidator('json', updateNoteSchema), async (c) => {
    const { content } = c.req.valid('json')
    const user = c.get('user')

    const { data, error } = await dbUpdateNote(user.id, content)
    if (error) {
      console.error('Failed to add note in DB:', error)
      return c.json(sendError('Database error'), 500)
    }

    return c.json(sendSuccess(data))
  })
