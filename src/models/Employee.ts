//Employee.ts

import type { Department } from "./Departments";

export interface Employee {
  readonly id: string; 
  fullName: string;
  salary: number;
  birthDate: string; // ISO string
  department: Department;
  avatar?: string;
}

// Тип для создания (без ID)
export type NewEmployee = Omit<Employee, "id">;

/** * Переносим EmployeeUpdater сюда! 
 * Почему? Потому что это логическая часть описания сущности Employee.
 * Нам не нужен отдельный файл для 4 строк кода, это плодит лишние импорты.
 */
export interface EmployeeUpdater {
  id: string;
  fields: Partial<NewEmployee>;
}