import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set up axios interceptors
export const setupAxiosInterceptors = (
  logout: () => void,
  token: string | null
) => {
  // Request interceptor to add token to headers
  const requestInterceptor = axiosInstance.interceptors.request.use(
    (config) => {
      const currentToken = localStorage.getItem('token');
      if (currentToken) {
        config.headers.Authorization = `Bearer ${currentToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to handle 401 unauthorized responses
  const responseInterceptor = axiosInstance.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error) => {
      // Check if the error is 401 Unauthorized
      if (error.response?.status === 401) {
        // Only logout and redirect if we're currently authenticated
        // This prevents infinite loops during login/register
        if (token) {
          console.warn('Token expired or invalid, logging out user');
          logout();
          // Redirect to login page
          window.location.href = '/auth/login';
        }
      }
      return Promise.reject(error);
    }
  );

  // Return cleanup function
  return () => {
    axiosInstance.interceptors.request.eject(requestInterceptor);
    axiosInstance.interceptors.response.eject(responseInterceptor);
  };
};

export default axiosInstance;