import { useMemo } from "react"
import useEmployees from "./useEmployees"
import employeesConfig from "@/config/employees-config"
import { getBinnedData } from "@/utils/statistics-helpers"
import { countBy } from "lodash"
import type { StatsDataItem } from "@/models/StatsInterface"

export const useAnalytics = (type: 'age' | 'salary' | 'department'): StatsDataItem[] => {
  const { employees } = useEmployees()
  
  // Год не меняется, вычисляем один раз
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return useMemo(() => {
    if (!employees?.length) return []

    switch (type) {
      case 'salary': {
        const config = employeesConfig.salary
        return getBinnedData(employees, config, (e) => e.salary, {
          xKey: (v) => `${v / 1000}k`,
          tooltip: (v, isLast) => isLast 
            ? `$${v.toLocaleString()} — $${config.max.toLocaleString()}`
            : `$${v.toLocaleString()} — $${(v + config.interval - 1).toLocaleString()}`
        })
      }

      case 'age': {
        const config = employeesConfig.age
        return getBinnedData(employees, config, 
          (e) => currentYear - new Date(e.birthDate).getFullYear(), 
          {
            xKey: (v) => `${v}-${v + config.interval - 1}`,
            tooltip: (v, isLast) => `Age: ${v} — ${isLast ? config.max : v + config.interval - 1}`
          }
        )
      }

      case 'department': {
        const stats = countBy(employees, 'department')
        return Object.entries(stats).map(([dept, count]) => ({
          xValue: dept,
          yValue: count,
          tooltipValue: `Department: ${dept} (${count} employees)`
        }))
      }

      default:
        return []
    }
  }, [employees, type, currentYear])
}