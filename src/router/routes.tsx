import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/config/navigation";
import { ProtectedRoute } from "@/components/ProtectedRoute"; // Наш охранник
import LayoutPage from "@/pages/LayoutPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage"; // Добавили страницу логина
import AddEmployeePage from "@/pages/AddEmployeePage";
import AgeStatisticsPage from "@/pages/AgeStatisticsPage";
import SalaryStatisticsPage from "@/pages/SalaryStatisticsPage";
import DepartmentStatisticPage from "@/pages/DepartmentStatisticPage";

const router = createBrowserRouter([
  {
    // Публичный роут: доступен всегда
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      // Оборачиваем весь Layout: если юзер не залогинен, 
      // он не увидит ни одну внутреннюю страницу
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
          // Дополнительная проверка: только для ADMIN
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

export default router;