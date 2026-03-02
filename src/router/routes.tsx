import AgeStatisticsPage from "@/components/pages/AgeStatisticsPage";
import DepartmentStatisticPage from "@/components/pages/DepartmentStatisticPage";
import HomePage from "@/components/pages/HomePage";
import SalaryStatisticsPage from "@/components/pages/SalaryStatisticsPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {path: "/", element: <HomePage />},
    {path: "/statistics/age", element: <AgeStatisticsPage />},
    {path: "/statistics/salary", element: <SalaryStatisticsPage />},
    {path: "/statistics/department", element: <DepartmentStatisticPage />},
]);

export default router;