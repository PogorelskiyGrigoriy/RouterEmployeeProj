import { useState } from "react";
import {
    VStack,
    HStack,
    Input,
    Button,
    Fieldset,
    Text
} from "@chakra-ui/react";
import { useFilters, type DepartmentFilterValue } from "@/store/filters-store";
import { DEPARTMENT_OPTIONS } from "@/models/Departments";
import employeesConfig from "@/config/employees-config"; 
import { toNumber } from "lodash";

interface FiltersProps {
    onClose: () => void;
}

const Filters = ({ onClose }: FiltersProps) => {
    const f = useFilters();
    const config = employeesConfig;

    const [draft, setDraft] = useState({
        department: f.department,
        minSalary: f.minSalary,
        maxSalary: f.maxSalary,
        minAge: f.minAge,
        maxAge: f.maxAge
    });

    // --- ЛОГИКА ВАЛИДАЦИИ ПО КОНФИГУ ---

    // 1. Проверка Зарплаты
    const salaryMinVal = toNumber(draft.minSalary);
    const salaryMaxVal = toNumber(draft.maxSalary);
    
    const isSalaryRangeInvalid = salaryMinVal > salaryMaxVal && draft.maxSalary !== "";
    const isSalaryOutBound = 
        (draft.minSalary !== "" && (salaryMinVal < config.salary.min || salaryMinVal > config.salary.max)) ||
        (draft.maxSalary !== "" && (salaryMaxVal < config.salary.min || salaryMaxVal > config.salary.max));

    // 2. Проверка Возраста
    const ageMinVal = toNumber(draft.minAge);
    const ageMaxVal = toNumber(draft.maxAge);

    const isAgeRangeInvalid = ageMinVal > ageMaxVal && draft.maxAge !== "";
    const isAgeOutBound = 
        (draft.minAge !== "" && (ageMinVal < config.age.min || ageMinVal > config.age.max)) ||
        (draft.maxAge !== "" && (ageMaxVal < config.age.min || ageMaxVal > config.age.max));

    // Общий флаг ошибки для блокировки кнопки
    const hasError = isSalaryRangeInvalid || isSalaryOutBound || isAgeRangeInvalid || isAgeOutBound;

    const handleApply = () => {
        if (hasError) return;
        f.setDepartment(draft.department);
        f.setMinSalary(draft.minSalary);
        f.setMaxSalary(draft.maxSalary);
        f.setMinAge(draft.minAge);
        f.setMaxAge(draft.maxAge);
        onClose();
    };

    return (
        <VStack gap="6" align="stretch" py="4">
            {/* 1. Департамент */}
            <Fieldset.Root>
                <Fieldset.Legend fontSize="sm" fontWeight="bold" mb="2">Department</Fieldset.Legend>
                <select
                    value={draft.department}
                    onChange={(e) => setDraft({ ...draft, department: e.target.value as DepartmentFilterValue })}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E0' }}
                >
                    {DEPARTMENT_OPTIONS.map((option) => (
                        <option key={option} value={option}>{option === "All" ? "All Departments" : option}</option>
                    ))}
                </select>
            </Fieldset.Root>

            {/* 2. Зарплата */}
            <Fieldset.Root invalid={isSalaryRangeInvalid || isSalaryOutBound}>
                <Fieldset.Legend fontSize="sm" fontWeight="bold" mb="2">
                    Salary ({config.salary.currency}{config.salary.min} - {config.salary.max})
                </Fieldset.Legend>
                <HStack gap="4">
                    <Input
                        placeholder="Min" type="number"
                        value={draft.minSalary}
                        onChange={(e) => setDraft({...draft, minSalary: e.target.value})}
                        border={(isSalaryRangeInvalid || isSalaryOutBound) ? "2px solid red" : "1px solid #E2E8F0"}
                    />
                    <Input
                        placeholder="Max" type="number"
                        value={draft.maxSalary}
                        onChange={(e) => setDraft({...draft, maxSalary: e.target.value})}
                        border={(isSalaryRangeInvalid || isSalaryOutBound) ? "2px solid red" : "1px solid #E2E8F0"}
                    />
                </HStack>
                {isSalaryRangeInvalid && <Text color="red.500" fontSize="xs" mt="1">Min cannot exceed Max</Text>}
                {isSalaryOutBound && !isSalaryRangeInvalid && (
                    <Text color="red.500" fontSize="xs" mt="1">
                        Please enter between {config.salary.min} and {config.salary.max}
                    </Text>
                )}
            </Fieldset.Root>

            {/* 3. Возраст */}
            <Fieldset.Root invalid={isAgeRangeInvalid || isAgeOutBound}>
                <Fieldset.Legend fontSize="sm" fontWeight="bold" mb="2">
                    Age ({config.age.min} - {config.age.max} years)
                </Fieldset.Legend>
                <HStack gap="4">
                    <Input
                        placeholder="Min" type="number"
                        value={draft.minAge}
                        onChange={(e) => setDraft({...draft, minAge: e.target.value})}
                        border={(isAgeRangeInvalid || isAgeOutBound) ? "2px solid red" : "1px solid #E2E8F0"}
                    />
                    <Input
                        placeholder="Max" type="number"
                        value={draft.maxAge}
                        onChange={(e) => setDraft({...draft, maxAge: e.target.value})}
                        border={(isAgeRangeInvalid || isAgeOutBound) ? "2px solid red" : "1px solid #E2E8F0"}
                    />
                </HStack>
                {isAgeRangeInvalid && <Text color="red.500" fontSize="xs" mt="1">Min cannot exceed Max</Text>}
                {isAgeOutBound && !isAgeRangeInvalid && (
                    <Text color="red.500" fontSize="xs" mt="1">
                        Age must be {config.age.min} to {config.age.max}
                    </Text>
                )}
            </Fieldset.Root>

            <HStack justify="space-between" mt="4">
                <Button variant="ghost" colorPalette="red" onClick={() => {
                    f.resetFilters();
                    setDraft({ department: "All", minSalary: "", maxSalary: "", minAge: "", maxAge: "" });
                }}>Reset All</Button>
                <Button colorPalette="blue" onClick={handleApply} disabled={hasError}>Show Results</Button>
            </HStack>
        </VStack>
    );
};

export default Filters;