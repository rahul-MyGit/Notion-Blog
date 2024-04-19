import z from "zod"

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(3),
    name: z.string().optional()
})
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(3),
})
export const createPostInput = z.object({
    title: z.string(),
    content: z.string()
})
export const updatePostInput = z.object({
    id: z.string(),
    title: z.string().optional(),
    content: z.string().optional()
})



export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreatePostInput = z.infer<typeof createPostInput>
export type UpdatePostInput = z.infer<typeof updatePostInput>