"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiLock, FiMail } from 'react-icons/fi';
import PublicLayout from '../components/layout/PublicLayout';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import { loginRequest } from '../services/authApi';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Spinner from '../components/ui/Spinner';

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const nextErrors = {};

    if (!form.email.trim()) nextErrors.email = 'Email is required';
    if (!form.password) nextErrors.password = 'Password is required';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await loginRequest(form);
      login(response.data.data);
      showToast('Login successful');
      router.push('/dashboard');
    } catch (error) {
      showToast(error.response?.data?.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div className="flex items-center">
          <div className="max-w-lg">
            <h1 className="text-4xl font-semibold text-slate-950 dark:text-slate-100">Welcome back to CloudVault</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Sign in to manage your files, view storage usage, and keep your private vault organized.
            </p>
          </div>
        </div>
        <Card>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Login</h2>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <Input label="Email" name="email" value={form.email} onChange={handleChange} error={errors.email} type="email" placeholder="you@example.com" icon={FiMail} />
            <Input label="Password" name="password" value={form.password} onChange={handleChange} error={errors.password} type="password" placeholder="Your password" icon={FiLock} />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Spinner /> : 'Login'}
            </Button>
          </form>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            No account yet? <Link className="font-medium text-primary" href="/register">Create one</Link>
          </p>
        </Card>
      </div>
    </PublicLayout>
  );
};

export default LoginPage;