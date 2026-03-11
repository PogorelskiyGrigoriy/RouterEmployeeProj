/**
 * @module HomePage
 * Main dashboard featuring the employee directory, filtering, and management.
 */

"use client";

import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  HStack,
  Button,
  Separator,
} from "@chakra-ui/react";
import { LuFilter } from "react-icons/lu";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { Employees } from "@/components/Employees";
import { Filters } from "@/components/Filters";
import { ActiveFilters } from "@/components/ActiveFilters";
// ИСПРАВЛЕНО: Переход на использование useEmployees
import { useEmployees } from "@/services/hooks/useEmployees";

const HomePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // ИСПРАВЛЕНО: Теперь и здесь используем useEmployees
  // React Query автоматически дедуплицирует запросы этого компонента и Employees.tsx
  const { filteredCount, totalCount } = useEmployees();

  // Highlight button if any filters are active
  const isFiltered = filteredCount !== totalCount;

  return (
    <Container maxW="6xl" py={{ base: "6", md: "10" }}>
      <VStack align="stretch" gap="8">
        
        {/* Header Section */}
        <HStack justify="space-between" align="flex-end" wrap="wrap" gap="4">
          <VStack align="flex-start" gap="1">
            <Heading size={{ base: "2xl", md: "4xl" }} letterSpacing="tight">
              Team Directory
            </Heading>
            <Text color="fg.muted" fontSize={{ base: "sm", md: "md" }} maxW="2xl">
              Manage and overview organization members across all departments.
            </Text>
          </VStack>

          {/* Filters Dialog */}
          <DialogRoot
            open={isDialogOpen}
            onOpenChange={(e) => setIsDialogOpen(e.open)}
            size="sm"
            placement="center"
            motionPreset="slide-in-bottom"
          >
            <DialogTrigger asChild>
              <Button
                variant={isFiltered ? "solid" : "outline"}
                colorPalette={isFiltered ? "blue" : "gray"}
                size="md"
                rounded="full"
                px="6"
              >
                <LuFilter />
                Filters
                {isFiltered && (
                  <Text as="span" ms="1" fontWeight="bold">
                    ({filteredCount})
                  </Text>
                )}
              </Button>
            </DialogTrigger>
            
            <DialogContent borderRadius="2xl">
              <DialogHeader>
                <DialogTitle fontSize="xl">Filter Directory</DialogTitle>
              </DialogHeader>
              <DialogBody pb="6">
                <Filters onClose={() => setIsDialogOpen(false)} />
              </DialogBody>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>
        </HStack>

        <Separator borderColor="border.subtle" />

        {/* Filters & Content Area */}
        <VStack align="stretch" gap="4">
          <ActiveFilters />
          
          <Box 
            bg="bg.panel" 
            borderRadius="xl" 
            borderWidth={isFiltered ? "1px" : "0px"} 
            borderColor="blue.100"
            transition="all 0.2s"
          >
            <Employees />
          </Box>
        </VStack>

        {/* Footer Info */}
        <VStack gap="1" mt="4">
          <Separator mb="4" width="40px" />
          <Text fontSize="2xs" color="fg.subtle" textAlign="center" textTransform="uppercase" letterSpacing="widest">
            Live Sync: JSON-Server Port 4000
          </Text>
        </VStack>
      </VStack>
    </Container>
  );
};

export default HomePage;