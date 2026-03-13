/**
 * @module SortableColumn
 * Reusable header component that integrates with useSortStore.
 * Optimized with selectors to prevent unnecessary re-renders.
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
  /**
   * Performance Optimization:
   * We use specific selectors so this header only re-renders 
   * when its own key or the global order changes.
   */
  const currentSortKey = useSortStore((state) => state.sort.key);
  const currentOrder = useSortStore((state) => state.sort.order);
  const toggleSort = useSortStore((state) => state.toggleSort);

  const isSorted = currentSortKey === field;
  
  const handleToggle = () => toggleSort(field);

  return (
    <Table.ColumnHeader
      onClick={handleToggle}
      cursor="pointer"
      _hover={{ bg: "bg.muted" }} // Using theme tokens instead of blackAlpha
      textAlign={textAlign}
      width={width}
      whiteSpace="nowrap"
      transition="background 0.2s"
      userSelect="none"
    >
      <HStack 
        gap="2" 
        justifyContent={textAlign === "end" ? "flex-end" : "flex-start"}
      >
        <Text fontWeight="semibold" color={isSorted ? "fg.info" : "fg"}>
          {children}
        </Text>
        
        <Box 
          color={isSorted ? "blue.500" : "fg.subtle"} 
          flexShrink={0}
          display="flex"
          alignItems="center"
        >
          {isSorted ? (
            currentOrder === "asc" ? <LuArrowUp size="16" /> : <LuArrowDown size="16" />
          ) : (
            <LuArrowUpDown size="14" style={{ opacity: 0.3 }} />
          )}
        </Box>
      </HStack>
    </Table.ColumnHeader>
  );
};