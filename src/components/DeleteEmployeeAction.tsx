import { IconButton } from "@chakra-ui/react";
import { LuTrash2 } from "react-icons/lu";
import { useDeleteEmployee } from "@/services/hooks/mutationHooks/useDeleteEmployee";
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
import { Button } from "@chakra-ui/react";

export const DeleteEmployeeAction = ({ id, name }: { id: string, name: string }) => {
  const { mutate: deleteEmp, isPending } = useDeleteEmployee();

  return (
    <DialogRoot role="alertdialog" placement="center">
      <DialogTrigger asChild>
        <IconButton variant="ghost" colorPalette="red" size="sm" disabled={isPending}>
          <LuTrash2 />
        </IconButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Подтвердите удаление</DialogTitle>
        </DialogHeader>
        <DialogBody>
          Вы уверены, что хотите удалить сотрудника <strong>{name}</strong>? 
          Это действие нельзя будет отменить.
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Отмена</Button>
          </DialogActionTrigger>
          <Button 
            colorPalette="red" 
            loading={isPending} 
            onClick={() => deleteEmp(id)}
          >
            Удалить
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};