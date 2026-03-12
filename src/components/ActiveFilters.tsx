import { HStack, Text, Button } from "@chakra-ui/react";
import { Tag } from "./ui/tag";
import { useFilters } from "@/store/filters-store";
import { EMPLOYEES_CONFIG } from "@/config/employees-config";

export const ActiveFilters = () => {
  const { filters, setFilters, resetFilters } = useFilters();
  const { salary: salConf, age: ageConf } = EMPLOYEES_CONFIG;

  const activeChips = [
    {
      id: "dept",
      isActive: filters.department !== "All",
      label: "Dept",
      value: filters.department,
      color: "blue",
      onClear: () => setFilters({ department: "All" }),
    },
    {
      id: "salary",
      isActive: filters.minSalary !== salConf.min || filters.maxSalary !== salConf.max,
      label: "Salary",
      value: `${filters.minSalary} - ${filters.maxSalary}`,
      color: "green",
      onClear: () => setFilters({ minSalary: salConf.min, maxSalary: salConf.max }),
    },
    {
      id: "age",
      isActive: filters.minAge !== ageConf.min || filters.maxAge !== ageConf.max,
      label: "Age",
      value: `${filters.minAge} - ${filters.maxAge}`,
      color: "purple",
      onClear: () => setFilters({ minAge: ageConf.min, maxAge: ageConf.max }),
    },
  ].filter(c => c.isActive);

  if (activeChips.length === 0) return null;

  return (
    <HStack gap="2" wrap="wrap" mb="4">
      <Text fontSize="xs" fontWeight="bold" color="fg.muted" textTransform="uppercase">
        Active Filters:
      </Text>

      {activeChips.map((chip) => (
        <Tag
          key={chip.id}
          colorPalette={chip.color}
          variant="subtle"
          size="lg"
          closable
          onClose={chip.onClear}
        >
          <Text as="span" fontWeight="semibold" mr="1">
            {chip.label}:
          </Text>
          {chip.value}
        </Tag>
      ))}

      <Button variant="plain" size="xs" color="blue.500" onClick={resetFilters}>
        Clear all
      </Button>
    </HStack>
  );
};