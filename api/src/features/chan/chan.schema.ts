import z from 'zod'

export const searchChanSchema = z.object({
  board: z.string(),
})
