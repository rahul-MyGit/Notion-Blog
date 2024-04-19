import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createPostInput, updatePostInput } from '@rahultech/med-common'

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
  
  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];
try {
  
  const res = await verify(token, c.env.JWT_SECRET);
  if(res.id){
    c.set("userId", res.id);
    await next();
  }else{
    c.status(403);
    return c.json({error: "Unathorized"});
  }
} catch (error) {
  c.status(403);
  return c.json({error: "Unathorized"})
}
})

blogRoute.post('/', async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({datasourceUrl: c.env.DATABASE_URL}).$extends(withAccelerate());
  const { success } = createPostInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({msg : "Invalid inputs"})
  }
  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: c.get("userId")
    }
  })
  return c.json({
     id : blog.id,
     msg: "Blog created successfully"
    })
})

blogRoute.put('/', async (c) => {
  const body = await c.req.json();
  const { success } = updatePostInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({msg : "Invalid inputs"})
  }
  const prisma = new PrismaClient({datasourceUrl: c.env.DATABASE_URL}).$extends(withAccelerate());
  try {
    
  const blog = await prisma.post.update({
    where:{
      id: body.id,
      authorId: c.get("userId")
    },
    data: {
      title: body.title,
      content: body.content,
    }
  })
  return c.json({ 
    id : blog.id, 
    msg : "Updated successfully"  
  })

} catch (error) {
  return c.json({error: "Error while updatig"});  
}
})


//TODO:  add Pagination
blogRoute.get('/bulk', async (c) => {
  const prisma = new PrismaClient({datasourceUrl: c.env.DATABASE_URL}).$extends(withAccelerate());
  const blogs = await prisma.post.findMany();

  return c.json({blogs})
})

blogRoute.get('/:id',async (c) => {
  const prisma = new PrismaClient({datasourceUrl: c.env.DATABASE_URL}).$extends(withAccelerate());
  const id = c.req.param("id");

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id
      }
    })

    return c.json({
      blog
    })
    
  } catch (error) {
    c.status(411);
    return c.json({msg : "Error while fetchingblog post"})
    }
})
