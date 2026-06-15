// src/entities/auth/auth.dto.ts

import z from 'zod'

export const createFavoriteSchema = z.object({
  url: z.url({
    protocol: /^https?$/,
    normalize: true,
    hostname: z.regexes.domain,
  }),
})

export type CreateFavorite = z.output<typeof createFavoriteSchema>
