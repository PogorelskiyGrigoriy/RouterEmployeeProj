"use client"

import { VStack, HStack, Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useFilters, type DepartmentFilterValue } from "@/store/filters-store";
import { DEPARTMENT_OPTIONS } from "@/models/Departments";
import employeesConfig from "@/config/employees-config";
import { Field } from "@/components/ui/field";
import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select";

interface FiltersProps {
    onClose: () => void;
}

// Тип для формы фильтров (используем числа, так как RHF сделает каст через valueAsNumber)
interface FilterFormValues {
    department: DepartmentFilterValue;
    minSalary: number;
    maxSalary: number;
    minAge: number;
    maxAge: number;
}

const Filters = ({ onClose }: FiltersProps) => {
    const f = useFilters();
    const config = employeesConfig;

    // Инициализируем форму значениями из стора
    const { 
        register, 
        handleSubmit, 
        reset,
        watch,
        formState: { errors, isValid } 
    } = useForm<FilterFormValues>({
        mode: "onChange",
        defaultValues: {
            department: f.department,
            minSalary: Number(f.minSalary),
            maxSalary: Number(f.maxSalary),
            minAge: Number(f.minAge),
            maxAge: Number(f.maxAge),
        }
    });

    // Наблюдаем за значениями для кросс-валидации (Min <= Max)
    const currentMinSalary = watch("minSalary");
    const currentMinAge = watch("minAge");

    const handleApply = (data: FilterFormValues) => {
        // Синхронизируем с Zustand стором (приводим обратно к строкам, если стор их ждет)
        f.setDepartment(data.department);
        f.setMinSalary(String(data.minSalary));
        f.setMaxSalary(String(data.maxSalary));
        f.setMinAge(String(data.minAge));
        f.setMaxAge(String(data.maxAge));
        onClose();
    };

    const handleReset = () => {
        f.resetFilters();
        // Сбрасываем форму к начальным значениям конфига
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
                                min: { value: config.salary.min, message: `Min salary is ${config.salary.min}` },
                                max: { value: config.salary.max, message: `Max salary is ${config.salary.max}` }
                            })} 
                        />
                        <Input 
                            type="number"
                            placeholder="Max"
                            {...register("maxSalary", { 
                                valueAsNumber: true,
                                validate: (val) => val >= currentMinSalary || "Cannot be less than Min",
                                min: { value: config.salary.min, message: `Min salary is ${config.salary.min}` },
                                max: { value: config.salary.max, message: `Max salary is ${config.salary.max}` }
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
                                min: { value: config.age.min, message: `Min age: ${config.age.min}` },
                                max: { value: config.age.max, message: `Max age: ${config.age.max}` }
                            })} 
                        />
                        <Input 
                            type="number"
                            placeholder="Max"
                            {...register("maxAge", { 
                                valueAsNumber: true,
                                validate: (val) => val >= currentMinAge || "Cannot be less than Min",
                                min: { value: config.age.min, message: `Min age: ${config.age.min}` },
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