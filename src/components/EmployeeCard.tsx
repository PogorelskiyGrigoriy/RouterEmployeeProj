import { Box, HStack, Spacer } from "@chakra-ui/react";
import { EmployeeIdentity } from "./ui/DataDisplay";
import { DeleteEmployeeAction } from "./DeleteEmployeeAction";
import { EditEmployeeAction } from "./EditEmployeeAction";
import { EmployeeDetailsDialog } from "./EmployeeDetailsDialog"; // Импорт
import type { Employee } from "@/models/Employee";
import { useRef } from "react";

interface EmployeeCardProps {
  employee: Employee;
  isAdmin: boolean;
}

export const EmployeeCard = ({ employee, isAdmin }: EmployeeCardProps) => {
  // Используем хак с useRef, чтобы клик по карточке триггерил клик по шеврону внутри модалки
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <Box
      p="4"
      bg="bg.panel"
      borderWidth="1px"
      borderRadius="2xl"
      boxShadow="sm"
      _active={{ bg: "blackAlpha.50", transform: "scale(0.98)" }}
      transition="all 0.2s"
      cursor="pointer"
      // Клик по всей карточке "нажимает" на скрытый триггер модалки
      onClick={() => triggerRef.current?.click()}
    >
      <HStack gap="4">
        <EmployeeIdentity name={employee.fullName} avatar={employee.avatar} />
        
        <Spacer />

        <HStack gap="1" onClick={(e) => e.stopPropagation()}>
          {isAdmin && (
            <>
              <EditEmployeeAction employee={employee} />
              <DeleteEmployeeAction id={employee.id} name={employee.fullName} />
            </>
          )}
          
          {/* Наш новый компонент с деталями */}
          <Box ref={triggerRef}>
            <EmployeeDetailsDialog employee={employee} />
          </Box>
        </HStack>
      </HStack>
    </Box>
  );
};