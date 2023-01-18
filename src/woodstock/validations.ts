import { z } from "zod"

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(4)
  .max(100)
  .transform((str) => str.trim())

export const AddCommercial = z.object({
  email,
  password,
  adminId: z.string(),
})
