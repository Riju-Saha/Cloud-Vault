"use client";

import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useEffect, useState } from 'react';
import Spinner from '../components/ui/Spinner';
import { fetchProfileRequest, updateProfileRequest } from '../services/authApi';
import { useToast } from '../context/ToastContext';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/formatters';

const ProfilePage = () => {
  const router = useRouter();
  const { logout, setUser } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({ name: '', email: '', createdAt: '' });
  const [form, setForm] = useState({ name: '', password: '', confirmPassword: '' });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetchProfileRequest();
        const user = response.data.data;
        setProfile(user);
        setForm((current) => ({ ...current, name: user.name }));
        setUser(user);
      } catch (error) {
        showToast(error.response?.data?.message || 'Failed to load profile', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [setUser, showToast]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const response = await updateProfileRequest({
        name: form.name,
        password: form.password || undefined,
        confirmPassword: form.confirmPassword || undefined,
      });

      setProfile(response.data.data);
      setUser(response.data.data);
      setForm((current) => ({ ...current, password: '', confirmPassword: '' }));
      showToast('Profile updated successfully');
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <DashboardLayout title="Profile" onLogout={handleLogout}>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Profile details</h2>
          {loading ? (
            <div className="mt-6"><Spinner /></div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Input label="Name" name="name" value={form.name} onChange={handleChange} />
                <Input label="Email" value={profile.email} disabled />
                <Input label="Join Date" value={formatDate(profile.createdAt)} disabled />
              </div>
              <div className="mt-6 space-y-4">
                <Input label="New password" name="password" value={form.password} onChange={handleChange} type="password" placeholder="Enter a new password" />
                <Input label="Confirm password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} type="password" placeholder="Confirm the new password" />
              </div>
              <div className="mt-6">
                <Button type="submit" disabled={saving}>{saving ? <Spinner /> : 'Save changes'}</Button>
              </div>
            </form>
          )}
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Account summary</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <p>Join Date: {formatDate(profile.createdAt)}</p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;