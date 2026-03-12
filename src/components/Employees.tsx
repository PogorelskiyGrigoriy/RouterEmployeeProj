import { Box, Center, Spinner, Table, Text, VStack } from "@chakra-ui/react";
import { LuSearchX } from "react-icons/lu";

import { EmployeeCard } from "./EmployeeCard";
import { EmployeeRow } from "./EmployeeRow";
import { MobileSortActions } from "./MobileSortActions";
import { SortableColumn } from "./ui/SortableColumn";

import { useEmployees } from "@/services/hooks/useEmployees";
import { useAuthStore } from "@/store/useAuthStore";

export const Employees = () => {
  const { employees, isLoading, error, filteredCount } = useEmployees();
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === "ADMIN";

  // --- (Loading, Error, Empty) ---
  if (isLoading) return (
    <Center h="200px"><Spinner size="xl" color="blue.500" /></Center>
  );

  if (error) return (
    <Center h="200px"><Text color="red.500">Error: {error.message}</Text></Center>
  );

  if (filteredCount === 0) return (
    <Center h="300px" borderWidth="1px" borderRadius="lg" borderStyle="dashed" bg="bg.subtle">
      <VStack gap="2">
        <LuSearchX size="40px" style={{ opacity: 0.5 }} />
        <Text fontWeight="bold">No employees found</Text>
      </VStack>
    </Center>
  );

  return (
    <Box>
      {/* МОБИЛЬНЫЙ ВИД */}
      <Box display={{ base: "block", md: "none" }} mb="4">
        <MobileSortActions />
        <VStack gap="3" align="stretch">
          {employees.map((empl) => (
            <EmployeeCard key={empl.id} employee={empl} isAdmin={isAdmin} />
          ))}
        </VStack>
      </Box>

      {/* ДЕКСТОПНЫЙ ВИД (Таблица) */}
      <Box 
        display={{ base: "none", md: "block" }}
        borderWidth="1px" 
        borderRadius="lg" 
        overflowX="auto" 
        boxShadow="sm" 
        bg="bg.panel"
      >
        <Table.Root size="md" variant="line" stickyHeader>
          <Table.Header>
            <Table.Row bg="bg.subtle">
              <SortableColumn field="fullName" width="full">Employee</SortableColumn>
              
              <Table.ColumnHeader fontWeight="bold" whiteSpace="nowrap">
                Department
              </Table.ColumnHeader>
              
              <Table.ColumnHeader display={{ base: "none", lg: "table-cell" }}>
                <SortableColumn field="birthDate">Birth Date</SortableColumn>
              </Table.ColumnHeader>
              
              <SortableColumn field="salary" textAlign="end">Salary</SortableColumn>
              
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

      {/* ФУТЕР СПИСКА */}
      <Box p="3" mt="2">
        <Text fontSize="xs" color="fg.subtle" textAlign="right">
          Showing {filteredCount} employees
        </Text>
      </Box>
    </Box>
  );
};