import axios, { AxiosError } from 'axios';
import { toaster } from "@/components/ui/toaster-config";
import { useAuthStore } from '@/store/useAuthStore';
import { appRouter } from '@/router/routes';
import { ROUTES } from '@/config/navigation';

export const api = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (axios.isCancel(error)) return Promise.reject(error);

    const status = error.response?.status;

    // СЛУЧАЙ А: Сессия истекла (401)
    if (status === 401) {
      // Вызываем действие стора напрямую через getState()
      useAuthStore.getState().setLogout();
      
      // Вызываем навигацию через объект роутера
      appRouter.navigate(ROUTES.LOGIN, { replace: true });

      toaster.create({
        title: "Session Expired",
        description: "Please log in again.",
        type: "error",
      });
      return Promise.reject(error);
    }

    // СЛУЧАЙ Б: Критическая ошибка сервера (500+)
    if (status && status >= 500) {
      // Мы просто пробрасываем ошибку дальше. 
      // Если запрос был сделан при загрузке страницы, 
      // React Router поймает её и покажет ErrorPage (errorElement).
      return Promise.reject(error);
    }

    // СЛУЧАЙ В: Обычные ошибки (404, 403, 400)
    const message = (error.response?.data as any)?.message || error.message;
    toaster.create({
      title: `Error ${status || 'Network'}`,
      description: message,
      type: "error",
    });

    return Promise.reject(error);
  }
);