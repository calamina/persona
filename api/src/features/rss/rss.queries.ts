import { db } from '../../utils/db'
import { feed, type FeedNewModel } from '../../db/feed.schema'
import { and, eq } from 'drizzle-orm'

export const dbGetFeeds = async (userId: string) => {
  try {
    return await db.select().from(feed).where(eq(feed.userId, userId))
  } catch {
    return null
  }
}

export const dbCreateFeed = async (data: FeedNewModel) => {
  try {
    const [newFeed] = await db.insert(feed).values(data).returning({ id: feed.id })
    return newFeed ?? null
  } catch {
    return null
  }
}

export const dbDeleteFeed = async (userId: string, id: number) => {
  try {
    const [deletedFeed] = await db
      .delete(feed)
      .where(and(eq(feed.id, id), eq(feed.userId, userId)))
      .returning({ id: feed.id })

    return deletedFeed ?? null
  } catch {
    return null
  }
}
