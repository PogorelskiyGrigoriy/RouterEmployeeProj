import type { Employee, EmployeeUpdater } from "@/models/Employee"; // Импорт из одного файла
import apiClient from "@/services/ApiClientImplementation";
import useEmployeesMutation from "./useEmployeesMutation";

export const useUpdateEmployee = () => {
  return useEmployeesMutation<EmployeeUpdater, Employee>(
    (updater) => apiClient.updateEmployee(updater)
  );
};