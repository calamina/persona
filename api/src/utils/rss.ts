import { XMLParser } from 'fast-xml-parser'

interface RssFeed {
  title: string
  item: RssItem[]
}

interface RssItem {
  source: string
  title: string
  pubDate: Date
  category: string[]
  guid: string
  description: string
}

interface Item {
  title: string
  date: Date
  description: string
  categories: string[]
  source: string
  url: string
}

type GetRss = Promise<{ data: Item[]; error: null } | { data: null; error: { message: string } }>

const IGNORED_TAGS = new Set(['yt:videoId', 'yt:channelId', 'link', 'updated', 'media:group'])

const parser = new XMLParser({
  ignoreAttributes: true,
  updateTag(tagName) {
    if (IGNORED_TAGS.has(tagName)) return false
    return tagName
  },
})

export const getRss = async (urls: string[]): GetRss => {
  const MAX_ITEMS_PER_FEED = 2
  const FETCH_TIMEOUT_MS = 2500
  // const MAX_ITEMS_TOTAL = 40

  const fetchPromises = urls.map(async (url: string) => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    try {
      const response = await fetch(url, {
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) return []

      const result = await response.text()
      const rss = parser.parse(result)

      const channel: RssFeed = rss?.rss?.channel
      const feed: Item[] | undefined = channel?.item?.map((item: RssItem) => ({
        source: channel.title,
        title: item.title,
        date: new Date(item.pubDate),
        description: item.description,
        categories: item.category,
        url: item.guid,
      }))

      if (!feed.length) return []

      return feed.slice(0, MAX_ITEMS_PER_FEED)
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

    const orderedResults = results.sort((a: Item, b: Item) => (a.date > b.date ? -1 : 1))
    // .slice(0, MAX_ITEMS_TOTAL)

    return { data: orderedResults, error: null }
  } catch (error) {
    console.debug(error)
    return { data: null, error: { message: 'Error getting videos' } }
  }
}
