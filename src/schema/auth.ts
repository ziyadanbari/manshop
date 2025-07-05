import * as z from "zod";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterForm = z.infer<typeof registerSchema>;

const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginForm = z.infer<typeof loginSchema>;

export { registerSchema, loginSchema };
