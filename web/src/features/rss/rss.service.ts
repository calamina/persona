import { api } from '../../utils/api-client'
import type { Feed } from './rss.model'

export async function getRss() {
  const res = await api.rss.$get()

  if (!res.ok) {
    throw new Error('Failed to fetch RSS timeline')
  }

  return await res.json()
}

export async function getFeeds() {
  const res = await api.rss.feeds.$get()

  if (!res.ok) {
    throw new Error('Failed to fetch RSS channels')
  }

  return await res.json()
}

export async function searchFeed(url: string) {
  const res = await api.rss.feeds.search.$get({
    query: { url },
  })

  if (!res.ok) {
    throw new Error('Failed to find feed')
  }

  return await res.json()
}

export async function addFeed(data: Feed) {
  const res = await api.rss.feeds.$post({
    json: {
      name: data.name,
      url: data.url,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to add RSS channel')
  }

  return await res.json()
}

export async function deleteFeed(id: number) {
  const res = await api.rss.feeds[':id'].$delete({
    param: { id: id.toString() },
  })

  if (!res.ok) {
    throw new Error('Failed to remove RSS channel')
  }

  return await res.json()
}
