import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { signOutAction } from '../../actions';
import { ProgrammeApplicationDetail } from './ProgrammeApplicationDetail';
import { requireAdminPage, adminServiceClient, logAdminError, writeAdminAudit } from '@/lib/admin-auth';
import { siteConfig } from '@/content/site';
import { getProgramme } from '@/content/programmes';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ApplicationDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ programme?: string }> }) {
  const { email } = await requireAdminPage();
  const { id } = await params;
  const query = await searchParams;
  const client = adminServiceClient();
  const { data, error } = await client.from('applications').select('id,programme_id,created_at,status,notes,status_updated_at,status_updated_by,full_name,email,phone,track,answers').eq('id', id).maybeSingle();
  if (error) { logAdminError('application detail', error); notFound(); }
  if (!data) notFound();
  const { data: programme } = await client.from('programmes').select('slug').eq('id', data.programme_id).maybeSingle();
  if (!programme || (query.programme && query.programme !== programme.slug)) notFound();
  const definition = getProgramme(programme.slug);
  if (!definition) notFound();
  try { await writeAdminAudit(email, 'view', data.id, { programme_id: data.programme_id }); }
  catch (auditError) { logAdminError('application view audit', auditError); }
  return (
    <>
      <header className="admin-topbar"><Link href="/admin" className="admin-brand"><Image className="admin-brand-logo" src="/images/praetorcore-emblem.png" alt={siteConfig.name} width={1536} height={1024} priority /><span>{siteConfig.adminLabel}</span></Link><form action={signOutAction}><button className="admin-button" type="submit">Sign out</button></form></header>
      <section className="admin-main"><p><Link className="admin-button" href={`/admin?programme=${programme.slug}`}>Applications</Link></p><ProgrammeApplicationDetail application={data} definition={definition} /></section>
    </>
  );
}
