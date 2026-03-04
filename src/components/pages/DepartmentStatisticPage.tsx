"use client"

import { Container, Heading, VStack, Box } from "@chakra-ui/react"
import { useDepartmentStats } from "@/services/hooks/useDepartmentStats"
import DepartmentsTable from "@/components/DepartmentsTable"

const DepartmentStatisticsPage = () => {
    const { departmentsInfo, isLoading } = useDepartmentStats()

    if (isLoading) return <Box p="10">Calculating statistics...</Box>

    return (
        <Container maxW="container.xl" py="8">
            <VStack align="stretch" gap="6">
                <Heading size="xl" letterSpacing="tight">Department Statistics</Heading>
                <DepartmentsTable departmentsInfo={departmentsInfo} />
            </VStack>
        </Container>
    )
}

export default DepartmentStatisticsPage