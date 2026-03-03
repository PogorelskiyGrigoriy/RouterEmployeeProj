import useEmployees from "@/services/hooks/useEmployees";
import { 
  Table, 
  Spinner, 
  Box, 
  HStack, 
  Text, 
  Badge, 
  Avatar as ChakraAvatar,
  Center
} from "@chakra-ui/react";

/**
 * TODO: Вынести эти функции в @/utils/formatters.ts, 
 * когда они понадобятся в других компонентах.
 */
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const Employees = () => {
  const { employees, isLoading, error } = useEmployees();

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

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="auto" 
      maxH="500px" 
      boxShadow="sm"
      bg="bg.panel"
    >
      <Table.Root size="md" variant="line" stickyHeader>
        <Table.Header>
          <Table.Row bg="bg.subtle">
            <Table.ColumnHeader>Employee</Table.ColumnHeader>
            <Table.ColumnHeader>Department</Table.ColumnHeader>
            <Table.ColumnHeader>Date of Birth</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Salary</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {employees.map((empl) => (
            <Table.Row 
              key={empl.id} 
              _hover={{ bg: "blackAlpha.50" }} 
              transition="background 0.2s"
            >
              <Table.Cell>
                <HStack gap="3">
                  <ChakraAvatar.Root size="sm">
                    <ChakraAvatar.Fallback name={empl.fullName} />
                    <ChakraAvatar.Image src={empl.avatar} alt={empl.fullName} />
                  </ChakraAvatar.Root>
                  <Text fontWeight="medium">{empl.fullName}</Text>
                </HStack>
              </Table.Cell>
              
              <Table.Cell>
                <Badge variant="subtle" colorPalette="blue" size="sm">
                  {empl.department}
                </Badge>
              </Table.Cell>

              <Table.Cell color="fg.muted" fontSize="sm">
                {formatDate(empl.birthDate)}
              </Table.Cell>

              <Table.Cell textAlign="end" fontWeight="bold" color="green.600">
                {formatCurrency(empl.salary)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default Employees;