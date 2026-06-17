import z from 'zod'

export const createFavoriteSchema = z.object({
  url: z.url(),
})

export const deleteFavoriteSchema = z.object({
  id: z.coerce.number(),
})
