import { api } from '../../utils/api-client'

export const getFeed = async () => {
  try {
    const response = await api.feed.$get()
    if (response.ok) return await response.json()
    else console.error('Server error:', response.status)
  } catch {
    return []
  }
}
