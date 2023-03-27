import { z } from "zod";

export const userSchema = z.object({
  firstname: z
    .string({
      required_error: "First name is required",
    })
    .min(5, { message: "First name must be 5 or more characters long" }),
  lastname: z
    .string({ required_error: "Lastname is required" })
    .min(5, { message: "Last name must be 5 or more characters long" }),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({
    required_error: "Password is required"
  }).min(8, { message: "Password must be 8 or more characters long" }),
});

export const loginUserSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({
    required_error: "Password is required"
  }).min(8, { message: "Password must be 8 or more characters long" }),
});
