import api from "@/api/axiosInstance";
import type { AxiosRequestConfig } from "axios";
import type { ApiClient } from "./ApiClient"; 
import type { EmployeeFilters } from "@/models/Filters"; 
import type { Employee, NewEmployee, EmployeeUpdater } from "@/models/Employee"; 
import type { SortState } from "@/store/sort-store"; 
import { getLimitDate } from "@/utils/dateUtils"; 

const ENDPOINTS = {
  EMPLOYEES: "/employees",
} as const;

class ApiClientJsonServer implements ApiClient {
  async getEmployees(
    filters?: EmployeeFilters, 
    sort?: SortState, // Принимаем сортировку
    config?: AxiosRequestConfig
  ): Promise<Employee[]> {
    const params: Record<string, any> = { ...config?.params };

    // Обработка фильтров
    if (filters) {
      if (filters.department && filters.department !== "All") {
        params.department = filters.department;
      }
      if (filters.minSalary !== undefined) params.salary_gte = filters.minSalary;
      if (filters.maxSalary !== undefined) params.salary_lte = filters.maxSalary;

      if (filters.minAge !== undefined) {
        params.birthDate_lte = getLimitDate(filters.minAge);
      }
      if (filters.maxAge !== undefined) {
        params.birthDate_gte = getLimitDate(filters.maxAge);
      }
    }

    // Обработка сортировки для json-server
    // Если в сторе есть ключ и направление не null
    if (sort?.key && sort?.order) {
      params._sort = sort.key;
      params._order = sort.order;
    }

    const { data } = await api.get<Employee[]>(ENDPOINTS.EMPLOYEES, { 
      ...config, 
      params 
    });
    
    return data;
  }

  async addEmployee(e: NewEmployee): Promise<Employee> {
    const { data } = await api.post<Employee>(ENDPOINTS.EMPLOYEES, e);
    return data;
  }

  async deleteEmployee(id: string): Promise<void> {
    await api.delete(`${ENDPOINTS.EMPLOYEES}/${id}`);
  }

  async updateEmployee({ id, fields }: EmployeeUpdater): Promise<Employee> {
    const { data } = await api.patch<Employee>(`${ENDPOINTS.EMPLOYEES}/${id}`, fields);
    return data;
  }
}

const apiClient: ApiClient = new ApiClientJsonServer();
export default apiClient;