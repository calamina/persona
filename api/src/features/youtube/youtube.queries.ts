// src/features/dashboard/model/dashboard.service.ts
import { and, eq } from 'drizzle-orm'
import { db } from '../../utils/db'
import { channel, type ChannelNewModel } from '../../db/channel.schema'

export const dbGetChannels = async (userId: string) =>
  await db.select().from(channel).where(eq(channel.userId, userId))

export const dbCreateChannel = async (data: ChannelNewModel) => {
  const [newChannel] = await db.insert(channel).values(data).returning({ id: channel.id })
  return newChannel
}

export const dbDeleteChannel = async (userId: string, id: number) => {
  const [deletedChannel] = await db
    .delete(channel)
    .where(and(eq(channel.id, id), eq(channel.userId, userId)))
    .returning({ id: channel.id })
  return deletedChannel
}
