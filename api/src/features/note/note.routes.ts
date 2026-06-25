import { Hono } from 'hono'
import { protectedRouteHelpers } from '../../middleware/protectedRouteHelper'
import { sendError, sendSuccess } from '../../utils/api'
import { db, dbWrapper } from '../../utils/db'
import { eq } from 'drizzle-orm'
import { zValidator } from '@hono/zod-validator'
import z from 'zod'
import { note } from '../../db/note.schema'

const updateNoteSchema = z.object({
  content: z.string(),
})

const dbGetNote = (userId: string) =>
  dbWrapper(async () => {
    const [getNote] = await db.select().from(note).where(eq(note.userId, userId))
    return getNote
  })

const dbUpdateNote = (userId: string, content: string) =>
  dbWrapper(async () => {
    const [updatedNote] = await db
      .insert(note)
      .values({ content, userId })
      .onConflictDoUpdate({
        target: note.userId,
        set: { content },
      })
      .returning()

    return updatedNote
  })

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
