import { api } from '../../utils/api-client'
import type { Channel } from './youtube.model'

export const getVideos = async () => {
  try {
    const response = await api.youtube.videos.$get()
    if (response.ok) return await response.json()
    const errPayload = await response.json().catch(() => null)
    return { data: null, error: errPayload?.error || { message: 'Network error occurred' } }
  } catch {
    return { data: null, error: { message: 'Failed to connect to backend service' } }
  }
}

export const getChannels = async () => {
  try {
    const response = await api.youtube.channels.$get()
    if (response.ok) return await response.json()
    const errPayload = await response.json().catch(() => null)
    return { data: null, error: errPayload?.error || { message: 'Network error occurred' } }
  } catch (error) {
    console.debug(error)
    return { data: null, error: { message: 'Failed to connect to backend service' } }
  }
}

export const searchChannel = async (query: string) => {
  try {
    const response = await api.youtube.channels.search.$get({ query: { query } })
    if (response.ok) return await response.json()
    const errPayload = await response.json().catch(() => null)
    return { data: null, error: errPayload?.error || { message: 'Network error occurred' } }
  } catch (error) {
    console.debug(error)
    return { data: null, error: { message: 'Failed to connect to backend service' } }
  }
}

export const addChannel = async (data: Channel) => {
  try {
    const response = await api.youtube.channels.add.$post({
      json: { youtubeId: data.id, name: data.name, url: data.url, iconURL: data.iconURL },
    })

    if (response.ok) return await response.json()

    const errPayload = await response.json().catch(() => null)
    return { data: null, error: errPayload?.error || { message: 'Network error occurred' } }
  } catch (error) {
    console.error('RPC Service Exception:', error)
    return { data: null, error: { message: 'Failed to connect to backend service' } }
  }
}

export async function deleteChannel(id: number) {
  try {
    const response = await api.youtube.channels[':id'].$delete({
      param: { id: id.toString() },
    })
    if (response.ok) return await response.json()

    const errPayload = await response.json().catch(() => null)
    return { data: null, error: errPayload?.error || { message: 'Network error occurred' } }
  } catch (error) {
    console.error('RPC Service Exception:', error)
    return { data: null, error: { message: 'Failed to connect to backend service' } }
  }
}
