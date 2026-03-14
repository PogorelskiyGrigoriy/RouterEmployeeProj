import { api } from "@/api/axiosInstance";
import type { AxiosRequestConfig } from "axios";
import { ZodError } from "zod";

import { 
  employeeSchema, 
  type Employee, 
  type NewEmployee, 
  type EmployeeUpdatePayload 
} from "@/schemas/employee.schema";
import type { EmployeeFilter } from "@/schemas/employee.schema";

import type { SortState } from "@/store/sort-store";
import { getLimitDate } from "@/utils/dateUtils";
import { formatZodErrorToString } from "@/utils/errorHelpers";
import { toaster } from "@/components/ui/toaster-config";

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
    filters?: EmployeeFilter, 
    sort?: SortState, 
    config?: AxiosRequestConfig
  ): Promise<Employee[]> {
    const params = this.buildParams(filters, sort, config?.params);

    const { data } = await api.get<unknown[]>(ENDPOINTS.EMPLOYEES, { 
      ...config, 
      params 
    });

    let corruptionCount = 0;

    const validatedData = data.reduce<Employee[]>((acc, item) => {
      const result = employeeSchema.safeParse(item);
      if (result.success) {
        acc.push(result.data);
      } else {
        corruptionCount++;
        console.error("[API Data Corruption]: Skipping invalid employee record", {
          id: (item as any)?.id,
          errors: result.error.format()
        });
      }
      return acc;
    }, []);

    // Если нашли битые данные, уведомляем пользователя один раз
    if (corruptionCount > 0) {
      toaster.create({
        title: "Data Integrity Notice",
        description: `Skipped ${corruptionCount} corrupted records. Contact support if this persists.`,
        type: "warning",
      });
    }
    
    return validatedData;
  }

  /**
   * Creates a new employee with "Strict Validation".
   * Throws and toasts an error if the server response doesn't match our schema.
   */
  async addEmployee(employee: NewEmployee): Promise<Employee> {
    try {
      const { data } = await api.post<unknown>(ENDPOINTS.EMPLOYEES, employee);
      return employeeSchema.parse(data);
    } catch (error) {
      this.handleZodError(error, "Failed to create employee due to data mismatch");
      throw error;
    }
  }

  /**
   * Deletes an employee record. No validation needed for empty response.
   */
  async deleteEmployee(id: string): Promise<void> {
    await api.delete(`${ENDPOINTS.EMPLOYEES}/${id}`);
  }

  /**
   * Updates an employee with "Strict Validation".
   */
  async updateEmployee({ id, changes }: EmployeeUpdatePayload): Promise<Employee> {
    try {
      const { data } = await api.patch<unknown>(`${ENDPOINTS.EMPLOYEES}/${id}`, changes);
      return employeeSchema.parse(data);
    } catch (error) {
      this.handleZodError(error, "Server returned invalid data after update");
      throw error;
    }
  }

  /**
   * Private helper to format and toast Zod errors centrally.
   */
  private handleZodError(error: unknown, contextMessage: string) {
    if (error instanceof ZodError) {
      const details = formatZodErrorToString(error);
      toaster.create({
        title: "Validation Error",
        description: `${contextMessage}: ${details}`,
        type: "error",
      });
    }
  }

  /**
   * Transforms UI filter/sort state into JSON-Server query parameters.
   */
  private buildParams(
    filters?: EmployeeFilter,
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