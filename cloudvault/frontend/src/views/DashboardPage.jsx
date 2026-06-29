"use client";

import { FiDatabase, FiFileText, FiUpload, FiActivity } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import StatCard from '../components/dashboard/StatCard';
import StorageSummaryCard from '../components/dashboard/StorageSummaryCard';
import Spinner from '../components/ui/Spinner';
import { fetchFilesRequest, fetchStorageRequest, uploadFileRequest } from '../services/fileApi';
import { formatBytes, formatDate } from '../utils/formatters';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const [storage, setStorage] = useState(null);
  const [recentFiles, setRecentFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const loadDashboard = async () => {
    setLoading(true);

    try {
      const [storageResponse, filesResponse] = await Promise.all([
        fetchStorageRequest(),
        fetchFilesRequest({ limit: 5 }),
      ]);

      setStorage(storageResponse.data.data);
      setRecentFiles(filesResponse.data.data.files);
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to load dashboard', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [showToast]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);

    try {
      await uploadFileRequest(formData);
      showToast('File uploaded successfully');
      await loadDashboard();
    } catch (error) {
      showToast(error.response?.data?.message || 'Upload failed', 'error');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const storageView = storage || {
    totalStorage: 10 * 1024 * 1024 * 1024,
    usedStorage: 0,
    remainingStorage: 10 * 1024 * 1024 * 1024,
    percentageUsed: 0,
  };

  return (
    <DashboardLayout title={`Welcome back, ${user?.name || 'there'}`} onLogout={handleLogout}>
      <div className="space-y-6">
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <StorageSummaryCard {...storageView} />
          </div>
          <StatCard
            label="Files uploaded"
            value={loading ? '...' : String(recentFiles.length)}
            description="Across all folders"
            icon={FiFileText}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <StatCard
            label="Storage available"
            value={loading ? '...' : formatBytes(storageView.remainingStorage)}
            description="Remaining capacity"
            icon={FiDatabase}
          />
          <StatCard label="Recent activity" value="Live" description="Fetched from the API" icon={FiActivity} />
          <Card className="flex flex-col justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Need to upload something?</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">Add files in seconds</h2>
            </div>
            <Button onClick={handleUploadClick} disabled={uploading}>
              <FiUpload />
              {uploading ? 'Uploading...' : 'Upload file'}
            </Button>
          </Card>
        </div>

        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Recent files</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your latest uploads at a glance</p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {loading ? <Spinner /> : recentFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 transition-colors dark:border-slate-800">
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{file.originalName}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{formatDate(file.uploadedAt)}</p>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-300">{formatBytes(file.size)}</span>
              </div>
            ))}
          </div>
        </Card>
        <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;