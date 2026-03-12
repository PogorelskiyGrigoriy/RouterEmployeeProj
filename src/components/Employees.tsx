import { Box, Center, HStack, Spinner, Table, Text, VStack } from "@chakra-ui/react";
import { LuSearchX, LuArrowUp, LuArrowDown, LuArrowUpDown } from "react-icons/lu";

import { CurrencyText, DateText, EmployeeIdentity, DeptBadge } from "./ui/DataDisplay";
import { DeleteEmployeeAction } from "./DeleteEmployeeAction";
import { EditEmployeeAction } from "./EditEmployeeAction";

import { useEmployees } from "@/services/hooks/useEmployees";
import { useSortStore } from "@/store/sort-store";
import { useAuthStore } from "@/store/useAuthStore";

import { calculateAge } from "@/utils/dateUtils";
import type { Employee } from "@/models/Employee";

/**
 * Стили для липкой колонки.
 * Мы убрали maxW, чтобы колонка могла растягиваться и быть "жадной".
 */
const stickyColumnStyles = {
  position: "sticky",
  left: 0,
  zIndex: 1,
  bg: "bg.panel",
  minW: "160px",
  whiteSpace: "nowrap",
};

interface SortableProps {
  field: keyof Employee;
  children: React.ReactNode;
  textAlign?: "start" | "end" | "center";
  css?: any;
  width?: string;
}

const SortableColumn = ({ field, children, textAlign = "start", css, width }: SortableProps) => {
  const { sort, toggleSort } = useSortStore();
  const isSorted = sort.key === field;

  const handleToggle = () => toggleSort(field);

  return (
    <Table.ColumnHeader
      onClick={handleToggle}
      cursor="pointer"
      _hover={{ bg: "blackAlpha.100" }}
      textAlign={textAlign}
      css={css}
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

  if (isLoading) {
    return (
      <Center h="200px">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="200px">
        <Text color="red.500">Error: {error.message}</Text>
      </Center>
    );
  }

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
      {/* Убрали minW="800px", теперь таблица адаптивно сжимается, пока влезает контент */}
      <Table.Root size={{ base: "sm", md: "md" }} variant="line" stickyHeader>
        <Table.Header>
          <Table.Row bg="bg.subtle">
            {/* "Жадная" колонка: забирает всё свободное место */}
            <SortableColumn 
              field="fullName" 
              css={{ ...stickyColumnStyles, bg: "bg.subtle", zIndex: 2 }}
              width="full"
            >
              Employee
            </SortableColumn>
            
            <Table.ColumnHeader fontWeight="bold" whiteSpace="nowrap">
              Department
            </Table.ColumnHeader>
            
            {/* Короткий заголовок Birth Date убирает лишние отступы */}
            <Table.ColumnHeader display={{ base: "none", md: "table-cell" }} whiteSpace="nowrap">
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
            <Table.Row key={empl.id} _hover={{ bg: "blackAlpha.50" }}>
              <Table.Cell css={stickyColumnStyles} width="full">
                <EmployeeIdentity name={empl.fullName} avatar={empl.avatar} />
              </Table.Cell>
              
              <Table.Cell whiteSpace="nowrap">
                <DeptBadge>{empl.department}</DeptBadge>
              </Table.Cell>

              <Table.Cell display={{ base: "none", md: "table-cell" }} whiteSpace="nowrap">
                <VStack align="start" gap="0">
                  <DateText dateString={empl.birthDate} />
                  <Text fontSize="xs" color="fg.muted">
                    {calculateAge(empl.birthDate)} years old
                  </Text>
                </VStack>
              </Table.Cell>

              <Table.Cell textAlign="end" whiteSpace="nowrap">
                <CurrencyText value={empl.salary} />
              </Table.Cell>

              {!!isAdmin && (
                <Table.Cell textAlign="end" whiteSpace="nowrap">
                  <HStack gap="2" justifyContent="flex-end">
                    <EditEmployeeAction employee={empl} />
                    <DeleteEmployeeAction id={empl.id} name={empl.fullName} />
                  </HStack>
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