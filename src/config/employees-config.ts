export interface GroupingConfig {
  min: number
  max: number
  interval: number
  unit?: string      // Например: 'k' для зарплат
  currency?: string  // Например: '$'
  label?: string     // Для заголовков
}

interface EmployeesConfig {
  salary: GroupingConfig
  age: GroupingConfig
}

const employeesConfig: EmployeesConfig = {
  salary: {
    min: 5000,
    max: 50000,
    interval: 5000,
    unit: 'k',
    currency: '$',
    label: 'Salary'
  },
  age: {
    min: 20,
    max: 65,
    interval: 5,
    label: 'Age'
  }
}

export default employeesConfig