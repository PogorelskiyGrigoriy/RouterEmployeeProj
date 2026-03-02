import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"

const LayoutPage = () => {
  return (
    <div>
        <ul>
            <li><a href="/">home</a></li>
            <li><a href="/statistics/age">age statistics</a></li>
            <li><a href="/statistics/salary">salary statistics</a></li>
            <li><a href="/statistics/department">department statistics</a></li>
            <li><a href="/add-employee">add employee</a></li>
        </ul>
        <Box marginTop={"4vh"}>
            <Outlet></Outlet>
        </Box>
        </div>
  )
}

export default LayoutPage