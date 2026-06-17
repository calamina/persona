import { hc } from 'hono/client'
import type { AppType } from 'persona-api'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3005'

export const api = hc<AppType>(API_URL, {
  init: {
    credentials: 'include',
  },
})

export const networkError = { data: null, error: { message: 'Network connection failed' } }
