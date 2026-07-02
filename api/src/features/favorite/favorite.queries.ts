// src/features/dashboard/model/dashboard.service.ts
import { and, eq } from 'drizzle-orm'
import { db } from '../../utils/db'
import { getUrlTitle, isValidUrl } from '../../utils/url'
import { favorite } from '../../db/favorite.schema'

export const dbGetFavorites = async (userId: string) =>
  await db.select().from(favorite).where(eq(favorite.userId, userId))

export const dbGetFavorite = async (userId: string, id: number) => {
  const [getFavorite] = await db
    .select()
    .from(favorite)
    .where(and(eq(favorite.id, id), eq(favorite.userId, userId)))

  return getFavorite
}

export const dbCreateFavorite = async (userId: string, url: string) => {
  const urlNoProtocol = url.replace(/^https?:\/\//i, '')
  const urlSafe = new URL('https://' + urlNoProtocol)

  const [isValid, title] = await Promise.all([
    isValidUrl(urlSafe.href),
    getUrlTitle(urlSafe.href).catch(() => 'Bookmarked Link'),
  ])

  if (!isValid) throw new Error('INVALID_URL')

  const [newFavorite] = await db
    .insert(favorite)
    .values({ url: urlSafe.href, userId, title })
    .returning({ id: favorite.id })

  return newFavorite
}

export const dbUpdateFavorite = async (
  userId: string,
  data: { title: string; url: string; id: number },
) => {
  const [updatedFavorite] = await db
    .update(favorite)
    .set(data)
    .where(and(eq(favorite.id, data.id), eq(favorite.userId, userId)))
    .returning()

  return updatedFavorite
}

export const dbDeleteFavorite = async (userId: string, id: number) => {
  const [deletedFavorite] = await db
    .delete(favorite)
    .where(and(eq(favorite.id, id), eq(favorite.userId, userId)))
    .returning({ id: favorite.id })

  return deletedFavorite
}
