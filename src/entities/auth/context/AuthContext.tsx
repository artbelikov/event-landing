import React, { createContext, useContext, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { OpenAPI } from '@/api-client';
import { useIsAuthenticated } from '../hooks/useCurrentUser';
import type { AuthState } from '../model';

interface AuthContextType extends AuthState {
  login: (token: string, user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { isAuthenticated, user, isLoading } = useIsAuthenticated();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Set up token on app initialization
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      OpenAPI.TOKEN = token;
    }
  }, []);

  const login = (token: string, userData: any) => {
    localStorage.setItem('access_token', token);
    OpenAPI.TOKEN = token;
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    OpenAPI.TOKEN = undefined;
    queryClient.clear();
    navigate('/admin/login');
  };

  const value: AuthContextType = {
    user: user ?? null,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
