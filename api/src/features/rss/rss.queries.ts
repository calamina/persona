import { db, dbWrapper } from '../../utils/db'
import { feed, FeedNewModel } from '../../db/feed.schema'
import { and, eq } from 'drizzle-orm'

export const dbGetFeeds = (userId: string) =>
  dbWrapper(() => db.select().from(feed).where(eq(feed.userId, userId)))

export const dbCreateFeed = (data: FeedNewModel) =>
  dbWrapper(async () => {
    const [newFeed] = await db.insert(feed).values(data).returning({ id: feed.id })
    return newFeed
  })

export const dbDeleteFeed = (userId: string, id: number) =>
  dbWrapper(async () => {
    const [deletedFeed] = await db
      .delete(feed)
      .where(and(eq(feed.id, id), eq(feed.userId, userId)))
      .returning({ id: feed.id })
    return deletedFeed
  })
