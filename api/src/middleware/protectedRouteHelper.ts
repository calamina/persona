import { createMiddleware } from 'hono/factory'

type LocalEnv = {
  Variables: {
    user: { id: string }
  }
}

export const protectedRouteHelpers = createMiddleware<LocalEnv>(async (c, next) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ data: null, error: { message: 'Unauthorized' } }, 401)
  }
  await next()
})
