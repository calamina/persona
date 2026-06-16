// src/features/dashboard/model/dashboard.service.ts
import { and, eq } from "drizzle-orm";
import { db } from "../../utils/db";
import { channel, type ChannelNewModel } from "../../db/channel.schema";

export async function dbGetChannels(userId: string) {
  return await db.select().from(channel).where(eq(channel.userId, userId));
}

export async function dbCreateChannel(data: ChannelNewModel) {
  try {
    const [newChannel] = await db.insert(channel).values(data).returning({ id: channel.id });
    return { data: newChannel, error: null };
  } catch (error: unknown) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "An unexpected error occurred",
      },
    };
  }
}

export async function dbDeleteChannel(userId: string, id: number) {
  try {
    const [deletedChannel] = await db
      .delete(channel)
      .where(and(eq(channel.id, id), eq(channel.userId, userId)))
      .returning({ id: channel.id });

    if (!deletedChannel) {
      throw new Error("FAVORITE_NOT_FOUND");
    }

    return { data: deletedChannel, error: null };
  } catch (error: unknown) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "An unexpected error occurred",
      },
    };
  }
}
