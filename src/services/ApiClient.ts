// src/services/ApiClient.ts
import type { Employee, NewEmployee, EmployeeUpdater } from "@/models/Employee";
import type { AxiosRequestConfig } from "axios";
import type { EmployeeFilters } from "@/models/Filters";
import type { SortState } from "@/store/sort-store"; // Импортируем интерфейс сортировки

export interface ApiClient {
  // Теперь принимает 3 аргумента: фильтры, сортировку и конфиг axios
  getEmployees(
    filters?: EmployeeFilters, 
    sort?: SortState, 
    config?: AxiosRequestConfig
  ): Promise<Employee[]>;
  
  addEmployee(e: NewEmployee): Promise<Employee>;
  deleteEmployee(id: string): Promise<void>;
  updateEmployee(updater: EmployeeUpdater): Promise<Employee>;
}