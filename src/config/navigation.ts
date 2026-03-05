// src/config/navigation.ts

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login", // Добавили маршрут для логина
  ADD_EMPLOYEE: "/add-employee",
  STATS_AGE: "/statistics/age",
  STATS_SALARY: "/statistics/salary",
  STATS_DEPT: "/statistics/department",
} as const;

export interface NavItemConfig {
  to: string;
  label: string;
  roles: string[]; // Массив ролей, которым разрешен этот пункт
}

// Ссылки, которые будут видны сразу в Navbar
export const MAIN_NAV_LINKS: NavItemConfig[] = [
  { 
    to: ROUTES.HOME, 
    label: "Home", 
    roles: ["USER", "ADMIN"] 
  },
  { 
    to: ROUTES.ADD_EMPLOYEE, 
    label: "Add Employee", 
    roles: ["ADMIN"] // Видит только админ
  },
];

// Ссылки для выпадающего списка (Статистика)
// Обычно статистика доступна всем авторизованным пользователям
export const STATS_NAV_LINKS: NavItemConfig[] = [
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