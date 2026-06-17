import type { UnpackData } from '../../utils/api-client'
import type { getChannels, getVideos } from './youtube.service'

export interface Channel {
  name: string
  verified: boolean
  id: string
  url: string
  iconURL: string
  type: 'channel'
  subscribers: string
}

export type ChannelDisplay = UnpackData<typeof getChannels>
export type VideoDisplay = UnpackData<typeof getVideos>
