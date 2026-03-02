import { HStack, Link as ChakraLink, Spacer } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { MAIN_NAV_LINKS } from "@/config/navigation";
import StatisticsSelector from "./StatisticsSelector";

const Navbar = () => {
  return (
    <HStack
      as="nav"
      gap="5"
      p="4"
      bg="gray.50"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      {MAIN_NAV_LINKS.map((link) => (
        <ChakraLink
          key={link.to}
          asChild
          variant="plain"
          color="blue.700"
          css={{
            "&.active": {
              color: "blue.700", 
              fontWeight: "700",
              borderBottom: "2px solid", 
              borderColor: "blue.700",
              pb: "1",
            },
          }}
        >
          <NavLink to={link.to}>{link.label}</NavLink>
        </ChakraLink>
      ))}

      <Spacer />

      <StatisticsSelector />
    </HStack>
  );
};

export default Navbar;
