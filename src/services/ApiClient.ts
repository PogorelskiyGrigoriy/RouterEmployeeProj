// src/services/ApiClient.ts
import type { Employee, NewEmployee, EmployeeUpdater } from "@/models/Employee";
import type { AxiosRequestConfig } from "axios";
import type { EmployeeFilters } from "@/models/Filters"; // Импортируем общее

export interface ApiClient {
  // Теперь всё строго по контракту
  getEmployees(filters?: EmployeeFilters, config?: AxiosRequestConfig): Promise<Employee[]>;
  addEmployee(e: NewEmployee): Promise<Employee>;
  deleteEmployee(id: string): Promise<void>;
  updateEmployee(updater: EmployeeUpdater): Promise<Employee>;
}