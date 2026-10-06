import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  username: z.string().min(3).max(24).regex(/^[a-zA-Z0-9_.-]+$/),
  email: z.string().email(),
  phone: z.string().min(8),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  bio: z.string().max(200).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  identifier: z.string().min(2),
  password: z.string().min(8),
});

export const resetSchema = z.object({
  token: z.string().min(8),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export function detectLoginType(identifier: string) {
  const trimmed = identifier.trim();

  if (trimmed.includes("@") && trimmed.includes(".")) return "email";
  if (/^\+?[0-9\s()-]{8,}$/.test(trimmed)) return "phone";
  return "username";
}
