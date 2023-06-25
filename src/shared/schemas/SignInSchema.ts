import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters long",
  }),
});

export type LoginSchemaType = z.infer<typeof SignInSchema>;
