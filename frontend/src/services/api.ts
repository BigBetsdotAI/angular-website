import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    if (user) {
      const { token } = JSON.parse(user);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = async (userData: any) => {
  const response = await api.post('/register', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    window.dispatchEvent(new Event('auth-change'));
  }
  return response.data;
};

export const login = async (userData: any) => {
  const response = await api.post('/login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    window.dispatchEvent(new Event('auth-change'));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
  window.dispatchEvent(new Event('auth-change'));
};

// Separate API instance for Certificate Service running on port 5001
const certificateApi = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const validateCertificate = async (certificateId: string) => {
  const response = await certificateApi.get(`/verify/${certificateId}`);
  return response.data;
};

export default api;
