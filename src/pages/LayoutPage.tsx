/**
 * @module LayoutPage
 * Root layout component that provides a consistent structure across the app.
 */

"use client";

import { Box, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/NavBar";

export const LayoutPage = () => {
  return (
    <VStack 
      align="stretch" 
      gap="0" 
      minH="100vh" 
      bg="bg.canvas" 
    >
      {/* Top navigation - Sticky by default inside its component */}
      <Navbar />

      {/* Main Content Area */}
      <Box 
        as="main"
        w="full"
        flex="1" // Заставляет контент растягиваться, прижимая футер (если он будет) вниз
        display="flex"
        flexDirection="column"
      >
        <Outlet />
      </Box>

      {/* Здесь можно добавить Footer, если потребуется в будущем */}
    </VStack>
  );
};

export default LayoutPage;