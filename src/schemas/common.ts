import { z } from "zod";

/**
 * Generic name validation: 3+ chars, letters and hyphens only.
 */
export const nameSchema = z.string()
  .min(3, "Min 3 characters")
  .regex(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/, "Only letters and hyphens allowed");

/**
 * Standard email validation.
 */
export const emailSchema = z.email({ message: "Invalid email address" })
  .min(1, { message: "Email is required" });

/**
 * Basic password validation.
 */
export const passwordSchema = z.string()
  .min(6, "Min 6 characters");

/**
 * Validates that a string is a properly formatted ISO date.
 * Does not check business logic (like age), only technical validity.
 */
export const dateStringSchema = z.string()
  .min(1, "Date is required")
  .refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  });

  /**
 * Generic interface for UI Select components
 */
export interface FilterOption {
  readonly label: string;
  readonly value: string;
}