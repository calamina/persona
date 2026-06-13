import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { useAuthTable } from './auth.table'

export const usersTable = sqliteTable('users_table', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
})

export const {
  account,
  accountRelations,
  session,
  sessionRelations,
  user,
  userRelations,
  verification,
} = useAuthTable()
