"use client";
// src\pages\LoginPage.tsx 

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Button, 
  Fieldset, 
  Input, 
  Stack, 
  Text, 
  Alert 
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useAuthStore } from "@/store/useAuthStore";
import authService from "@/services/AuthServiceImplementation";
import type { LoginData } from "@/models/AuthData";
import { ROUTES } from "@/config/navigation";

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const setLogin = useAuthStore((s) => s.setLogin);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 1. Вызываем твой дамми-сервис
      const userData = await authService.login(data);
      
      // 2. Сохраняем в глобальный стор (Zustand)
      setLogin(userData);
      
      // 3. Уходим на главную
      navigate(ROUTES.HOME);
    } catch (e: any) {
      // Если пароль неверный (AxiosError из твоего сервиса)
      setError(e.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt="20" p="6" borderWidth="1px" borderRadius="lg" boxShadow="md" bg="white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root size="lg">
          <Stack gap="4">
            <Fieldset.Legend fontSize="2xl" fontWeight="bold">Login</Fieldset.Legend>
            <Fieldset.HelperText>Please enter your credentials</Fieldset.HelperText>

            {/* Вывод ошибки при неверном логине */}
            {error && (
              <Alert.Root status="error" variant="subtle">
                <Alert.Indicator />
                <Alert.Title>{error}</Alert.Title>
              </Alert.Root>
            )}

            <Field label="Email" invalid={!!errors.email} errorText={errors.email?.message}>
              <Input 
                {...register("email", { required: "Email is required" })} 
                placeholder="admin@tel-ran.com" 
              />
            </Field>

            <Field label="Password" invalid={!!errors.password} errorText={errors.password?.message}>
              <Input 
                {...register("password", { required: "Password is required" })} 
                type="password" 
                placeholder="password" 
              />
            </Field>

            <Button type="submit" colorPalette="blue" width="full" loading={isLoading}>
              Sign In
            </Button>
          </Stack>
        </Fieldset.Root>
      </form>
      
      <Text mt="4" fontSize="xs" color="gray.500" textAlign="center">
        Hint: admin@tel-ran.com / admin1234
      </Text>
    </Box>
  );
};

export default LoginPage;