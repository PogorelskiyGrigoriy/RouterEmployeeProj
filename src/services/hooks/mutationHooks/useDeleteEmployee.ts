// src/services/hooks/mutationHooks/useDeleteEmployee.ts
import { useQueryClient } from "@tanstack/react-query";
import apiClient from "@/services/ApiClientImplementation";
import useEmployeesMutation from "./useEmployeesMutation";
import { toaster } from "@/components/ui/toaster-config";

export const useDeleteEmployee = () => {
  const client = useQueryClient();

  return useEmployeesMutation<string, void>(
    (id) => apiClient.deleteEmployee(id),
    // Передаем кастомную логику успеха
    (_, _id) => {
      // 1. Инвалидируем ВСЕ запросы, которые начинаются с "employees"
      // Это надежнее, чем ручное обновление кэша, когда есть фильтры и сортировка
      client.invalidateQueries({ 
        queryKey: ["employees"],
        exact: false 
      });

      // 2. Показываем уведомление пользователю
      toaster.create({
        title: "Сотрудник удален",
        description: `Запись успешно удалена из системы`,
        type: "success",
      });
    }
  );
};