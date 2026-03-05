// useDeleteEmployee.ts
import apiClient from "@/services/ApiClientImplementation";
import useEmployeesMutation from "./useEmployeesMutation";

export const useDeleteEmployee = () => {
  // Передаем ID (string), получаем ничего (void)
  return useEmployeesMutation<string, void>(
    (id) => apiClient.deleteEmployee(id)
  );
};