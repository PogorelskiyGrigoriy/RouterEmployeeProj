/**
 * @module ActiveFilters
 * Displays currently applied filters as removable chips.
 */

import { Badge, HStack, IconButton, Text, Button } from "@chakra-ui/react";
import { LuX } from "react-icons/lu";
import { useFilters } from "@/store/filters-store";
import { EMPLOYEES_CONFIG } from "@/config/employees-config";

/**
 * INTERNAL UI COMPONENT: FilterChip
 * Encapsulates the visual logic of a single filter tag.
 */
const FilterChip = ({ 
  label, 
  value, 
  onClear, 
  colorPalette 
}: { 
  label: string; 
  value: string | number; 
  onClear: () => void; 
  colorPalette: string;
}) => (
  <Badge colorPalette={colorPalette} variant="surface" size="lg" borderRadius="full" px="3" py="1">
    <Text as="span" fontWeight="medium">{label}:</Text> {value}
    <IconButton
      aria-label={`Clear ${label}`}
      variant="ghost"
      size="xs"
      onClick={onClear}
      ml="1"
      height="16px"
      minWidth="16px"
    >
      <LuX />
    </IconButton>
  </Badge>
);

export const ActiveFilters = () => {
  // 1. Selector-based state access
  const filters = useFilters((state) => state.filters);
  const { setFilters, resetFilters } = useFilters();
  
  const { department, minSalary, maxSalary, minAge, maxAge } = filters;
  const { salary: salConf, age: ageConf } = EMPLOYEES_CONFIG;

  // 2. Computed Defaults
  const isDefaultSalary = minSalary === salConf.min && maxSalary === salConf.max;
  const isDefaultAge = minAge === ageConf.min && maxAge === ageConf.max;
  const isDefaultDept = department === "All";

  if (isDefaultDept && isDefaultSalary && isDefaultAge) return null;

  return (
    <HStack gap="2" wrap="wrap" mb="4" alignItems="center">
      <Text fontSize="xs" fontWeight="bold" color="fg.muted" textTransform="uppercase" letterSpacing="wider">
        Active Filters:
      </Text>

      {!isDefaultDept && (
        <FilterChip 
          label="Dept" 
          value={department} 
          colorPalette="blue" 
          onClear={() => setFilters({ department: "All" })} 
        />
      )}

      {!isDefaultSalary && (
        <FilterChip 
          label="Salary" 
          value={`${minSalary} - ${maxSalary}`} 
          colorPalette="green" 
          onClear={() => setFilters({ minSalary: salConf.min, maxSalary: salConf.max })} 
        />
      )}

      {!isDefaultAge && (
        <FilterChip 
          label="Age" 
          value={`${minAge} - ${maxAge}`} 
          colorPalette="purple" 
          onClear={() => setFilters({ minAge: ageConf.min, maxAge: ageConf.max })} 
        />
      )}

      <Button 
        variant="plain" 
        size="xs" 
        color="blue.500" 
        onClick={resetFilters}
        _hover={{ textDecoration: "underline", color: "blue.600" }}
      >
        Clear all
      </Button>
    </HStack>
  );
};