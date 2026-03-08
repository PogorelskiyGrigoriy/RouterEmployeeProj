"use client"

import { HStack, Badge, Text, IconButton } from "@chakra-ui/react";
import { useFilters } from "@/store/filters-store";
import employeesConfig from "@/config/employees-config";
import { LuX } from "react-icons/lu";

const ActiveFilters = () => {
    const { 
        department, minSalary, maxSalary, minAge, maxAge, 
        setFilters, resetFilters 
    } = useFilters();
    const config = employeesConfig;

    // Проверяем, что фильтры отличаются от дефолтных
    const isDefaultSalary = minSalary === config.salary.min && maxSalary === config.salary.max;
    const isDefaultAge = minAge === config.age.min && maxAge === config.age.max;
    const isDefaultDept = department === "All";

    if (isDefaultDept && isDefaultSalary && isDefaultAge) return null;

    return (
        <HStack gap="2" wrap="wrap" mb="4">
            <Text fontSize="xs" fontWeight="bold" color="fg.muted" mr="2">
                Active Filters:
            </Text>

            {/* Чипс Департамента */}
            {!isDefaultDept && (
                <Badge colorPalette="blue" variant="surface" size="lg" borderRadius="full" px="3">
                    Dept: {department}
                    <IconButton
                        aria-label="Clear department"
                        variant="ghost"
                        size="xs"
                        onClick={() => setFilters({ department: "All" })}
                        ml="1"
                    >
                        <LuX />
                    </IconButton>
                </Badge>
            )}

            {/* Чипс Зарплаты */}
            {!isDefaultSalary && (
                <Badge colorPalette="green" variant="surface" size="lg" borderRadius="full" px="3">
                    Salary: {minSalary} - {maxSalary}
                    <IconButton
                        aria-label="Clear salary"
                        variant="ghost"
                        size="xs"
                        onClick={() => setFilters({ minSalary: config.salary.min, maxSalary: config.salary.max })}
                        ml="1"
                    >
                        <LuX />
                    </IconButton>
                </Badge>
            )}

            {/* Чипс Возраста */}
            {!isDefaultAge && (
                <Badge colorPalette="purple" variant="surface" size="lg" borderRadius="full" px="3">
                    Age: {minAge} - {maxAge}
                    <IconButton
                        aria-label="Clear age"
                        variant="ghost"
                        size="xs"
                        onClick={() => setFilters({ minAge: config.age.min, maxAge: config.age.max })}
                        ml="1"
                    >
                        <LuX />
                    </IconButton>
                </Badge>
            )}

            <Button 
                variant="plain" 
                size="xs" 
                color="blue.500" 
                onClick={resetFilters}
                _hover={{ textDecoration: "underline" }}
            >
                Clear all
            </Button>
        </HStack>
    );
};

// Вспомогательный компонент Button для Clear All, если он не импортирован
import { Button } from "@chakra-ui/react";

export default ActiveFilters;