/**
 * @module ProtectedRoute
 * Route guard that handles authentication and role-based authorization.
 */

import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { ROUTES } from "@/config/navigation";
import type { UserRole } from "@/schemas/auth.schema";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

/**
 * Higher-Order Component to protect private routes.
 * Redirects to LOGIN if not authenticated.
 * Redirects to HOME if user lacks required roles.
 */
export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();
  
  // 1. Optimized Selectors (re-renders only on specific field changes)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  // 2. Auth Check: If not logged in, go to Login page
  if (!isAuthenticated) {
    return (
      <Navigate 
        to={ROUTES.LOGIN} 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // 3. Robustness Check: If auth is true but user object is missing
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // 4. Role Check: Compare user role with allowed roles
  const hasAccess = !allowedRoles || allowedRoles.includes(user.role);

  if (!hasAccess) {
    // Optional: could redirect to an "Unauthorized" 403 page
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
};