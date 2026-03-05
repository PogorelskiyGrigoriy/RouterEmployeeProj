//EmployeeUpdater.ts

import type { Employee } from "@/models/Employee";

export interface EmployeeUpdater {
  id: string;
  // Мы исключаем ID из полей для обновления, чтобы случайно его не изменить
  fields: Partial<Omit<Employee, "id">>;
}