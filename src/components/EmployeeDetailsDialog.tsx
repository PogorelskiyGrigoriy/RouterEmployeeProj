import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconButton, VStack, HStack, Text, Separator, Box } from "@chakra-ui/react";
import { LuChevronRight, LuBriefcase, LuCalendar, LuWallet } from "react-icons/lu";
import { EmployeeIdentity, CurrencyText, DateText, DeptBadge } from "./ui/DataDisplay";
import { calculateAge } from "@/utils/dateUtils";
import type { Employee } from "@/models/Employee";

interface Props {
  employee: Employee;
}

export const EmployeeDetailsDialog = ({ employee }: Props) => {
  return (
    <DialogRoot motionPreset="slide-in-bottom" size="sm">
      <DialogTrigger asChild>
        <IconButton
          aria-label="View details"
          variant="ghost"
          size="sm"
          color="fg.muted"
        >
          <LuChevronRight size="24" />
        </IconButton>
      </DialogTrigger>

      <DialogContent borderRadius="2xl" pb="4">
        <DialogHeader>
          <DialogTitle>Employee Profile</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <VStack align="stretch" gap="6">
            {/* Секция с аватаром и именем */}
            <Box py="2">
              <EmployeeIdentity name={employee.fullName} avatar={employee.avatar} />
            </Box>

            <Separator />

            {/* Детальная информация */}
            <VStack align="stretch" gap="4">
              <InfoRow 
                icon={<LuBriefcase size="18" />} 
                label="Department" 
                value={<DeptBadge>{employee.department}</DeptBadge>} 
              />
              
              <InfoRow 
                icon={<LuCalendar size="18" />} 
                label="Birth Date" 
                value={
                  <VStack align="end" gap="0">
                    <DateText dateString={employee.birthDate} />
                    <Text fontSize="xs" color="fg.muted">
                      {calculateAge(employee.birthDate)} years old
                    </Text>
                  </VStack>
                } 
              />

              <InfoRow 
                icon={<LuWallet size="18" />} 
                label="Monthly Salary" 
                value={<CurrencyText value={employee.salary} />} 
              />
            </VStack>
          </VStack>
        </DialogBody>

        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

// Вспомогательный компонент для строк инфо
const InfoRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: React.ReactNode }) => (
  <HStack justify="space-between" width="full">
    <HStack color="fg.muted" gap="2">
      {icon}
      <Text fontSize="sm">{label}</Text>
    </HStack>
    <Box fontWeight="medium">{value}</Box>
  </HStack>
);