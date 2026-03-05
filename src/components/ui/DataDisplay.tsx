// DataDisplay.tsx

// src/components/ui/DataDisplay.tsx
import { Badge, Text, type BadgeProps, HStack, Avatar as ChakraAvatar } from "@chakra-ui/react"

/** * КОМПОНЕНТЫ ДЛЯ СТАТИСТИКИ 
 */

// Бейдж для количества сотрудников (используется в DepartmentsTable)
export const CountBadge = ({ value, ...props }: { value: number } & BadgeProps) => (
  <Badge variant="subtle" colorPalette="blue" px="2" borderRadius="md" {...props}>
    {value}
  </Badge>
)

// Форматирование возраста (используется в DepartmentsTable)
export const AgeText = ({ value }: { value: number }) => (
  <Text color="gray.600">
    {value > 0 ? `${value} years` : "—"}
  </Text>
)

/** * КОМПОНЕНТЫ ДЛЯ ТАБЛИЦЫ СОТРУДНИКОВ (ОБЩИЕ) 
 */

// Универсальное форматирование валюты
export const CurrencyText = ({ value }: { value: number }) => (
  <Text color="green.600" fontWeight="bold" fontFamily="mono">
    {new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD', 
      maximumFractionDigits: 0 
    }).format(value)}
  </Text>
)

// Форматирование даты рождения (используется в Employees)
export const DateText = ({ dateString }: { dateString: string }) => {
  const formatted = new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return <Text color="fg.muted" fontSize="sm">{formatted}</Text>
}

// Компонент личности сотрудника (Avatar + Name)
export const EmployeeIdentity = ({ name, avatar }: { name: string, avatar?: string }) => (
  <HStack gap="3">
    <ChakraAvatar.Root size="sm">
      <ChakraAvatar.Fallback name={name} />
      <ChakraAvatar.Image src={avatar} alt={name} />
    </ChakraAvatar.Root>
    <Text fontWeight="medium" fontSize={{ base: "xs", md: "sm" }}>
      {name}
    </Text>
  </HStack>
)

// Бейдж отдела (теперь используем везде для консистентности)
export const DeptBadge = ({ children }: { children: React.ReactNode }) => (
  <Badge variant="subtle" colorPalette="blue" size="xs" px="2">
    {children}
  </Badge>
)