// Создаем константы путей, чтобы не писать строки вручную
export const ROUTES = {
  HOME: "/",
  STATS_AGE: "/statistics/age",
  STATS_SALARY: "/statistics/salary",
  STATS_DEPT: "/statistics/department",
  ADD_EMPLOYEE: "/add-employee",
} as const;

export interface NavItemConfig {
  to: string;
  label: string;
}

// Используем эти константы для меню
export const NAV_LINKS: NavItemConfig[] = [
  { to: ROUTES.HOME, label: "Home" },
  { to: ROUTES.STATS_AGE, label: "Age Stats" },
  { to: ROUTES.STATS_SALARY, label: "Salary Stats" },
  { to: ROUTES.STATS_DEPT, label: "Dept Stats" },
  { to: ROUTES.ADD_EMPLOYEE, label: "Add Employee" },
];