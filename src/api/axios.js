import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Vite proxy handles the rest
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for error handling or request modification
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
