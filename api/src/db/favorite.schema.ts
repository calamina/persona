import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth.schema";

export const favorite = sqliteTable("favorite", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  title: text("title").notNull().unique(),
  url: text("url").notNull().unique(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),
});

export type FavoriteModel = typeof favorite.$inferSelect;
export type FavoriteNewModel = typeof favorite.$inferInsert;
