import { Box, HStack, Text, Table, type TableColumnHeaderProps } from "@chakra-ui/react";
import { LuArrowUp, LuArrowDown, LuArrowUpDown } from "react-icons/lu";
import { useSortStore } from "@/store/sort-store";
import type { Employee } from "@/schemas/employee.schema";

// Наследуем свойства Table.ColumnHeader, чтобы принимать display, width и т.д.
interface SortableColumnProps extends TableColumnHeaderProps {
  field: keyof Employee;
  children: React.ReactNode;
}

export const SortableColumn = ({ 
  field, 
  children, 
  textAlign = "start", 
  ...rest // Собираем все остальные пропсы (display, width, и т.д.)
}: SortableColumnProps) => {
  const currentSortKey = useSortStore((state) => state.sort.key);
  const currentOrder = useSortStore((state) => state.sort.order);
  const toggleSort = useSortStore((state) => state.toggleSort);

  const isSorted = currentSortKey === field;
  const handleToggle = () => toggleSort(field);

  return (
    <Table.ColumnHeader
      onClick={handleToggle}
      cursor="pointer"
      _hover={{ bg: "bg.muted" }}
      textAlign={textAlign}
      whiteSpace="nowrap"
      transition="background 0.2s"
      userSelect="none"
      {...rest} // ПРИМЕНЯЕМ пропсы здесь
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