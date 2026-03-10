import apiClient from "@/services/ApiClientImplementation";
import useEmployeesMutation from "./useEmployeesMutation";
import { toaster } from "@/components/ui/toaster-config";

export const useDeleteEmployee = () => {
  return useEmployeesMutation<string, void>(
    (id) => apiClient.deleteEmployee(id),
    {
      onSuccess: () => {
        toaster.create({
          title: "Сотрудник удален",
          description: `Запись успешно удалена из системы`,
          type: "success",
        });
      }
    }
  );
};