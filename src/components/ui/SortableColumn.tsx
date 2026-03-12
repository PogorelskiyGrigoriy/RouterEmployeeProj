/**
 * @module SortableColumn
 * A reusable table header component with sorting logic.
 */

import { Box, HStack, Text, Table } from "@chakra-ui/react";
import { LuArrowUp, LuArrowDown, LuArrowUpDown } from "react-icons/lu";
import { useSortStore } from "@/store/sort-store";
import type { Employee } from "@/schemas/employee.schema";

interface SortableColumnProps {
  field: keyof Employee;
  children: React.ReactNode;
  textAlign?: "start" | "end" | "center";
  width?: string;
}

export const SortableColumn = ({ 
  field, 
  children, 
  textAlign = "start", 
  width 
}: SortableColumnProps) => {
  const { sort, toggleSort } = useSortStore();
  const isSorted = sort.key === field;
  
  const handleToggle = () => toggleSort(field);

  return (
    <Table.ColumnHeader
      onClick={handleToggle}
      cursor="pointer"
      _hover={{ bg: "blackAlpha.100" }}
      textAlign={textAlign}
      width={width}
      whiteSpace="nowrap"
    >
      <HStack gap="1" justifyContent={textAlign === "end" ? "flex-end" : "flex-start"}>
        <Text fontWeight="bold">{children}</Text>
        <Box color={isSorted ? "blue.500" : "fg.muted"} flexShrink={0}>
          {isSorted && sort.order === "asc" && <LuArrowUp size="14" />}
          {isSorted && sort.order === "desc" && <LuArrowDown size="14" />}
          {!isSorted && <LuArrowUpDown size="14" style={{ opacity: 0.3 }} />}
        </Box>
      </HStack>
    </Table.ColumnHeader>
  );
};