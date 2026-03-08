import { 
  VStack, 
  HStack, 
  Input, 
  Button, 
  Fieldset
} from "@chakra-ui/react";
import { useFilters, type DepartmentFilterValue } from "@/store/filters-store";
import { DEPARTMENT_OPTIONS } from "@/models/Departments"; 

interface FiltersProps {
  onClose: () => void;
}

const Filters = ({ onClose }: FiltersProps) => {
  // Используем хук стора для получения данных и функций изменения
  const f = useFilters();

  return (
    <VStack gap="6" align="stretch" py="4">
      
      {/* 1. Департамент */}
      <Fieldset.Root>
        <Fieldset.Legend fontSize="sm" fontWeight="bold" mb="2">
          Department
        </Fieldset.Legend>
        <select 
          value={f.department} 
          onChange={(e) => f.setDepartment(e.target.value as DepartmentFilterValue)}
          style={{ 
            width: '100%', 
            padding: '10px', 
            borderRadius: '6px', 
            border: '1px solid #E2E8F0',
            backgroundColor: 'white',
            fontSize: '14px',
            outline: 'none'
          }}
        >
          {/* Динамически отрисовываем опции из DEPARTMENT_OPTIONS */}
          {DEPARTMENT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option === "All" ? "All Departments" : option}
            </option>
          ))}
        </select>
      </Fieldset.Root>

      {/* 2. Зарплата */}
      <Fieldset.Root>
        <Fieldset.Legend fontSize="sm" fontWeight="bold" mb="2">
          Salary Range
        </Fieldset.Legend>
        <HStack gap="4">
          <Input 
            placeholder="Min" 
            type="number" 
            value={f.minSalary} 
            onChange={(e) => f.setMinSalary(e.target.value)} 
          />
          <Input 
            placeholder="Max" 
            type="number" 
            value={f.maxSalary} 
            onChange={(e) => f.setMaxSalary(e.target.value)} 
          />
        </HStack>
      </Fieldset.Root>

      {/* 3. Возраст */}
      <Fieldset.Root>
        <Fieldset.Legend fontSize="sm" fontWeight="bold" mb="2">
          Age Range
        </Fieldset.Legend>
        <HStack gap="4">
          <Input 
            placeholder="Min" 
            type="number" 
            value={f.minAge} 
            onChange={(e) => f.setMinAge(e.target.value)} 
          />
          <Input 
            placeholder="Max" 
            type="number" 
            value={f.maxAge} 
            onChange={(e) => f.setMaxAge(e.target.value)} 
          />
        </HStack>
      </Fieldset.Root>

      {/* 4. Кнопки управления */}
      <HStack justify="space-between" mt="4">
        <Button 
          variant="ghost" 
          colorPalette="red" 
          onClick={f.resetFilters}
        >
          Reset All
        </Button>
        <Button 
          colorPalette="blue" 
          onClick={onClose}
        >
          Show Results
        </Button>
      </HStack>

    </VStack>
  );
};

export default Filters;