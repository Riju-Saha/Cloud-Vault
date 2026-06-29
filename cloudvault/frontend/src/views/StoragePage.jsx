"use client";

import DashboardLayout from '../components/layout/DashboardLayout';
import StorageSummaryCard from '../components/dashboard/StorageSummaryCard';
import { useEffect, useState } from 'react';
import Spinner from '../components/ui/Spinner';
import { fetchStorageRequest } from '../services/fileApi';
import { useToast } from '../context/ToastContext';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const StoragePage = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const { showToast } = useToast();
  const [storage, setStorage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorage = async () => {
      try {
        const response = await fetchStorageRequest();
        setStorage(response.data.data);
      } catch (error) {
        showToast(error.response?.data?.message || 'Failed to load storage', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadStorage();
  }, [showToast]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <DashboardLayout title="Storage" onLogout={handleLogout}>
      <div className="max-w-4xl">
        {loading ? <Spinner /> : <StorageSummaryCard {...storage} />}
      </div>
    </DashboardLayout>
  );
};

export default StoragePage;