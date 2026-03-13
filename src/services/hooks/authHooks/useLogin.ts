import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '@/services/AuthServiceImplementation';
import { useAuthStore } from '@/store/useAuthStore';
import { ROUTES } from '@/config/navigation';
import type { LoginData, UserData } from '@/schemas/auth.schema';
import { toaster } from "@/components/ui/toaster-config";

/**
 * Custom hook to handle user authentication via TanStack Query mutation.
 * Manages side effects: updating the store, notifications, and navigation.
 */
export const useLogin = () => {
  // Extracting only the necessary action from the store
  const setLogin = useAuthStore((state) => state.setLogin);
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation({
    /**
     * Executes the login logic via the abstract auth service.
     */
    mutationFn: (data: LoginData) => authService.login(data),
    
    /**
     * On successful login:
     * 1. Updates global state.
     * 2. Shows a welcome notification.
     * 3. Redirects to the previous page or home.
     */
    onSuccess: (userData: UserData) => {
      setLogin(userData);
      
      toaster.create({
        title: "Success",
        description: `Welcome back, ${userData.username}!`,
        type: "success",
      });
      
      // Attempt to redirect to the protected route the user tried to access earlier
      const from = location.state?.from?.pathname || ROUTES.HOME;
      navigate(from, { replace: true });
    },

    /**
     * On login failure:
     * Triggers an error toast with the message returned by the service.
     */
    onError: (error: Error) => {
      toaster.create({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        type: "error",
      });
    }
  });
};