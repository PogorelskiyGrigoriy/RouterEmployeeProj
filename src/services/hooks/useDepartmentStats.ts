import { useMemo } from "react"
import { groupBy, meanBy } from "lodash"
import useEmployees from "./useEmployees"
import employeesConfig from "@/config/employees-config"
import type { DepartmentInfo } from "@/models/DepartmentInfo"

export const useDepartmentStats = () => {
  const { employees, isLoading } = useEmployees()

  const departmentsInfo = useMemo(() => {
    if (!employees || employees.length === 0) return []

    const currentYear = new Date().getFullYear()
    // Группируем сотрудников по отделу
    const grouped = groupBy(employees, 'department')

    return employeesConfig.departments.map((dept): DepartmentInfo => {
      const deptEmployees = grouped[dept] || []
      const numEmployees = deptEmployees.length

      return {
        department: dept,
        numEmployees,
        // Средняя зарплата в отделе
        avgSalary: numEmployees > 0 
          ? Math.round(meanBy(deptEmployees, 'salary')) 
          : 0,
        // Средний возраст в отделе
        avgAge: numEmployees > 0 
          ? Math.round(meanBy(deptEmployees, (e) => 
              currentYear - new Date(e.birthDate).getFullYear()
            )) 
          : 0
      }
    })
  }, [employees])

  return { departmentsInfo, isLoading }
}