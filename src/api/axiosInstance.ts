import axios, { AxiosError } from 'axios';

const BASE_URL = 'http://localhost:4000';
const TIMEOUT = 10000;

/**
 * Shared axios instance. 
 * Note: We don't define response types here because 
 * Zod schemas will handle validation and typing at the service level.
 */
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Global response interceptor for network-level error handling.
 */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Basic error structure extract
    const status = error.response?.status;
    const message = error.response?.data || error.message;
    
    // Detailed logging for debugging network issues
    console.error(`[Network Error] ${status ? `Status: ${status}` : ''}:`, message);
    
    // We pass the error down to be caught by the ApiClient (Strict/Soft modes)
    return Promise.reject(error);
  }
);