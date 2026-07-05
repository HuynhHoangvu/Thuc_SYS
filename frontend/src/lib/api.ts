import axios from 'axios';

// In local dev, Vite's server proxy forwards "/api" to localhost:5000 (see vite.config.ts).
// In production (e.g. Vercel), there is no proxy, so the deployed backend's URL must be
// supplied via VITE_API_URL (e.g. https://your-backend.onrender.com/api).
const baseURL = import.meta.env.VITE_API_URL ?? '/api';

export const api = axios.create({
  baseURL,
});
