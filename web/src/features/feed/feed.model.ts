export interface Video {
  id: string
  'yt:videoId': string
  'yt:channelId': string
  author: { name: string; uri: string }
  link: ''
  'media:group': {
    'media:title': string
    'media:content': string
    'media:description': string
  }
  published: string
  title: string
  updated: Date
}

export interface Channel {
  name: string
  id: string
  htmlurl: string
}
