import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/config/navigation";

// Импорт страниц
import LayoutPage from "@/components/pages/LayoutPage";
import HomePage from "@/components/pages/HomePage";
import AddEmployeePage from "@/components/pages/AddEmployeePage";
import StatisticsPage from "@/components/pages/StaticticsPage";
import AgeStatisticsPage from "@/components/pages/AgeStatisticsPage";
import SalaryStatisticsPage from "@/components/pages/SalaryStatisticsPage";
import DepartmentStatisticPage from "@/components/pages/DepartmentStatisticPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.ADD_EMPLOYEE,
        element: <AddEmployeePage />,
      },
      // Раздел статистики (Группа)
      {
        path: ROUTES.STATS_BASE,
        element: <StatisticsPage />,
        children: [
          {
            path: "age",
            element: <AgeStatisticsPage />,
          },
          {
            path: "salary",
            element: <SalaryStatisticsPage />,
          },
          {
            path: "department",
            element: <DepartmentStatisticPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
