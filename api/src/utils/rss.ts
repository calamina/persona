import { XMLParser } from 'fast-xml-parser'

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

export const getRss = async (urls: string[], forceRefresh = false): GetRss => {
  const now = Date.now()
  const CACHE_TTL = 15 * 60 * 1000 // 15 minutes in milliseconds

  if (!forceRefresh && backendCache.data.length > 0 && now - backendCache.lastFetched < CACHE_TTL) {
    return { data: backendCache.data, error: null }
  }

  const FEED_ITEMS = 2
  const FEED_TIMEOUT = 3000

  const fetchPromises = urls.map(async (url: string): Promise<Item[]> => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), FEED_TIMEOUT)

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: { 'User-Agent': 'RSS-Aggregator-Bot/1.0' },
      })

      if (!response.ok) return []

      const result = await response.text()
      const rss = parser.parse(result)

      const root = rss?.rss?.channel || rss?.feed || rss?.channel
      if (!root) return []

      const channelTitle = root.title || 'Unknown Source'

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

        let rawUrl = item.guid || item.link || ''
        if (typeof rawUrl === 'object') {
          rawUrl = rawUrl['@_href'] || rawUrl['#text'] || url
        }

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
