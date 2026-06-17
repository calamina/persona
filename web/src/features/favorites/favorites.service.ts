import { api, useApi } from '../../utils/api-client'

export function getFavorites() {
  return useApi(() => api.favorites.$get())
}

export function createFavorite(data: { url: string }) {
  return useApi(() =>
    api.favorites.$post({
      form: { url: data.url },
    }),
  )
}

export function deleteFavorite(id: number) {
  return useApi(() =>
    api.favorites[':id'].$delete({
      param: { id: id.toString() },
    }),
  )
}
