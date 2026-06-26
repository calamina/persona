import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { user } from './auth.schema'

export const feed = sqliteTable('feed', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  url: text('url').notNull(),

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

export type FeedModel = typeof feed.$inferSelect
export type FeedNewModel = typeof feed.$inferInsert
