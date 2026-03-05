// useDepartmentStats.ts

import { useMemo } from "react";
import { groupBy, meanBy } from "lodash";
import useEmployees from "./useEmployees";
import employeesConfig from "@/config/employees-config";
import type { DepartmentInfo } from "@/models/DepartmentInfo";

export const useDepartmentStats = () => {
  const { employees, isLoading } = useEmployees();

  const departmentsInfo = useMemo(() => {
    if (!employees.length) return [];

    const currentYear = new Date().getFullYear();
    const grouped = groupBy(employees, 'department');

    return employeesConfig.departments.map((dept): DepartmentInfo => {
      const deptEmployees = grouped[dept] || [];
      const num = deptEmployees.length;

      return {
        department: dept,
        numEmployees: num,
        avgSalary: Math.round(meanBy(deptEmployees, 'salary')),
        avgAge: Math.round(meanBy(deptEmployees, e =>
          currentYear - new Date(e.birthDate).getFullYear()
        ))
      };
    });
  }, [employees]);

  return { departmentsInfo, isLoading };
};