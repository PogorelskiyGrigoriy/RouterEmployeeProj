// src/config/employees-config.ts

export interface GroupingConfig {
  min: number
  max: number
  interval: number
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
  },
  age: {
    min: 20,
    max: 65,
    interval: 5,
  }
}

export default employeesConfig