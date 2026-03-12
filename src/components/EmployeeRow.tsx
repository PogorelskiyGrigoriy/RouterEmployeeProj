import { Table, HStack, VStack, Text } from "@chakra-ui/react";
import { CurrencyText, DateText, EmployeeIdentity, DeptBadge } from "./ui/DataDisplay";
import { DeleteEmployeeAction } from "./DeleteEmployeeAction";
import { EditEmployeeAction } from "./EditEmployeeAction";
import { calculateAge } from "@/utils/dateUtils";
import type { Employee } from "@/models/Employee";

interface EmployeeRowProps {
  employee: Employee;
  isAdmin: boolean;
}

export const EmployeeRow = ({ employee: empl, isAdmin }: EmployeeRowProps) => {
  return (
    <Table.Row _hover={{ bg: "blackAlpha.50" }}>
      {/* Employee Identity */}
      <Table.Cell width="full">
        <EmployeeIdentity name={empl.fullName} avatar={empl.avatar} />
      </Table.Cell>
      
      {/* Department */}
      <Table.Cell whiteSpace="nowrap">
        <DeptBadge>{empl.department}</DeptBadge>
      </Table.Cell>
      
      {/* Birth Date (Hidden on mobile/tablet) */}
      <Table.Cell display={{ base: "none", lg: "table-cell" }} whiteSpace="nowrap">
        <VStack align="start" gap="0">
          <DateText dateString={empl.birthDate} />
          <Text fontSize="xs" color="fg.muted">
            {calculateAge(empl.birthDate)} years old
          </Text>
        </VStack>
      </Table.Cell>
      
      {/* Salary */}
      <Table.Cell textAlign="end" whiteSpace="nowrap">
        <CurrencyText value={empl.salary} />
      </Table.Cell>
      
      {/* Admin Actions */}
      {isAdmin && (
        <Table.Cell textAlign="end" whiteSpace="nowrap">
          <HStack gap="2" justifyContent="flex-end">
            <EditEmployeeAction employee={empl} />
            <DeleteEmployeeAction id={empl.id} name={empl.fullName} />
          </HStack>
        </Table.Cell>
      )}
    </Table.Row>
  );
};