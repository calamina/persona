import { api, networkError } from '../../utils/api-client'

export async function getFavorites() {
  try {
    const res = await api.favorites.$get()
    return await res.json()
  } catch {
    return networkError
  }
}

export async function addFavorite(data: { url: string }) {
  try {
    const res = await api.favorites.$post({
      form: { url: data.url },
    })
    return await res.json()
  } catch {
    return networkError
  }
}

export async function deleteFavorite(id: number) {
  try {
    const res = await api.favorites[':id'].$delete({
      param: { id: id.toString() },
    })
    return await res.json()
  } catch {
    return networkError
  }
}
