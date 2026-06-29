"use client";

import { createContext, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    window.clearTimeout(window.__cloudvaultToastTimer);
    window.__cloudvaultToastTimer = window.setTimeout(() => setToast(null), 3000);
  };

  const value = useMemo(() => ({ toast, showToast, setToast }), [toast]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return context;
};
