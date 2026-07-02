// src/features/dashboard/model/dashboard.service.ts
import { and, eq, not } from 'drizzle-orm'
import { db } from '../../utils/db'
import { todo } from '../../db/todo.schema'

export const dbGetTodos = async (userId: string) => {
  try {
    return await db.select().from(todo).where(eq(todo.userId, userId))
  } catch {
    return null
  }
}

export const dbGetTodo = async (userId: string, id: number) => {
  try {
    const [getTodo] = await db
      .select()
      .from(todo)
      .where(and(eq(todo.id, id), eq(todo.userId, userId)))

    return getTodo ?? null
  } catch {
    return null
  }
}

export const dbCreateTodo = async (userId: string, title: string) => {
  try {
    const [newTodo] = await db.insert(todo).values({ userId, title }).returning({ id: todo.id })

    return newTodo ?? null
  } catch {
    return null
  }
}

export const dbUpdateTodo = async (userId: string, id: number) => {
  try {
    const [updatedTodo] = await db
      .update(todo)
      .set({ done: not(todo.done) })
      .where(and(eq(todo.id, id), eq(todo.userId, userId)))
      .returning()

    return updatedTodo ?? null
  } catch {
    return null
  }
}

export const dbDeleteTodo = async (userId: string, id: number) => {
  try {
    const [deletedTodo] = await db
      .delete(todo)
      .where(and(eq(todo.id, id), eq(todo.userId, userId)))
      .returning({ id: todo.id })

    return deletedTodo ?? null
  } catch {
    return null
  }
}
