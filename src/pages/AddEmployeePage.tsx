"use client"

import { Container, Heading, Box, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { EmployeeForm } from "@/components/EmployeeForm";
import { useAddEmployee } from "@/services/hooks/mutationHooks/useAddEmployee";
import { toaster } from "@/components/ui/toaster-config"; 
import type { NewEmployee } from "@/models/Employee";
import { ROUTES } from "@/config/navigation";
import { CloseButton } from "@/components/ui/close-button";

const AddEmployeePage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useAddEmployee();

  // 1. Объявляем функцию здесь
  const handleClose = () => navigate(ROUTES.HOME);

  const handleAdd = (data: NewEmployee) => {
    mutate(data, {
      onSuccess: (newEmployee) => {
        toaster.create({
          title: "Employee Added",
          description: `${newEmployee.fullName} has been successfully registered.`,
          type: "success",
        });

        // 2. Используем функцию для редиректа
        handleClose();
      },
      onError: (error) => {
        toaster.create({
          title: "Registration Failed",
          description: error instanceof Error ? error.message : "Something went wrong",
          type: "error",
        });
      }
    });
  };

  return (
    // 3. Добавляем position="relative", чтобы крестик позиционировался относительно контейнера
    <Container maxW="lg" py={{ base: "6", md: "12" }} position="relative">
      <CloseButton 
        position="absolute" 
        top={{ base: "2", md: "4" }} 
        right={{ base: "2", md: "4" }} 
        onClick={handleClose}
        aria-label="Close and return to home"
        borderRadius="full"
        _hover={{ bg: "bg.emphasized" }}
      />

      <Stack gap="8">
        <Box textAlign="center">
          <Heading size="3xl" letterSpacing="tight">
            New Hire
          </Heading>
          <Box color="fg.muted" fontSize="sm" mt="2">
            Fill in the details to add a new member to the team.
          </Box>
        </Box>

        <Box 
          p={{ base: "6", md: "10" }} 
          borderWidth="1px" 
          borderColor="border.subtle" 
          borderRadius="2xl" 
          bg="bg.panel"
          shadow="sm"
        >
          <EmployeeForm 
            onSubmit={handleAdd} 
            isLoading={isPending} 
            onCancel={handleClose} // Используем ту же функцию
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default AddEmployeePage;