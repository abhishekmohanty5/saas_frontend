import axios from 'axios';

// Backend base URL
const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance
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

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// ==================== AUTH ENDPOINTS ====================
export const authAPI = {
  // Register new user
  register: (userData) => api.post('/auth/reg', userData),
  
  // Login user
  login: (credentials) => api.post('/auth/log', credentials),
};

// ==================== PUBLIC ENDPOINTS ====================
export const publicAPI = {
  // Get all plans (no auth required)
  getAllPlans: () => api.get('/public'),
};

// ==================== SUBSCRIPTION ENDPOINTS ====================
export const subscriptionAPI = {
  // Subscribe to a plan
  subscribe: (planId) => api.post(`/subscriptions/subscribe/${planId}`),
  
  // Get user's current subscription
  getUserSubscription: () => api.get('/subscriptions'),
  
  // Cancel subscription
  cancelSubscription: () => api.put('/subscriptions/cancel'),
};

// ==================== ADMIN ENDPOINTS ====================
export const adminAPI = {
  // Create new plan
  createPlan: (planData) => api.post('/admin/plan', planData),
  
  // Activate plan
  activatePlan: (planId) => api.put(`/admin/plan/${planId}/activate`),
  
  // Deactivate plan
  deactivatePlan: (planId) => api.put(`/admin/plan/${planId}/deactivate`),
};

export default api;