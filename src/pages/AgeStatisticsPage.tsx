/**
 * @module AgeStatisticsPage
 * Analytics view for employee age demographics.
 */

"use client"

import { Container, Center, Spinner, Text, Stack } from "@chakra-ui/react";
import { useAnalytics } from "@/services/hooks/useAnalytics";
import { StatisticsChart } from "@/components/StatisticsChart";

const AgeStatisticsPage = () => {
  // Получаем данные через специализированный хук аналитики
  const chartData = useAnalytics('age');

  // 1. Loading State
  // Если данных еще нет, показываем спиннер, чтобы пользователь не видел пустой экран
  if (!chartData) {
    return (
      <Center h="60vh">
        <Spinner
          size="xl"
          color="blue.500"
          borderWidth="4px" // Вместо thickness
        />
      </Center>
    );
  }

  // 2. Empty State
  // Если массив пришел, но он пуст
  if (chartData.length === 0) {
    return (
      <Center h="60vh">
        <Stack align="center" gap="2">
          <Text fontSize="lg" fontWeight="medium">No age data available</Text>
          <Text color="fg.muted">Add employees to see the distribution chart.</Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Container maxW="6xl" py={{ base: "6", md: "10" }}>
      <StatisticsChart
        title="Age Distribution"
        data={chartData}
        dataKeyX="xValue"     // Явно указываем ключи для ясности
        dataKeyY="yValue"
        labelY="Employees"
        tooltipLabelKey="tooltipValue"
      />
    </Container>
  );
};

export default AgeStatisticsPage;