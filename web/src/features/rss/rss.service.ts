import { api, networkError } from '../../utils/api-client'
import type { Feed } from './rss.model'

export async function getRss() {
  try {
    const res = await api.rss.$get()
    return await res.json()
  } catch {
    return networkError
  }
}

export async function getFeeds() {
  try {
    const res = await api.rss.feeds.$get()
    return await res.json()
  } catch {
    return networkError
  }
}

export async function searchFeed(url: string) {
  try {
    const res = await api.rss.feeds.search.$get({
      query: { url },
    })
    return await res.json()
  } catch {
    return networkError
  }
}

export async function addFeed(data: Feed) {
  try {
    const res = await api.rss.feeds.$post({
      json: {
        name: data.name,
        url: data.url,
      },
    })
    return await res.json()
  } catch {
    return networkError
  }
}

export async function deleteFeed(id: number) {
  try {
    const res = await api.rss.feeds[':id'].$delete({
      param: { id: id.toString() },
    })
    return await res.json()
  } catch {
    return networkError
  }
}
