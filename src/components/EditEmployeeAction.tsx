"use client"

import { useState } from "react";
import { IconButton } from "@chakra-ui/react";
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
    <DrawerRoot open={isOpen} onOpenChange={(e) => setIsOpen(e.open)} size="md">
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <IconButton variant="ghost" colorPalette="blue" size="sm" aria-label="Edit employee">
          <LuPencil />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Employee Profile</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
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