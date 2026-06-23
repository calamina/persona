import { Hono } from 'hono'
import { protectedRouteHelpers } from '../../middleware/protectedRouteHelper'
import { sendError, sendSuccess } from '../../utils/api'
import { getRss } from '../../utils/rss'

const feeds = [
  'https://www.siteinspire.com/websites/feed',
  'https://tympanus.net/codrops/feed/',
  'https://www.fromjason.xyz/notebook/feed/feed.xml',
  'https://www.dotcom.press/archive/rss.xml',
  'https://henry.codes/rss',
  'https://manuelmoreale.com/feed/rss',
  'https://carlbarenbrug.com/feed/rss',
  'https://siiimple.com/feed/',
  'https://blog.nataliethenerd.com/rss/',
  'https://fabiensanglard.net/rss.xml',
  'https://hallofshame.design/rss/',
  'https://vale.rocks/posts/feed.xml',
  'https://meiert.com/feed/',
  'https://una.im/rss.xml',
  'https://dbushell.com/rss.xml',
  'https://martijnhols.nl/rss.xml',
  'https://samwho.dev/rss.xml',
  'https://piccalil.li/rss',
  'https://aaadaaam.com/feed.xml',
  'https://heydonworks.com/feed.xml',
]

export const rss = new Hono()
  .use('*', protectedRouteHelpers)

  .get('/', async (c) => {
    const { data, error } = await getRss(feeds)
    if (error) {
      console.error('Failed to get rss in DB:', error)
      return c.json(sendError('Database error'), 500)
    }

    return c.json(sendSuccess(data))
  })
