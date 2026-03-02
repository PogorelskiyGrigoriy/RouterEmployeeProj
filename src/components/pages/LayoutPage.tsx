import { Box, VStack } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import Navbar from "../NavBar"
const LayoutPage = () => {
  return (
    <VStack align="stretch" gap="0">
      <Navbar />
      
      <Box p="6">
        <Outlet />
      </Box>
    </VStack>
  )
}

export default LayoutPage