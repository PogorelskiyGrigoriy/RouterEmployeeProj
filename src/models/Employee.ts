//Employee.ts

import type { Department } from "./Departments";

export interface Employee {
  readonly id: string; // ID в базе всегда есть и не меняется вручную
  fullName: string;
  salary: number;
  birthDate: string; // ISO string
  department: Department; // Используем наш новый тип
  avatar?: string;
}

// Тип для создания нового сотрудника (ID сгенерирует сервер)
export type NewEmployee = Omit<Employee, "id">;