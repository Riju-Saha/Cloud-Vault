"use client";

import { FiGrid, FiFolder, FiHardDrive, FiUser, FiLogOut } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { APP_NAME } from '../../utils/constants';
import ThemeToggle from '../ui/ThemeToggle';

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/dashboard/files', label: 'My Files', icon: FiFolder },
  { to: '/dashboard/storage', label: 'Storage', icon: FiHardDrive },
  { to: '/dashboard/profile', label: 'Profile', icon: FiUser },
];

const DashboardSidebar = ({ onLogout = () => {} }) => {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col border-r border-slate-200 bg-white px-4 py-6 transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white dark:bg-blue-500">CV</div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{APP_NAME}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Personal cloud storage</p>
        </div>
      </div>
      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.end ? pathname === item.to : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              href={item.to}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 text-primary dark:bg-blue-950/50 dark:text-blue-300' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100'}`}
            >
              <Icon className="text-base" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-6">
        <ThemeToggle className="w-full justify-center" />
      </div>
      <button
        type="button"
        onClick={onLogout}
        className="mt-4 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-slate-300 dark:hover:bg-red-950/40 dark:hover:text-red-300"
      >
        <FiLogOut className="text-base" />
        Logout
      </button>
    </aside>
  );
};

export default DashboardSidebar;
