/**
 * @module ErrorPage
 * The ultimate fallback for the application.
 * Handles Router 404s, Axios 500s, and JS/Zod runtime crashes.
 */

"use client";

import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import {
  Center, VStack, Heading, Text, Button,
  Code, Box, IconButton, useClipboard, HStack
} from "@chakra-ui/react";
import { LuHouse, LuRefreshCw, LuCopy, LuCheck, LuCircleAlert } from "react-icons/lu";
import axios from "axios";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  // Initial state for error messaging
  let statusCode = "Error";
  let title = "Oops! Something went wrong";
  let description = "An unexpected error has occurred in the application.";
  let debugMessage = "";

  // 1. Parse different error types (Router, API, or Runtime)
  if (isRouteErrorResponse(error)) {
    // Handling Routing errors (e.g., 404 Not Found)
    statusCode = error.status.toString();
    if (error.status === 404) {
      title = "Page Not Found";
      description = "Sorry, we couldn't find the page you are looking for.";
    }
    debugMessage = error.statusText || JSON.stringify(error.data);
  } else if (axios.isAxiosError(error)) {
    // Handling API errors (500+) passed from axios interceptor
    statusCode = error.response?.status?.toString() || "API";
    title = "Server Error";
    description = "Our servers are having a moment. Please try again later.";
    debugMessage = error.message;
  } else if (error instanceof Error) {
    // Handling Logic crashes or Zod validation errors
    title = "Application Error";
    description = "An internal error occurred while processing data.";
    debugMessage = error.stack || error.message;
  }

  // 2. Clipboard functionality for debugging logs
  const clipboard = useClipboard({ value: debugMessage || statusCode });

  return (
    <Center h="100vh" p="6" bg="bg.canvas">
      <VStack gap="8" maxW="lg" textAlign="center">
        {/* Error Icon */}
        <Box color="red.500">
          <LuCircleAlert size="64" />
        </Box>

        {/* Text Content */}
        <VStack gap="2">
          <Heading size="3xl" letterSpacing="tight">
            {statusCode !== "Error" && `${statusCode}: `}{title}
          </Heading>
          <Text fontSize="lg" color="fg.muted">
            {description}
          </Text>
        </VStack>

        {/* Action Buttons */}
        <HStack gap="4">
          <Button
            variant="solid"
            onClick={() => navigate("/")}
          >
            <LuHouse /> Back to Home
          </Button>

          <Button
            variant="outline"
            onClick={() => window.location.reload()}
          >
            <LuRefreshCw /> Refresh Page
          </Button>
        </HStack>

        {/* Debugging Section for Support */}
        <Box w="full" mt="4">
          <HStack justify="center" mb="2">
            <Text fontSize="xs" color="fg.subtle" fontWeight="bold">
              DETAILS FOR SUPPORT
            </Text>
            <IconButton
              aria-label="Copy error"
              size="xs"
              variant="ghost"
              onClick={clipboard.copy}
            >
              {clipboard.copied ? <LuCheck /> : <LuCopy />}
            </IconButton>
          </HStack>
          <Code
            display="block"
            p="4"
            borderRadius="md"
            fontSize="xs"
            textAlign="left"
            whiteSpace="pre-wrap"
            maxH="200px"
            overflowY="auto"
            w="full"
          >
            {debugMessage || "No additional logs available"}
          </Code>
        </Box>
      </VStack>
    </Center>
  );
};

export default ErrorPage;