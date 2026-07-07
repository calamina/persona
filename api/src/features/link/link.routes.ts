import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { zValidator } from '@hono/zod-validator'
import { protectedRouteHelpers } from '../../middleware/protectedRouteHelper'
import { createLinkSchema, deleteLinkSchema, getLinkNameSchema } from './link.schema'
import { getUrlTitle, isValidUrl } from '../../utils/url'
import { dbCreateLink, dbDeleteLink, dbGetLinks } from './link.queries'

export const links = new Hono()
  .use('*', protectedRouteHelpers)

  .get('/', async (c) => {
    const user = c.get('user')

    const res = await dbGetLinks(user.id)
    if (!res) {
      throw new HTTPException(404, { message: 'Failed to fetch links' })
    }

    return c.json(res)
  })

  .get('/getLinkName', zValidator('query', getLinkNameSchema), async (c) => {
    const { url } = c.req.valid('query')

    const urlNoProtocol = url.replace(/^https?:\/\//i, '')
    const urlSafe = new URL('https://' + urlNoProtocol)

    const [isValid, title] = await Promise.all([
      isValidUrl(urlSafe.href),
      getUrlTitle(urlSafe.href).catch(() => ''),
    ])

    if (!isValid) {
      throw new HTTPException(400, { message: 'Failed to get link name' })
    }

    return c.json(title)
  })

  .post('/', zValidator('json', createLinkSchema), async (c) => {
    const user = c.get('user')
    const link = c.req.valid('json')

    const res = await dbCreateLink({ userId: user.id, ...link })
    if (!res) {
      throw new HTTPException(400, { message: 'Failed to create link' })
    }

    return c.json(res)
  })

  .delete('/:id', zValidator('param', deleteLinkSchema), async (c) => {
    const { id } = c.req.valid('param')
    const user = c.get('user')

    const res = await dbDeleteLink(user.id, id)
    if (!res) {
      throw new HTTPException(404, { message: 'Link not found or unauthorized to delete' })
    }

    return c.json(res)
  })
