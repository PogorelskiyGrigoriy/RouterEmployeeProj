import { Box, Heading, Text, VStack, Container } from "@chakra-ui/react";
import Employees from "@/components/Employees"; // Импортируй свой новый компонент

const HomePage = () => {
  return (
    <Container maxW="container.xl" py={{ base: "4", md: "8" }}>
      <VStack align="start" gap="1" mb="8">
        <Heading size="3xl" letterSpacing="tight">
          Team Directory
        </Heading>
        <Text color="fg.muted" fontSize="lg">
          Overview of all active organization members and their departments.
        </Text>
      </VStack>

      {/* Просто вставляем компонент. Вся логика загрузки и таблицы уже внутри него */}
      <Box mt="4">
        <Employees />
      </Box>

      <Text mt="6" fontSize="xs" color="fg.subtle" textAlign="center">
        Data synchronized with JSON-Server on port 4000
      </Text>
    </Container>
  );
};

export default HomePage;