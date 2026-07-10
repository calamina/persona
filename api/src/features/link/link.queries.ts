// src/features/dashboard/model/dashboard.service.ts
import { and, eq } from 'drizzle-orm'
import { link, type LinkNewModel } from '../../db/link.schema'
import { db } from '../../utils/db'

export const dbGetLinks = async (userId: string) =>
  await db.select().from(link).where(eq(link.userId, userId))

// export const dbGetLink = async (userId: string, id: number) => {
//   const [getLink] = await db
//     .select()
//     .from(link)
//     .where(and(eq(link.id, id), eq(link.userId, userId)))

//   return getLink
// }

export const dbCreateLink = async (data: LinkNewModel) => {
  try {
    const [newLink] = await db.insert(link).values(data).returning({ id: link.id })
    return newLink ?? null
  } catch {
    return null
  }
}

// export const dbUpdateLink = async (
//   userId: string,
//   data: { title: string; url: string; id: number },
// ) => {
//   const [updatedLink] = await db
//     .update(link)
//     .set(data)
//     .where(and(eq(link.id, data.id), eq(link.userId, userId)))
//     .returning()

//   return updatedLink
// }

export const dbDeleteLink = async (userId: string, id: number) => {
  const [deletedLink] = await db
    .delete(link)
    .where(and(eq(link.id, id), eq(link.userId, userId)))
    .returning({ id: link.id })

  return deletedLink
}
