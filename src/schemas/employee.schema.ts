import { z } from "zod";
import { departmentSchema } from "./department.schema";
import { EMPLOYEES_CONFIG } from "@/config/employees-config";
import { nameSchema } from "./common";

const { salary } = EMPLOYEES_CONFIG;

/**
 * 1. Базовая схема сотрудника (аналог interface Employee)
 * Мы описываем всё, включая ID.
 */
export const employeeSchema = z.object({
  id: z.string(),
  fullName: nameSchema,
  salary: z.coerce.number()
    .min(salary.min, `Min: ${salary.min}`)
    .max(salary.max, `Max: ${salary.max}`),
  birthDate: z.string().min(1, "Birth date is required"), // Валидацию возраста добавим в .refine ниже
  department: departmentSchema,
  avatar: z.string().url().optional(),
});

/**
 * 2. Тип для существующего сотрудника
 */
export type Employee = z.infer<typeof employeeSchema>;

/**
 * 3. Схема для создания нового сотрудника (аналог NewEmployee)
 * Мы просто убираем 'id' из базовой схемы.
 */
export const newEmployeeSchema = employeeSchema.omit({ id: true });
export type NewEmployee = z.infer<typeof newEmployeeSchema>;

/**
 * 4. Схема для обновления (аналог EmployeeUpdatePayload)
 */
export const employeeUpdateSchema = z.object({
  id: z.string(),
  changes: newEmployeeSchema.partial(),
});
export type EmployeeUpdatePayload = z.infer<typeof employeeUpdateSchema>;

/**
 * 5. Вспомогательная схема для фильтров (аналог EmployeeFilter)
 */
export const employeeFilterSchema = z.object({
  search: z.string().optional(),
  department: z.union([departmentSchema, z.literal("All")]).optional(),
  minSalary: z.number().optional(),
  maxSalary: z.number().optional(),
});
export type EmployeeFilter = z.infer<typeof employeeFilterSchema>;