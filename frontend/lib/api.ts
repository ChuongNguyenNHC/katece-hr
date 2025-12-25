import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const createWorker = async (data: {
  fullName: string;
  phone: string;
  cccd: string;
  username: string;
}) => {
  const response = await api.post('/taikhoan/create-worker', data);
  return response.data;
};

export const createEmployee = async (data: {
  fullName: string;
  phone: string;
  cccd: string;
  username: string;
  email: string;
  position: string;
  password?: string;
}) => {
  const response = await api.post('/taikhoan/create-employee', data);
  return response.data;
};

export const getEmployees = async () => {
    const response = await api.get('/taikhoan/employees');
    return response.data;
};

export const getWorkers = async () => {
    const response = await api.get('/taikhoan/workers');
    return response.data;
};

export const assignWorkerToTeam = async (userId: string, toSanXuatID: string) => {
    const response = await api.post('/taikhoan/assign-worker-team', { userId, toSanXuatID });
    return response.data;
};

export const getProductionTeams = async () => {
    const response = await api.get('/taikhoan/production-teams');
    return response.data;
};

export default api;
