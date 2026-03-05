"use client"
// EmployeeForm.tsx

import { Stack, Input, Button } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { DEPARTMENTS } from "@/models/Departments";
import type { NewEmployee } from "@/models/Employee";

interface Props {
  onSubmit: (data: NewEmployee) => void;
  isLoading: boolean;
}

export const EmployeeForm = ({ onSubmit, isLoading }: Props) => {
  const { register, handleSubmit } = useForm<NewEmployee>();

  const handleLocalSubmit = (data: NewEmployee) => {
    onSubmit({
      ...data,
      salary: Number(data.salary) 
    });
  };

  return (
    <form onSubmit={handleSubmit(handleLocalSubmit)}>
      <Stack gap="4">
        <Field label="Full Name">
          <Input 
            {...register("fullName", { required: true })} 
            placeholder="John Doe" 
          />
        </Field>

        <Field label="Department">
          <select 
            {...register("department", { required: true })}
            style={{ 
              padding: '8px', 
              borderRadius: '6px', 
              border: '1px solid #e2e8f0',
              background: 'transparent',
              fontSize: '14px'
            }}
          >
            {DEPARTMENTS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </Field>

        <Field label="Salary ($)">
          <Input 
            type="number" 
            {...register("salary", { required: true })} 
            placeholder="5000"
          />
        </Field>

        <Field label="Birth Date">
          <Input 
            type="date" 
            {...register("birthDate", { required: true })} 
          />
        </Field>

        <Button 
          type="submit" 
          loading={isLoading} 
          colorPalette="blue"
          mt="4"
        >
          Save Employee
        </Button>
      </Stack>
    </form>
  );
};