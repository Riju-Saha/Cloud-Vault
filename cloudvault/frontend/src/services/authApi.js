import api from './api';

export const registerRequest = (payload) => api.post('/auth/register', payload);
export const loginRequest = (payload) => api.post('/auth/login', payload);
export const fetchProfileRequest = () => api.get('/auth/profile');
export const updateProfileRequest = (payload) => api.put('/auth/profile', payload);
