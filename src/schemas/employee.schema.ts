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
 * Filter schema with strict defaults for the Store and UI.
 */
export const employeeFilterSchema = z.object({
  department: z.union([departmentSchema, z.literal("All")]).default("All"),
  minSalary: z.coerce.number().default(EMPLOYEES_CONFIG.salary.min),
  maxSalary: z.coerce.number().default(EMPLOYEES_CONFIG.salary.max),
  minAge: z.coerce.number().default(EMPLOYEES_CONFIG.age.min),
  maxAge: z.coerce.number().default(EMPLOYEES_CONFIG.age.max),
});

export type EmployeeFilter = z.infer<typeof employeeFilterSchema>;