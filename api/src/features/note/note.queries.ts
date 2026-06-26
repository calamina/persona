import { db, dbWrapper } from '../../utils/db'
import { eq } from 'drizzle-orm'
import { note } from '../../db/note.schema'

export const dbGetNote = (userId: string) =>
  dbWrapper(async () => {
    const [getNote] = await db.select().from(note).where(eq(note.userId, userId))
    return getNote
  })

export const dbUpdateNote = (userId: string, content: string) =>
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
