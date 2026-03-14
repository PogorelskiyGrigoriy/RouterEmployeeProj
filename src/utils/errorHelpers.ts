import { z, ZodError } from "zod";

/**
 * Преобразует ZodError в массив читаемых строк.
 */
export const formatZodError = (error: ZodError): string[] => {
  return error.issues.map((issue: z.ZodIssue) => {
    const path = issue.path.length > 0 ? issue.path.join(".") : "root";
    return `${path}: ${issue.message}`;
  });
};

/**
 * Преобразует ZodError в одну строку для кратких уведомлений.
 */
export const formatZodErrorToString = (error: ZodError): string => {
  return formatZodError(error).join(" | ");
};