import { z } from "zod";

// Общее правило для имен, которое можно использовать везде
export const nameSchema = z.string()
  .min(3, "Min 3 characters")
  .regex(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/, "Only letters and hyphens allowed");