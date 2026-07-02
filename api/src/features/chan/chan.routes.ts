import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { protectedRouteHelpers } from '../../middleware/protectedRouteHelper'
import type { Chan } from './chan.model'
import { searchChanSchema } from './chan.schema'
import { zValidator } from '@hono/zod-validator'

export const chan = new Hono()
  .use('*', protectedRouteHelpers)

  .get('/', zValidator('query', searchChanSchema), async (c) => {
    const { board } = c.req.valid('query')
    const response = await fetch(`https://a.4cdn.org/${board}/catalog.json`)
    if (!response.ok) {
      throw new HTTPException(502, { message: "Can't get board catalog from 4chan" })
    }

    const [res]: Chan[] = ((await response.json()) as Chan[]) ?? []
    if (res) {
      const filteredThreads = res.threads
        .filter((thread) => !thread.sticky)
        .map(({ com, time, semantic_url, last_modified, no, tim, ext, filename, replies }) => ({
          id: no,
          name: semantic_url,
          replies: replies.toString().padStart(3, '0'),
          url: `https://boards.4chan.org/${board}/thread/${no}/${semantic_url}`,
          com: com
            ?.slice(0, 250)
            .replace(/href="\/([^"]+)"/g, 'href="https://boards.4chan.org/$1"'),
          picture: `https://i.4cdn.org/${board}/${tim}${ext}`,
          pictureName: filename,
          createdAt: new Date(time * 1000),
          updatedAt: new Date(last_modified * 1000),
        }))
      return c.json(filteredThreads)
    }

    throw new HTTPException(404, { message: 'No threads found or invalid catalog data received' })
  })
