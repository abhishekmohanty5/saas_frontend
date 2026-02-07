import axios from 'axios';

// Backend API base URL - Change this to your Spring Boot server URL
const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// AUTH APIs
export const authAPI = {
  register: (userData) => api.post('/auth/reg', userData),
  login: (credentials) => api.post('/auth/log', credentials),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// SUBSCRIPTION APIs
export const subscriptionAPI = {
  getAllPlans: () => api.get('/subscription/plans'),
  subscribe: (planId) => api.post('/subscription/subscribe', { planId }),
  getUserSubscription: () => api.get('/subscription/user'),
  cancelSubscription: () => api.post('/subscription/cancel'),
  upgradeSubscription: (newPlanId) => api.put('/subscription/upgrade', { planId: newPlanId }),
};

// ADMIN APIs
export const adminAPI = {
  createPlan: (planData) => api.post('/admin/plans', planData),
  updatePlan: (planId, planData) => api.put(`/admin/plans/${planId}`, planData),
  deletePlan: (planId) => api.delete(`/admin/plans/${planId}`),
  getAllUsers: () => api.get('/admin/users'),
};

export default api;
