import "dotenv/config";
import { drizzle } from "drizzle-orm/bun-sqlite";

if (!process.env.DB_FILE_NAME) {
  throw new Error("DB_FILE_NAME environment variable is missing!");
}

export const db = drizzle(process.env.DB_FILE_NAME!);

export async function dbWrapper<T>(operation: () => Promise<T>) {
  try {
    const data = await operation();
    return { data, error: null };
  } catch (error: unknown) {
    console.error("Database operation failed:", error);
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "An unexpected error occurred",
      },
    };
  }
}
