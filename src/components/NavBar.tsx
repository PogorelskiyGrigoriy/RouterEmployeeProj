import { HStack, Link as ChakraLink } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { MAIN_NAV_LINKS } from "@/config/navigation";

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
          color="red.800"
          _hover={{ color: "red.600" }}
          // Используем css-проп для стилизации класса .active,
          // который NavLink добавляет автоматически
          css={{
            "&.active": {
              color: "red.500",
              fontWeight: "bold",
            },
          }}
        >
          <NavLink to={link.to}>{link.label}</NavLink>
        </ChakraLink>
      ))}
    </HStack>
  );
};

export default Navbar;
