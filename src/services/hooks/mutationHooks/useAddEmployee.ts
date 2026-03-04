import type { Employee } from "@/models/Employee";
import apiClient from "@/services/ApiClientImplementation";
import useEmployeesMutation from "./useEmployeesMutation";

export const useAddEmployee = () => {
  return useEmployeesMutation<Employee, Employee>(
    (newEmp) => apiClient.addEmployee(newEmp)
  );
};