/**
 * @module AddEmployeePage
 * Page for onboarding new employees into the system.
 */

"use client"

import { Container, Heading, Box, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { EmployeeForm } from "@/components/EmployeeForm";
import { useAddEmployee } from "@/services/hooks/mutationHooks/useAddEmployee";
import { toaster } from "@/components/ui/toaster-config"; 
import type { NewEmployee } from "@/models/Employee";
import { ROUTES } from "@/config/navigation";

const AddEmployeePage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useAddEmployee();

  /**
   * Submits the new employee data to the API
   */
  const handleAdd = (data: NewEmployee) => {
    mutate(data, {
      onSuccess: (newEmployee) => {
        toaster.create({
          title: "Employee Added",
          description: `${newEmployee.fullName} has been successfully registered.`,
          type: "success",
        });

        // Redirect to the main employee list
        navigate(ROUTES.HOME);
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
    <Container maxW="lg" py={{ base: "6", md: "12" }}>
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
            onCancel={() => navigate(ROUTES.HOME)}
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default AddEmployeePage;