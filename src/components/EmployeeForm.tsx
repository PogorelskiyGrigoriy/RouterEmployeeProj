/**
 * @module EmployeeForm
 * Universal form for creating and updating employee records.
 */

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Stack, Input, Button, HStack } from "@chakra-ui/react";

import { Field } from "@/components/ui/field";
import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select";

import type { Employee, NewEmployee } from "@/models/Employee";
import type { Department } from "@/models/Departments";

import { EMPLOYEES_CONFIG } from "@/config/employees-config";
import { calculateAge, getLimitDate } from "@/utils/dateUtils";

interface Props {
  onSubmit: (data: NewEmployee) => void;
  isLoading: boolean;
  employee?: Employee;
  onCancel?: () => void;
}

const DEFAULT_VALUES: NewEmployee = {
  fullName: "",
  department: "" as Department,
  salary: EMPLOYEES_CONFIG.salary.min,
  birthDate: "",
};

const NAME_PATTERN = {
  value: /^[a-zA-Zа-яА-ЯёЁ\s-]+$/,
  message: "Only letters and hyphens allowed"
};

export const EmployeeForm = ({ onSubmit, isLoading, employee, onCancel }: Props) => {
  const isEditMode = !!employee;
  const { salary, age } = EMPLOYEES_CONFIG;

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isValid, isDirty } 
  } = useForm<NewEmployee>({
    mode: "onChange",
    defaultValues: employee || DEFAULT_VALUES
  });

  // Sync state when switching between different employees in the same drawer
  useEffect(() => {
    reset(employee || DEFAULT_VALUES);
  }, [employee, reset]);

  const handleSecondaryAction = () => {
    if (isEditMode) {
      onCancel?.();
    } else {
      reset(DEFAULT_VALUES);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="5">
        
        {/* Full Name */}
        <Field 
          label="Full Name" 
          invalid={!!errors.fullName} 
          errorText={errors.fullName?.message}
        >
          <Input 
            {...register("fullName", { 
              required: "Name is required",
              minLength: { value: 3, message: "Min 3 chars" },
              pattern: NAME_PATTERN
            })} 
            placeholder="e.g. Jane Smith"
          />
        </Field>

        {/* Department */}
        <Field 
          label="Department" 
          invalid={!!errors.department} 
          errorText={errors.department?.message}
        >
          <NativeSelectRoot>
            <NativeSelectField 
              {...register("department", { required: "Select department" })}
            >
              <option value="">Select...</option>
              {EMPLOYEES_CONFIG.departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        </Field>

        {/* Salary */}
        <Field 
          label={`Salary (${salary.currency}${salary.min} - ${salary.max})`} 
          invalid={!!errors.salary} 
          errorText={errors.salary?.message}
        >
          <Input 
            type="number" 
            {...register("salary", { 
              valueAsNumber: true,
              required: "Salary is required",
              min: { value: salary.min, message: `Min: ${salary.min}` },
              max: { value: salary.max, message: `Max: ${salary.max}` }
            })} 
          />
        </Field>

        {/* Birth Date */}
        <Field 
          label={`Birth Date (Age ${age.min}+)`} 
          invalid={!!errors.birthDate} 
          errorText={errors.birthDate?.message}
          helperText={isEditMode ? "Birth date cannot be changed" : undefined}
        >
          <Input 
            type="date" 
            disabled={isEditMode}
            opacity={isEditMode ? 0.6 : 1}
            min={getLimitDate(age.max)} 
            max={getLimitDate(age.min)}
            {...register("birthDate", { 
              required: "Required",
              validate: (val) => {
                const currentAge = calculateAge(val);
                return (currentAge >= age.min && currentAge <= age.max) || 
                       `Age must be ${age.min}-${age.max}`;
              }
            })} 
          />
        </Field>

        <HStack gap="4" mt="4">
          <Button 
            variant="ghost" 
            onClick={handleSecondaryAction} 
            flex="1"
            disabled={isLoading}
          >
            {isEditMode ? "Cancel" : "Clear"}
          </Button>
          <Button 
            type="submit" 
            loading={isLoading} 
            disabled={!isValid || (isEditMode && !isDirty)}
            colorPalette="blue"
            flex="1"
          >
            {isEditMode ? "Update" : "Create"}
          </Button>
        </HStack>
      </Stack>
    </form>
  );
};