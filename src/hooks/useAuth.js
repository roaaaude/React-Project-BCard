import { useState, useEffect } from 'react';
import { login, register } from '../services/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const data = await login(credentials);
      localStorage.setItem('token', data.token);
      setUser(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setUser(null);
  };

  const handleRegister = async (userData) => {
    try {
      const data = await register(userData);
      return data;
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    loading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };
};
