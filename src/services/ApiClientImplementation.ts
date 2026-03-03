import api from "@/api/axiosInstance";
import type { AxiosRequestConfig } from "axios";
import type { ApiClient } from "./ApiClient";
import type { Employee } from "@/models/Employee";
import type { EmployeeUpdater } from "@/models/EmployeeUpdater";

class ApiClientJsonServer implements ApiClient {
    async getEmployees(config?: AxiosRequestConfig): Promise<Employee[]> {
        // Используем api вместо axiosInstance
        const response = await api.get<Employee[]>("/employees", config);
        return response.data;
    }

    async addEmployee(e: Employee): Promise<Employee> {
        const response = await api.post<Employee>("/employees", e);
        return response.data;
    }

    async deleteEmployee(id: string): Promise<Employee> {
        const response = await api.delete<Employee>(`/employees/${id}`);
        return response.data;
    }

    async updateEmployee(updater: EmployeeUpdater): Promise<Employee> {
        const { id, fields } = updater;
        // PATCH — самый правильный метод для твоего EmployeeUpdater
        const response = await api.patch<Employee>(`/employees/${id}`, fields);
        return response.data;
    }
}

const apiClient: ApiClient = new ApiClientJsonServer();
export default apiClient;