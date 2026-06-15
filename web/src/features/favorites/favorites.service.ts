import { api } from '../../utils/api-client'

export async function handleGetFavorites() {
  // TODO :: util to return {data, error} !
  try {
    const res = await api.favorites.$get()
    if (!res.ok) throw new Error('Failed to fetch favorites')

    const rawFavorites = await res.json()
    return rawFavorites.map((fav) => ({
      ...fav,
      createdAt: new Date(fav.createdAt),
      updatedAt: new Date(fav.updatedAt),
    }))
  } catch {
    return []
  }
}

export async function handleCreateFavorite(data: { url: string }) {
  try {
    const res = await api.favorites.$post({
      form: { url: data.url },
    })

    if (res.ok) {
      const data = await res.json()
      return data
    }
  } catch {
    return null
  }
}

export async function handleDeleteFavorite(id: number) {
  try {
    return await api.favorites.$delete({
      json: { id },
    })
  } catch {
    return null
  }
}
