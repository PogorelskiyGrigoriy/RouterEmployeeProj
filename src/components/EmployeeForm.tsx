"use client"

import { Stack, Input, Button, HStack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { Employee, NewEmployee } from "@/models/Employee";
import type { Department } from "@/models/Departments"; 
import employeesConfig from "@/config/employees-config";
import { calculateAge, getLimitDate } from "@/utils/dateUtils";

interface Props {
  onSubmit: (data: NewEmployee) => void;
  isLoading: boolean;
  employee?: Employee;
  onCancel?: () => void;
}

export const EmployeeForm = ({ onSubmit, isLoading, employee, onCancel }: Props) => {
  const isEditMode = !!employee;

  // Создаем объект дефолтных значений на основе конфига
  const defaultValues: NewEmployee = {
    fullName: "",
    department: "" as Department, // Приводим к типу, чтобы TS не ругался на ""
    salary: employeesConfig.salary.min,
    birthDate: "",
  };

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isValid } 
  } = useForm<NewEmployee>({
    mode: "onChange",
    defaultValues: employee || defaultValues
  });

  // Эффект для синхронизации при открытии формы (важно для Drawer)
  useEffect(() => {
    if (employee) {
      reset(employee);
    } else {
      reset(defaultValues);
    }
  }, [employee, reset]);

  const handleReset = () => {
    reset(isEditMode ? employee : defaultValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="5">
        
        <Field 
          label="Full Name" 
          invalid={!!errors.fullName} 
          errorText={errors.fullName?.message}
        >
          <Input 
            {...register("fullName", { 
              required: "Name is required",
              minLength: { value: 3, message: "At least 3 characters" },
              pattern: { value: /^[a-zA-Zа-яА-ЯёЁ\s-]+$/, message: "Only letters and hyphens allowed" }
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
              valueAsNumber: true,
              required: "Salary is required",
              min: { value: employeesConfig.salary.min, message: `Min: ${employeesConfig.salary.min}` },
              max: { value: employeesConfig.salary.max, message: `Max: ${employeesConfig.salary.max}` }
            })} 
          />
        </Field>

        <Field 
          label={`Birth Date (Min age: ${employeesConfig.age.min})`} 
          invalid={!!errors.birthDate} 
          errorText={errors.birthDate?.message}
        >
          <Input 
            type="date" 
            readOnly={isEditMode}
            variant={isEditMode ? "subtle" : "outline"}
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

        <HStack gap="4" mt="4">
          <Button variant="outline" onClick={isEditMode ? onCancel : handleReset} flex="1">
            {isEditMode ? "Cancel" : "Reset"}
          </Button>
          <Button 
            type="submit" 
            loading={isLoading} 
            disabled={!isValid}
            colorPalette="blue"
            flex="1"
          >
            {isEditMode ? "OK" : "Save"}
          </Button>
        </HStack>
      </Stack>
    </form>
  );
};