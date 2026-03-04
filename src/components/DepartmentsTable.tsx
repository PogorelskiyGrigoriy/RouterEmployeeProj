import type { FC } from 'react'
import { Table, Badge, Text } from '@chakra-ui/react'
import type { DepartmentInfo } from '@/models/DepartmentInfo'

type Props = {
    departmentsInfo: DepartmentInfo[]
}

const DepartmentsTable: FC<Props> = ({ departmentsInfo }) => {
    return (
        <Table.Root variant="line" size="md" showColumnBorder>
            <Table.Header>
                <Table.Row bg="bg.subtle">
                    <Table.ColumnHeader>Department</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="center">Number of Employees</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="center">Average Salary</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="center">Average Age</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {departmentsInfo.map((info) => (
                    <Table.Row key={info.department}>
                        <Table.Cell fontWeight="semibold">{info.department}</Table.Cell>
                        <Table.Cell textAlign="center">
                            <Badge variant="subtle" colorPalette="blue">
                                {info.numEmployees}
                            </Badge>
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                            <Text color="green.600" fontWeight="medium">
                                {new Intl.NumberFormat('en-US', { 
                                    style: 'currency', 
                                    currency: 'USD', 
                                    maximumFractionDigits: 0 
                                }).format(info.avgSalary)}
                            </Text>
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                            {info.avgAge > 0 ? `${info.avgAge} years` : "—"}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
}

export default DepartmentsTable