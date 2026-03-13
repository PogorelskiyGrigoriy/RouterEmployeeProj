/**
 * @module ProtectedRoute
 * Route guard that handles authentication and role-based authorization.
 */

import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore, useIsAuthenticated } from "@/store/useAuthStore";
import { ROUTES } from "@/config/navigation";
import type { UserRole } from "@/schemas/auth.schema";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

/**
 * Route Guard Component.
 * Ensures the user is logged in and has the required permissions.
 */
export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();
  
  /**
   * Accessing state via selectors for optimal performance.
   * isAuthenticated is now a derived boolean.
   */
  const isAuthenticated = useIsAuthenticated();
  const user = useAuthStore((state) => state.user);

  /**
   * AUTH CHECK:
   * If not logged in, redirect to LOGIN while preserving the current 
   * location in state to enable redirection back after sign-in.
   */
  if (!isAuthenticated) {
    return (
      <Navigate 
        to={ROUTES.LOGIN} 
        state={{ from: location }} 
        replace 
      />
    );
  }

  /**
   * ROLE CHECK (RBAC):
   * Compare user role with the allowedRoles array.
   * Access is granted if no roles are specified or if the user's role matches.
   */
  const hasAccess = !allowedRoles || (user && allowedRoles.includes(user.role));

  if (!hasAccess) {
    /**
     * If user is authenticated but lacks permission, redirect to HOME.
     * Could be enhanced with a specialized 'Access Denied' (403) page.
     */
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
};