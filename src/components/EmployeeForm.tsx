/**
 * @module EmployeeForm
 * Universal form for creating and updating employee records.
 * Optimized with dynamic Zod schema selection to handle New/Existing states.
 */

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, Input, Button, HStack } from "@chakra-ui/react";

import { Field } from "@/components/ui/field";
import { DepartmentSelect } from "@/components/shared/DepartmentSelect";

import { 
  employeeSchema,
  newEmployeeSchema,
  type Employee, 
  type NewEmployee 
} from "@/schemas/employee.schema";
import type { Department } from "@/schemas/department.schema";
import { EMPLOYEES_CONFIG } from "@/config/employees-config";

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

export const EmployeeForm = ({ onSubmit, isLoading, employee, onCancel }: Props) => {
  const isEditMode = !!employee;
  const { salary, age } = EMPLOYEES_CONFIG;
  const schema = isEditMode ? employeeSchema : newEmployeeSchema;

  /**
   * Конфигурация формы.
   * Динамический резолвер переключается между схемами в зависимости от пропса employee.
   */
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isValid, isDirty } 
  } = useForm<NewEmployee>({
    mode: "onChange",
    // Использование правильной схемы предотвращает блокировку при отсутствии 'id'
    resolver: zodResolver(schema) as any, 
    defaultValues: (employee || DEFAULT_VALUES) as NewEmployee
  });

  // Синхронизация данных при смене сотрудника (например, в Drawer)
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

  /**
   * Кнопка заблокирована если:
   * 1. Форма невалидна (isValid)
   * 2. В режиме редактирования ничего не изменено (!isDirty)
   */
  const isSubmitDisabled = !isValid || (isEditMode && !isDirty);

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
            {...register("fullName")} 
            placeholder="e.g. Jane Smith"
          />
        </Field>

        {/* Department */}
        <DepartmentSelect 
          variant="form"
          registration={register("department")}
          errorText={errors.department?.message}
        />

        {/* Salary */}
        <Field 
          label={`Salary (${salary.currency}${salary.min} - ${salary.max})`} 
          invalid={!!errors.salary} 
          errorText={errors.salary?.message}
        >
          <Input 
            type="number" 
            {...register("salary", { valueAsNumber: true })} 
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
            {...register("birthDate")} 
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
            disabled={isSubmitDisabled}
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