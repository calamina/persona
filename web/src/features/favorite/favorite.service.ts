import { api } from '../../utils/api-client'

export async function getFavorites() {
  const res = await api.favorites.$get()

  if (!res.ok) {
    throw new Error('Failed to fetch favorites')
  }

  return await res.json()
}

export async function addFavorite(url: string) {
  const res = await api.favorites.$post({
    json: { url },
  })

  if (!res.ok) {
    throw new Error('Failed to add to favorites')
  }

  return await res.json()
}

export async function deleteFavorite(id: number) {
  const res = await api.favorites[':id'].$delete({
    param: { id: id.toString() },
  })

  if (!res.ok) {
    throw new Error('Failed to remove from favorites')
  }

  return await res.json()
}
