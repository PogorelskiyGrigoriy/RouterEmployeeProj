// useDeleteEmployee.ts
import { useQueryClient } from "@tanstack/react-query";
import type { Employee } from "@/models/Employee";
import apiClient from "@/services/ApiClientImplementation";
import useEmployeesMutation from "./useEmployeesMutation";

export const useDeleteEmployee = () => {
  const client = useQueryClient();

  return useEmployeesMutation<string, void>(
    (id) => apiClient.deleteEmployee(id),
    // Передаем кастомную логику обновления кэша
    (_, id) => {
      client.setQueryData(["employees"], (old: Employee[] | undefined) => 
        old ? old.filter(emp => emp.id !== id) : []
      );
      // Опционально: все равно делаем инвалидацию в фоне, но без индикатора загрузки
      client.invalidateQueries({ queryKey: ["employees"], refetchType: 'none' });
    }
  );
};