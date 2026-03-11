/**
 * @module Navbar
 * Sticky header providing navigation and user session controls.
 */

"use client";

import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { 
  HStack, 
  Link as ChakraLink, 
  Spacer, 
  Box, 
  Button, 
  Text,
  Separator,
  Stack,
} from "@chakra-ui/react";

import { StatisticsSelector } from "./StatisticsSelector";
import { useAuthStore } from "@/store/useAuthStore";
import { useLogout } from "@/services/hooks/authHooks/useLogout";
import { MAIN_NAV_LINKS, ROUTES } from "@/config/navigation";

export const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { mutate: logout, isPending } = useLogout();

  const visibleLinks = useMemo(() => {
    if (!isAuthenticated || !user) return [];
    return MAIN_NAV_LINKS.filter((link) => link.roles.includes(user.role));
  }, [isAuthenticated, user]);

  return (
    <HStack 
      as="nav" 
      justify="space-between" 
      px={{ base: "4", md: "6" }} 
      py="3"
      bg="bg.panel" 
      borderBottomWidth="1px" 
      borderColor="border.subtle"
      position="sticky"
      top="0"
      zIndex="sticky"
    >
      <HStack gap={{ base: "4", md: "8" }}>
        {!isAuthenticated ? (
          <ChakraLink asChild variant="plain" fontWeight="bold" color="blue.600">
            <NavLink to={ROUTES.LOGIN}>Sign In</NavLink>
          </ChakraLink>
        ) : (
          visibleLinks.map((link) => (
            <ChakraLink 
              key={link.to} 
              asChild 
              variant="plain"
              fontSize="sm"
              fontWeight="medium"
              // Используем css prop для безопасной стилизации активного класса NavLink
              css={{
                "&.active": {
                  color: "blue.600",
                  fontWeight: "bold",
                  position: "relative",
                  _after: {
                    content: '""',
                    position: "absolute",
                    bottom: "-12px", // Выравниваем под чертой навбара
                    left: 0,
                    width: "100%",
                    height: "2px",
                    bg: "blue.600",
                  }
                }
              }}
            >
              <NavLink to={link.to}>{link.label}</NavLink>
            </ChakraLink>
          ))
        )}
      </HStack>

      <Spacer />

      {isAuthenticated && user && (
        <HStack gap={{ base: "3", md: "5" }}>
          <Box maxW={{ base: "100px", md: "200px" }}>
            <StatisticsSelector />
          </Box>

          <Separator orientation="vertical" height="20px" />

          <Stack gap="0" align="flex-end" hideBelow="sm">
            <Text fontSize="xs" fontWeight="bold" lineHeight="tight">
              {user.username}
            </Text>
            <Text fontSize="10px" color="fg.muted" textTransform="uppercase">
              {user.role}
            </Text>
          </Stack>

          <Button 
            size="xs" 
            variant="subtle" 
            colorPalette="red" 
            onClick={() => logout()}
            loading={isPending}
            px="3"
          >
            Logout
          </Button>
        </HStack>
      )}
    </HStack>
  );
};