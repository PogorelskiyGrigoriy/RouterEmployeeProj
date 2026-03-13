import { api } from "@/api/axiosInstance";
import type { AxiosRequestConfig } from "axios";

import { 
  employeeSchema, 
  type Employee, 
  type NewEmployee, 
  type EmployeeUpdatePayload 
} from "@/schemas/employee.schema";
import type { EmployeeFilters } from "@/schemas/filter.schema";

import type { SortState } from "@/store/sort-store";
import { getLimitDate } from "@/utils/dateUtils";

import type { ApiClient } from "./ApiClient";

const ENDPOINTS = {
  EMPLOYEES: "/employees",
} as const;

/**
 * JSON-Server implementation of the ApiClient with Zod validation.
 */
class ApiClientJsonServer implements ApiClient {
  
  /**
   * Fetches employees and performs "Soft Validation".
   * Filters out corrupted items instead of failing the whole request.
   */
  async getEmployees(
    filters?: EmployeeFilters, 
    sort?: SortState, 
    config?: AxiosRequestConfig
  ): Promise<Employee[]> {
    const params = this.buildParams(filters, sort, config?.params);

    const { data } = await api.get<unknown[]>(ENDPOINTS.EMPLOYEES, { 
      ...config, 
      params 
    });

    // Validating each item separately to prevent one bad record from breaking the UI
    const validatedData = data.reduce<Employee[]>((acc, item) => {
      const result = employeeSchema.safeParse(item);
      if (result.success) {
        acc.push(result.data);
      } else {
        console.error("[API Data Corruption]: Skipping invalid employee record", {
          id: (item as any)?.id,
          errors: result.error.format()
        });
      }
      return acc;
    }, []);
    
    return validatedData;
  }

  /**
   * Creates a new employee with "Strict Validation".
   * Throws an error if the server response doesn't match our schema.
   */
  async addEmployee(employee: NewEmployee): Promise<Employee> {
    const { data } = await api.post<unknown>(ENDPOINTS.EMPLOYEES, employee);
    return employeeSchema.parse(data);
  }

  /**
   * Deletes an employee record. No validation needed for empty response.
   */
  async deleteEmployee(id: string): Promise<void> {
    await api.delete(`${ENDPOINTS.EMPLOYEES}/${id}`);
  }

  /**
   * Updates an employee with "Strict Validation".
   * Ensures the patched data returned by the server is valid.
   */
  async updateEmployee({ id, changes }: EmployeeUpdatePayload): Promise<Employee> {
    const { data } = await api.patch<unknown>(`${ENDPOINTS.EMPLOYEES}/${id}`, changes);
    return employeeSchema.parse(data);
  }

  /**
   * Transforms UI filter/sort state into JSON-Server query parameters.
   */
  private buildParams(
    filters?: EmployeeFilters, 
    sort?: SortState, 
    baseParams?: Record<string, any>
  ): Record<string, any> {
    const params: Record<string, any> = { ...baseParams };

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

    if (sort?.key && sort?.order) {
      params._sort = sort.key;
      params._order = sort.order;
    }

    return params;
  }
}

export const apiClient: ApiClient = new ApiClientJsonServer();