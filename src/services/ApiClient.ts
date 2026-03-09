//ApiClient.ts

import type { Employee, NewEmployee } from "@/models/Employee";
import type { AxiosRequestConfig } from "axios";
import type { EmployeeUpdater } from "@/models/EmployeeUpdater";

// 1. Определяем тип фильтров здесь (или импортируем из моделей)
export interface EmployeeFilters {
  department?: string;
  minSalary?: number;
  maxSalary?: number;
  minAge?: number;
  maxAge?: number;
}

export interface ApiClient {
  // 2. Обновляем сигнатуру: первым аргументом теперь идут фильтры
  getEmployees(filters?: EmployeeFilters, config?: AxiosRequestConfig): Promise<Employee[]>;
  
  addEmployee(e: NewEmployee): Promise<Employee>;
  deleteEmployee(id: string): Promise<void>;
  updateEmployee(updater: EmployeeUpdater): Promise<Employee>;
}