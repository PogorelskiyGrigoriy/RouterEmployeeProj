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
import { type employee } from "@/Employee";

const HomePage = () => {
  const [employees, setEmployees] = useState<employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        const response = await api.get<employee[]>("/employees");
        setEmployees(response.data);
      } catch (err) {
        setError("Failed to connect to the server. Please check your backend.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Helper to format currency to USD
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Helper to format date: Oct 12, 1990
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

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

  return (
    <Box p={{ base: "4", md: "8" }}>
      <VStack align="start" gap="1" mb="8">
        <Heading size="3xl" color="fg">
          Employees
        </Heading>
        <Text color="fg.muted">
          Total database count: **{employees.length}** people
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
                    {/* color="fg" автоматически адаптируется под темную/светлую тему */}
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