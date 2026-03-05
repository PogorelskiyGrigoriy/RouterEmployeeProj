// useEmployeesMutation.ts
import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";

export default function useEmployeesMutation<T, R>(
  mutateFn: (variables: T) => Promise<R>,
  // Добавляем возможность передать свою логику успеха
  customOnSuccess?: (data: R, variables: T) => void 
): UseMutationResult<R, Error, T> {
  const client = useQueryClient();

  return useMutation({
    mutationFn: mutateFn,
    onSuccess: (data, variables) => {
      // 1. Если передана своя логика — выполняем её
      if (customOnSuccess) {
        customOnSuccess(data, variables);
      } else {
        // 2. Иначе — стандартный безопасный сброс кэша
        client.invalidateQueries({ queryKey: ["employees"] });
      }
    },
    onError: (error) => {
      console.error("Mutation failed:", error.message);
    }
  });
}