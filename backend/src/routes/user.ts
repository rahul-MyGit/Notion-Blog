import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from '@rahultech/med-common'

export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()
 
userRoute.post('/signup',async (c) => {
  const prisma = new PrismaClient({datasourceUrl: c.env.DATABASE_URL}).$extends(withAccelerate())
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({msg : "Invalid inputs"})
  }
  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    })
    const token = await sign({id: user.id}, c.env.JWT_SECRET);
    return c.json(token);
  }catch (error) {
    return c.json({error: "error while signing up"})
  } 
})


userRoute.post('/signin', async (c) => {
  const prisma = new PrismaClient({datasourceUrl: c.env.DATABASE_URL}).$extends(withAccelerate())
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({msg : "Invalid inputs"})
  }
  try {  
   const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password
    }
   })
   if(user){
     const token = await sign({id: user.id}, c.env.JWT_SECRET);
     return c.json(token)
   }else{
    c.status(403);
    return c.json({error: "Invalid username or password"})
   }
  } catch (error) {
    return c.text('error while signing in')
  }
})