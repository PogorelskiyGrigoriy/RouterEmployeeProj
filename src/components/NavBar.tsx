"use client";

import { 
  HStack, 
  Link as ChakraLink, 
  Spacer, 
  Box, 
  Button, 
  Text,
  Separator
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { MAIN_NAV_LINKS, ROUTES } from "@/config/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import StatisticsSelector from "./StatisticsSelector";

const Navbar = () => {
  const { user, isAuthenticated, setLogout } = useAuthStore();
  const navigate = useNavigate();

  // Функция выхода
  const handleLogout = () => {
    setLogout();
    navigate(ROUTES.LOGIN);
  };

  // Фильтруем основные ссылки на основе роли (из твоего нового конфига)
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
      sticky="top"
      zIndex="10"
    >
      <HStack gap={{ base: "3", md: "6" }}>
        {/* 1. Если НЕ авторизован: показываем только ссылку на Логин */}
        {!isAuthenticated ? (
          <ChakraLink asChild variant="plain" color="blue.600" fontWeight="600">
            <NavLink to={ROUTES.LOGIN}>Login</NavLink>
          </ChakraLink>
        ) : (
          /* 2. Если АВТОРИЗОВАН: показываем ссылки согласно роли */
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

      {/* Правая часть: данные пользователя и селектор статистики */}
      {isAuthenticated && user && (
        <HStack gap={{ base: "2", md: "4" }}>
          {/* Отображение имени и роли */}
          <VStack align="flex-end" gap="0" hideFrom="md">
             <Text fontSize="xs" fontWeight="bold">{user.username}</Text>
             <Text fontSize="2xs" color="gray.500">{user.role}</Text>
          </VStack>
          
          <Box hideBelow="md">
            <Text fontSize="sm">
              Logged as: <b>{user.username}</b> ({user.role})
            </Text>
          </Box>

          <Separator orientation="vertical" height="24px" />

          {/* Селектор статистики */}
          <Box maxW={{ base: "120px", md: "auto" }}>
            <StatisticsSelector />
          </Box>

          {/* Кнопка Logout */}
          <Button 
            size="sm" 
            variant="ghost" 
            colorPalette="red" 
            onClick={handleLogout}
          >
            Logout
          </Button>
        </HStack>
      )}
    </HStack>
  );
};

// Вспомогательный компонент VStack для компактности (если не импортирован)
const VStack = ({ children, ...props }: any) => (
  <Box display="flex" flexDirection="column" {...props}>{children}</Box>
);

export default Navbar;