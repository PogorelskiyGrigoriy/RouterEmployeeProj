/**
 * @module useLogout
 * Mutation hook to handle secure user sign-out.
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/AuthServiceImplementation';
import { useAuthStore } from '@/store/useAuthStore';
import { ROUTES } from '@/config/navigation';
import { toaster } from "@/components/ui/toaster-config";

/**
 * Performs logout by clearing local state, cache, and redirecting to login.
 */
export const useLogout = () => {
  const setLogout = useAuthStore((state) => state.setLogout);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    
    // Используем onSettled, чтобы сбросить стейт даже если запрос к API упал
    onSettled: () => {
      // 1. Clear Zustand Store (LocalStorage)
      setLogout();
      
      // 2. Wipe TanStack Query Cache
      queryClient.clear();
      
      // 3. Inform and Redirect
      toaster.create({
        title: "Signed out",
        description: "You have been successfully logged out",
        type: "info",
      });
      
      navigate(ROUTES.LOGIN, { replace: true });
    }
  });
};