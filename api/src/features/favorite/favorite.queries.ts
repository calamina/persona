// src/features/dashboard/model/dashboard.service.ts
import { and, eq } from 'drizzle-orm'
import { db, dbWrapper } from '../../utils/db'
import { getUrlTitle, isValidUrl } from '../../utils/url'
import { favorite } from '../../db/favorite.schema'

export const dbGetFavorites = (userId: string) =>
  dbWrapper(() => db.select().from(favorite).where(eq(favorite.userId, userId)))

export const dbGetFavorite = (userId: string, id: number) =>
  dbWrapper(async () => {
    const [getFavorite] = await db
      .select()
      .from(favorite)
      .where(and(eq(favorite.id, id), eq(favorite.userId, userId)))
    return getFavorite
  })

export const dbCreateFavorite = (userId: string, url: string) =>
  dbWrapper(async () => {
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
  })

export const dbUpdateFavorite = (
  userId: string,
  data: { title: string; url: string; id: number },
) =>
  dbWrapper(async () => {
    const [updatedFavorite] = await db
      .update(favorite)
      .set(data)
      .where(and(eq(favorite.id, data.id), eq(favorite.userId, userId)))
      .returning()

    return updatedFavorite
  })

export const dbDeleteFavorite = (userId: string, id: number) =>
  dbWrapper(async () => {
    const [deletedFavorite] = await db
      .delete(favorite)
      .where(and(eq(favorite.id, id), eq(favorite.userId, userId)))
      .returning({ id: favorite.id })

    return deletedFavorite
  })
