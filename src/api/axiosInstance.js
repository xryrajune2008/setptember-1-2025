// /src/api/axiosInstance.js
// To configure the backend URL, create a .env file in the frontend root with:
// REACT_APP_API_BASE_URL=http://your-backend-url:port
// Example: REACT_APP_API_BASE_URL=http://localhost:8000
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000', // Configurable backend URL
  headers: {
    Accept: 'application/json',
  }
});

// Optional: Attach token automatically if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
