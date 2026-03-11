/**
 * @module useEmployeesMutation
 * A generic wrapper for employee-related mutations that handles cache invalidation.
 */

import { useMutation, useQueryClient, type UseMutationResult, type UseMutationOptions } from "@tanstack/react-query";

/**
 * Higher-order mutation hook to ensure "employees" query key is always updated.
 */
export const useEmployeesMutation = <T, R>(
  mutateFn: (variables: T) => Promise<R>,
  options?: UseMutationOptions<R, Error, T>
): UseMutationResult<R, Error, T> => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: mutateFn,
    
    // Используем ...args, чтобы не зависеть от версии TanStack Query (v4 vs v5)
    onSettled: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      
      // Проксируем все аргументы дальше в оригинальный колбэк
      options?.onSettled?.(...args);
    },

    onError: (...args) => {
      // args[0] всегда является ошибкой в onError
      console.error(`[Mutation Error]: ${args[0].message}`);
      
      options?.onError?.(...args);
    },
  });
};