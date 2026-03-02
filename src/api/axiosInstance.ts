import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Адрес вашего JSON-сервера
});

export default api;