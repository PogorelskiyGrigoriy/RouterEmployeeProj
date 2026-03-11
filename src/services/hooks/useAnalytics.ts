/**
 * @module useAnalytics
 * Derives chart-ready data from the raw employee list.
 */

import { useMemo } from "react";
import { useEmployees } from "./useEmployees";
import { EMPLOYEES_CONFIG } from "@/config/employees-config";
import { getBinnedData } from "@/utils/statistics-helpers";
import { calculateAge } from "@/utils/dateUtils";
import { countBy } from "lodash";
import type { StatsDataItem } from "@/models/StatsInterface";

/**
 * Hook to transform employee data into various analytical formats.
 * @param type - The dimension for analysis (age, salary, or department).
 */
export const useAnalytics = (type: 'age' | 'salary' | 'department'): StatsDataItem[] => {
  const { employees } = useEmployees();

  return useMemo(() => {
    if (!employees?.length) return [];

    switch (type) {
      case 'salary': {
        const config = EMPLOYEES_CONFIG.salary;
        return getBinnedData(employees, config, (e) => e.salary, {
          xKey: (v) => `${v / 1000}${config.unit}`,
          tooltip: (v, isLast) => {
            const end = isLast ? config.max : v + config.interval - 1;
            return `${config.currency}${v.toLocaleString()} — ${config.currency}${end.toLocaleString()}`;
          }
        });
      }

      case 'age': {
        const config = EMPLOYEES_CONFIG.age;
        return getBinnedData(
          employees, 
          config, 
          (e) => calculateAge(e.birthDate), // Используем нашу утилиту
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

      default: return [];
    }
  }, [employees, type]);
};