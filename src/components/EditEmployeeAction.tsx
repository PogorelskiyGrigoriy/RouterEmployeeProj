"use client"

import { useState } from "react";
import { IconButton, Box } from "@chakra-ui/react";
import { LuPencil } from "react-icons/lu";
import { 
  DrawerBackdrop, 
  DrawerBody, 
  DrawerCloseTrigger, 
  DrawerContent, 
  DrawerHeader, 
  DrawerRoot, 
  DrawerTitle, 
  DrawerTrigger 
} from "@/components/ui/drawer"; 
import { EmployeeForm } from "./EmployeeForm";
import { useUpdateEmployee } from "@/services/hooks/mutationHooks/useUpdateEmployee";
import { toaster } from "@/components/ui/toaster-config";
import type { Employee, NewEmployee } from "@/models/Employee";

export const EditEmployeeAction = ({ employee }: { employee: Employee }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useUpdateEmployee();

  const handleUpdate = (data: NewEmployee) => {
    mutate(
      { id: employee.id, fields: data },
      {
        onSuccess: () => {
          toaster.create({
            title: "Employee updated",
            description: `${data.fullName} has been successfully modified.`,
            type: "success",
          });
          setIsOpen(false);
        },
      }
    );
  };

  return (
    <DrawerRoot 
      open={isOpen} 
      onOpenChange={(e) => setIsOpen(e.open)} 
      // Адаптивное расположение: снизу на мобилках, справа на ПК
      placement={{ base: "bottom", md: "end" }}
      // Адаптивный размер: md на мобилках, xs (узкий) на ПК
      size={{ base: "md", md: "xs" }}
    >
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <IconButton variant="ghost" colorPalette="blue" size="sm" aria-label="Edit employee">
          <LuPencil />
        </IconButton>
      </DrawerTrigger>
      
      <DrawerContent 
        // Скругления сверху для мобильного вида "шторки"
        borderTopRadius={{ base: "2xl", md: "none" }}
        // Ограничение высоты на мобильных, чтобы видеть контекст таблицы
        maxH={{ base: "85vh", md: "100vh" }}
      >
        {/* Декоративная полоска-индикатор для мобилок (Drag handle) */}
        <Box 
          display={{ base: "block", md: "none" }} 
          width="40px" 
          height="4px" 
          bg="gray.300" 
          borderRadius="full" 
          margin="12px auto 0" 
        />

        <DrawerHeader>
          <DrawerTitle>Edit Employee Profile</DrawerTitle>
        </DrawerHeader>

        <DrawerBody pb="8">
          <EmployeeForm 
            employee={employee} 
            onSubmit={handleUpdate} 
            isLoading={isPending}
            onCancel={() => setIsOpen(false)}
          />
        </DrawerBody>
        
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};