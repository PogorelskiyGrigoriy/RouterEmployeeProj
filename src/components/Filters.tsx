/**
 * @module Filters
 * Client-side filtering form integrated with Zod schema (using defaults).
 * Manual type casting used to bridge Zod Input/Output types.
 */

import { VStack, HStack, Input, Button } from "@chakra-ui/react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Field } from "@/components/ui/field";
import { DepartmentSelect } from "@/components/shared/DepartmentSelect";

import { useFilters } from "@/store/filters-store";
import { employeeFilterSchema, type EmployeeFilter } from "@/schemas/employee.schema";
import { EMPLOYEES_CONFIG } from "@/config/employees-config";

interface Props {
  readonly onClose: () => void;
}

export const Filters = ({ onClose }: Props) => {
  const currentFilters = useFilters((state) => state.filters);
  const { setFilters, resetFilters } = useFilters();
  const { salary: salConf } = EMPLOYEES_CONFIG;

  const defaultValues = employeeFilterSchema.parse({});

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isValid } 
  } = useForm<EmployeeFilter>({
    mode: "onChange",
    resolver: zodResolver(employeeFilterSchema) as Resolver<EmployeeFilter>,
    defaultValues: currentFilters
  });

  const handleApply = (data: EmployeeFilter) => {
    setFilters(data);
    onClose();
  };

  const handleReset = () => {
    resetFilters();
    reset(defaultValues);
  };

  return (
    <form onSubmit={handleSubmit(handleApply)}>
      <VStack gap="6" align="stretch" py="4">
        
        <DepartmentSelect 
          variant="filter"
          registration={register("department")} 
        />

        <Field 
          label={`Salary (${salConf.currency})`}
          invalid={!!errors.minSalary || !!errors.maxSalary}
          errorText={errors.minSalary?.message || errors.maxSalary?.message}
        >
          <HStack gap="3">
            <Input 
              type="number"
              placeholder="Min"
              {...register("minSalary", { valueAsNumber: true })} 
            />
            <Input 
              type="number"
              placeholder="Max"
              {...register("maxSalary", { valueAsNumber: true })} 
            />
          </HStack>
        </Field>

        <Field 
          label="Age Range"
          invalid={!!errors.minAge || !!errors.maxAge}
          errorText={errors.minAge?.message || errors.maxAge?.message}
        >
          <HStack gap="3">
            <Input 
              type="number"
              placeholder="Min"
              {...register("minAge", { valueAsNumber: true })} 
            />
            <Input 
              type="number"
              placeholder="Max"
              {...register("maxAge", { valueAsNumber: true })} 
            />
          </HStack>
        </Field>

        <HStack gap="4" mt="4">
          <Button 
            variant="ghost" 
            colorPalette="gray" 
            onClick={handleReset} 
            flex="1"
          >
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