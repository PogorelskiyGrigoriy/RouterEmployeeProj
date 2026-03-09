"use client";

import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Fieldset,
  Input,
  Stack,
  Text,
  Alert,
  VStack
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useLogin } from "@/services/hooks/authHooks/useLogin";
import type { LoginData } from "@/models/AuthData";

const LoginPage = () => {
  // Получаем всё необходимое из хука
  // mutate — это функция запуска, isPending — лоадер, error — объект ошибки
  const { mutate, isPending, error, isError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = (data: LoginData) => {
    // Просто вызываем мутацию. Редирект и сохранение в стор 
    // уже прописаны внутри хука useLogin (в onSuccess)
    mutate(data);
  };

  return (
    <Box maxW="sm" mx="auto" mt="20" p="6" borderWidth="1px" borderRadius="lg" boxShadow="md" bg="white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root size="lg">
          <Stack gap="4">
            <Fieldset.Legend fontSize="2xl" fontWeight="bold" color="gray.800">Login</Fieldset.Legend>
            <Fieldset.HelperText color="gray.800">Please enter your credentials</Fieldset.HelperText>

            {/* Вывод ошибки из хука useLogin */}
            {isError && (
              <Alert.Root status="error" variant="subtle">
                <Alert.Indicator />
                <Alert.Title>
                  {error instanceof Error ? error.message : "Invalid credentials"}
                </Alert.Title>
              </Alert.Root>
            )}

            <Field label="Email" invalid={!!errors.email} errorText={errors.email?.message}>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                placeholder="admin@tel-ran.com"
                color="gray.800"
                _placeholder={{ color: "gray.400" }}
                disabled={isPending}
              />
            </Field>

            <Field label="Password" invalid={!!errors.password} errorText={errors.password?.message}>
              <Input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="password"
                color="gray.800"
                _placeholder={{ color: "gray.400" }}
                disabled={isPending}
              />
            </Field>

            <Button
              type="submit"
              colorPalette="blue"
              width="full"
              loading={isPending} // Используем состояние из хука
            >
              Sign In
            </Button>
          </Stack>
        </Fieldset.Root>
      </form>

      <VStack mt="4" gap="1">
        <Text fontSize="xs" color="gray.500" textAlign="center">
          Admin: admin@tel-ran.com / admin1234
        </Text>
        <Text fontSize="xs" color="gray.500" textAlign="center">
          User: user@tel-ran.com / user1234
        </Text>
      </VStack>
    </Box>
  );
};

export default LoginPage;