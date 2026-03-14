/**
 * @module NavigationConfig
 * Defines application routes and role-based access for navigation links.
 */

import type { UserRole } from "@/schemas/auth.schema";

/**
 * Single source of truth for all application routes.
 */
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  ADD_EMPLOYEE: "/add-employee",
  STATS_AGE: "/statistics/age",
  STATS_SALARY: "/statistics/salary",
  STATS_DEPT: "/statistics/department",
} as const;

export interface NavItemConfig {
  readonly to: string;
  readonly label: string;
  readonly roles: readonly UserRole[]; 
}

/**
 * Primary links displayed directly in the Navbar.
 */
export const MAIN_NAV_LINKS: readonly NavItemConfig[] = [
  { 
    to: ROUTES.HOME, 
    label: "Home", 
    roles: ["USER", "ADMIN"] 
  },
  { 
    to: ROUTES.ADD_EMPLOYEE, 
    label: "Add Employee", 
    roles: ["ADMIN"] 
  },
];

/**
 * Secondary links grouped under the Statistics dropdown.
 */
export const STATS_NAV_LINKS: readonly NavItemConfig[] = [
  { 
    to: ROUTES.STATS_AGE, 
    label: "Age Stats", 
    roles: ["USER", "ADMIN"] 
  },
  { 
    to: ROUTES.STATS_SALARY, 
    label: "Salary Stats", 
    roles: ["USER", "ADMIN"] 
  },
  { 
    to: ROUTES.STATS_DEPT, 
    label: "Dept Stats", 
    roles: ["USER", "ADMIN"] 
  },
];