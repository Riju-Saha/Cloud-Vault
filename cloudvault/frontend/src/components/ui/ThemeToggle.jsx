"use client";

import { FiMoon, FiSun } from 'react-icons/fi';
import Button from './Button';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, mounted, toggleTheme } = useTheme();
  const showDarkTheme = mounted ? isDark : false;

  return (
    <Button
      variant="secondary"
      onClick={toggleTheme}
      className={className}
      aria-label="Toggle theme"
    >
      {showDarkTheme ? <FiSun /> : <FiMoon />}
    </Button>
  );
};

export default ThemeToggle;