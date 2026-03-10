import { useMutation, useQueryClient, type UseMutationResult, type UseMutationOptions } from "@tanstack/react-query";

export default function useEmployeesMutation<T, R>(
  mutateFn: (variables: T) => Promise<R>,
  options?: UseMutationOptions<R, Error, T>
): UseMutationResult<R, Error, T> {
  const client = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: mutateFn,
    onSuccess: (...args) => {
      // выполняем обязательную логику (инвалидация)
      client.invalidateQueries({ queryKey: ["employees"] });

      options?.onSuccess?.(...args);
    },
    onError: (error) => {
      console.error("Mutation failed:", error.message);
    }
  });
}