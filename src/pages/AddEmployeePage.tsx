"use client"

import { Container, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAddEmployee } from "@/services/hooks/mutationHooks/useAddEmployee";
import { EmployeeForm } from "../components/EmployeeForm";
import type { NewEmployee } from "@/models/Employee";
import { toaster } from "@/components/ui/toaster"; 

const AddEmployeePage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useAddEmployee();

  const handleAdd = (data: NewEmployee) => {
    mutate(data, {
      onSuccess: (newEmployee) => {
        // Показываем уведомление
        toaster.create({
          title: "Success",
          description: `Employee ${newEmployee.fullName} has been added.`,
          type: "success",
          duration: 3000, // Висит 3 секунды
        });

        // Уходим на главную
        navigate("/");
      }
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