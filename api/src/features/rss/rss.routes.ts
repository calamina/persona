import { Hono } from 'hono'
import { protectedRouteHelpers } from '../../middleware/protectedRouteHelper'
import { sendError, sendSuccess } from '../../utils/api'
import { getRss } from '../../utils/rss'

export const rss = new Hono()
  .use('*', protectedRouteHelpers)

  .get('/', async (c) => {
    const { data, error } = await getRss(['https://tympanus.net/codrops/feed/'])
    if (error) {
      console.error('Failed to get rss in DB:', error)
      return c.json(sendError('Database error'), 500)
    }

    return c.json(sendSuccess(data))
  })
