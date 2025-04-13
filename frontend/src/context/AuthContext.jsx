import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:3333/api/auth/me');
      setUser(response.data.data.user);
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3333/api/auth/login', {
        email,
        password
      });
      const { token, data } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(data.user);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao fazer login');
      throw error;
    }
  };

  const signup = async (name, email, password, passwordConfirm) => {
    try {
      const response = await axios.post('http://localhost:3333/api/auth/signup', {
        name,
        email,
        password,
        passwordConfirm
      });
      toast.success('Cadastro realizado! Verifique seu email.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao cadastrar');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/login');
  };

  const forgotPassword = async (email) => {
    try {
      await axios.post('http://localhost:3333/api/auth/forgot-password', {
        email
      });
      toast.success('Email de recuperação enviado!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao enviar email');
      throw error;
    }
  };

  const resetPassword = async (token, password, passwordConfirm) => {
    try {
      await axios.patch(`http://localhost:3333/api/auth/reset-password/${token}`, {
        password,
        passwordConfirm
      });
      toast.success('Senha redefinida com sucesso!');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao redefinir senha');
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        forgotPassword,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}; 