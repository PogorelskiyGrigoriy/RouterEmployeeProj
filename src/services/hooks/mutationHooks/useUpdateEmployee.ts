import type { Employee } from "@/models/Employee";
import type { EmployeeUpdater } from "@/models/EmployeeUpdater";
import apiClient from "@/services/ApiClientImplementation";
import useEmployeesMutation from "./useEmployeesMutation";

export const useUpdateEmployee = () => {
  return useEmployeesMutation<EmployeeUpdater, Employee>(
    (updater) => apiClient.updateEmployee(updater)
  );
};