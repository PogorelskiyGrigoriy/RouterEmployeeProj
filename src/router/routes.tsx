//routes.tsx

import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/config/navigation";
import LayoutPage from "@/pages/LayoutPage";
import HomePage from "@/pages/HomePage";
import AddEmployeePage from "@/pages/AddEmployeePage";
import AgeStatisticsPage from "@/pages/AgeStatisticsPage";
import SalaryStatisticsPage from "@/pages/SalaryStatisticsPage";
import DepartmentStatisticPage from "@/pages/DepartmentStatisticPage";

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