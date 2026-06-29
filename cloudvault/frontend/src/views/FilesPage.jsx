"use client";

import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';
import FileTable from '../components/dashboard/FileTable';
import { useEffect, useMemo, useRef, useState } from 'react';
import Spinner from '../components/ui/Spinner';
import { deleteFileRequest, downloadFileRequest, fetchFilesRequest, uploadFileRequest } from '../services/fileApi';
import { formatBytes, formatDate } from '../utils/formatters';
import { useToast } from '../context/ToastContext';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { FiUpload } from 'react-icons/fi';

const FilesPage = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const { showToast } = useToast();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const loadFiles = async () => {
    setLoading(true);
    try {
      const response = await fetchFilesRequest({ search, sortBy, sortOrder, page: currentPage, limit: 10 });
      setFiles(response.data.data.files);
      setTotalPages(response.data.data.pagination.totalPages);
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to load files', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, [search, sortBy, sortOrder, currentPage]);

  const normalizedFiles = useMemo(
    () =>
      files.map((file) => ({
        ...file,
        sizeLabel: formatBytes(file.size),
        uploadedAtLabel: formatDate(file.uploadedAt),
      })),
    [files]
  );

  const handleDownload = async (file) => {
    try {
      const response = await downloadFileRequest(file.id);
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = file.originalName;
      link.click();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      showToast(error.response?.data?.message || 'Download failed', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFileRequest(selectedFile.id);
      showToast('File deleted successfully');
      setDeleteOpen(false);
      setSelectedFile(null);
      loadFiles();
    } catch (error) {
      showToast(error.response?.data?.message || 'Delete failed', 'error');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) {
      return;
    }

    setCurrentPage(nextPage);
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
      loadFiles();
    } catch (error) {
      showToast(error.response?.data?.message || 'Upload failed', 'error');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleSearchChange = (event) => {
    setCurrentPage(1);
    setSearch(event.target.value);
  };

  const handleSortByChange = (event) => {
    setCurrentPage(1);
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setCurrentPage(1);
    setSortOrder(event.target.value);
  };

  return (
    <DashboardLayout
      title="My Files"
      onLogout={handleLogout}
      searchValue={search}
      onSearchChange={handleSearchChange}
      onUploadClick={handleUploadClick}
    >
      <Card className="p-0">
        <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">All files</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Search, sort, download, and remove files from your vault.</p>
            </div>
            <div className="flex gap-3">
              <select className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" value={sortBy} onChange={handleSortByChange}>
                <option value="name">Name</option>
                <option value="size">Size</option>
                <option value="date">Date</option>
              </select>
              <select className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" value={sortOrder} onChange={handleSortOrderChange}>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
              <Button onClick={handleUploadClick} disabled={uploading}>
                <FiUpload />
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
          </div>
        </div>
        <div className="p-6">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <FileTable files={normalizedFiles} onDownload={handleDownload} onDelete={(file) => { setSelectedFile(file); setDeleteOpen(true); }} />
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
                    Previous
                  </Button>
                  <Button variant="secondary" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
      <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
      <ConfirmDialog
        open={deleteOpen}
        title="Delete file?"
        message={`This will permanently remove ${selectedFile?.originalName || 'this file'} from your vault.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => {
          setDeleteOpen(false);
          setSelectedFile(null);
        }}
      />
    </DashboardLayout>
  );
};

export default FilesPage;