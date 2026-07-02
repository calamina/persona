import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { protectedRouteHelpers } from '../../middleware/protectedRouteHelper'
import { zValidator } from '@hono/zod-validator'
import { dbGetNote, dbUpdateNote } from './note.queries'
import { updateNoteSchema } from './note.schema'

export const noteRoute = new Hono()
  .use('*', protectedRouteHelpers)

  .get('/', async (c) => {
    const user = c.get('user')
    const res = await dbGetNote(user.id)
    if (!res) {
      throw new HTTPException(404, { message: 'Note not found' })
    }

    return c.json(res)
  })

  .put('/', zValidator('json', updateNoteSchema), async (c) => {
    const { content } = c.req.valid('json')
    const user = c.get('user')
    const res = await dbUpdateNote(user.id, content)
    if (!res) {
      throw new HTTPException(404, { message: 'Failed to update note or note not found' })
    }

    return c.json(res)
  })
