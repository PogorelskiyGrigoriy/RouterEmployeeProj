import { Box, HStack, Spacer } from "@chakra-ui/react";
import { EmployeeIdentity } from "./ui/DataDisplay";
import { DeleteEmployeeAction } from "./DeleteEmployeeAction";
import { EditEmployeeAction } from "./EditEmployeeAction";
import { EmployeeDetailsDialog } from "./EmployeeDetailsDialog";
import type { Employee } from "@/schemas/employee.schema";
import { useRef } from "react";

interface EmployeeCardProps {
  employee: Employee;
  isAdmin: boolean;
}

export const EmployeeCard = ({ employee, isAdmin }: EmployeeCardProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <Box
      p={{ base: "3", sm: "4" }} // Уменьшаем паддинг на самых маленьких экранах
      bg="bg.panel"
      borderWidth="1px"
      borderRadius="2xl"
      boxShadow="sm"
      _active={{ bg: "blackAlpha.50", transform: "scale(0.98)" }}
      transition="all 0.2s"
      cursor="pointer"
      onClick={() => triggerRef.current?.click()}
      overflow="hidden" // Гарантируем, что ничего не вылезет за границы
    >
      <HStack gap={{ base: "2", sm: "4" }} width="full">
        {/* Обертка для идентичности, чтобы текст мог сокращаться */}
        <Box minW="0" flex="1">
          <EmployeeIdentity name={employee.fullName} avatar={employee.avatar} />
        </Box>
        
        <Spacer />

        <HStack gap="0" flexShrink={0} onClick={(e) => e.stopPropagation()}>
          {isAdmin && (
            <>
              <EditEmployeeAction employee={employee} />
              <DeleteEmployeeAction id={employee.id} name={employee.fullName} />
            </>
          )}
          
          <Box ref={triggerRef}>
            <EmployeeDetailsDialog employee={employee} />
          </Box>
        </HStack>
      </HStack>
    </Box>
  );
};