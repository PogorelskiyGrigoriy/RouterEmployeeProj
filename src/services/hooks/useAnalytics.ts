import { useMemo } from "react"
import useEmployees from "./useEmployees"
import employeesConfig from "@/config/employees-config"
import { getBinnedData } from "@/utils/statistics-helpers"
import { countBy } from "lodash"
import type { StatsDataItem } from "@/models/StatsInterface"

export const useAnalytics = (type: 'age' | 'salary' | 'department'): StatsDataItem[] => {
  const { employees } = useEmployees()
  
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return useMemo(() => {
    if (!employees?.length) return []

    switch (type) {
      case 'salary': {
        const config = employeesConfig.salary
        const { unit = '', currency = '' } = config

        return getBinnedData(employees, config, (e) => e.salary, {
          // Динамически подставляем 'k' (или что угодно другое) из конфига
          xKey: (v) => `${v / 1000}${unit}`,
          tooltip: (v, isLast) => {
            const start = v.toLocaleString()
            const end = isLast ? config.max : v + config.interval - 1
            return `${currency}${start} — ${currency}${end.toLocaleString()}`
          }
        })
      }

      case 'age': {
        const config = employeesConfig.age
        return getBinnedData(employees, config, 
          (e) => currentYear - new Date(e.birthDate).getFullYear(), 
          {
            xKey: (v) => {
              if (config.interval === 1) return `${v}`
              
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