import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/config/navigation";
import LayoutPage from "@/components/pages/LayoutPage";
import HomePage from "@/components/pages/HomePage";
import AddEmployeePage from "@/components/pages/AddEmployeePage";
import AgeStatisticsPage from "@/components/pages/AgeStatisticsPage";
import SalaryStatisticsPage from "@/components/pages/SalaryStatisticsPage";
import DepartmentStatisticPage from "@/components/pages/DepartmentStatisticPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.ADD_EMPLOYEE, element: <AddEmployeePage /> },
      { path: ROUTES.STATS_AGE, element: <AgeStatisticsPage /> },
      { path: ROUTES.STATS_SALARY, element: <SalaryStatisticsPage /> },
      { path: ROUTES.STATS_DEPT, element: <DepartmentStatisticPage /> },
    ],
  },
]);

export default router;