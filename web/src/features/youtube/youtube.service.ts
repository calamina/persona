import { api, useApi } from '../../utils/api-client'
import type { Channel } from './youtube.model'

export function getVideos() {
  return useApi(() => api.youtube.videos.$get())
}

export function getChannels() {
  return useApi(() => api.youtube.channels.$get())
}

export function searchChannel(query: string) {
  return useApi(() =>
    api.youtube.channels.search.$get({
      query: { query },
    }),
  )
}

export function addChannel(data: Channel) {
  return useApi(() =>
    api.youtube.channels.$post({
      json: {
        youtubeId: data.id,
        name: data.name,
        url: data.url,
        iconURL: data.iconURL,
      },
    }),
  )
}

export function deleteChannel(id: number) {
  return useApi(() =>
    api.youtube.channels[':id'].$delete({
      param: { id: id.toString() },
    }),
  )
}
