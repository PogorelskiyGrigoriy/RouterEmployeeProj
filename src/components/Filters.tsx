"use client"

import { VStack, HStack, Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useFilters } from "@/store/filters-store";
import { DEPARTMENT_OPTIONS, type EmployeeFilters } from "@/models/Filters";
import employeesConfig from "@/config/employees-config";
import { Field } from "@/components/ui/field";
import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select";

interface FiltersProps {
  onClose: () => void;
}

const Filters = ({ onClose }: FiltersProps) => {
  const { setFilters, resetFilters, ...currentFilters } = useFilters();
  const config = employeesConfig;

  const { 
    register, 
    handleSubmit, 
    reset,
    watch,
    formState: { errors, isValid } 
  } = useForm<EmployeeFilters>({
    mode: "onChange",
    defaultValues: currentFilters
  });

  const currentMinSalary = watch("minSalary");
  const currentMinAge = watch("minAge");

  const handleApply = (data: EmployeeFilters) => {
    setFilters(data);
    onClose();
  };

  const handleReset = () => {
    resetFilters();
    reset({
      department: "All",
      minSalary: config.salary.min,
      maxSalary: config.salary.max,
      minAge: config.age.min,
      maxAge: config.age.max,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleApply)}>
      <VStack gap="6" align="stretch" py="4">
        
        {/* 1. Департамент */}
        <Field label="Department">
          <NativeSelectRoot>
            <NativeSelectField {...register("department")}>
              {DEPARTMENT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option === "All" ? "All Departments" : option}
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        </Field>

        {/* 2. Зарплата */}
        <Field 
          label={`Salary Range (${config.salary.currency})`}
          invalid={!!errors.minSalary || !!errors.maxSalary}
          errorText={errors.minSalary?.message || errors.maxSalary?.message}
        >
          <HStack gap="4" width="full">
            <Input 
              type="number"
              placeholder="Min"
              {...register("minSalary", { 
                valueAsNumber: true,
                min: { value: config.salary.min, message: `Min: ${config.salary.min}` }
              })} 
            />
            <Input 
              type="number"
              placeholder="Max"
              {...register("maxSalary", { 
                valueAsNumber: true,
                validate: (val) => (val ?? 0) >= (currentMinSalary ?? 0) || "Min > Max",
                max: { value: config.salary.max, message: `Max: ${config.salary.max}` }
              })} 
            />
          </HStack>
        </Field>

        {/* 3. Возраст */}
        <Field 
          label="Age Range"
          invalid={!!errors.minAge || !!errors.maxAge}
          errorText={errors.minAge?.message || errors.maxAge?.message}
        >
          <HStack gap="4" width="full">
            <Input 
              type="number"
              placeholder="Min"
              {...register("minAge", { 
                valueAsNumber: true,
                min: { value: config.age.min, message: `Min age: ${config.age.min}` }
              })} 
            />
            <Input 
              type="number"
              placeholder="Max"
              {...register("maxAge", { 
                valueAsNumber: true,
                validate: (val) => (val ?? 0) >= (currentMinAge ?? 0) || "Min > Max",
                max: { value: config.age.max, message: `Max age: ${config.age.max}` }
              })} 
            />
          </HStack>
        </Field>

        <HStack justify="space-between" mt="4">
          <Button variant="ghost" colorPalette="red" onClick={handleReset}>
            Reset All
          </Button>
          <Button 
            type="submit" 
            colorPalette="blue" 
            disabled={!isValid}
          >
            Show Results
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};

export default Filters;