import { z } from "zod"

export const SignUpFormSchema = z.object({
  email: z.string().email(),
  // Find a way to make the names into title case (or let the server do it)
  first_name: z
    .string()
    .min(2, {
      message: "First name should be at least 2 characters long",
    })
    .trim(),
  last_name: z
    .string()
    .min(2, {
      message: "Last name should be at least 2 characters long",
    })
    .trim(),
  username: z
    .string()
    .min(2, {
      message: "A username must be at least 2 characters long",
    })
    .trim(),
  password: z.string().min(8, {
    message: "Your password must be at least 8 characters long",
  }),

  re_password: z.string().min(8, {
    message: "Your password must be at least 8 characters long",
  }),
})

export const SignInFormSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
})

export type SignUpFormValidator = z.infer<typeof SignUpFormSchema>

export type SignInFormValidator = z.infer<typeof SignInFormSchema>
