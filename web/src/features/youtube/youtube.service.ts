import { api, networkError } from '../../utils/api-client'
import type { Channel } from './youtube.model'

export async function getVideos() {
  try {
    const res = await api.youtube.videos.$get()
    return await res.json()
  } catch {
    return networkError
  }
}

export async function getChannels() {
  try {
    const res = await api.youtube.channels.$get()
    return await res.json()
  } catch {
    return networkError
  }
}

export async function searchChannel(query: string) {
  try {
    const res = await api.youtube.channels.search.$get({
      query: { query },
    })
    return await res.json()
  } catch {
    return networkError
  }
}

export async function addChannel(data: Channel) {
  try {
    const res = await api.youtube.channels.$post({
      json: {
        youtubeId: data.id,
        name: data.name,
        url: data.url,
        iconURL: data.iconURL,
      },
    })
    return await res.json()
  } catch {
    return networkError
  }
}

export async function deleteChannel(id: number) {
  try {
    const res = await api.youtube.channels[':id'].$delete({
      param: { id: id.toString() },
    })
    return await res.json()
  } catch {
    return networkError
  }
}
