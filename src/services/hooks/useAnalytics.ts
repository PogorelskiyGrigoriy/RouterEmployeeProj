import { useMemo } from "react"
import useEmployees from "./useEmployees"
import employeesConfig from "@/config/employees-config"
import { getBinnedData } from "@/utils/statistics-helpers"
import { countBy } from "lodash"

export const useAnalytics = (type: 'age' | 'salary' | 'department') => {
  const { employees } = useEmployees()

  return useMemo(() => {
    if (!employees?.length) return []

    // Логика для Зарплат
    if (type === 'salary') {
      const config = employeesConfig.salary
      return getBinnedData(employees, config, (e) => e.salary, {
        xKey: (v) => `${v / 1000}k`,
        tooltip: (v, isLast) => isLast 
          ? `$${v.toLocaleString()} — $${config.max.toLocaleString()}`
          : `$${v.toLocaleString()} — $${(v + config.interval - 1).toLocaleString()}`
      })
    }

    // Логика для Возраста
    if (type === 'age') {
      const config = employeesConfig.age
      const currentYear = new Date().getFullYear()
      return getBinnedData(employees, config, 
        (e) => currentYear - new Date(e.birthDate).getFullYear(), 
        {
          xKey: (v) => `${v}-${v + config.interval - 1}`,
          tooltip: (v, isLast) => `Age: ${v} — ${isLast ? config.max : v + config.interval - 1} years`
        }
      )
    }

    // Логика для Департаментов (простая группировка по строке)
    if (type === 'department') {
      const stats = countBy(employees, 'department')
      return Object.entries(stats).map(([dept, count]) => ({
        xValue: dept,
        yValue: count,
        tooltipValue: `Department: ${dept} (${count} employees)`
      }))
    }

    return []
  }, [employees, type])
}