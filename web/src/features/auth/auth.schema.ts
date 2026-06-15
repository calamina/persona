// src/entities/auth/auth.dto.ts

import z4 from 'zod/v4'

export const registerSchema = z4
  .object({
    username: z4.string().min(3, 'Username must be at least 3 characters'),
    email: z4.email('Invalid email address'),
    password: z4.string().min(8, 'Password must be at least 8 characters'),
  })
  .transform((data) => ({
    ...data,
    name: data.username,
  }))

export type Register = z4.output<typeof registerSchema>

export const loginSchema = z4
  .object({
    identifier: z4.string().min(1, 'Identifier is required'),
    password: z4.string().min(1, 'Password is required'),
  })
  .transform((data) => {
    const isEmail = z4.email().safeParse(data.identifier)
    return isEmail.success
      ? { password: data.password, email: data.identifier }
      : { password: data.password, username: data.identifier }
  })

export type Login = z4.output<typeof loginSchema>
