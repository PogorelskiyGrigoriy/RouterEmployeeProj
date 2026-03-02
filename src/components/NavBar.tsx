import { HStack, Link as ChakraLink } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { NAV_LINKS } from "@/config/navigation" // Импортируем конфиг

const Navbar = () => {
  return (
    <HStack as="nav" gap="5" p="4" bg="gray.50" borderBottom="1px solid" borderColor="gray.200">
      {NAV_LINKS.map((link) => (
        <ChakraLink 
          key={link.to} 
          asChild 
          variant="plain" 
          color="red.800" 
          _hover={{ color: "red.500" }}
        >
          {/* NavLink автоматически добавит класс .active, если путь совпадает */}
          <NavLink to={link.to}>
            {link.label}
          </NavLink>
        </ChakraLink>
      ))}
    </HStack>
  )
}

export default Navbar