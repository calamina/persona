import { api } from '../../utils/api-client.ts'

export async function getChanCatalog(board: string) {
  const res = await api.chan.$get({
    query: { board },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch chan catalog')
  }

  return await res.json()
}
