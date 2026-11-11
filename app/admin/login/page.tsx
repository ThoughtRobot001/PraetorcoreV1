import type { Metadata } from 'next';
import Image from 'next/image';
import { LoginForm } from './LoginForm';
import { siteConfig } from '@/content/site';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Admin login', robots: { index: false, follow: false } };

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  const initialError = params.error === 'access'
    ? 'You do not have access.'
    : params.error === 'expired'
      ? 'Your session expired after 8 hours of inactivity. Sign in again.'
      : params.error === 'configuration'
        ? 'Admin login is not configured yet.'
        : null;
  return (
    <div className="admin-login-page">
      <section className="admin-login-card">
        <div className="admin-brand admin-login-brand"><Image className="admin-brand-logo" src="/images/praetorcore-emblem.png" alt={siteConfig.name} width={1536} height={1024} priority /><span>{siteConfig.adminLabel}</span></div>
        <h1>Sign in</h1>
        <p>Use your administrator account to review Tech4Youth applications.</p>
        <LoginForm initialError={initialError} />
      </section>
    </div>
  );
}
