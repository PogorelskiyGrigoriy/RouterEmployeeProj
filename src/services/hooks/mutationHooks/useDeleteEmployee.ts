import type { Employee } from "@/models/Employee";
import apiClient from "@/services/ApiClientImplementation";
import useEmployeesMutation from "./useEmployeesMutation";

export const useDeleteEmployee = () => {
  return useEmployeesMutation<string, Employee>(
    (id) => apiClient.deleteEmployee(id)
  );
};