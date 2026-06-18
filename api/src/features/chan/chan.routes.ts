import { Hono } from 'hono'
import { protectedRouteHelpers } from '../../middleware/protectedRouteHelper'
import { sendError, sendSuccess } from '../../utils/api'
import { Chan } from './chan.model'
import { searchChanSchema } from './chan.schema'
import { zValidator } from '@hono/zod-validator'

export const chan = new Hono()
  .use('*', protectedRouteHelpers)

  .get('/', zValidator('query', searchChanSchema), async (c) => {
    const { board } = c.req.valid('query')
    const response = await fetch(`https://a.4cdn.org/${board}/catalog.json`)
    if (!response.ok) {
      return c.json(sendError('Database error'), 500)
    }

    const [res]: Chan[] = await response.json()
    if (res) {
      const filteredThreads = res.threads
        .filter((thread) => !thread.sticky)
        .map(({ com, time, semantic_url, last_modified, no, tim, ext, filename, replies }) => ({
          id: no,
          name: semantic_url,
          replies: replies.toString().padStart(3, '0'),
          url: `https://boards.4chan.org/${board}/thread/${no}/${semantic_url}`,
          com: com
            ?.slice(0, 100)
            .replace(/href="\/([^"]+)"/g, 'href="https://boards.4chan.org/$1"'),
          picture: `https://i.4cdn.org/${board}/${tim}${ext}`,
          pictureName: filename,
          createdAt: new Date(time * 1000),
          updatedAt: new Date(last_modified * 1000),
        }))
      return c.json(sendSuccess(filteredThreads))
    }

    return c.json(sendError('Database error'), 500)
  })
