import { useMemo } from "react"
import useEmployees from "./useEmployees"
import employeesConfig from "@/config/employees-config"
import { getBinnedData } from "@/utils/statistics-helpers"
import { countBy } from "lodash"
import type { StatsDataItem } from "@/models/StatsInterface"

export const useAnalytics = (type: 'age' | 'salary' | 'department'): StatsDataItem[] => {
  const { employees } = useEmployees()
  
  // Год вычисляем один раз
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return useMemo(() => {
    if (!employees?.length) return []

    switch (type) {
      case 'salary': {
        const config = employeesConfig.salary
        return getBinnedData(employees, config, (e) => e.salary, {
          // Подпись на оси: просто "5k", "10k" и т.д.
          xKey: (v) => `${v / 1000}k`,
          tooltip: (v, isLast) => {
            const start = v.toLocaleString()
            const end = isLast ? config.max : v + config.interval - 1
            return `$${start} — $${end.toLocaleString()}`
          }
        })
      }

      case 'age': {
        const config = employeesConfig.age
        return getBinnedData(employees, config, 
          (e) => currentYear - new Date(e.birthDate).getFullYear(), 
          {
            xKey: (v) => {
              // Если интервал 1, выводим просто "60"
              if (config.interval === 1) return `${v}`
              
              // Если интервал больше 1, выводим "60-64" (или "60-65" для последнего)
              const isLast = v + config.interval >= config.max
              const endValue = isLast ? config.max : v + config.interval - 1
              return `${v}-${endValue}`
            },
            tooltip: (v, isLast) => {
              if (config.interval === 1) return `Age: ${v}`
              
              const endValue = isLast ? config.max : v + config.interval - 1
              return `Age: ${v} — ${endValue}`
            }
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