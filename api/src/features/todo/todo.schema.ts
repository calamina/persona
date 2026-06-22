import z from 'zod'

export const createTodoSchema = z.object({
  title: z.string(),
})

export const deleteTodoSchema = z.object({
  id: z.coerce.number(),
})
