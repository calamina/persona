export interface Video {
  id: string
  author: string
  published: string
  title: string
}

export interface Channel {
  name: string
  verified: boolean
  id: string
  url: string
  iconURL: string
  type: 'channel'
  subscribers: string
}

export type ChannelCore = Pick<Channel, 'name' | 'id' | 'url' | 'iconURL'>

export type ChannelCreatePayload = Omit<ChannelCore, 'id'> & {
  youtubeId: string
}

export interface ChannelDisplay {
  id: number
  youtubeId: string
  name: string
  url: string
  iconURL: string
  userId: string
  createdAt: string
  updatedAt: string
}
