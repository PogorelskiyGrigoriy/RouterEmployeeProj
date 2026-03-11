/**
 * @module Router
 * Central routing configuration with nested layouts and role-based protection.
 */

import { createBrowserRouter } from "react-router-dom";

import { ROUTES } from "@/config/navigation";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Pages
import LayoutPage from "@/pages/LayoutPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import AddEmployeePage from "@/pages/AddEmployeePage";
import AgeStatisticsPage from "@/pages/AgeStatisticsPage";
import SalaryStatisticsPage from "@/pages/SalaryStatisticsPage";
import DepartmentStatisticPage from "@/pages/DepartmentStatisticPage";



/**
 * Application router instance.
 * Defines public and private sectors of the app.
 */
export const appRouter = createBrowserRouter([
  {
    // Public Route
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    // Protected Sector (All children require authentication)
    path: "/",
    element: (
      <ProtectedRoute>
        <LayoutPage />
      </ProtectedRoute>
    ),
    children: [
      { 
        index: true, 
        element: <HomePage /> 
      },
      { 
        path: ROUTES.ADD_EMPLOYEE, 
        element: (
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AddEmployeePage />
          </ProtectedRoute>
        ) 
      },
      { 
        path: ROUTES.STATS_AGE, 
        element: <AgeStatisticsPage /> 
      },
      { 
        path: ROUTES.STATS_SALARY, 
        element: <SalaryStatisticsPage /> 
      },
      { 
        path: ROUTES.STATS_DEPT, 
        element: <DepartmentStatisticPage /> 
      },
    ],
  },
]);