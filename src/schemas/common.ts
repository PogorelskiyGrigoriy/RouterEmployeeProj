import { z } from "zod";

// Общее правило для имен, которое можно использовать везде
export const nameSchema = z.string()
  .min(3, "Min 3 characters")
  .regex(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/, "Only letters and hyphens allowed");

  // Правило для Email
export const emailSchema = z.email({ message: "Invalid email address" })
  .min(1, { message: "Email is required" });

// Правило для пароля (минимум 6 символов, как в твоем LoginForm)
export const passwordSchema = z.string()
  .min(6, "Min 6 characters");