/**
 * @module DeleteEmployeeAction
 * A confirmation dialog for deleting an employee.
 */

import { useState } from "react";
import { IconButton, Button } from "@chakra-ui/react";
import { LuTrash2 } from "react-icons/lu";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useDeleteEmployee } from "@/services/hooks/mutationHooks/useDeleteEmployee";

interface Props {
  id: string;
  name: string;
}

export const DeleteEmployeeAction = ({ id, name }: Props) => {
  const [open, setOpen] = useState(false);
  
  // 1. Используем onSuccess для закрытия диалога
  const { mutate: deleteEmp, isPending } = useDeleteEmployee();

  const handleDelete = () => {
    deleteEmp(id, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <DialogRoot 
      role="alertdialog" 
      placement="center" 
      open={open} 
      onOpenChange={(e) => setOpen(e.open)}
    >
      <DialogTrigger asChild>
        <IconButton 
          variant="ghost" 
          colorPalette="red" 
          size="sm" 
          disabled={isPending}
          aria-label="Delete employee"
        >
          <LuTrash2 />
        </IconButton>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        
        <DialogBody color="fg.muted">
          Are you sure you want to delete <strong>{name}</strong>? 
          This action cannot be undone.
        </DialogBody>
        
        <DialogFooter mt="4">
          <DialogActionTrigger asChild>
            <Button variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button 
            colorPalette="red" 
            loading={isPending} 
            onClick={handleDelete}
          >
            Delete Employee
          </Button>
        </DialogFooter>
        
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};