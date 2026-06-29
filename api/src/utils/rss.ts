/* eslint-disable @typescript-eslint/no-explicit-any */
import { XMLParser } from 'fast-xml-parser'
import { FeedModel } from '../db/feed.schema'

interface GlobalCache {
  data: Item[]
  lastFetched: number
}

const globalRef = globalThis as unknown as { __backendCache?: GlobalCache }

if (!globalRef.__backendCache) {
  globalRef.__backendCache = {
    data: [],
    lastFetched: 0,
  }
}

const backendCache = globalRef.__backendCache

interface Item {
  title: string
  date: Date
  description: string
  categories: string[]
  source: string
  url: string
  imageUrl: string
}

type GetRss = Promise<{ data: Item[]; error: null } | { data: null; error: { message: string } }>

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  parseTagValue: true,
  trimValues: true,
})

interface XmlAttributePayload {
  '@_href'?: string
  '@_term'?: string
  '#text'?: string
}

type FlexibleXmlValue = string | XmlAttributePayload | undefined

interface RawParsedItem {
  title?: string | { '#text'?: string }
  pubDate?: string | Date
  updated?: string
  published?: string
  category?: FlexibleXmlValue | FlexibleXmlValue[]
  tags?: FlexibleXmlValue | FlexibleXmlValue[]
  description?: string | { '#text'?: string }
  summary?: string | { '#text'?: string }
  content?: string | { '#text'?: string }
  guid?: string | XmlAttributePayload
  link?: string | XmlAttributePayload
}

const ensureArray = <T>(val: T | T[] | undefined): T[] => {
  if (!val) return []
  return Array.isArray(val) ? val : [val]
}

export const getRss = async (feeds: FeedModel[], forceRefresh = false): GetRss => {
  const now = Date.now()
  const CACHE_TTL = 15 * 60 * 1000 // 15 minutes in milliseconds

  if (!forceRefresh && backendCache.data.length > 0 && now - backendCache.lastFetched < CACHE_TTL) {
    return { data: backendCache.data, error: null }
  }

  const FEED_ITEMS = 2
  const FEED_TIMEOUT = 3000

  const fetchPromises = feeds.map(async (feed: FeedModel): Promise<Item[]> => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), FEED_TIMEOUT)

    try {
      const response = await fetch(feed.url, {
        signal: controller.signal,
        headers: { 'User-Agent': 'RSS-Aggregator-Bot/1.0' },
      })

      if (!response.ok) return []

      const result = await response.text()
      const rss = parser.parse(result)

      const root = rss?.rss?.channel || rss?.feed || rss?.channel
      if (!root) return []

      const channelTitle = feed.name || root.title || 'Unknown Source'

      const rawItems = root.item || root.entry || []
      const items = ensureArray(rawItems)
      const targetItems = items.slice(0, FEED_ITEMS)

      return targetItems.map((item: RawParsedItem) => {
        const rawDate = item.pubDate || item.updated || item.published || new Date()
        const categories = ensureArray(item.category || item.tags)
          .map((cat: FlexibleXmlValue) => {
            if (cat && typeof cat === 'object') return String(cat['@_term'] || cat['#text'] || '')
            return String(cat || '')
          })
          .filter(Boolean)

        const description = item.description || item.summary || item.content || ''
        const cleanDescription =
          typeof description === 'object' ? description['#text'] || '' : description

        let rawUrl = item.guid || item.link || ''
        if (typeof rawUrl === 'object') {
          rawUrl = rawUrl['@_href'] || rawUrl['#text'] || feed.url
        }

        const imageUrl = extractImageUrl(item, cleanDescription)

        return {
          source: channelTitle,
          title:
            typeof item.title === 'object'
              ? item.title['#text'] || 'Untitled'
              : item.title || 'Untitled',
          date: new Date(rawDate),
          description: typeof description === 'object' ? description['#text'] || '' : description,
          categories: categories,
          url: String(rawUrl),
          imageUrl: imageUrl,
        }
      })
    } catch {
      return []
    } finally {
      clearTimeout(timeoutId)
    }
  })

  try {
    const settledResults = await Promise.allSettled(fetchPromises)
    const results = settledResults.flatMap((result) =>
      result.status === 'fulfilled' ? result.value : [],
    )

    const orderedResults = results.sort((a, b) => b.date.getTime() - a.date.getTime())

    backendCache.data = orderedResults
    backendCache.lastFetched = now

    return { data: orderedResults, error: null }
  } catch (error) {
    console.error('RSS Parsing error:', error)
    return { data: null, error: { message: 'Error getting RSS items' } }
  }
}

const extractImageUrl = (item: any, descriptionHtml: string): string => {
  if (item.enclosure) {
    const enclosures = Array.isArray(item.enclosure) ? item.enclosure : [item.enclosure]
    const imgEnclosure = enclosures.find(
      (enc: any) => enc?.['@_type']?.startsWith('image/') || enc?.['@_url'],
    )
    if (imgEnclosure?.['@_url']) return String(imgEnclosure['@_url'])
  }

  const mediaContent = item['media:content'] || item['content'] || item['media:thumbnail']
  if (mediaContent) {
    const mediaArray = Array.isArray(mediaContent) ? mediaContent : [mediaContent]
    const imgMedia = mediaArray.find(
      (media: any) => media?.['@_url'] || media?.['@_type']?.startsWith('image/'),
    )
    if (imgMedia?.['@_url']) return String(imgMedia['@_url'])
  }

  if (item.link) {
    const links = Array.isArray(item.link) ? item.link : [item.link]
    const imgLink = links.find(
      (l: any) => l?.['@_rel'] === 'enclosure' || l?.['@_type']?.startsWith('image/'),
    )
    if (imgLink?.['@_href']) return String(imgLink['@_href'])
  }

  if (descriptionHtml) {
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/i
    const match = descriptionHtml.match(imgRegex)
    if (match && match[1]) {
      return match[1]
    }
  }

  return ''
}

export async function getFeedName(url: string) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(1500) })
    const text = await response.text()

    const match = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
    if (!match) return null

    const parser = new XMLParser({ htmlEntities: true })
    const parsed = parser.parse(match[1])
    const name = typeof parsed === 'string' ? parsed : match[1]

    return { url, name }
  } catch {
    return null
  }
}
