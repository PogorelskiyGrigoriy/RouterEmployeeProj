/**
 * @module useLogin
 * Mutation hook for user authentication process.
 */

import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '@/services/AuthServiceImplementation';
import { useAuthStore } from '@/store/useAuthStore';
import { ROUTES } from '@/config/navigation';
import type { LoginData, UserData } from '@/schemas/auth.schema';
import { toaster } from "@/components/ui/toaster-config";

/**
 * Hook to handle login logic, state updates, and navigation.
 */
export const useLogin = () => {
  const setLogin = useAuthStore((state) => state.setLogin);
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation({
    mutationFn: (data: LoginData) => authService.login(data),
    
    onSuccess: (userData: UserData) => {
      // 1. Update Global State
      setLogin(userData);
      
      // 2. Notify User
      toaster.create({
        title: "Success",
        description: `Welcome back, ${userData.username}!`,
        type: "success",
      });
      
      // 3. Smart Redirect
      // If user was kicked out from a private route, return them there.
      const from = location.state?.from?.pathname || ROUTES.HOME;
      navigate(from, { replace: true });
    },

    onError: (error: Error) => {
      // 4. Global Error Handling
      toaster.create({
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
        type: "error",
      });
    }
  });
};