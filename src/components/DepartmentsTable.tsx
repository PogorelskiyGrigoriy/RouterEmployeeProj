// DepartmentsTable.tsx

import { Table } from '@chakra-ui/react'
import { CountBadge, CurrencyText, AgeText } from './ui/DataDisplay'
import type { DepartmentInfo } from '@/models/DepartmentInfo'

const DepartmentsTable = ({ departmentsInfo }: { departmentsInfo: DepartmentInfo[] }) => (
  <Table.Root variant="line" size="md" showColumnBorder shadow="sm" borderRadius="lg">
    <Table.Header>
      <Table.Row bg="bg.subtle">
        <Table.ColumnHeader>Department</Table.ColumnHeader>
        <Table.ColumnHeader textAlign="center">Employees</Table.ColumnHeader>
        <Table.ColumnHeader textAlign="center">Avg Salary</Table.ColumnHeader>
        <Table.ColumnHeader textAlign="center">Avg Age</Table.ColumnHeader>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {departmentsInfo.map((info) => (
        <Table.Row key={info.department}>
          <Table.Cell fontWeight="semibold">{info.department}</Table.Cell>
          <Table.Cell textAlign="center">
            <CountBadge value={info.numEmployees} />
          </Table.Cell>
          <Table.Cell textAlign="center">
            <CurrencyText value={info.avgSalary} />
          </Table.Cell>
          <Table.Cell textAlign="center">
            <AgeText value={info.avgAge} />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
)

export default DepartmentsTable