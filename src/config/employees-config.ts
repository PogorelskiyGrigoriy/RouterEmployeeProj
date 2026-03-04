export interface GroupingConfig {
  min: number
  max: number
  interval: number
  unit?: string
  currency?: string
  label?: string
}

interface EmployeesConfig {
  salary: GroupingConfig
  age: GroupingConfig
  departments: string[] 
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
  },
  departments: [
    'Development', 
    'QA', 
    'Accounting', 
    'Audit', 
    'Management'
  ]
}

export default employeesConfig