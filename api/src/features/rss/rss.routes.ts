import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { protectedRouteHelpers } from '../../middleware/protectedRouteHelper'
import { getFeedName, getRss } from '../../utils/rss'
import { dbCreateFeed, dbDeleteFeed, dbGetFeeds } from './rss.queries'
import { zValidator } from '@hono/zod-validator'
import { createFeedSchema, deleteFeedSchema, searchFeedSchema } from './rss.schema'

export const rss = new Hono()
  .use('*', protectedRouteHelpers)

  .get('/', async (c) => {
    const user = c.get('user')

    const res = await dbGetFeeds(user.id)
    if (!res) {
      throw new HTTPException(404, { message: "Couldn't fetch rss feeds" })
    }

    const rssResult = await getRss(res)
    if (rssResult.error || !rssResult.data) {
      throw new HTTPException(502, { message: rssResult.error?.message || 'Failed to get rss' })
    }

    return c.json(rssResult.data)
  })

  .get('/feeds', async (c) => {
    const user = c.get('user')
    const res = await dbGetFeeds(user.id)
    if (!res) {
      throw new HTTPException(404, { message: 'No feeds found' })
    }
    return c.json(res)
  })

  .get('/feeds/search', zValidator('query', searchFeedSchema), async (c) => {
    const { url } = c.req.valid('query')

    const data = await getFeedName(url)
    if (!data) {
      throw new HTTPException(404, { message: 'Failed to find channel data via lookup' })
    }

    return c.json(data)
  })

  .post('/feeds', zValidator('json', createFeedSchema), async (c) => {
    const user = c.get('user')
    const feedData = c.req.valid('json')

    const res = await dbCreateFeed({ ...feedData, userId: user.id })
    if (!res) {
      throw new HTTPException(400, { message: 'Failed to build feed record in DB' })
    }

    return c.json(res)
  })

  .delete('/feeds/:id', zValidator('param', deleteFeedSchema), async (c) => {
    const { id } = c.req.valid('param')
    const user = c.get('user')

    const res = await dbDeleteFeed(user.id, id)
    if (!res) {
      throw new HTTPException(404, { message: 'Failed to execute feed removal in DB' })
    }

    return c.json(res)
  })
