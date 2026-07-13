import axios from 'axios';

// Frontend and API live in the same Next.js app/deployment, so same-origin relative paths work everywhere.
export const api = axios.create({
  baseURL: '/api',
});
