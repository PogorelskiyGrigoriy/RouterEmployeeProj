import axios, { AxiosError } from 'axios';

/**
 * Constants
 * Configuration for the API base URL and common headers
 */
const BASE_URL = 'http://localhost:4000';
const TIMEOUT = 10000; // Added a standard timeout for safety

/**
 * Instance Creation
 * Exported as a named constant for consistent auto-imports
 */
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptors
 * Global error handling for all API requests
 */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Determine the error message from server response or default axios message
    const message = error.response?.data || error.message;
    
    console.error(`[API Error]: ${message}`);
    
    return Promise.reject(error);
  }
);