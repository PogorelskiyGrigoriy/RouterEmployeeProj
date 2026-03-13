import { useMutation, useQueryClient, type UseMutationResult, type UseMutationOptions } from "@tanstack/react-query";
import { ZodError } from "zod";

/**
 * Higher-order hook that wraps TanStack Query mutations for employee-related operations.
 * Automatically handles cache invalidation and provides detailed error logging.
 */
export const useEmployeesMutation = <T, R>(
  mutateFn: (variables: T) => Promise<R>,
  options?: UseMutationOptions<R, Error, T>
): UseMutationResult<R, Error, T> => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options, // Spread incoming options to allow component-level overrides
    mutationFn: mutateFn,
    
    /**
     * Cache Sync: Ensures the 'employees' list is marked as stale 
     * regardless of mutation success or failure.
     */
    onSettled: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      options?.onSettled?.(...args); // Proxy arguments to preserve original functionality
    },

    /**
     * Error Interception: Differentiates between Zod validation failures 
     * and standard network/server exceptions.
     */
    onError: (...args) => {
      const error = args[0]; // Access the error object from arguments

      if (error instanceof ZodError) {
        // Zod 4 recommended way: uses .issues for a clean, non-deprecated error array
        console.error("[Schema Validation Error]:", {
          message: "Server response mismatch",
          details: error.issues 
        });
      } else {
        // Fallback for network timeouts, 404s, or 500s
        console.error(`[Network/Server Error]: ${error.message}`);
      }
      
      // Pass the error to the component's UI-level error handlers
      options?.onError?.(...args);
    },
  });
};