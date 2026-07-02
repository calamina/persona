import { api } from '../../utils/api-client'
import type { Channel } from './youtube.model'

export async function getVideos() {
  const res = await api.youtube.videos.$get()

  if (!res.ok) {
    throw new Error('Failed to fetch videos feed')
  }

  return await res.json()
}

export async function getChannels() {
  const res = await api.youtube.channels.$get()

  if (!res.ok) {
    throw new Error('Failed to fetch followed channels')
  }

  return await res.json()
}

export async function searchChannel(query: string) {
  const res = await api.youtube.channels.search.$get({
    query: { query },
  })

  if (!res.ok) {
    throw new Error('Failed to find channel')
  }

  return await res.json()
}

export async function addChannel(data: Channel) {
  const res = await api.youtube.channels.$post({
    json: {
      youtubeId: data.id,
      name: data.name,
      url: data.url,
      iconURL: data.iconURL,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to follow channel')
  }

  return await res.json()
}

export async function deleteChannel(id: number) {
  const res = await api.youtube.channels[':id'].$delete({
    param: { id: id.toString() },
  })

  if (!res.ok) {
    throw new Error('Failed to remove channel')
  }

  return await res.json()
}
