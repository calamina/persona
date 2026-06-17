export interface Channel {
  name: string
  verified: boolean
  id: string
  url: string
  iconURL: string
  type: 'channel'
  subscribers: string
}

export interface ChannelDisplay {
  id: number
  name: string
  url: string
  iconURL: string | null
}

export interface VideoDisplay {
  id: string
  author: string
  published: string
  title: string
}
