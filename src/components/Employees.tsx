import useEmployees from "@/services/hooks/useEmployees";
import { Table, Spinner, Box, Center, Text } from "@chakra-ui/react";
import { CurrencyText, DateText, EmployeeIdentity, DeptBadge } from "./ui/DataDisplay";
import { calculateAge } from "@/utils/dateUtils";

const Employees = () => {
  const { employees, isLoading, error } = useEmployees();

  if (isLoading) return <Center h="200px"><Spinner size="xl" color="blue.500" /></Center>;
  if (error) return <Center h="200px"><Text color="red.500">Error: {error.message}</Text></Center>;

  return (
    <Box borderWidth="1px" borderRadius="lg" overflowX="auto" boxShadow="sm" bg="bg.panel">
      <Table.Root size={{ base: "sm", md: "md" }} variant="line" stickyHeader>
        <Table.Header>
          <Table.Row bg="bg.subtle">
            <Table.ColumnHeader>Employee</Table.ColumnHeader>
            <Table.ColumnHeader>Department</Table.ColumnHeader>
            <Table.ColumnHeader display={{ base: "none", md: "table-cell" }}>Date of Birth (Age)</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Salary</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {employees.map((empl) => (
            <Table.Row key={empl.id} _hover={{ bg: "blackAlpha.50" }} transition="background 0.2s">
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
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default Employees;