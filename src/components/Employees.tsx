/**
 * @module Employees
 * Main container for the employee list. 
 * Switches between Mobile Card view and Desktop Table view.
 * Updated to support Zod-driven totals and server-side counts.
 */

import { Box, Center, Spinner, Table, Text, VStack } from "@chakra-ui/react";
import { LuSearchX } from "react-icons/lu";

import { EmployeeCard } from "./EmployeeCard";
import { EmployeeRow } from "./EmployeeRow";
import { MobileSortActions } from "./MobileSortActions";
import { SortableColumn } from "./ui/SortableColumn";

import { useEmployees } from "@/services/hooks/useEmployees";
import { useUserRole } from "@/store/useAuthStore";

export const Employees = () => {
  const { employees, isLoading, error, filteredCount, totalCount } = useEmployees();
  
  const userRole = useUserRole();
  const isAdmin = userRole === "ADMIN";

  // --- Loading State ---
  if (isLoading) return (
    <Center h="200px"><Spinner size="xl" color="blue.500" /></Center>
  );

  // --- Error State ---
  if (error) return (
    <Center h="200px">
      <VStack gap="2">
        <Text color="red.500" fontWeight="medium">
          Error loading employees
        </Text>
        <Text fontSize="xs" color="fg.muted">{error.message}</Text>
      </VStack>
    </Center>
  );

  // --- Empty State ---
  if (filteredCount === 0) return (
    <Center 
      h="300px" 
      borderWidth="1px" 
      borderRadius="xl" 
      borderStyle="dashed" 
      bg="bg.subtle"
    >
      <VStack gap="3">
        <LuSearchX size="48px" style={{ opacity: 0.3 }} />
        <VStack gap="0">
          <Text fontWeight="bold" fontSize="lg">No employees found</Text>
          <Text color="fg.muted" fontSize="sm">Try adjusting your filters</Text>
        </VStack>
      </VStack>
    </Center>
  );

  return (
    <Box>
      {/* MOBILE VIEW */}
      <Box display={{ base: "block", md: "none" }} mb="4">
        <MobileSortActions />
        <VStack gap="3" align="stretch">
          {employees.map((empl) => (
            <EmployeeCard key={empl.id} employee={empl} isAdmin={isAdmin} />
          ))}
        </VStack>
      </Box>

      {/* DESKTOP VIEW */}
      <Box 
        display={{ base: "none", md: "block" }}
        borderWidth="1px" 
        borderRadius="xl" 
        overflow="hidden" 
        boxShadow="sm" 
        bg="bg.panel"
      >
        <Table.Root size="md" variant="line" stickyHeader>
          <Table.Header>
            <Table.Row bg="bg.subtle">
              {/* Ключи строго соответствуют Employee schema */}
              <SortableColumn field="fullName" width="full">
                Employee
              </SortableColumn>
              
              <Table.ColumnHeader fontWeight="bold" whiteSpace="nowrap">
                Department
              </Table.ColumnHeader>
              
              <Table.ColumnHeader display={{ base: "none", lg: "table-cell" }}>
                <SortableColumn field="birthDate">Birth Date</SortableColumn>
              </Table.ColumnHeader>
              
              <SortableColumn field="salary" textAlign="end">
                Salary
              </SortableColumn>
              
              {isAdmin && (
                <Table.ColumnHeader textAlign="end" fontWeight="bold" whiteSpace="nowrap">
                  Actions
                </Table.ColumnHeader>
              )}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {employees.map((empl) => (
              <EmployeeRow 
                key={empl.id} 
                employee={empl} 
                isAdmin={isAdmin} 
              />
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      <Box p="3" mt="2">
        <Text fontSize="xs" color="fg.muted" textAlign="right" fontStyle="italic">
          Showing {filteredCount} of {totalCount} total employees
        </Text>
      </Box>
    </Box>
  );
};