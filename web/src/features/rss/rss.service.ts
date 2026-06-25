import { api, networkError } from '../../utils/api-client'

export async function getRss() {
  try {
    const res = await api.rss.$get()
    return await res.json()
  } catch {
    return networkError
  }
}
