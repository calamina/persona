// src/features/dashboard/model/dashboard.service.ts
import { and, eq, not } from 'drizzle-orm'
import { db, dbWrapper } from '../../utils/db'
import { todo } from '../../db/todo.schema'

export const dbGetTodos = (userId: string) =>
  dbWrapper(() => db.select().from(todo).where(eq(todo.userId, userId)))

export const dbGetTodo = (userId: string, id: number) =>
  dbWrapper(async () => {
    const [getTodo] = await db
      .select()
      .from(todo)
      .where(and(eq(todo.id, id), eq(todo.userId, userId)))
    return getTodo
  })

export const dbCreateTodo = (userId: string, title: string) =>
  dbWrapper(async () => {
    const [newTodo] = await db.insert(todo).values({ userId, title }).returning({ id: todo.id })

    return newTodo
  })

export const dbUpdateTodo = (userId: string, id: number) =>
  dbWrapper(async () => {
    const [updatedTodo] = await db
      .update(todo)
      .set({ done: not(todo.done) })
      .where(and(eq(todo.id, id), eq(todo.userId, userId)))
      .returning()

    console.debug(updatedTodo)
    return updatedTodo
  })

export const dbDeleteTodo = (userId: string, id: number) =>
  dbWrapper(async () => {
    const [deletedTodo] = await db
      .delete(todo)
      .where(and(eq(todo.id, id), eq(todo.userId, userId)))
      .returning({ id: todo.id })

    return deletedTodo
  })
