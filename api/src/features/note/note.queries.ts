import { db } from '../../utils/db'
import { eq } from 'drizzle-orm'
import { note } from '../../db/note.schema'

export const dbGetNote = async (userId: string) => {
  const [getNote] = await db.select().from(note).where(eq(note.userId, userId))
  return getNote
}

export const dbUpdateNote = async (userId: string, content: string) => {
  const [updatedNote] = await db
    .insert(note)
    .values({ content, userId })
    .onConflictDoUpdate({
      target: note.userId,
      set: { content },
    })
    .returning()

  return updatedNote
}
