import { Hono } from 'hono'
import { protectedRouteHelpers } from '../../middleware/protectedRouteHelper'
import { sendError, sendSuccess } from '../../utils/api'
import { getFeedName, getRss } from '../../utils/rss'
import { dbCreateFeed, dbDeleteFeed, dbGetFeeds } from './rss.queries'
import { zValidator } from '@hono/zod-validator'
import { createFeedSchema, deleteFeedSchema, searchFeedSchema } from './rss.schema'

// const feeds = [
//   'https://www.siteinspire.com/websites/feed',
//   'https://tympanus.net/codrops/feed/',
//   'https://www.fromjason.xyz/notebook/feed/feed.xml',
//   'https://www.dotcom.press/archive/rss.xml',
//   'https://henry.codes/rss',
//   'https://manuelmoreale.com/feed/rss',
//   'https://carlbarenbrug.com/feed/rss',
//   'https://siiimple.com/feed/',
//   'https://blog.nataliethenerd.com/rss/',
//   'https://fabiensanglard.net/rss.xml',
//   'https://hallofshame.design/rss/',
//   'https://vale.rocks/posts/feed.xml',
//   'https://meiert.com/feed/',
//   'https://una.im/rss.xml',
//   'https://dbushell.com/rss.xml',
//   'https://martijnhols.nl/rss.xml',
//   'https://samwho.dev/rss.xml',
//   'https://piccalil.li/rss',
//   'https://aaadaaam.com/feed.xml',
//   'https://heydonworks.com/feed.xml',
// ]

export const rss = new Hono()
  .use('*', protectedRouteHelpers)

  .get('/', async (c) => {
    const user = c.get('user')
    const forceRefresh = c.req.query('refresh') === 'true'

    const { data: feeds, error: feedError } = await dbGetFeeds(user.id)
    if (feedError) {
      console.error('Failed to get channels in DB:', feedError)
      return c.json(sendError('Database error'), 500)
    }

    const { data, error } = await getRss(feeds, forceRefresh)
    if (error) {
      console.error('Failed to get rss in DB:', error)
      return c.json(sendError('Database error'), 500)
    }

    return c.json(sendSuccess(data))
  })

  .get('/feeds', async (c) => {
    const user = c.get('user')

    const { data, error } = await dbGetFeeds(user.id)
    if (error) {
      console.error('Failed to get feeds in DB:', error)
      return c.json(sendError('Database error'), 500)
    }

    return c.json(sendSuccess(data))
  })

  .get('/feeds/search', zValidator('query', searchFeedSchema), async (c) => {
    const { url } = c.req.valid('query')

    const data = await getFeedName(url)
    if (!data) {
      console.error('Failed to find channel data via YouTube lookup')
      return c.json(sendError('Database error'), 404)
    }

    return c.json(sendSuccess(data))
  })

  .post('/feeds', zValidator('json', createFeedSchema), async (c) => {
    const user = c.get('user')
    const feedData = c.req.valid('json')

    const { data, error } = await dbCreateFeed({ ...feedData, userId: user.id })
    if (error) {
      console.error('Failed to build feed record in DB:', error)
      return c.json(sendError('Database error'), 500)
    }

    return c.json(sendSuccess(data))
  })

  .delete('/feeds/:id', zValidator('param', deleteFeedSchema), async (c) => {
    const { id } = c.req.valid('param')
    const user = c.get('user')

    const { data, error } = await dbDeleteFeed(user.id, id)
    if (error) {
      console.error('Failed to execute feed removal in DB:', error)
      return c.json(sendError('Database error'), 500)
    }

    return c.json(sendSuccess(data))
  })
