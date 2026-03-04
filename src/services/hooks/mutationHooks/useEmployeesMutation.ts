import { useMutation, useQueryClient,type UseMutationResult } from "@tanstack/react-query";

export default function useEmployeesMutation<T, R>(
  mutateFn: (variables: T) => Promise<R>
): UseMutationResult<R, Error, T> {
  const client = useQueryClient();

  return useMutation({
    mutationFn: mutateFn,
    onSuccess: () => {
      // Обновляем кеш, чтобы таблицы перерисовались
      client.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      console.error("Mutation failed:", error.message);
    }
  });
}