import api from './api';

export const uploadFileRequest = (formData) =>
  api.post('/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const fetchFilesRequest = (params = {}) => api.get('/files', { params });
export const fetchFileRequest = (id) => api.get(`/files/${id}`);
export const downloadFileRequest = (id) => api.get(`/files/download/${id}`, { responseType: 'blob' });
export const deleteFileRequest = (id) => api.delete(`/files/${id}`);
export const fetchStorageRequest = () => api.get('/storage');
