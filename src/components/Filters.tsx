"use client"

import { VStack, HStack, Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useFilters, type DepartmentFilterValue } from "@/store/filters-store";
import employeesConfig from "@/config/employees-config";
import { Field } from "@/components/ui/field";
import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select";

interface FiltersProps {
    onClose: () => void;
}

// Теперь этот интерфейс полностью совпадает с FiltersState в сторе
interface FilterFormValues {
    department: DepartmentFilterValue;
    minSalary: number;
    maxSalary: number;
    minAge: number;
    maxAge: number;
}

const Filters = ({ onClose }: FiltersProps) => {
    // Достаем методы из стора
    const { setFilters, resetFilters, ...currentFilters } = useFilters();
    const config = employeesConfig;

    const { 
        register, 
        handleSubmit, 
        reset,
        watch,
        formState: { errors, isValid } 
    } = useForm<FilterFormValues>({
        mode: "onChange",
        // Передаем текущие значения из стора напрямую, так как там уже числа
        defaultValues: {
            department: currentFilters.department,
            minSalary: currentFilters.minSalary,
            maxSalary: currentFilters.maxSalary,
            minAge: currentFilters.minAge,
            maxAge: currentFilters.maxAge,
        }
    });

    const currentMinSalary = watch("minSalary");
    const currentMinAge = watch("minAge");

    const handleApply = (data: FilterFormValues) => {
        // Одной строкой обновляем весь стор
        setFilters(data);
        onClose();
    };

    const handleReset = () => {
        resetFilters(); // Сброс Zustand
        // Сброс полей формы к начальным значениям конфига
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
                            <option value="All">All Departments</option>
                            {config.departments.map((d) => (
                                <option key={d} value={d}>{d}</option>
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
                                validate: (val) => val >= currentMinSalary || "Min > Max",
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
                                validate: (val) => val >= currentMinAge || "Min > Max",
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