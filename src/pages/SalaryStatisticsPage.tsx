/**
 * @module SalaryStatisticsPage
 * Analytics view for employee salary distribution across the organization.
 */

"use client"

import { Container, Center, Spinner, Text, Stack } from "@chakra-ui/react";
import { useAnalytics } from "@/services/hooks/useAnalytics";
import { StatisticsChart } from "@/components/StatisticsChart";

const SalaryStatisticsPage = () => {
  // Получаем данные по зарплатам через хук аналитики
  const chartData = useAnalytics('salary');

  // 1. Loading State (Chakra UI 3)
  // Пока данные загружаются (null), показываем центрированный спиннер
  if (!chartData) {
    return (
      <Center h="60vh">
        <Spinner 
          size="xl" 
          color="blue.500" 
          borderWidth="4px" 
        />
      </Center>
    );
  }

  // 2. Empty State
  // Если данных нет (пустой массив), выводим понятное сообщение
  if (chartData.length === 0) {
    return (
      <Center h="60vh">
        <Stack align="center" gap="2">
          <Text fontSize="lg" fontWeight="medium">No salary data available</Text>
          <Text color="fg.muted">Ensure employee salary information is correctly populated.</Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Container maxW="6xl" py={{ base: "6", md: "10" }}>
      <StatisticsChart
        title="Salary Distribution"
        data={chartData}
        labelY="Employees"
        // Эти ключи должны соответствовать структуре, которую возвращает useAnalytics('salary')
        dataKeyX="xValue" 
        dataKeyY="yValue"
        tooltipLabelKey="tooltipValue"
      />
    </Container>
  );
};

export default SalaryStatisticsPage;