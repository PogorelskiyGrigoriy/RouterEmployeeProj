/**
 * @module LoginPage
 * Dedicated authentication page with credential support and error handling.
 */

"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  Box,
  Button,
  Fieldset,
  Input,
  Stack,
  Text,
  Alert,
  VStack,
  Container
} from "@chakra-ui/react";

import { Field } from "@/components/ui/field";
import { useLogin } from "@/services/hooks/authHooks/useLogin";
import type { LoginData } from "@/schemas/auth.schema";

const LoginPage = () => {
  // 1. Logic & Hooks
  const { mutate, isPending, error, isError, reset: resetMutation } = useLogin();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginData>({
    mode: "onBlur"
  });

  // 2. UX: Clear API errors when user modifies input
  const [email, password] = watch(["email", "password"]);
  useEffect(() => {
    if (isError) resetMutation();
  }, [email, password, isError, resetMutation]);

  const onSubmit = (data: LoginData) => {
    mutate(data);
  };

  return (
    <Container maxW="lg" py={{ base: "12", md: "24" }}>
      <Box
        maxW="400px"
        mx="auto"
        p={{ base: "6", md: "10" }}
        borderWidth="1px"
        borderColor="border.subtle"
        borderRadius="2xl"
        boxShadow="sm"
        bg="bg.panel"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset.Root size="lg">
            <Stack gap="6">
              <Box textAlign="center">
                <Fieldset.Legend fontSize="3xl" fontWeight="bold" letterSpacing="tight">
                  Login
                </Fieldset.Legend>
                <Fieldset.HelperText color="fg.muted">
                  Access the Team Directory dashboard
                </Fieldset.HelperText>
              </Box>

              {/* API Error Feedback */}
              {isError && (
                <Alert.Root status="error" variant="subtle" borderRadius="md">
                  <Alert.Indicator />
                  <Alert.Content>
                    <Alert.Title fontSize="xs">
                      {error instanceof Error ? error.message : "Authentication failed"}
                    </Alert.Title>
                  </Alert.Content>
                </Alert.Root>
              )}

              <Stack gap="4">
                <Field
                  label="Email"
                  invalid={!!errors.email}
                  errorText={errors.email?.message}
                >
                  <Input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    type="email"
                    autoComplete="email"
                    placeholder="admin@tel-ran.com"
                    disabled={isPending}
                  />
                </Field>

                <Field
                  label="Password"
                  invalid={!!errors.password}
                  errorText={errors.password?.message}
                >
                  <Input
                    {...register("password", { required: "Password is required" })}
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    disabled={isPending}
                  />
                </Field>
              </Stack>

              <Button
                type="submit"
                colorPalette="blue"
                width="full"
                size="lg"
                loading={isPending}
              >
                Sign In
              </Button>
            </Stack>
          </Fieldset.Root>
        </form>

        {/* Demo Credentials Helper */}
        {/* Demo Credentials Helper */}
        <VStack
          mt="8"
          gap="2"
          p="4"
          bg="bg.muted"
          borderRadius="lg"
          borderWidth="1px"
          borderStyle="dashed" // Используем стандартный стиль границы
          borderColor="border.subtle"
        >
          <Text fontSize="2xs" fontWeight="bold" color="fg.muted" textTransform="uppercase">
            Demo Access
          </Text>
          <VStack gap="0">
            <Text fontSize="xs" color="fg.subtle">
              Admin: <b>admin@tel-ran.com</b> / admin1234
            </Text>
            <Text fontSize="xs" color="fg.subtle">
              User: <b>user@tel-ran.com</b> / user1234
            </Text>
          </VStack>
        </VStack>
      </Box>
    </Container>
  );
};

export default LoginPage;