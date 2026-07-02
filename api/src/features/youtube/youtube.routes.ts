import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { getVideos } from '../../utils/youtube'
import { zValidator } from '@hono/zod-validator'
import { dbCreateChannel, dbDeleteChannel, dbGetChannels } from './youtube.queries'
import YouTube from 'youtube-sr'
import { protectedRouteHelpers } from '../../middleware/protectedRouteHelper'
import { createChannelSchema, deleteChannelSchema, searchSchema } from './youtube.schema'

export const youtube = new Hono()
  .use('*', protectedRouteHelpers)

  .get('/videos', async (c) => {
    const user = c.get('user')

    const channels = await dbGetChannels(user.id)
    if (!channels) {
      throw new HTTPException(404, { message: 'Failed to get channels in DB' })
    }

    const data = await getVideos(channels)
    if (!data) {
      throw new HTTPException(502, { message: 'Failed to get videos over network' })
    }

    return c.json(data)
  })

  .get('/channels', async (c) => {
    const user = c.get('user')

    const data = await dbGetChannels(user.id)
    if (!data) {
      throw new HTTPException(404, { message: 'Failed to get channels in DB' })
    }

    return c.json(data)
  })

  .get('/channels/search', zValidator('query', searchSchema), async (c) => {
    const { query } = c.req.valid('query')

    const data = await YouTube.searchOne(query, 'channel')
    if (!data) {
      throw new HTTPException(404, { message: 'Failed to find channel data via YouTube lookup' })
    }

    return c.json(data)
  })

  .post('/channels', zValidator('json', createChannelSchema), async (c) => {
    const user = c.get('user')
    const channelData = c.req.valid('json')

    const data = await dbCreateChannel({ ...channelData, userId: user.id })
    if (!data) {
      throw new HTTPException(400, { message: 'Failed to build channel record in DB' })
    }

    return c.json(data)
  })

  .delete('/channels/:id', zValidator('param', deleteChannelSchema), async (c) => {
    const { id } = c.req.valid('param')
    const user = c.get('user')

    const data = await dbDeleteChannel(user.id, id)
    if (!data) {
      throw new HTTPException(404, { message: 'Failed to execute channel removal in DB' })
    }

    return c.json(data)
  })
