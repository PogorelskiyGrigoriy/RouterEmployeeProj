/**
 * @module DepartmentStatisticsPage
 * Tabular view of department-wise analytics and employee distribution.
 */

"use client"

import { Container, Heading, VStack, Box, Center, Spinner, Text } from "@chakra-ui/react"
import { useDepartmentStats } from "@/services/hooks/useDepartmentStats"
import { DepartmentsTable } from "@/components/DepartmentsTable"

const DepartmentStatisticsPage = () => {
  const { departmentsInfo, isLoading } = useDepartmentStats()

  // 1. Loading State (Chakra UI 3 compliant)
  if (isLoading) {
    return (
      <Center h="60vh">
        <VStack gap="4">
          <Spinner size="xl" color="blue.500" borderWidth="4px" />
          <Text color="fg.muted" fontWeight="medium">Calculating statistics...</Text>
        </VStack>
      </Center>
    )
  }

  return (
    <Container maxW="6xl" py={{ base: "6", md: "10" }}>
      <VStack align="stretch" gap="8">
        <Box>
          <Heading size="2xl" letterSpacing="tight">
            Department Statistics
          </Heading>
          <Text color="fg.muted" mt="2">
            Detailed breakdown of headcount and salary distribution by department.
          </Text>
        </Box>

        <Box 
          borderWidth="1px" 
          borderColor="border.subtle" 
          borderRadius="2xl" 
          bg="bg.panel" 
          shadow="sm"
          overflow="hidden" // Чтобы углы таблицы не вылезали за рамку карточки
        >
          <DepartmentsTable departmentsInfo={departmentsInfo} />
        </Box>
      </VStack>
    </Container>
  )
}

export default DepartmentStatisticsPage