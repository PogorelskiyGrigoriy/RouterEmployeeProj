import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  Container, 
  HStack, 
  Button,
} from "@chakra-ui/react";
import { 
  DialogBody, 
  DialogCloseTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogRoot, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { LuFilter } from "react-icons/lu"; 
import Employees from "@/components/Employees";
import Filters from "@/components/Filters";
import { useFilteredEmployees } from "@/services/hooks/useFilteredEmployees";
import { useState } from "react";

const HomePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { filteredCount, totalCount } = useFilteredEmployees();

  // Проверка: изменены ли фильтры (нужна для подсветки кнопки)
  const isFiltered = filteredCount !== totalCount;

  return (
    <Container maxW="container.xl" py={{ base: "4", md: "10" }}>
      <HStack 
        justify="space-between" 
        align="flex-end" 
        mb={{ base: "6", md: "10" }}
        wrap="wrap"
        gap="4"
      >
        <VStack align="flex-start" gap="2">
          <Heading size={{ base: "xl", md: "3xl" }} letterSpacing="tight">
            Team Directory
          </Heading>
          <Text color="fg.muted" fontSize={{ base: "sm", md: "lg" }} maxW="2xl">
            Overview of all active organization members and their departments.
          </Text>
        </VStack>

        {/* --- МОДАЛЬНОЕ ОКНО С ФИЛЬТРАМИ --- */}
        <DialogRoot 
          open={isDialogOpen} 
          onOpenChange={(e) => setIsDialogOpen(e.open)}
          size="sm"
          placement="center"
        >
          <DialogTrigger asChild>
            <Button 
              variant={isFiltered ? "solid" : "outline"} 
              colorPalette={isFiltered ? "blue" : "gray"}
              size="md"
            >
              <LuFilter /> 
              Filters
              {isFiltered && ` (${filteredCount})`}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter Employees</DialogTitle>
            </DialogHeader>
            <DialogBody>
              {/* Передаем функцию закрытия, чтобы модалка захлопнулась при нажатии "Show Results" */}
              <Filters onClose={() => setIsDialogOpen(false)} />
            </DialogBody>
            <DialogCloseTrigger />
          </DialogContent>
        </DialogRoot>
      </HStack>

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