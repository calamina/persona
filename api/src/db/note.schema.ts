import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { user } from './auth.schema'

export const note = sqliteTable('note', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  content: text('content').notNull().unique(),

  userId: text('user_id')
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: 'cascade' }),

  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),
})

export type NoteModel = typeof note.$inferSelect
export type NoteNewModel = typeof note.$inferInsert
