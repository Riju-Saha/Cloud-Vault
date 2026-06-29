"use client";

import { FiCloud, FiLogIn, FiUserPlus } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { APP_NAME } from '../../utils/constants';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';

const PublicNavbar = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white shadow-sm shadow-blue-200 dark:bg-blue-500 dark:shadow-none">
            <FiCloud />
          </span>
          {APP_NAME}
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className={`text-sm font-medium transition-colors ${pathname === '/' ? 'text-primary' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'}`}>
            Home
          </Link>
          <Link href="/login" className={`text-sm font-medium transition-colors ${pathname === '/login' ? 'text-primary' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'}`}>
            Login
          </Link>
          <Link href="/register" className={`text-sm font-medium transition-colors ${pathname === '/register' ? 'text-primary' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'}`}>
            Register
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login" className="hidden sm:block">
            <Button variant="secondary">
              <FiLogIn />
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button>
              <FiUserPlus />
              Register
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
