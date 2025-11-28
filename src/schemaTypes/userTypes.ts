import { email, z } from "zod";

export const registerShema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters")
})

export const loginSchema = z.object({
    email: z.email('Invalid Email Address'),
    password: z.string().min(6, "Password must be at least 6 chacracters")
})