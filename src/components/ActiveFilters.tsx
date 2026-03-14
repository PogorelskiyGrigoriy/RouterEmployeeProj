import { HStack, Text, Button } from "@chakra-ui/react";
import { Tag } from "./ui/tag";
import { useFilters } from "@/store/filters-store";
import { employeeFilterSchema } from "@/schemas/employee.schema";

/**
 * @module ActiveFilters
 * Displays tags for currently active filters.
 * Uses default values from Zod schema to determine "active" state.
 */

export const ActiveFilters = () => {
  const { filters, setFilters, resetFilters } = useFilters();
  
  // Get defaults directly from our schema to stay in sync
  const defaults = employeeFilterSchema.parse({});

  const activeChips = [
    {
      id: "dept",
      isActive: filters.department !== defaults.department,
      label: "Dept",
      value: filters.department,
      color: "blue",
      onClear: () => setFilters({ department: defaults.department }),
    },
    {
      id: "salary",
      isActive: filters.minSalary !== defaults.minSalary || filters.maxSalary !== defaults.maxSalary,
      label: "Salary",
      // Optional: format as currency or abbreviated (e.g., 10k - 20k)
      value: `${filters.minSalary.toLocaleString()} - ${filters.maxSalary.toLocaleString()}`,
      color: "green",
      onClear: () => setFilters({ minSalary: defaults.minSalary, maxSalary: defaults.maxSalary }),
    },
    {
      id: "age",
      isActive: filters.minAge !== defaults.minAge || filters.maxAge !== defaults.maxAge,
      label: "Age",
      value: `${filters.minAge} - ${filters.maxAge}`,
      color: "purple",
      onClear: () => setFilters({ minAge: defaults.minAge, maxAge: defaults.maxAge }),
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