import {useEffect,type ReactNode, useState} from 'react'
import { Navigate, useRouteError } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import {Text, Box, Button} from "@chakra-ui/react"
type ErrorTextProps = {
    children: ReactNode
}
const ErrorText = ({children}: ErrorTextProps) => 
    <Text color="red" fontSize="2rem"> {children}</Text>
    

const ErrorPage = () => {
    const error = useRouteError()
    const logout = useAuthStore(s => s.setLogout)//function to call for 401, 403 processing
    const queryClient = useQueryClient() //for invalidation od f cache
    const [homeNavigation, setHomeNavigation] = useState<boolean>(false)
    const [loginNavigation, setLoginNavigation] = useState<boolean> (false)
    const authErrors: any[] = [401, 403]
    const knownError: any[] = authErrors.concat([404])

    const isAxiosError = error instanceof AxiosError
   
    useEffect(() => {
        if (isAxiosError){
            const status = error.response?.status
            if (authErrors.includes(status)){
                logout();
                setLoginNavigation(true)
            } else if (status == 404){
                queryClient.invalidateQueries({queryKey: ["employees"]})
                setHomeNavigation(true)
            }

        }
    },[error])
   
    if (!isAxiosError) {
        const message = (error as any).message || JSON.stringify(error)
        return <ErrorText>Unknown Error not from the server: {message}</ErrorText>
    }
    return <>
    {homeNavigation && <Navigate to="/"></Navigate>}
    {loginNavigation && <Navigate to="/"></Navigate>}
    {error.response && !knownError.includes(error.response.status) && <ErrorText>Unknown error {error.message}</ErrorText>}
     {!error.response && <Box>
        <ErrorText>Server is unavailable, retry later on</ErrorText>
        <Button onClick={()=> setHomeNavigation(true)}>Return to Home Page</Button>
        </Box>}
    </>
}

export default ErrorPage