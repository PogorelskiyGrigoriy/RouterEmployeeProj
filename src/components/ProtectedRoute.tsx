// src\components\ProtectedRoute.tsx

import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

interface Props {
  children: React.ReactNode;
  allowedRoles?: string[]; // Список ролей, которым разрешен вход
}

export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Редирект на логин, но запоминаем, откуда пришел юзер
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Если роль не подходит — отправляем на главную (или страницу 403)
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};