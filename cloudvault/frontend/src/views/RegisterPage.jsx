"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import PublicLayout from '../components/layout/PublicLayout';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import { registerRequest } from '../services/authApi';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Spinner from '../components/ui/Spinner';

const RegisterPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const nextErrors = {};

    if (form.name.trim().length < 2) nextErrors.name = 'Name must be at least 2 characters';
    if (!form.email.trim()) nextErrors.email = 'Email is required';
    if (form.password.length < 8) nextErrors.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirmPassword) nextErrors.confirmPassword = 'Passwords do not match';

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
      const response = await registerRequest(form);
      login(response.data.data);
      showToast('Account created successfully');
      router.push('/dashboard');
    } catch (error) {
      showToast(error.response?.data?.message || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div className="flex items-center">
          <div className="max-w-lg">
            <h1 className="text-4xl font-semibold text-slate-950 dark:text-slate-100">Create your CloudVault account</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Start with a local cloud drive that is ready for authentication, file uploads, and future scale.
            </p>
          </div>
        </div>
        <Card>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Register</h2>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <Input label="Name" name="name" value={form.name} onChange={handleChange} error={errors.name} type="text" placeholder="Your name" icon={FiUser} />
            <Input label="Email" name="email" value={form.email} onChange={handleChange} error={errors.email} type="email" placeholder="you@example.com" icon={FiMail} />
            <Input label="Password" name="password" value={form.password} onChange={handleChange} error={errors.password} type="password" placeholder="Create a password" icon={FiLock} />
            <Input label="Confirm Password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} type="password" placeholder="Confirm your password" icon={FiLock} />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Spinner /> : 'Create account'}
            </Button>
          </form>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            Already registered? <Link className="font-medium text-primary" href="/login">Login</Link>
          </p>
        </Card>
      </div>
    </PublicLayout>
  );
};

export default RegisterPage;