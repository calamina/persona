export interface RssDisplay {
  title: string
  date: string
  description: string
  categories: string[]
  source: string
  url: string
  imageUrl: string | null
}

export interface Feed {
  name: string
  url: string
}

export interface FeedDisplay {
  id: number
  name: string
  url: string
}
