import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { dbCreateFavorite, dbDeleteFavorite, dbGetFavorites } from './favorite.queries'
import { zValidator } from '@hono/zod-validator'
import { protectedRouteHelpers } from '../../middleware/protectedRouteHelper'
import { createFavoriteSchema, deleteFavoriteSchema } from './favorite.schema'

export const favorites = new Hono()
  .use('*', protectedRouteHelpers)

  .get('/', async (c) => {
    const user = c.get('user')

    const res = await dbGetFavorites(user.id)
    if (!res) {
      throw new HTTPException(404, { message: 'Failed to fetch favorites' })
    }

    return c.json(res)
  })

  .post('/', zValidator('json', createFavoriteSchema), async (c) => {
    const { url } = c.req.valid('json')
    const user = c.get('user')

    const res = await dbCreateFavorite(user.id, url)
    if (!res) {
      throw new HTTPException(400, { message: 'Failed to create favorite' })
    }

    return c.json(res)
  })

  .delete('/:id', zValidator('param', deleteFavoriteSchema), async (c) => {
    const { id } = c.req.valid('param')
    const user = c.get('user')

    const res = await dbDeleteFavorite(user.id, id)
    if (!res) {
      throw new HTTPException(404, { message: 'Favorite not found or unauthorized to delete' })
    }

    return c.json(res)
  })
