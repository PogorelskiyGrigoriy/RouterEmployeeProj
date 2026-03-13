import { z } from "zod";
import { departmentSchema } from "./department.schema";
import { EMPLOYEES_CONFIG } from "@/config/employees-config";
import { nameSchema, dateStringSchema } from "./common";
import { calculateAge } from "@/utils/dateUtils";

const { salary, age } = EMPLOYEES_CONFIG;

/**
 * Core Employee Schema.
 * Includes age validation via 'refine' based on global config.
 */
export const employeeSchema = z.object({
  id: z.string(),
  fullName: nameSchema,
  salary: z.coerce.number()
    .min(salary.min, `Min salary: ${salary.min}`)
    .max(salary.max, `Max salary: ${salary.max}`),
  
  // Uses base date validation + age limit check
  birthDate: dateStringSchema.refine((date) => {
    const currentAge = calculateAge(date);
    return currentAge >= age.min && currentAge <= age.max;
  }, {
    message: `Age must be between ${age.min} and ${age.max} years old`,
  }),

  department: departmentSchema,
  avatar: z.string().url().nullable().optional(),
});

export type Employee = z.infer<typeof employeeSchema>;

/**
 * Schema for creating a new employee (no ID required).
 */
export const newEmployeeSchema = employeeSchema.omit({ id: true });
export type NewEmployee = z.infer<typeof newEmployeeSchema>;

/**
 * Schema for employee update operations.
 */
export const employeeUpdateSchema = z.object({
  id: z.string(),
  changes: newEmployeeSchema.partial(),
});
export type EmployeeUpdatePayload = z.infer<typeof employeeUpdateSchema>;

/**
 * Extended schema for search and filter functionality.
 * Supports range filtering for salary and age.
 */
export const employeeFilterSchema = z.object({
  search: z.string().optional(),
  department: z.union([departmentSchema, z.literal("All")]).optional(),
  minSalary: z.number().optional(),
  maxSalary: z.number().optional(),
  minAge: z.number().optional(),
  maxAge: z.number().optional(),
});
export type EmployeeFilter = z.infer<typeof employeeFilterSchema>;