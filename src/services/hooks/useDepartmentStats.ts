// useDepartmentStats.ts
import { useMemo } from "react";
import { groupBy, meanBy } from "lodash";
import useEmployees from "./useEmployees";
import employeesConfig from "@/config/employees-config";
import type { DepartmentInfo } from "@/models/DepartmentInfo";
import { calculateAge } from "@/utils/dateUtils"; // Импорт утилиты

export const useDepartmentStats = () => {
  const { employees, isLoading } = useEmployees();

  const departmentsInfo = useMemo(() => {
    if (!employees.length) return [];

    const grouped = groupBy(employees, 'department');

    return employeesConfig.departments.map((dept): DepartmentInfo => {
      const deptEmployees = grouped[dept] || [];
      const num = deptEmployees.length;

      return {
        department: dept,
        numEmployees: num,
        avgSalary: num > 0 ? Math.round(meanBy(deptEmployees, 'salary')) : 0,
        avgAge: num > 0 
          ? Math.round(meanBy(deptEmployees, e => calculateAge(e.birthDate)))
          : 0
      };
    });
  }, [employees]);

  return { departmentsInfo, isLoading };
};