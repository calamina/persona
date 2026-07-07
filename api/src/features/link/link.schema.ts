import z from 'zod'

export const getLinkNameSchema = z.object({
  url: z.url().nonempty(),
})

export const createLinkSchema = z.object({
  url: z.url().nonempty(),
  title: z.string().nonempty(),
  category: z.string().nonempty(),
})

export const deleteLinkSchema = z.object({
  id: z.coerce.number(),
})
