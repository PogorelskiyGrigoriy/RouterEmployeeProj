// src/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom'; // Добавили useLocation
import authService from '@/services/AuthServiceImplementation';
import { useAuthStore } from '@/store/useAuthStore';
import { ROUTES } from '@/config/navigation';
import type { LoginData, UserData } from '@/models/AuthData';

export const useLogin = () => {
  const setLogin = useAuthStore((state) => state.setLogin);
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation({
    mutationFn: (data: LoginData) => authService.login(data),
    onSuccess: (userData: UserData) => {
      setLogin(userData);
      
      // 1. Проверяем, есть ли в истории путь, с которого нас "выкинуло"
      // Если нет — отправляем на главную по умолчанию
      const from = location.state?.from?.pathname || ROUTES.HOME;
      
      navigate(from, { replace: true });
    },
  });
};