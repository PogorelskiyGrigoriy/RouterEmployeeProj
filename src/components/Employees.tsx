import { Box, Center, HStack, Spinner, Table, Text, VStack } from "@chakra-ui/react";
import { LuSearchX, LuArrowUp, LuArrowDown, LuArrowUpDown } from "react-icons/lu";

import { EmployeeCard } from "./EmployeeCard";
import { EmployeeRow } from "./EmployeeRow"; // Новый импорт
import { MobileSortActions } from "./MobileSortActions";

import { useEmployees } from "@/services/hooks/useEmployees";
import { useSortStore } from "@/store/sort-store";
import { useAuthStore } from "@/store/useAuthStore";
import type { Employee } from "@/models/Employee";

interface SortableProps {
  field: keyof Employee;
  children: React.ReactNode;
  textAlign?: "start" | "end" | "center";
  width?: string;
}

const SortableColumn = ({ field, children, textAlign = "start", width }: SortableProps) => {
  const { sort, toggleSort } = useSortStore();
  const isSorted = sort.key === field;
  const handleToggle = () => toggleSort(field);

  return (
    <Table.ColumnHeader
      onClick={handleToggle}
      cursor="pointer"
      _hover={{ bg: "blackAlpha.100" }}
      textAlign={textAlign}
      width={width}
    >
      <HStack gap="1" justifyContent={textAlign === "end" ? "flex-end" : "flex-start"}>
        <Text fontWeight="bold">{children}</Text>
        <Box color={isSorted ? "blue.500" : "fg.muted"} flexShrink={0}>
          {isSorted && sort.order === "asc" && <LuArrowUp size="14" />}
          {isSorted && sort.order === "desc" && <LuArrowDown size="14" />}
          {!isSorted && <LuArrowUpDown size="14" style={{ opacity: 0.3 }} />}
        </Box>
      </HStack>
    </Table.ColumnHeader>
  );
};

export const Employees = () => {
  const { employees, isLoading, error, filteredCount } = useEmployees();
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === "ADMIN";

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

      {/* ДЕКСТОПНЫЙ ВИД */}
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
              
              <Table.ColumnHeader display={{ base: "none", lg: "table-cell" }} whiteSpace="nowrap">
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

      <Box p="3" mt="2">
        <Text fontSize="xs" color="fg.subtle" textAlign="right">
          Showing {filteredCount} employees
        </Text>
      </Box>
    </Box>
  );
};