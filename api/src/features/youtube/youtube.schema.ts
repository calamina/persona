import z from 'zod'

export const searchSchema = z.object({
  query: z.string().trim().min(1),
})

export const createChannelSchema = z.object({
  name: z.string(),
  youtubeId: z.string(),
  url: z.string(),
  iconURL: z.string().optional(),
})

export const deleteChannelSchema = z.object({
  id: z.coerce.number(),
})
