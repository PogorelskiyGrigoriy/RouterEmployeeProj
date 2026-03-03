import { Box, Heading, Text, VStack, Container } from "@chakra-ui/react";
import Employees from "@/components/Employees";

const HomePage = () => {
  return (
    <Container maxW="container.xl" py={{ base: "4", md: "10" }}>
      {/* Используем массив или объект для адаптивности:
          align: { base: "center", md: "start" } — центрируем на мобилках 
      */}
      <VStack 
        align={{ base: "center", md: "start" }} 
        textAlign={{ base: "center", md: "left" }}
        gap={{ base: "1", md: "2" }} 
        mb={{ base: "6", md: "10" }}
      >
        <Heading 
          // base: размер для смартфонов, md: для планшетов и выше
          size={{ base: "xl", md: "3xl" }} 
          letterSpacing="tight"
        >
          Team Directory
        </Heading>
        
        <Text 
          color="fg.muted" 
          fontSize={{ base: "sm", md: "lg" }}
          maxW={{ base: "xs", md: "2xl" }} // Ограничиваем ширину, чтобы текст не растягивался во всю ширь
        >
          Overview of all active organization members and their departments.
        </Text>
      </VStack>

      <Box mt="4">
        <Employees />
      </Box>

      <Text mt="8" fontSize="xs" color="fg.subtle" textAlign="center">
        Data synchronized with JSON-Server on port 4000
      </Text>
    </Container>
  );
};

export default HomePage;