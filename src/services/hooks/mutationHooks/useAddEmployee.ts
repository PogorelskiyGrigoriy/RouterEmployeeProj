import type { Employee, NewEmployee } from "@/models/Employee"; 
import apiClient from "@/services/ApiClientImplementation";
import useEmployeesMutation from "./useEmployeesMutation";

export const useAddEmployee = () => {
  // Вход: NewEmployee (без id), Выход: Employee (с id от сервера)
  return useEmployeesMutation<NewEmployee, Employee>(
    (newEmp) => apiClient.addEmployee(newEmp)
  );
};