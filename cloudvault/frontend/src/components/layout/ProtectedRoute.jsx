"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../ui/Spinner';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { token, ready } = useAuth();

  useEffect(() => {
    if (ready && !token) {
      router.replace('/login');
    }
  }, [ready, token, router]);

  if (!ready || !token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Spinner />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
