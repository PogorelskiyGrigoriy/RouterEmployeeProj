import { Box, Heading, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const StatisticsPage = () => {
  return (
    <VStack align="stretch" gap="6">
      <Heading size="xl" borderBottom="2px solid" borderColor="gray.100" pb="2">
        Аналитика и Статистика
      </Heading>
      
      <Box p="4" bg="gray.50" borderRadius="lg">
        {/* Здесь будут рендериться Age, Salary и Department страницы */}
        <Outlet />
      </Box>
    </VStack>
  );
};

export default StatisticsPage;