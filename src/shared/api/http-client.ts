import axios from 'axios';
import { BASE_URL, API_KEY } from '../config/constants';

let lastRequestTime = 0;

export const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'X-Api-Key': API_KEY,
  },
});

httpClient.interceptors.request.use(config => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < 1100) {
    // Блокируем быстрые запросы, возвращая промис который резолвится после задержки
    return new Promise(resolve => {
      setTimeout(() => {
        lastRequestTime = Date.now();
        resolve(config);
      }, 1100 - timeSinceLastRequest);
    });
  }

  lastRequestTime = now;
  return config;
});

// Обработка ошибок
httpClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 429) {
      console.warn('Превышен лимит запросов. Попробуйте позже.');
    }
    return Promise.reject(error);
  },
);
