"use client";

import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import DashboardSidebar from './DashboardSidebar';
import DashboardTopbar from './DashboardTopbar';
import MobileSidebar from './MobileSidebar';
import Button from '../ui/Button';

const DashboardLayout = ({ children, onLogout, searchValue, onSearchChange, onUploadClick, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="grid min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 lg:grid-cols-[280px_1fr]">
      <div className="hidden lg:block">
        <DashboardSidebar onLogout={onLogout} />
      </div>
      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={onLogout} />
      <div className="flex min-h-screen flex-col">
        <div className="flex items-center border-b border-slate-200 bg-white px-4 py-3 transition-colors dark:border-slate-800 dark:bg-slate-900 lg:hidden">
          <Button variant="secondary" onClick={() => setSidebarOpen(true)}>
            <FiMenu />
            Menu
          </Button>
        </div>
        <DashboardTopbar
          title={title}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          onUploadClick={onUploadClick}
        />
        <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
