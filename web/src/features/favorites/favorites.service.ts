import { api } from '../../utils/api-client'

export async function getFavorites() {
  // TODO :: util to return {data, error} !
  try {
    const response = await api.favorites.$get()

    if (response.ok) {
      const { data } = await response.json()
      return data.map((fav) => ({
        ...fav,
        createdAt: new Date(fav.createdAt),
        updatedAt: new Date(fav.updatedAt),
      }))
    }

    const errPayload = await response.json().catch(() => null)
    return { data: null, error: errPayload || { message: 'Network error occurred' } }
  } catch {
    return { data: null, error: { message: 'Failed to connect to backend service' } }
  }
}

export async function createFavorite(data: { url: string }) {
  try {
    const response = await api.favorites.$post({
      form: { url: data.url },
    })

    if (response.ok) {
      const data = await response.json()
      return { data, error: null }
    }

    const errPayload = await response.json().catch(() => null)
    return { data: null, error: errPayload || { message: 'Network error occurred' } }
  } catch (error) {
    console.error('RPC Service Exception:', error)
    return { data: null, error: { message: 'Failed to connect to backend service' } }
  }
}

export async function deleteFavorite(id: number) {
  try {
    const response = await api.favorites[':id'].$delete({
      param: { id: id.toString() },
    })
    if (response.ok) {
      const data = await response.json()
      return { data, error: null }
    }
    const errPayload = await response.json().catch(() => null)
    return { data: null, error: errPayload || { message: 'Network error occurred' } }
  } catch (error) {
    console.error('RPC Service Exception:', error)
    return { data: null, error: { message: 'Failed to connect to backend service' } }
  }
}
