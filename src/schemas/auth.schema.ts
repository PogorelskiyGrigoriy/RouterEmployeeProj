import { z } from "zod";
import { emailSchema, passwordSchema } from "./common";

/**
 * Defines valid user roles within the system.
 * Used for Role-Based Access Control (RBAC).
 */
export const userRoleSchema = z.enum(['ADMIN', 'USER']);
export type UserRole = z.infer<typeof userRoleSchema>;

/**
 * Schema for login credentials.
 * Reuses validation rules from common schema (email/password).
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export type LoginData = z.infer<typeof loginSchema>;

/**
 * Schema for authenticated user profile data.
 * Validates the structure of the user object stored in the state.
 */
export const userDataSchema = z.object({
  id: z.string(),
  username: z.string(),
  role: userRoleSchema,
});
export type UserData = z.infer<typeof userDataSchema>;