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
import { toNumber } from "lodash";

interface FiltersProps {
    onClose: () => void;
}

const Filters = ({ onClose }: FiltersProps) => {
    const f = useFilters();

    // 1. Создаем локальный черновик, инициализируя его значениями из стора
    const [draft, setDraft] = useState({
        department: f.department,
        minSalary: f.minSalary,
        maxSalary: f.maxSalary,
        minAge: f.minAge,
        maxAge: f.maxAge
    });

    // 2. Логика валидации теперь работает на базе локального черновика
    const isSalaryError = toNumber(draft.minSalary) > toNumber(draft.maxSalary) && draft.maxSalary !== "";
    const isAgeError = toNumber(draft.minAge) > toNumber(draft.maxAge) && draft.maxAge !== "";
    const hasError = isSalaryError || isAgeError;

    // 3. Функция применения: одним махом обновляем глобальный стор
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
                <Fieldset.Legend fontSize="sm" fontWeight="bold" mb="2">
                    Department
                </Fieldset.Legend>
                <select
                    value={draft.department}
                    onChange={(e) => setDraft({ ...draft, department: e.target.value as DepartmentFilterValue })}
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E0',
                        backgroundColor: 'white',
                        color: '#2D3748',
                        fontSize: '14px',
                        fontWeight: '500',
                        outline: 'none',
                        cursor: 'pointer'
                    }}
                >
                    {DEPARTMENT_OPTIONS.map((option) => (
                        <option key={option} value={option} style={{ color: '#2D3748' }}>
                            {option === "All" ? "All Departments" : option}
                        </option>
                    ))}
                </select>
            </Fieldset.Root>

            {/* 2. Зарплата */}
            <Fieldset.Root invalid={isSalaryError}>
                <Fieldset.Legend fontSize="sm" fontWeight="bold" mb="2">
                    Salary Range
                </Fieldset.Legend>
                <HStack gap="4">
                    <Input
                        placeholder="Min"
                        type="number"
                        value={draft.minSalary}
                        onChange={(e) => setDraft({ ...draft, minSalary: e.target.value })}
                        border={isSalaryError ? "2px solid red" : "1px solid #E2E8F0"}
                    />
                    <Input
                        placeholder="Max"
                        type="number"
                        value={draft.maxSalary}
                        onChange={(e) => setDraft({ ...draft, maxSalary: e.target.value })}
                        border={isSalaryError ? "2px solid red" : "1px solid #E2E8F0"}
                    />
                </HStack>
                {isSalaryError && (
                    <Text color="red.500" fontSize="xs" mt="1">Min salary cannot exceed Max</Text>
                )}
            </Fieldset.Root>

            {/* 3. Возраст */}
            <Fieldset.Root invalid={isAgeError}>
                <Fieldset.Legend fontSize="sm" fontWeight="bold" mb="2">
                    Age Range
                </Fieldset.Legend>
                <HStack gap="4">
                    <Input
                        placeholder="Min"
                        type="number"
                        value={draft.minAge}
                        onChange={(e) => setDraft({ ...draft, minAge: e.target.value })}
                        border={isAgeError ? "2px solid red" : "1px solid #E2E8F0"}
                    />
                    <Input
                        placeholder="Max"
                        type="number"
                        value={draft.maxAge}
                        onChange={(e) => setDraft({ ...draft, maxAge: e.target.value })}
                        border={isAgeError ? "2px solid red" : "1px solid #E2E8F0"}
                    />
                </HStack>
                {isAgeError && (
                    <Text color="red.500" fontSize="xs" mt="1">Min age cannot exceed Max</Text>
                )}
            </Fieldset.Root>

            {/* 4. Кнопки управления */}
            <HStack justify="space-between" mt="4">
                <Button
                    variant="ghost"
                    colorPalette="red"
                    onClick={() => {
                        f.resetFilters(); // Сброс в глобальном сторе
                        // Сброс в локальном черновике
                        setDraft({
                            department: "All",
                            minSalary: "",
                            maxSalary: "",
                            minAge: "",
                            maxAge: ""
                        });
                    }}
                >
                    Reset All
                </Button>
                <Button
                    colorPalette="blue"
                    onClick={handleApply}
                    disabled={hasError}
                    opacity={hasError ? 0.5 : 1}
                >
                    Show Results
                </Button>
            </HStack>

        </VStack>
    );
};

export default Filters;