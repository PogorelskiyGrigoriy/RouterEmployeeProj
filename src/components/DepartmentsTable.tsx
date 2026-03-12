/**
 * @module DepartmentsTable
 * Presentational component for department-level statistics.
 */

import { Table } from "@chakra-ui/react";
import { CountBadge, CurrencyText, AgeText } from "./ui/DataDisplay";
import type { DepartmentInfo } from "@/schemas/department.schema";

interface Props {
  departmentsInfo: DepartmentInfo[];
}

export const DepartmentsTable = ({ departmentsInfo }: Props) => {
  return (
    <Table.Root 
      variant="line" 
      size="md" 
      showColumnBorder 
      shadow="sm" 
      borderRadius="lg"
      overflow="hidden" // Чтобы borderRadius работал корректно
    >
      <Table.Header>
        <Table.Row bg="bg.subtle">
          <Table.ColumnHeader py="4">Department</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">Employees</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">Avg Salary</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">Avg Age</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {departmentsInfo.map((info) => {
          const hasEmployees = info.numEmployees > 0;
          
          return (
            <Table.Row 
              key={info.department} 
              _hover={{ bg: "bg.muted/50" }}
              transition="background 0.2s"
            >
              <Table.Cell fontWeight="semibold" color="fg.emphasized">
                {info.department}
              </Table.Cell>
              
              <Table.Cell textAlign="center">
                <CountBadge value={info.numEmployees} />
              </Table.Cell>
              
              <Table.Cell textAlign="center">
                {hasEmployees ? (
                  <CurrencyText value={info.avgSalary} />
                ) : (
                  "—"
                )}
              </Table.Cell>
              
              <Table.Cell textAlign="center">
                {hasEmployees ? (
                  <AgeText value={info.avgAge} />
                ) : (
                  "—"
                )}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};