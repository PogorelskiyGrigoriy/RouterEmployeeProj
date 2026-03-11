/**
 * @module Filters
 * Client-side filtering form that updates the global filters store.
 */

import { VStack, HStack, Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { Field } from "@/components/ui/field";
import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select";

import { useFilters } from "@/store/filters-store";
import { DEPARTMENT_FILTER_VALUES, type EmployeeFilters } from "@/models/Filters";
import { EMPLOYEES_CONFIG } from "@/config/employees-config";

interface Props {
  onClose: () => void;
}

const DEFAULT_FILTERS: EmployeeFilters = {
  department: "All",
  minSalary: EMPLOYEES_CONFIG.salary.min,
  maxSalary: EMPLOYEES_CONFIG.salary.max,
  minAge: EMPLOYEES_CONFIG.age.min,
  maxAge: EMPLOYEES_CONFIG.age.max,
};

export const Filters = ({ onClose }: Props) => {
  // Access store using selectors for performance
  const currentFilters = useFilters((state) => state.filters);
  const { setFilters, resetFilters } = useFilters();

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

  // Dynamic watch for range validation
  const [minSal, minAgeVal] = watch(["minSalary", "minAge"]);
  const { salary: salConf, age: ageConf } = EMPLOYEES_CONFIG;

  const handleApply = (data: EmployeeFilters) => {
    setFilters(data);
    onClose();
  };

  const handleReset = () => {
    resetFilters();
    reset(DEFAULT_FILTERS);
  };

  return (
    <form onSubmit={handleSubmit(handleApply)}>
      <VStack gap="6" align="stretch" py="4">
        
        {/* Department Selection */}
        <Field label="Department">
          <NativeSelectRoot>
            <NativeSelectField {...register("department")}>
              {DEPARTMENT_FILTER_VALUES.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "All" ? "All Departments" : opt}
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        </Field>

        {/* Salary Range */}
        <Field 
          label={`Salary (${salConf.currency})`}
          invalid={!!errors.minSalary || !!errors.maxSalary}
          errorText={errors.minSalary?.message || errors.maxSalary?.message}
        >
          <HStack gap="3">
            <Input 
              type="number"
              placeholder="Min"
              {...register("minSalary", { 
                valueAsNumber: true,
                min: { value: salConf.min, message: `Min: ${salConf.min}` }
              })} 
            />
            <Input 
              type="number"
              placeholder="Max"
              {...register("maxSalary", { 
                valueAsNumber: true,
                validate: (v) => (v ?? 0) >= (minSal ?? 0) || "Invalid range",
                max: { value: salConf.max, message: `Max: ${salConf.max}` }
              })} 
            />
          </HStack>
        </Field>

        {/* Age Range */}
        <Field 
          label="Age Range"
          invalid={!!errors.minAge || !!errors.maxAge}
          errorText={errors.minAge?.message || errors.maxAge?.message}
        >
          <HStack gap="3">
            <Input 
              type="number"
              placeholder="Min"
              {...register("minAge", { 
                valueAsNumber: true,
                min: { value: ageConf.min, message: `Min: ${ageConf.min}` }
              })} 
            />
            <Input 
              type="number"
              placeholder="Max"
              {...register("maxAge", { 
                valueAsNumber: true,
                validate: (v) => (v ?? 0) >= (minAgeVal ?? 0) || "Invalid range",
                max: { value: ageConf.max, message: `Max: ${ageConf.max}` }
              })} 
            />
          </HStack>
        </Field>

        <HStack gap="4" mt="4">
          <Button variant="ghost" colorPalette="gray" onClick={handleReset} flex="1">
            Reset
          </Button>
          <Button 
            type="submit" 
            colorPalette="blue" 
            disabled={!isValid}
            flex="2"
          >
            Apply
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};