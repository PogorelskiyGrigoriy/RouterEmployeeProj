import { Box, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "../NavBar";

const LayoutPage = () => {
  return (
    // minH="100vh" гарантирует футер внизу, но не дает лишнего места
    <VStack align="stretch" gap="0" minH="100vh" bg="bg.canvas">
      <Navbar />

      <Box 
        // Уменьшаем отступы на мобилках до минимума (base: 2)
        px={{ base: "2", md: "6" }} 
        py={{ base: "4", md: "6" }}
        w="100%"
        maxW="100vw"
        flex="1" // Занимает всё оставшееся пространство без лишних дыр
      >
        <Outlet />
      </Box>
    </VStack>
  );
};

export default LayoutPage;