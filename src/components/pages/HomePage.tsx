import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Spinner,
  Badge,
  Card,
  Container,
  Stack,
  Avatar as ChakraAvatar,
} from "@chakra-ui/react";

import api from "@/api/axiosInstance";
import { type Employee } from "@/models/Employee";
import axios, { AxiosError } from "axios";

// --- UTILS (Prepared for future export to utils.ts) ---

/**
  Formats a number to USD currency string.
  High-value tip: Keeping this outside the component prevents re-creating the function on every render.
 */
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Formats a date string to "MMM D, YYYY" (e.g., Oct 12, 1990)
 */
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const HomePage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        const response = await api.get<Employee[]>("/employees", {
          signal: controller.signal,
        });
        setEmployees(response.data);
        setError(null);
      } catch (err) {
        // Проверяем, является ли ошибка отменой запроса
        if (axios.isCancel(err)) {
          return; 
        }

        // Приводим ошибку к типу AxiosError для типизации
        const axiosError = err as AxiosError;
        
        setError("Failed to connect to the server. Please check your backend.");
        console.error("Axios error details:", axiosError.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();

    return () => {
      controller.abort();
    };
  }, []);

  // --- RENDERING LOGIC ---

  // Loading State
  if (isLoading) {
    return (
      <VStack h="60vh" justify="center" gap="4">
        <Spinner size="xl" color="blue.500" />
        <Text color="fg.muted" fontWeight="medium">
          Loading team...
        </Text>
      </VStack>
    );
  }

  // Error State
  if (error) {
    return (
      <Container maxW="md" py="20">
        <Box
          p="6"
          bg="red.500/10"
          color="red.500"
          borderRadius="lg"
          textAlign="center"
          border="1px solid"
          borderColor="red.500/20"
        >
          <Text fontWeight="bold">Error!</Text>
          <Text fontSize="sm">{error}</Text>
        </Box>
      </Container>
    );
  }

  // Empty State
  if (employees.length === 0) {
    return (
      <VStack h="40vh" justify="center" gap="2">
        <Heading size="lg">No employees found</Heading>
      </VStack>
    );
  }

  return (
    <Box p={{ base: "4", md: "8" }}>
      <VStack align="start" gap="1" mb="8">
        <Heading size="3xl" color="fg">
          Employees
        </Heading>
        <Text color="fg.muted">
          Total database count: <strong>{employees.length}</strong> people
        </Text>
      </VStack>

      <Stack gap="4">
        {employees.map((emp) => (
          <Card.Root
            key={emp.id}
            variant="outline"
            transition="all 0.2s"
            _hover={{ shadow: "md", borderColor: "blue.400", bg: "whiteAlpha.50" }}
          >
            <Card.Body p="4">
              <HStack gap="4" align="center" width="100%">
                <ChakraAvatar.Root size="lg" border="1px solid" borderColor="whiteAlpha.200">
                  <ChakraAvatar.Fallback name={emp.fullName} />
                  <ChakraAvatar.Image src={emp.avatar} alt={emp.fullName} />
                </ChakraAvatar.Root>

                <HStack justify="space-between" flex="1">
                  <VStack align="start" gap="1">
                    <Text fontWeight="bold" fontSize="lg" color="fg" lineHeight="short">
                      {emp.fullName}
                    </Text>
                    <Badge colorPalette="cyan" variant="subtle" size="sm">
                      {emp.department}
                    </Badge>
                  </VStack>

                  <VStack align="end" gap="0">
                    <Text
                      fontWeight="extrabold"
                      fontSize="xl"
                      color="green.400"
                    >
                      {formatCurrency(emp.salary)}
                    </Text>
                    <Text fontSize="xs" color="fg.muted" fontWeight="medium">
                      Date of Birth: {formatDate(emp.birthDate)}
                    </Text>
                  </VStack>
                </HStack>
              </HStack>
            </Card.Body>
          </Card.Root>
        ))}
      </Stack>
    </Box>
  );
};

export default HomePage;