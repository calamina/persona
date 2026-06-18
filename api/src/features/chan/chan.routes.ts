import { Hono } from 'hono'
import { protectedRouteHelpers } from '../../middleware/protectedRouteHelper'
import { sendError, sendSuccess } from '../../utils/api'
import { Chan } from './chan.model'

export const chan = new Hono()
  .use('*', protectedRouteHelpers)

  .get('/', async (c) => {
    const response = await fetch('https://a.4cdn.org/g/catalog.json')
    if (!response.ok) {
      return c.json(sendError('Database error'), 500)
    }

    const [res]: Chan[] = await response.json()
    if (res) {
      const filteredThreads = res.threads
        .filter((thread) => !thread.sticky)
        .map(({ name, com, time, semantic_url, last_modified, no, tim, ext, filename }) => ({
          id: no,
          name,
          url: `https://boards.4chan.org/g/thread/${no}/${semantic_url}`,
          com: com.slice(0, 25),
          picture: `https://i.4cdn.org/g/${tim}${ext}`,
          pictureName: filename,
          createdAt: new Date(time * 1000),
          updatedAt: new Date(last_modified * 1000),
        }))
      return c.json(sendSuccess(filteredThreads))
    }

    return c.json(sendError('Database error'), 500)
  })
