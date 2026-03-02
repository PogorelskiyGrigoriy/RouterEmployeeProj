export const ROUTES = {
  HOME: "/",
  ADD_EMPLOYEE: "/add-employee",
  STATS_AGE: "/statistics/age",
  STATS_SALARY: "/statistics/salary",
  STATS_DEPT: "/statistics/department",
} as const;

export interface NavItemConfig {
  to: string;
  label: string;
}

// Ссылки, которые будут видны сразу в Navbar
export const MAIN_NAV_LINKS: NavItemConfig[] = [
  { to: ROUTES.HOME, label: "Home" },
  { to: ROUTES.ADD_EMPLOYEE, label: "Add Employee" },
];

// Ссылки, которые спрячем в выпадающий список
export const STATS_NAV_LINKS: NavItemConfig[] = [
  { to: ROUTES.STATS_AGE, label: "Age Stats" },
  { to: ROUTES.STATS_SALARY, label: "Salary Stats" },
  { to: ROUTES.STATS_DEPT, label: "Dept Stats" },
];