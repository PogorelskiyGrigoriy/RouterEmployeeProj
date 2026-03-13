/**
 * @module EmployeeRow
 * Displays a single employee record in a table format.
 * Integrated with Zod-driven types and unified date utilities.
 */

import { Table, HStack, VStack, Text } from "@chakra-ui/react";
import { CurrencyText, DateText, EmployeeIdentity, DeptBadge } from "./ui/DataDisplay";
import { DeleteEmployeeAction } from "./DeleteEmployeeAction";
import { EditEmployeeAction } from "./EditEmployeeAction";
import { calculateAge } from "@/utils/dateUtils";
import type { Employee } from "@/schemas/employee.schema";

interface EmployeeRowProps {
  employee: Employee;
  isAdmin: boolean;
}

export const EmployeeRow = ({ employee: empl, isAdmin }: EmployeeRowProps) => {
  /**
   * We calculate age on the fly from birthDate (Source of Truth).
   * This ensures age is always accurate relative to today's date.
   */
  const age = calculateAge(empl.birthDate);

  return (
    <Table.Row 
      _hover={{ bg: "blackAlpha.50" }} 
      transition="background-color 0.2s"
    >
      {/* 1. Employee Identity (Name + Avatar) */}
      <Table.Cell width="full">
        <EmployeeIdentity name={empl.fullName} avatar={empl.avatar} />
      </Table.Cell>
      
      {/* 2. Department Badge */}
      <Table.Cell whiteSpace="nowrap">
        <DeptBadge>{empl.department}</DeptBadge>
      </Table.Cell>
      
      {/* 3. Birth Date & Calculated Age (Hidden on mobile) */}
      <Table.Cell display={{ base: "none", lg: "table-cell" }} whiteSpace="nowrap">
        <VStack align="start" gap="0">
          <DateText dateString={empl.birthDate} />
          <Text fontSize="xs" color="fg.muted">
            {age} years old
          </Text>
        </VStack>
      </Table.Cell>
      
      {/* 4. Salary Display */}
      <Table.Cell textAlign="end" whiteSpace="nowrap">
        <CurrencyText value={empl.salary} />
      </Table.Cell>
      
      {/* 5. Admin-only Actions (Edit / Delete) */}
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