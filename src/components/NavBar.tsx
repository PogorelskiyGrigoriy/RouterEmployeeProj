"use client";

import { HStack, Link as ChakraLink, Spacer, Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { MAIN_NAV_LINKS } from "@/config/navigation";
import StatisticsSelector from "./StatisticsSelector";

const Navbar = () => {
  return (
    <HStack
      as="nav"
      // nowrap предотвращает развал шапки на две строки
      wrap="nowrap" 
      justify="space-between"
      gap={{ base: "2", md: "5" }}
      p={{ base: "2", md: "4" }}
      bg="gray.50"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <HStack gap={{ base: "2", md: "5" }} flexShrink={0}>
        {MAIN_NAV_LINKS.map((link) => (
          <ChakraLink
            key={link.to}
            asChild
            variant="plain"
            color="blue.700"
            // Уменьшаем шрифт на мобилках до 12px (xs)
            fontSize={{ base: "xs", md: "sm" }}
            css={{
              "&.active": {
                fontWeight: "700",
                borderBottom: "2px solid", 
                borderColor: "blue.700",
                pb: "0.5",
              },
            }}
          >
            <NavLink to={link.to}>{link.label}</NavLink>
          </ChakraLink>
        ))}
      </HStack>

      <Spacer display={{ base: "none", sm: "block" }} />

      <Box 
        // Ограничиваем ширину селектора, чтобы он не выталкивал ссылки
        maxW={{ base: "130px", md: "auto" }}
      >
        <StatisticsSelector />
      </Box>
    </HStack>
  );
};

export default Navbar;