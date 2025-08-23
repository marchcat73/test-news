import axios from 'axios';
import { BASE_URL, API_KEY } from '../config/constants';

export const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'X-Api-Key': API_KEY,
  },
});
