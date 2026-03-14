/**
 * @module ProtectedRoute
 * Route guard that handles authentication and role-based authorization.
 */

import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore, useIsAuthenticated } from "@/store/useAuthStore";
import { ROUTES } from "@/config/navigation";
import type { UserRole, UserData } from "@/schemas/auth.schema";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();
  
  const user = useAuthStore((state) => state.user as UserData | null);

  if (!isAuthenticated) {
    return (
      <Navigate 
        to={ROUTES.LOGIN} 
        state={{ from: location }} 
        replace 
      />
    );
  }

  const hasAccess = !allowedRoles || (user && allowedRoles.includes(user.role));

  if (!hasAccess) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
};