import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import { Center, VStack, Heading, Text, Button } from "@chakra-ui/react";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = "Oops!";
  let message = "Something went wrong.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "404 - Not Found";
      message = "The page you are looking for doesn't exist.";
    } else if (error.status === 500) {
      title = "500 - Server Error";
      message = "Our servers are having a bad day. We'll be back soon.";
    }
  }

  return (
    <Center h="100vh" p="6">
      <VStack gap="6" textAlign="center">
        <Heading size="2xl" color="red.500">{title}</Heading>
        <Text fontSize="lg" color="fg.muted">{message}</Text>
        <Button 
          colorScheme="blue" 
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </VStack>
    </Center>
  );
};

export default ErrorPage;