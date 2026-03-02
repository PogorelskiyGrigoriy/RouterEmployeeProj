import { useEffect, useState } from "react";
import { Box, Heading, Text, VStack, Spinner, Badge, HStack, Card } from "@chakra-ui/react";
import api from "@/api/axiosInstance";
import { type employee } from "@/Employee";

const HomePage = () => {
  const [employees, setEmployees] = useState<employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        // Делаем GET запрос к http://localhost:4000/employees
        const response = await api.get<employee[]>("/employees");
        setEmployees(response.data);
      } catch (err) {
        setError("Не удалось загрузить данные сотрудников");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (isLoading) {
    return (
      <VStack p="10">
        <Spinner size="xl" color="blue.500" />
        <Text>Загрузка данных...</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <Box p="10" textAlign="center">
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Heading mb="6" color="gray.700">Список сотрудников ({employees.length})</Heading>
      
      <VStack align="stretch" gap="4">
        {employees.map((emp) => (
          <Card.Root key={emp.id} variant="outline" p="4" _hover={{ shadow: "md" }}>
            <HStack justify="space-between">
              <VStack align="start" gap="1">
                <Text fontWeight="bold" fontSize="lg">
                  {emp.fullName}
                </Text>
                <Badge colorPalette="blue">{emp.department}</Badge>
              </VStack>
              
              <VStack align="end" gap="1">
                <Text fontWeight="semibold" color="green.600">
                  {emp.salary.toLocaleString()} ₽
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Дата рождения: {emp.birthDate}
                </Text>
              </VStack>
            </HStack>
          </Card.Root>
        ))}
      </VStack>
    </Box>
  );
};

export default HomePage;