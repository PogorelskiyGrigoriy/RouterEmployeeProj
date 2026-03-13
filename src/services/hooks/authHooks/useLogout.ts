/**
 * @module useLogout
 * Custom mutation hook to handle secure user sign-out and data cleanup.
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/AuthServiceImplementation';
import { useAuthStore } from '@/store/useAuthStore';
import { ROUTES } from '@/config/navigation';
import { toaster } from "@/components/ui/toaster-config";

/**
 * Handles the logout lifecycle: API call, state reset, cache invalidation, and redirection.
 */
export const useLogout = () => {
  const setLogout = useAuthStore((state) => state.setLogout);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    /**
     * Triggers the logout process in the auth service.
     */
    mutationFn: () => authService.logout(),
    
    /**
     * Executes cleanup logic regardless of the mutation result (success or error).
     * This ensures the user is never stuck in an authenticated state locally.
     */
    onSettled: () => {
      // 1. Clear global authentication state (Zustand + LocalStorage)
      setLogout();
      
      /** * 2. Wipe TanStack Query Cache. 
       * Prevents sensitive data from previous sessions from leaking to the next user.
       */
      queryClient.clear();
      
      // 3. User feedback and secure redirection
      toaster.create({
        title: "Signed out",
        description: "You have been successfully logged out",
        type: "info",
      });
      
      // Redirect to login page and clear history stack to prevent 'back' button access
      navigate(ROUTES.LOGIN, { replace: true });
    }
  });
};