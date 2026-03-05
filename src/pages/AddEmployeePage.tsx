"use client"
// AddEmployeePage.tsx

import { Container, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAddEmployee } from "@/services/hooks/mutationHooks/useAddEmployee";
import { EmployeeForm } from "../components/EmployeeForm";
import type { NewEmployee } from "@/models/Employee";

const AddEmployeePage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useAddEmployee();

  const handleAdd = (data: NewEmployee) => {
    mutate(data, {
      onSuccess: () => navigate("/") // Редирект только после успеха
    });
  };

  return (
    <Container maxW="md" py="10">
      <Heading mb="6" size="xl">New Hire</Heading>
      <EmployeeForm onSubmit={handleAdd} isLoading={isPending} />
    </Container>
  );
};

export default AddEmployeePage;