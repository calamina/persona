import { hc } from 'hono/client'
import type { AppType } from 'persona-api'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3005'

export const api = hc<AppType>(API_URL, {
  init: {
    credentials: 'include',
  },
})

export async function useApi<
  TResponse extends { ok: boolean; json: () => Promise<any> },
  TResult = TResponse extends { json: () => Promise<{ data: infer D }> } ? D : unknown,
>(action: () => Promise<TResponse>, transform?: (data: any) => TResult) {
  try {
    const response = await action()
    const payload = await response.json()

    if (response.ok && payload.data !== null) {
      return {
        data: transform ? transform(payload.data) : (payload.data as TResult),
        error: null,
      }
    }

    return {
      data: null,
      error: payload.error || { message: 'An unexpected error occurred' },
    }
  } catch (error) {
    console.debug(error)
    return {
      data: null,
      error: { message: 'Failed to connect to backend service' },
    }
  }
}

export type UnpackData<T extends (...args: any) => Promise<any>> = NonNullable<
  Awaited<ReturnType<T>>['data']
>[number]
