import { Hono } from 'hono'
import { dbCreateFavorite, dbDeleteFavorite, dbGetFavorites } from './favorite.queries'
import { zValidator } from '@hono/zod-validator'
import z from 'zod'
import { protectedRouteHelpers } from '../../middleware/protectedRouteHelper'
import { sendError, sendSuccess } from '../../utils/api'

const createFavoriteSchema = z.object({
  url: z.url(),
})

const deleteFavoriteSchema = z.object({ id: z.coerce.number() })

export const favorites = new Hono()
  .use('*', protectedRouteHelpers)

  .get('/', async (c) => {
    const user = c.get('user')

    const { data, error } = await dbGetFavorites(user.id)
    if (error) {
      console.error('Failed to get favorites in DB:', error)
      return c.json(sendError('Database error'), 500)
    }

    return c.json(sendSuccess(data))
  })

  .post('/', zValidator('form', createFavoriteSchema), async (c) => {
    const { url } = c.req.valid('form')
    const user = c.get('user')

    const { data, error } = await dbCreateFavorite(user.id, url)
    if (error) {
      console.error('Failed to add favorite in DB:', error)
      return c.json(sendError('Database error'), 500)
    }

    return c.json(sendSuccess(data))
  })

  .delete('/:id', zValidator('param', deleteFavoriteSchema), async (c) => {
    const { id } = c.req.valid('param')
    const user = c.get('user')

    const { data, error } = await dbDeleteFavorite(user.id, id)
    if (error) {
      console.error('Failed to delete favorite in DB:', error)
      return c.json(sendError('Database error'), 500)
    }

    return c.json(sendSuccess(data))
  })
