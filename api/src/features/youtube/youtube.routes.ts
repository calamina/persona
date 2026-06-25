import { Hono } from 'hono'
import { getVideos } from '../../utils/youtube'
import { zValidator } from '@hono/zod-validator'
import { dbCreateChannel, dbDeleteChannel, dbGetChannels } from './youtube.queries'
import YouTube from 'youtube-sr'
import { protectedRouteHelpers } from '../../middleware/protectedRouteHelper'
import { sendError, sendSuccess } from '../../utils/api'
import { createChannelSchema, deleteChannelSchema, searchSchema } from './youtube.schema'

export const youtube = new Hono()
  .use('*', protectedRouteHelpers)

  .get('/videos', async (c) => {
    const user = c.get('user')
    const forceRefresh = c.req.query('refresh') === 'true'

    const { data: channels, error: channelError } = await dbGetChannels(user.id)
    if (channelError) {
      console.error('Failed to get channels in DB:', channelError)
      return c.json(sendError('Database error'), 500)
    }

    const { data, error: videoError } = await getVideos(channels, forceRefresh)
    if (videoError) {
      console.error('Failed to get videos over network:', videoError)
      return c.json(sendError('Database error'), 500)
    }

    return c.json(sendSuccess(data))
  })

  .get('/channels', async (c) => {
    const user = c.get('user')

    const { data, error } = await dbGetChannels(user.id)
    if (error) {
      console.error('Failed to get channels in DB:', error)
      return c.json(sendError('Database error'), 500)
    }

    return c.json(sendSuccess(data))
  })

  .get('/channels/search', zValidator('query', searchSchema), async (c) => {
    const { query } = c.req.valid('query')

    const data = await YouTube.searchOne(query, 'channel')
    if (!data) {
      console.error('Failed to find channel data via YouTube lookup')
      return c.json(sendError('Database error'), 404)
    }

    return c.json(sendSuccess(data))
  })

  .post('/channels', zValidator('json', createChannelSchema), async (c) => {
    const user = c.get('user')
    const channelData = c.req.valid('json')

    const { data, error } = await dbCreateChannel({ ...channelData, userId: user.id })
    if (error) {
      console.error('Failed to build channel record in DB:', error)
      return c.json(sendError('Database error'), 500)
    }

    return c.json(sendSuccess(data))
  })

  .delete('/channels/:id', zValidator('param', deleteChannelSchema), async (c) => {
    const { id } = c.req.valid('param')
    const user = c.get('user')

    const { data, error } = await dbDeleteChannel(user.id, id)
    if (error) {
      console.error('Failed to execute channel removal in DB:', error)
      return c.json(sendError('Database error'), 500)
    }

    return c.json(sendSuccess(data))
  })
