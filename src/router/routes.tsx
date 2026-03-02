import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/config/navigation"; // Импорт конфига
import LayoutPage from "@/components/pages/LayoutPage";
import HomePage from "@/components/pages/HomePage";
import AgeStatisticsPage from "@/components/pages/AgeStatisticsPage";
import SalaryStatisticsPage from "@/components/pages/SalaryStatisticsPage";
import DepartmentStatisticPage from "@/components/pages/DepartmentStatisticPage";
import AddEmployeePage from "@/components/pages/AddEmployeePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      { path: "", element: <HomePage /> },
      { path: ROUTES.STATS_AGE, element: <AgeStatisticsPage /> },
      { path: ROUTES.STATS_SALARY, element: <SalaryStatisticsPage /> },
      { path: ROUTES.STATS_DEPT, element: <DepartmentStatisticPage /> },
      { path: ROUTES.ADD_EMPLOYEE, element: <AddEmployeePage /> },
    ],
  },
]);

export default router;