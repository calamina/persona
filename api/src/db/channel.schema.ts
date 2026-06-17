import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { user } from './auth.schema'

export const channel = sqliteTable('channel', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  youtubeId: text('youtubeId').notNull().unique(),
  name: text('name').notNull(),
  url: text('url').notNull(),
  iconURL: text('iconURL'),

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

export type ChannelModel = typeof channel.$inferSelect
export type ChannelNewModel = typeof channel.$inferInsert
