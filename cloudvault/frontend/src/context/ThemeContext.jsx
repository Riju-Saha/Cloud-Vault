"use client";

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);
const STORAGE_KEY = 'cloudvault_theme';

const getSystemTheme = () => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme) => {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    const nextTheme = storedTheme || getSystemTheme();

    setThemeState(nextTheme);
    setMounted(true);

    applyTheme(theme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    applyTheme(theme);

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      mounted,
      toggleTheme,
      setTheme: setThemeState,
    }),
    [theme, mounted]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
};