"use client";

import Link from 'next/link';
import { FiCloud, FiShield, FiSearch, FiShare2 } from 'react-icons/fi';
import PublicLayout from '../components/layout/PublicLayout';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const features = [
  {
    icon: FiCloud,
    title: 'Local-first storage',
    description: 'Files are stored on your server now, with an architecture ready for S3 later.',
  },
  {
    icon: FiShield,
    title: 'Secure authentication',
    description: 'JWT sessions and hashed passwords keep access under control.',
  },
  {
    icon: FiSearch,
    title: 'Fast file discovery',
    description: 'Search, sort, and filter files from a clean dashboard experience.',
  },
  {
    icon: FiShare2,
    title: 'Modular by design',
    description: 'Controllers, services, and repositories stay isolated for easy growth.',
  },
];

const LandingPage = () => {
  return (
    <PublicLayout>
      <section className="mx-auto grid max-w-6xl gap-16 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div className="max-w-xl">
          <span className="inline-flex rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-primary dark:bg-blue-950/50 dark:text-blue-300">
            Personal cloud storage, simplified
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 dark:text-slate-100 sm:text-5xl lg:text-6xl">
            Store, organize, and share your files in one modern vault.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            CloudVault is a clean, beginner-friendly cloud storage platform with a local-first backend and a structure ready to scale.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary">Login</Button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-200/40 to-white blur-2xl dark:from-blue-500/20 dark:to-slate-900" />
          <Card className="relative overflow-hidden">
            <div className="rounded-2xl bg-slate-950 p-6 text-white dark:bg-slate-950">
              <p className="text-sm text-slate-300">CloudVault dashboard</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-sm text-slate-300">Storage usage</p>
                  <p className="mt-2 text-2xl font-semibold">62%</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-sm text-slate-300">Files stored</p>
                  <p className="mt-2 text-2xl font-semibold">248</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm sm:col-span-2">
                  <p className="text-sm text-slate-300">Recent upload</p>
                  <p className="mt-2 text-lg font-medium">Design-System-Notes.pdf</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-semibold text-slate-950 dark:text-slate-100">Everything you need for a personal cloud drive</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Built for desktop, tablet, and mobile with a modern SaaS aesthetic.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="h-full">
                <Icon className="text-2xl text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </section>
    </PublicLayout>
  );
};

export default LandingPage;