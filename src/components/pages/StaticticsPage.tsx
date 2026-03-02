import {
  Box,
  Heading,
  VStack,
  HStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Outlet, NavLink } from "react-router-dom";
import { STATS_NAV_LINKS } from "@/config/navigation";

const StatisticsPage = () => {
  return (
    <VStack align="stretch" gap="6">
      <Box>
        <Heading size="xl" mb="4">
          Аналитика и Статистика
        </Heading>

        <HStack gap="4" mb="4">
          {STATS_NAV_LINKS.map((link) => (
            <ChakraLink
              key={link.to}
              asChild
              variant="plain"
              px="3"
              py="1"
              borderRadius="md"
              color="gray.600"
              _hover={{ bg: "gray.100" }}
              css={{
                "&.active": {
                  bg: "gray.200",
                  color: "black",
                  fontWeight: "semibold",
                },
              }}
            >
              <NavLink to={link.to}>{link.label}</NavLink>
            </ChakraLink>
          ))}
        </HStack>
      </Box>

      <Box
        p="6"
        bg="white"
        borderRadius="lg"
        boxShadow="sm"
        border="1px solid"
        borderColor="gray.200"
      >
        <Outlet />
      </Box>
    </VStack>
  );
};

export default StatisticsPage;
