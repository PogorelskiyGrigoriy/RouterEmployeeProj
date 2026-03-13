import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Fieldset,
  Input,
  Stack,
  Container,
  VStack,
  Text,
} from "@chakra-ui/react";

import { Field } from "@/components/ui/field";
import { useLogin } from "@/services/hooks/authHooks/useLogin";
import { loginSchema, type LoginData } from "@/schemas/auth.schema";

/**
 * LoginPage Component.
 * Provides a user interface for authentication using Chakra UI and React Hook Form.
 * Integrates with Zod for client-side validation.
 */
export const LoginPage = () => {
  // Access mutation state and logic from custom auth hook
  const { mutate, isPending } = useLogin();

  /**
   * Form initialization with Zod validation resolver.
   * 'onBlur' mode ensures validation triggers when user leaves a field.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  /**
   * Form submission handler.
   * Passes validated data to the login mutation.
   */
  const onSubmit = (data: LoginData) => mutate(data);

  return (
    <Container maxW="lg" py={{ base: "12", md: "24" }}>
      <Box p="10" borderWidth="1px" borderRadius="2xl" boxShadow="sm" bg="bg.panel">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset.Root size="lg" disabled={isPending}>
            <Stack gap="6">
              <Box textAlign="center">
                <Fieldset.Legend fontSize="3xl" fontWeight="bold">
                  Login
                </Fieldset.Legend>
              </Box>

              <Stack gap="4">
                {/* Email Field with dynamic error handling */}
                <Field
                  label="Email"
                  invalid={!!errors.email}
                  errorText={errors.email?.message}
                >
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="admin@tel-ran.com"
                    autoComplete="email"
                  />
                </Field>

                {/* Password Field with dynamic error handling */}
                <Field
                  label="Password"
                  invalid={!!errors.password}
                  errorText={errors.password?.message}
                >
                  <Input
                    {...register("password")}
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </Field>
              </Stack>

              <Button
                type="submit"
                colorPalette="blue"
                width="full"
                loading={isPending}
                loadingText="Signing in..."
              >
                Sign In
              </Button>
            </Stack>
          </Fieldset.Root>
        </form>

        {/* Demo Credentials Helper - for development/testing purposes only */}
        <VStack
          mt="8"
          gap="2"
          p="4"
          bg="bg.muted"
          borderRadius="lg"
          borderWidth="1px"
          borderStyle="dashed"
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