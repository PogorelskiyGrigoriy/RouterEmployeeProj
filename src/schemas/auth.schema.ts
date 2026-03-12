import { z } from "zod";
import { emailSchema, passwordSchema } from "./common";

/**
 * 1. Роли пользователей
 */
export const userRoleSchema = z.enum(['ADMIN', 'USER']);
export type UserRole = z.infer<typeof userRoleSchema>;

/**
 * 2. Данные для входа (LoginData)
 * Используем готовые правила из common.ts
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export type LoginData = z.infer<typeof loginSchema>;

/**
 * 3. Данные профиля (UserData)
 */
export const userDataSchema = z.object({
  id: z.string(),
  username: z.string(),
  role: userRoleSchema,
});
export type UserData = z.infer<typeof userDataSchema>;

/**
 * 4. Состояние стора (AuthState)
 * Оставляем интерфейсом, так как это внутренняя структура Store.
 * Но используем типы, сгенерированные Zod выше.
 */
export interface AuthState {
  readonly user: UserData | null;
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
}