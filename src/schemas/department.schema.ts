import { z } from "zod";

/**
 * 1. Single Source of Truth
 */
export const DEPARTMENTS_LIST = [
  "QA", 
  "Development", 
  "Audit", 
  "Accounting", 
  "Management"
] as const;

/**
 * 2. Схемы
 * Чтобы избежать ошибки "No overload matches this call", 
 * передаем кастомное сообщение просто как строку вторым аргументом.
 */
export const departmentSchema = z.enum(DEPARTMENTS_LIST, "Select a valid department");

export const departmentFilterSchema = z.union([
  departmentSchema, 
  z.literal("All")
]);

/**
 * 3. Генерируемые типы
 */
export type Department = z.infer<typeof departmentSchema>;

/**
 * 4. Statistics Model
 */
export const departmentInfoSchema = z.object({
  // .catch("Unknown") сделает схему устойчивой к неверным данным с сервера
  department: z.union([departmentSchema]),
  numEmployees: z.number(),
  avgSalary: z.number(),
  avgAge: z.number(),
});

export type DepartmentInfo = z.infer<typeof departmentInfoSchema>;