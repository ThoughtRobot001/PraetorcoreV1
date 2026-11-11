import type { Metadata } from 'next';
import './admin.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { robots: { index: false, follow: false, noarchive: true } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-shell">{children}</div>;
}