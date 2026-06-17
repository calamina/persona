// src/features/dashboard/model/dashboard.service.ts
import { and, eq } from 'drizzle-orm'
import { db, dbWrapper } from '../../utils/db'
import { channel, type ChannelNewModel } from '../../db/channel.schema'

export const dbGetChannels = (userId: string) =>
  dbWrapper(() => db.select().from(channel).where(eq(channel.userId, userId)))

export const dbCreateChannel = (data: ChannelNewModel) =>
  dbWrapper(async () => {
    const [newChannel] = await db.insert(channel).values(data).returning({ id: channel.id })
    return newChannel
  })

export const dbDeleteChannel = (userId: string, id: number) =>
  dbWrapper(async () => {
    const [deletedChannel] = await db
      .delete(channel)
      .where(and(eq(channel.id, id), eq(channel.userId, userId)))
      .returning({ id: channel.id })
    return deletedChannel
  })
