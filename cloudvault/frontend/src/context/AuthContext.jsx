"use client";

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchProfileRequest } from '../services/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('cloudvault_token') : null));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hydrateSession = async () => {
      if (!token) {
        setReady(true);
        return;
      }

      try {
        const response = await fetchProfileRequest();
        setUser(response.data.data);
      } catch (error) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('cloudvault_token');
        }
        setUser(null);
        setToken(null);
      } finally {
        setReady(true);
      }
    };

    hydrateSession();
  }, [token]);

  const login = ({ user: nextUser, token: nextToken }) => {
    setUser(nextUser);
    setToken(nextToken);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cloudvault_token', nextToken);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cloudvault_token');
    }
  };

  const value = useMemo(() => ({ user, token, ready, login, logout, setUser }), [user, token, ready]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
