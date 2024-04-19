import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables: {
    userId : string
  }
}>()

blogRoute.use('/*', async (c,next)=>{
  console.log("hehe");
  
  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];

  const res = await verify(token, c.env.JWT_SECRET);
  if(res.id){
    c.set("userId", res.id);
    await next();
  }else{
    c.status(403);
    return c.json({error: "Unathorized"});
  }
})

blogRoute.post('/', (c) => {
    return c.text('post route')
  })

blogRoute.put('/', (c) => {
    return c.text('put route')
  })

blogRoute.get('/bulk', (c) => {
    return c.text('get all blog')
  })

blogRoute.get('/:id', (c) => {
    const id = c.req.param('id')
    console.log(id);
    return c.text('get gg blog route')
  })
