import 'dotenv/config'
import { drizzle } from 'drizzle-orm/bun-sqlite'

if (!process.env.DB_FILE_NAME) {
  throw new Error('DB_FILE_NAME environment variable is missing!')
}

export const db = drizzle(process.env.DB_FILE_NAME!)
