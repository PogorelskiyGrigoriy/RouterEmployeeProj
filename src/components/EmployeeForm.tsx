"use client"

import { Stack, Input, Button } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select.tsx";
import { useForm } from "react-hook-form";
import type { NewEmployee } from "@/models/Employee";
import employeesConfig from "@/config/employees-config";
import { calculateAge, getLimitDate } from "@/utils/dateUtils";

interface Props {
  onSubmit: (data: NewEmployee) => void;
  isLoading: boolean;
}

export const EmployeeForm = ({ onSubmit, isLoading }: Props) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid } 
  } = useForm<NewEmployee>({
    mode: "onChange" 
  });

  const handleLocalSubmit = (data: NewEmployee) => {
    onSubmit({
      ...data,
      salary: Number(data.salary) 
    });
  };

  return (
    <form onSubmit={handleSubmit(handleLocalSubmit)}>
      <Stack gap="4">
        
        <Field 
          label="Full Name" 
          invalid={!!errors.fullName} 
          errorText={errors.fullName?.message}
        >
          <Input 
            {...register("fullName", { 
              required: "Name is required",
              minLength: { value: 3, message: "At least 3 characters" },
              pattern: {
                value: /^[a-zA-Zа-яА-ЯёЁ\s-]+$/,
                message: "Only letters and hyphens allowed"
              }
            })} 
            placeholder="John Doe"
          />
        </Field>

        <Field 
          label="Department"
          invalid={!!errors.department}
          errorText={errors.department?.message}
        >
          <NativeSelectRoot>
            <NativeSelectField 
              {...register("department", { required: "Select a department" })}
            >
              <option value="">Select department...</option>
              {employeesConfig.departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        </Field>

        <Field 
          label={`Salary ($ ${employeesConfig.salary.min} - ${employeesConfig.salary.max})`}
          invalid={!!errors.salary}
          errorText={errors.salary?.message}
        >
          <Input 
            type="number" 
            {...register("salary", { 
              required: "Salary is required",
              min: { value: employeesConfig.salary.min, message: `Min: ${employeesConfig.salary.min}` },
              max: { value: employeesConfig.salary.max, message: `Max: ${employeesConfig.salary.max}` }
            })} 
          />
        </Field>

        <Field 
          label={`Birth Date (Age: ${employeesConfig.age.min} - ${employeesConfig.age.max})`}
          invalid={!!errors.birthDate}
          errorText={errors.birthDate?.message}
        >
          <Input 
            type="date" 
            // Ограничиваем календарь на уровне браузера
            min={getLimitDate(employeesConfig.age.max)} 
            max={getLimitDate(employeesConfig.age.min)}
            {...register("birthDate", { 
              required: "Date is required",
              validate: (value) => {
                const age = calculateAge(value);
                if (age < employeesConfig.age.min) return `Too young (min ${employeesConfig.age.min})`;
                if (age > employeesConfig.age.max) return `Too old (max ${employeesConfig.age.max})`;
                return true;
              }
            })} 
          />
        </Field>

        <Button 
          type="submit" 
          loading={isLoading} 
          disabled={!isValid}
          colorPalette="blue"
          variant="solid"
          mt="4"
        >
          Save Employee
        </Button>

      </Stack>
    </form>
  );
};