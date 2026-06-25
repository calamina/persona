import { XMLParser } from 'fast-xml-parser'
import type { ChannelModel } from '../db/channel.schema'

export interface Video {
  id: string
  author: string
  published: string
  title: string
}

interface XmlAuthor {
  name: string
  uri: string
}

interface YouTubeXmlEntry {
  id: string
  title: string
  author: XmlAuthor
  published: string
}

type GetVideos = Promise<
  { data: Video[]; error: null } | { data: null; error: { message: string } }
>

interface GlobalVideoCache {
  data: Video[]
  lastFetched: number
}

const globalRef = globalThis as unknown as { __backendVideoCache?: GlobalVideoCache }

if (!globalRef.__backendVideoCache) {
  globalRef.__backendVideoCache = {
    data: [],
    lastFetched: 0,
  }
}

const backendCache = globalRef.__backendVideoCache

const IGNORED_TAGS = new Set(['yt:videoId', 'yt:channelId', 'link', 'updated', 'media:group'])

const parser = new XMLParser({
  ignoreAttributes: true,
  updateTag(tagName) {
    if (IGNORED_TAGS.has(tagName)) return false
    return tagName
  },
})

export const getVideos = async (channels: ChannelModel[], forceRefresh = false): GetVideos => {
  const now = Date.now()
  const CACHE_TTL = 15 * 60 * 1000 // 15 minutes

  if (!forceRefresh && backendCache.data.length > 0 && now - backendCache.lastFetched < CACHE_TTL) {
    return { data: backendCache.data, error: null }
  }

  const MAX_VIDEOS_PER_CHANNEL = 3
  const MAX_VIDEOS_TOTAL = 40
  const FETCH_TIMEOUT_MS = 2500

  const baseUrl = 'http://www.youtube.com/feeds/videos.xml?channel_id='

  const fetchPromises = channels.map(async (channel) => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    try {
      const response = await fetch(baseUrl + channel.youtubeId, {
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) return []

      const result = await response.text()
      const chan = parser.parse(result)
      let entries: YouTubeXmlEntry[] | YouTubeXmlEntry | undefined = chan?.feed?.entry

      if (!entries) return []

      if (!Array.isArray(entries)) {
        entries = [entries]
      }

      const slicedEntries = entries.slice(0, MAX_VIDEOS_PER_CHANNEL)

      return slicedEntries.map((entry) => ({
        id: entry.id ? entry.id.replace('yt:video:', '') : '',
        title: entry.title || 'Untitled Video',
        author: entry.author?.name || channel.name,
        published: entry.published || new Date().toISOString(),
      }))
    } catch (error) {
      console.debug(error)
      return []
    } finally {
      clearTimeout(timeoutId)
    }
  })

  try {
    const unresolvedResults = await Promise.all(fetchPromises)
    const results = unresolvedResults.flat()

    const orderedResults = results
      .sort((a: Video, b: Video) => (a.published > b.published ? -1 : 1))
      .slice(0, MAX_VIDEOS_TOTAL)

    backendCache.data = orderedResults
    backendCache.lastFetched = now

    return { data: orderedResults, error: null }
  } catch (error) {
    console.debug(error)
    return { data: null, error: { message: 'Error getting videos' } }
  }
}
