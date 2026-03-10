import { useFilteredEmployees } from "@/services/hooks/useFilteredEmployees"; 
import { useSortStore } from "@/store/sort-store"; 
import { useAuthStore } from "@/store/useAuthStore"; 
import { Table, Spinner, Box, Center, Text, VStack, HStack } from "@chakra-ui/react";
import { CurrencyText, DateText, EmployeeIdentity, DeptBadge } from "./ui/DataDisplay";
import { calculateAge } from "@/utils/dateUtils";
import { LuSearchX, LuArrowUp, LuArrowDown, LuArrowUpDown } from "react-icons/lu"; 
import type { Employee } from "@/models/Employee";
import { DeleteEmployeeAction } from "./DeleteEmployeeAction";
import { EditEmployeeAction } from "./EditEmployeeAction"; 

/**
 * Вспомогательный компонент заголовка
 */
const SortableColumn = ({ field, children, textAlign = "start" }: { 
  field: keyof Employee; 
  children: React.ReactNode;
  textAlign?: "start" | "end" | "center";
}) => {
  const { sort, toggleSort } = useSortStore();
  const isSorted = sort.key === field;

  return (
    <Table.ColumnHeader 
      onClick={() => toggleSort(field)} 
      cursor="pointer"
      _hover={{ bg: "blackAlpha.100" }}
      textAlign={textAlign}
    >
      <HStack gap="1" justifyContent={textAlign === "end" ? "flex-end" : "flex-start"}>
        <Text fontWeight="bold">{children}</Text>
        <Box color={isSorted ? "blue.500" : "fg.muted"}>
          {isSorted && sort.order === "asc" && <LuArrowUp size="14" />}
          {isSorted && sort.order === "desc" && <LuArrowDown size="14" />}
          {!isSorted && <LuArrowUpDown size="14" style={{ opacity: 0.3 }} />}
        </Box>
      </HStack>
    </Table.ColumnHeader>
  );
};

const Employees = () => {
  const { employees, isLoading, error, filteredCount } = useFilteredEmployees();
  
  // Достаем пользователя из Zustand. 
  // Используем селектор для оптимизации (компонент перерисуется только при изменении user)
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === "ADMIN";

  if (isLoading) return <Center h="200px"><Spinner size="xl" color="blue.500" /></Center>;
  if (error) return <Center h="200px"><Text color="red.500">Error: {error.message}</Text></Center>;

  if (filteredCount === 0) {
    return (
      <Center h="300px" borderWidth="1px" borderRadius="lg" borderStyle="dashed" bg="bg.subtle">
        <VStack gap="2">
          <LuSearchX size="40px" style={{ opacity: 0.5 }} />
          <Text fontWeight="bold">No employees found</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" overflowX="auto" boxShadow="sm" bg="bg.panel">
      <Table.Root size={{ base: "sm", md: "md" }} variant="line" stickyHeader>
        <Table.Header>
          <Table.Row bg="bg.subtle">
            <SortableColumn field="fullName">Employee</SortableColumn>
            <Table.ColumnHeader fontWeight="bold">Department</Table.ColumnHeader>
            <Table.ColumnHeader display={{ base: "none", md: "table-cell" }}>
               <SortableColumn field="birthDate">Date of Birth (Age)</SortableColumn>
            </Table.ColumnHeader>
            <SortableColumn field="salary" textAlign="end">Salary</SortableColumn>
            
            {/* Условный рендеринг заголовка действий */}
            {isAdmin && (
              <Table.ColumnHeader textAlign="end" fontWeight="bold" minW="80px">
                Actions
              </Table.ColumnHeader>
            )}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {employees.map((empl) => (
            <Table.Row key={empl.id} _hover={{ bg: "blackAlpha.50" }}>
              <Table.Cell>
                <EmployeeIdentity name={empl.fullName} avatar={empl.avatar} />
              </Table.Cell>
              <Table.Cell>
                <DeptBadge>{empl.department}</DeptBadge>
              </Table.Cell>
              <Table.Cell display={{ base: "none", md: "table-cell" }}>
                <Box>
                  <DateText dateString={empl.birthDate} />
                  <Text fontSize="xs" color="fg.muted">
                    {calculateAge(empl.birthDate)} years old
                  </Text>
                </Box>
              </Table.Cell>
              <Table.Cell textAlign="end">
                <CurrencyText value={empl.salary} />
              </Table.Cell>
              
              {/* Условный рендеринг кнопки удаления и редактирования */}
              {isAdmin && (
                <Table.Cell textAlign="end">
                  <EditEmployeeAction employee={empl} />
                  <DeleteEmployeeAction id={empl.id} name={empl.fullName} />
                </Table.Cell>
              )}
            </Table.Row>
          ))}
          
        </Table.Body>
      </Table.Root>
      
      <Box p="2" borderTopWidth="1px" bg="bg.muted">
        <Text fontSize="xs" color="fg.subtle" textAlign="right">
          Showing {filteredCount} employees
        </Text>
      </Box>
    </Box>
  );
};

export default Employees;