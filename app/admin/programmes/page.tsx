import Link from 'next/link';
import { requireAdminPage, adminServiceClient, logAdminError } from '@/lib/admin-auth';
import { loadProgrammeStates } from '@/lib/programme-state';
import { getProgramme } from '@/content/programmes';
import { ProgrammeManager } from './ProgrammeManager';
import { signOutAction } from '../actions';
import Image from 'next/image';
import { siteConfig } from '@/content/site';

export const dynamic = 'force-dynamic';
export default async function AdminProgrammesPage() {
  await requireAdminPage();
  let states = [] as Awaited<ReturnType<typeof loadProgrammeStates>>;
  try { states = await loadProgrammeStates(); } catch (error) { logAdminError('programme management list', error); }
  const programmes = await Promise.all(states.map(async (item) => {
    const { count, error } = await adminServiceClient().from('applications').select('id', { count: 'exact', head: true }).eq('programme_id', item.id);
    if (error) logAdminError('programme application count', error);
    return { ...item, title: getProgramme(item.slug)?.title ?? item.slug, applicationsCount: count ?? 0 };
  }));
  return <><header className="admin-topbar"><Link href="/admin" className="admin-brand"><Image className="admin-brand-logo" src="/images/praetorcore-emblem.png" alt={siteConfig.name} width={1536} height={1024} priority /><span>{siteConfig.adminLabel}</span></Link><form action={signOutAction}><button className="admin-button" type="submit">Sign out</button></form></header><section className="admin-main"><div className="admin-title-row"><div><h1>Programmes</h1><div className="admin-muted">Set application availability, closing dates and caps.</div></div><Link className="admin-button" href="/admin">Applications</Link></div><ProgrammeManager programmes={programmes} /></section></>;
}
