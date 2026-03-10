"use client";

import { 
  HStack, 
  Link as ChakraLink, 
  Spacer, 
  Box, 
  Button, 
  Text,
  Separator,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { MAIN_NAV_LINKS, ROUTES } from "@/config/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useLogout } from "@/services/hooks/authHooks/useLogout";
import StatisticsSelector from "./StatisticsSelector";

const Navbar = () => {
  const { user, isAuthenticated } = useAuthStore();
  
  // Используем мутацию для выхода
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout();
  };

  // Фильтруем ссылки: показываем только те, роли которых совпадают с ролью юзера
  const visibleLinks = MAIN_NAV_LINKS.filter((link) =>
    isAuthenticated && user ? link.roles.includes(user.role) : false
  );

  return (
    <HStack 
      as="nav" 
      wrap="nowrap" 
      justify="space-between" 
      p={{ base: "2", md: "4" }} 
      bg="white" 
      borderBottom="1px solid" 
      borderColor="gray.200"
      position="sticky"
      top="0"
      zIndex="10"
    >
      <HStack gap={{ base: "3", md: "6" }}>
        {/* 1. Если НЕ авторизован: ссылка на Login */}
        {!isAuthenticated ? (
          <ChakraLink asChild variant="plain" color="blue.600" fontWeight="600">
            <NavLink to={ROUTES.LOGIN}>Login</NavLink>
          </ChakraLink>
        ) : (
          /* 2. Если АВТОРИЗОВАН: системные ссылки */
          visibleLinks.map((link) => (
            <ChakraLink 
              key={link.to} 
              asChild 
              variant="plain" 
              color="gray.700" 
              fontSize={{ base: "xs", md: "sm" }}
              _hover={{ color: "blue.600" }}
              css={{ 
                "&.active": { 
                  fontWeight: "700", 
                  color: "blue.700",
                  borderBottom: "2px solid", 
                  borderColor: "blue.700", 
                  pb: "1" 
                } 
              }}
            >
              <NavLink to={link.to}>{link.label}</NavLink>
            </ChakraLink>
          ))
        )}
      </HStack>

      <Spacer />

      {/* Правая часть: данные пользователя */}
      {isAuthenticated && user && (
        <HStack gap={{ base: "2", md: "4" }}>
          {/* Адаптивное отображение имени (мобилки/десктоп) */}
          <Box textAlign="right" hideFrom="md">
             <Text fontSize="xs" fontWeight="bold" lineHeight="1">{user.username}</Text>
             <Text fontSize="2xs" color="gray.500">{user.role}</Text>
          </Box>
          
          <Box hideBelow="md">
            <Text fontSize="sm" color="gray.700">
              Logged as: <b>{user.username}</b> ({user.role})
            </Text>
          </Box>

          <Separator orientation="vertical" height="24px" />

          {/* Селектор статистики */}
          <Box maxW={{ base: "120px", md: "auto" }}>
            <StatisticsSelector />
          </Box>

          {/* Кнопка Logout с индикацией загрузки */}
          <Button 
            size="sm" 
            variant="ghost" 
            colorPalette="red" 
            onClick={handleLogout}
            disabled={isPending}
          >
            {isPending ? "Exiting..." : "Logout"}
          </Button>
        </HStack>
      )}
    </HStack>
  );
};

export default Navbar;