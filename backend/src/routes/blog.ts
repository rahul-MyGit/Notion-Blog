import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

blogRoute.post('/api/v1/blog', (c) => {
    return c.text('signin route')
  })

blogRoute.put('/api/v1/blog', (c) => {
    return c.text('signin route')
  })

blogRoute.get('/api/v1/blog/:id', (c) => {
    const id = c.req.param('id')
    console.log(id);
    return c.text('get blog route')
  })


// app.get('/api/v1/blog/bulk', (c) => {
  //   return c.text('get all blog')
  // })