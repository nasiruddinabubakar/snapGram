import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, { message: "Name must be 3 characters" }).max(50),
  username: z
    .string()
    .min(7, { message: "Username must be 7 characters" })
    .max(13),
  email: z.string().min(9, { message: "Invalid Email" }).max(50),
  password: z.string().min(8, { message: "Password must be 8 characters !" }),
});

export const signinSchema = z.object({
  username: z
    .string()
    .min(7, { message: "Username must be 7 characters" })
    .max(13),
  password: z.string().min(8, { message: "Password must be 8 characters !" }),
});
