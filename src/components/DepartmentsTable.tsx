import { Table, Text } from "@chakra-ui/react"; // Добавили Text
import { CountBadge, CurrencyText, AgeText } from "./ui/DataDisplay";
import type { DepartmentInfo } from "@/schemas/department.schema";

interface Props {
  readonly departmentsInfo: readonly DepartmentInfo[];
}

export const DepartmentsTable = ({ departmentsInfo }: Props) => {
  return (
    <Table.Root 
      variant="line" 
      size="md" 
      showColumnBorder 
      interactive
      stickyHeader
      shadow="sm" 
      borderRadius="lg"
      overflow="hidden"
    >
      <Table.Header>
        <Table.Row bg="bg.subtle">
          <Table.ColumnHeader py="4" fontWeight="bold">Department</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center" fontWeight="bold">Employees</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center" fontWeight="bold">Avg Salary</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center" fontWeight="bold">Avg Age</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {departmentsInfo.map((info) => {
          const hasEmployees = info.numEmployees > 0;
          
          return (
            <Table.Row 
              key={info.department} 
              _hover={{ bg: "bg.muted" }}
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
                  <Text color="fg.muted">—</Text> 
                )}
              </Table.Cell>
              
              <Table.Cell textAlign="center">
                {hasEmployees ? (
                  <AgeText value={info.avgAge} />
                ) : (
                  <Text color="fg.muted">—</Text>
                )}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};