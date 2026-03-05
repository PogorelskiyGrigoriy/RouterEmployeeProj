//employees-config.ts

import type { Department } from "@/models/Departments";
import type { GroupingConfig } from "@/models/GroupingConfig";
import { DEPARTMENTS } from "@/models/Departments";

interface EmployeesConfig {
  salary: GroupingConfig;
  age: GroupingConfig;
  departments: Department[]; 
}

const employeesConfig: EmployeesConfig = {
  salary: {
    min: 5000,
    max: 50000,
    interval: 5000,
    unit: 'k',
    currency: '$',
    label: 'Salary'
  },
  age: {
    min: 20,
    max: 65,
    interval: 5,
    label: 'Age'
  },
  departments: DEPARTMENTS,
};

export default employeesConfig;