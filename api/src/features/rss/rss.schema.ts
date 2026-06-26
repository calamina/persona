import z from 'zod'

export const searchFeedSchema = z.object({
  url: z.string().trim().min(1),
})

export const createFeedSchema = z.object({
  name: z.string(),
  url: z.string(),
})

export const deleteFeedSchema = z.object({
  id: z.coerce.number(),
})
