import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app load
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

 
const login = async (email, password) => {
  try {
    const response = await authAPI.login({ email, password });
    
    // YOUR BACKEND RETURNS: { message, data: { email, token }, status, timestamp }
    const { data } = response.data;  // Extract data from AppResponse wrapper
    const { token, email: userEmail } = data;
    
    localStorage.setItem('token', token);
    
    // Create user object
    const userData = {
      email: userEmail,
      role: 'USER'  // Default role
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Login failed' 
    };
  }
};
 
const register = async (userData) => {
  try {
    // Register with backend: { userName, email, password }
    const regResponse = await authAPI.register(userData);
    
    // YOUR BACKEND RETURNS: { message, data: { username, email }, status, timestamp }
    console.log('Registration successful:', regResponse.data);
    
    // After successful registration, auto-login
    const loginResult = await login(userData.email, userData.password);
    
    return loginResult;
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Registration failed' 
    };
  }
};

  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
