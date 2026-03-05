//axiosInstance.ts

import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор для обработки ошибок (например, если сервер упал)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message = error.response?.data || error.message;
    console.error(`[API Error]: ${message}`);
    return Promise.reject(error);
  }
);

export default api;