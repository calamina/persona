import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { user } from './auth.schema'

export const link = sqliteTable('link', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  title: text('title').notNull(),
  url: text('url').notNull(),
  category: text('category').notNull(),

  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),

  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),
})

export type LinkModel = typeof link.$inferSelect
export type LinkNewModel = typeof link.$inferInsert
