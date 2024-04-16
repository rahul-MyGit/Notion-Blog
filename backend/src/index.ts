import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify, decode, sign } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()
 
app.post('/api/v1/signup',async (c) => {
  const prisma = new PrismaClient({datasourceUrl: c.env.DATABASE_URL}).$extends(withAccelerate())
  const body = await c.req.json();
  try {

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    })

    const token = await sign({id: user.id}, c.env.JWT_SECRET);
    return c.json({token});
  }catch (error) {
    return c.json({error: "error while signing up"})
  }
})


app.post('/api/v1/signin', (c) => {
  return c.text('signin route')
})
app.post('/api/v1/blog', (c) => {
  return c.text('signin route')
})
app.put('/api/v1/blog', (c) => {
  return c.text('signin route')
})
app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id')
  console.log(id);
  return c.text('get blog route')
})
// app.get('/api/v1/blog/bulk', (c) => {
//   return c.text('get all blog')
// })

export default app
