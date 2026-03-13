/**
 * @module useAnalytics
 * Derives chart-ready data from Zod-validated employee records.
 */

import { useMemo } from "react";
import { useEmployees } from "./useEmployees";
import { EMPLOYEES_CONFIG } from "@/config/employees-config";
import { getBinnedData } from "@/utils/statistics-helpers";
import { calculateAge } from "@/utils/dateUtils";
import { countBy } from "lodash";
import type { StatsDataItem } from "@/schemas/statsInterface.schema";
import type { Employee } from "@/schemas/employee.schema";

export const useAnalytics = (type: 'age' | 'salary' | 'department'): StatsDataItem[] => {
  const { employees } = useEmployees();

  return useMemo(() => {
    // If no employees (loading or filtered out), return empty array for the charts
    if (!employees || employees.length === 0) return [];

    switch (type) {
      case 'salary': {
        const config = EMPLOYEES_CONFIG.salary;
        /**
         * Explicitly typing <Employee> ensures 'e.salary' is recognized by TS
         */
        return getBinnedData<Employee>(employees, config, (e) => e.salary, {
          xKey: (v) => `${v / 1000}${config.unit}`,
          tooltip: (v, isLast) => {
            const end = isLast ? config.max : v + config.interval - 1;
            return `${config.currency}${v.toLocaleString()} — ${config.currency}${end.toLocaleString()}`;
          }
        });
      }

      case 'age': {
        const config = EMPLOYEES_CONFIG.age;
        return getBinnedData<Employee>(
          employees, 
          config, 
          (e) => calculateAge(e.birthDate), 
          {
            xKey: (v) => {
              const isLast = v + config.interval >= config.max;
              const endValue = isLast ? config.max : v + config.interval - 1;
              return `${v}-${endValue}`;
            },
            tooltip: (v, isLast) => {
              const endValue = isLast ? config.max : v + config.interval - 1;
              return `Age: ${v} — ${endValue}`;
            }
          }
        );
      }

      case 'department': {
        const stats = countBy(employees, 'department');
        return EMPLOYEES_CONFIG.departments.map(dept => ({
          xValue: dept,
          yValue: stats[dept] || 0,
          tooltipValue: `Department: ${dept} (${stats[dept] || 0} employees)`
        }));
      }

      default:
        return [];
    }
  }, [employees, type]);
};