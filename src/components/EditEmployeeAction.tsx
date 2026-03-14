/**
 * @module EditEmployeeAction
 * Drawer-based action to modify employee information.
 * Uses Zod types for consistent update payloads.
 */

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
import type { Employee, NewEmployee } from "@/schemas/employee.schema";

interface Props {
  employee: Employee;
}

export const EditEmployeeAction = ({ employee }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useUpdateEmployee();

  const handleUpdate = (formData: NewEmployee) => {
    mutate(
      { 
        id: employee.id, 
        changes: formData // formData соответствует NewEmployee, что валидно для изменений
      }, 
      {
        onSuccess: () => {
          toaster.create({
            title: "Changes saved",
            description: `${formData.fullName} profile updated.`,
            type: "success",
          });
          setIsOpen(false);
        },
        onError: (error) => {
          toaster.create({
            title: "Update Failed",
            description: error.message || "Could not save changes",
            type: "error",
          });
        }
      }
    );
  };

  return (
    <DrawerRoot 
      open={isOpen} 
      onOpenChange={(e) => setIsOpen(e.open)} 
      placement={{ base: "bottom", md: "end" }}
      size={{ base: "full", md: "xs" }}
    >
      <DrawerBackdrop />
      
      <DrawerTrigger asChild>
        <IconButton 
          variant="ghost" 
          colorPalette="blue" 
          size="sm" 
          aria-label="Edit employee"
          disabled={isPending}
        >
          <LuPencil />
        </IconButton>
      </DrawerTrigger>
      
      <DrawerContent 
        borderTopRadius={{ base: "2xl", md: "none" }}
        maxH={{ base: "90vh", md: "100vh" }}
      >
        <Box 
          display={{ base: "block", md: "none" }} 
          w="10" h="1" bg="border" borderRadius="full" 
          mx="auto" mt="3" 
        />

        <DrawerHeader>
          <DrawerTitle>Edit Profile</DrawerTitle>
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