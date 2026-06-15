import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { useAuthTables } from "./auth.schema";

const { user } = useAuthTables();

export const useFavoritesTable = () => {
  const favorite = sqliteTable("favorites", {
    id: integer("id").primaryKey({ autoIncrement: true }),

    title: text("title").notNull(),
    url: text("url").notNull(),
    favicon: text("favicon").notNull(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    createdAt: integer("created_at", { mode: "timestamp" })
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date())
      .notNull(),
  });

  return { favorite };
};

type Tables = ReturnType<typeof useFavoritesTable>;
export type FavoriteModel = Tables["favorite"]["$inferSelect"];
export type FavoriteNewModel = Tables["favorite"]["$inferInsert"];
