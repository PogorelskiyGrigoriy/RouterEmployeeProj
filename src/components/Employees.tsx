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
      overflowX="auto" // Горизонтальный скролл только для таблицы
      boxShadow="sm"
      bg="bg.panel"
      minW={0} // Защита от переполнения в flex-контейнерах
    >
      <Table.Root size={{ base: "sm", md: "md" }} variant="line" stickyHeader>
        <Table.Header>
          <Table.Row bg="bg.subtle">
            <Table.ColumnHeader>Employee</Table.ColumnHeader>
            <Table.ColumnHeader>Department</Table.ColumnHeader>
            {/* Скрываем дату рождения на мобильных */}
            <Table.ColumnHeader display={{ base: "none", md: "table-cell" }}>
              Date of Birth
            </Table.ColumnHeader>
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
                  <Text fontWeight="medium" fontSize={{ base: "xs", md: "sm" }}>
                    {empl.fullName}
                  </Text>
                </HStack>
              </Table.Cell>
              
              <Table.Cell>
                <Badge variant="subtle" colorPalette="blue" size="xs">
                  {empl.department}
                </Badge>
              </Table.Cell>

              {/* Скрываем дату рождения на мобильных */}
              <Table.Cell display={{ base: "none", md: "table-cell" }} color="fg.muted" fontSize="sm">
                {formatDate(empl.birthDate)}
              </Table.Cell>

              <Table.Cell textAlign="end" fontWeight="bold" color="green.600" fontSize={{ base: "xs", md: "sm" }}>
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