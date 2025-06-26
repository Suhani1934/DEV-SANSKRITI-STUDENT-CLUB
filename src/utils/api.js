// src/api.js
import api from '../api';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false, // Set to true if you're using cookies/session
});

// Auto-attach JWT token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
