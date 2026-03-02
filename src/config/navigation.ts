export const ROUTES = {
  HOME: "/",
  ADD_EMPLOYEE: "/add-employee",
  // Базовый путь для раздела статистики
  STATS_BASE: "/statistics",
  // Вложенные пути (полные адреса для ссылок в меню)
  STATS_AGE: "/statistics/age",
  STATS_SALARY: "/statistics/salary",
  STATS_DEPT: "/statistics/department",
} as const;

export interface NavItemConfig {
  to: string;
  label: string;
}

export const NAV_LINKS: NavItemConfig[] = [
  { to: ROUTES.HOME, label: "Home" },
  { to: ROUTES.ADD_EMPLOYEE, label: "Add Employee" },
  { to: ROUTES.STATS_AGE, label: "Age Stats" },
  { to: ROUTES.STATS_SALARY, label: "Salary Stats" },
  { to: ROUTES.STATS_DEPT, label: "Dept Stats" },
];