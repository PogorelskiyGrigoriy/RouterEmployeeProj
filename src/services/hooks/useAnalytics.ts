//useAnalytics.ts

import { useMemo } from "react";
import useEmployees from "./useEmployees";
import employeesConfig from "@/config/employees-config";
import { getBinnedData } from "@/utils/statistics-helpers";
import { countBy } from "lodash";
import type { StatsDataItem } from "@/models/StatsInterface";

export const useAnalytics = (type: 'age' | 'salary' | 'department'): StatsDataItem[] => {
  const { employees } = useEmployees();
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return useMemo(() => {
    if (!employees?.length) return [];

    switch (type) {
      case 'salary': {
        const config = employeesConfig.salary;
        return getBinnedData(employees, config, (e) => e.salary, {
          xKey: (v) => `${v / 1000}${config.unit}`,
          tooltip: (v, isLast) => {
            const end = isLast ? config.max : v + config.interval - 1;
            return `${config.currency}${v.toLocaleString()} — ${config.currency}${end.toLocaleString()}`;
          }
        });
      }

      case 'age': {
        const config = employeesConfig.age;
        return getBinnedData(
          employees, 
          config, 
          (e) => currentYear - new Date(e.birthDate).getFullYear(), 
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
        // Используем строгое приведение типа из конфига
        const stats = countBy(employees, 'department');
        return employeesConfig.departments.map(dept => ({
          xValue: dept,
          yValue: stats[dept] || 0,
          tooltipValue: `Department: ${dept} (${stats[dept] || 0} employees)`
        }));
      }

      default: return [];
    }
  }, [employees, type, currentYear]);
};