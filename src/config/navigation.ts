export const ROUTES = {
  HOME: "/",
  ADD_EMPLOYEE: "/add-employee",
  STATS_BASE: "/statistics",
  STATS_AGE: "/statistics/age",
  STATS_SALARY: "/statistics/salary",
  STATS_DEPT: "/statistics/department",
} as const;

export interface NavItemConfig {
  to: string;
  label: string;
}

// Только основные пункты для верхнего NavBar
export const MAIN_NAV_LINKS: NavItemConfig[] = [
  { to: ROUTES.HOME, label: "Home" },
  { to: ROUTES.ADD_EMPLOYEE, label: "Add Employee" },
  { to: ROUTES.STATS_BASE, label: "Statistics" }, // Ссылка на родительский раздел
];

// Подпункты только для страницы статистики
export const STATS_NAV_LINKS: NavItemConfig[] = [
  { to: ROUTES.STATS_AGE, label: "Age" },
  { to: ROUTES.STATS_SALARY, label: "Salary" },
  { to: ROUTES.STATS_DEPT, label: "Department" },
];
