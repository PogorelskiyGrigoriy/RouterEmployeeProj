import useEmployees from "@/services/hooks/useEmployees"
import { Spinner } from "@chakra-ui/react"

const Employees = () => {
    const {employees, isLoading} = useEmployees()
  return (
    <>
    {isLoading && <Spinner></Spinner> }
    <ul>
        {employees.map(empl => <li key={empl.id}>{JSON.stringify(empl)}</li>)}
    </ul>
    </>
  )
}

export default Employees