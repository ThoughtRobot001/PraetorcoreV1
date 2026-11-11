import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { signOutAction } from './actions';
import { AdminDashboard } from './AdminDashboard';
import { ProgrammeSwitcher } from './ProgrammeSwitcher';
import { requireAdminPage, adminServiceClient, logAdminError } from '@/lib/admin-auth';
import { adminFiltersSchema, adminStatuses, type AdminFilters } from '@/lib/admin-schemas';
import { applyApplicationFilters, ADMIN_PAGE_SIZE } from '@/lib/admin-query';
import { siteConfig } from '@/content/site';
import { loadProgrammeStates } from '@/lib/programme-state';
import { getProgramme } from '@/content/programmes';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function countWhere(programmeId: string, column?: 'status' | 'track', value?: string, since?: string) {
  let query = adminServiceClient().from('applications').select('id', { count: 'exact', head: true }).eq('programme_id', programmeId);
  if (column && value) query = query.eq(column, value);
  if (since) query = query.gte('created_at', since);
  const { count, error } = await query;
  if (error) throw error;
  return count ?? 0;
}

function toSearchParams(filters: AdminFilters, page: number) {
  const params = new URLSearchParams();
  params.set('programme', filters.programme);
  if (filters.q) params.set('q', filters.q);
  if (filters.track) params.set('track', filters.track);
  if (filters.status) params.set('status', filters.status);
  if (filters.from) params.set('from', filters.from);
  if (filters.to) params.set('to', filters.to);
  if (page > 1) params.set('page', String(page));
  return params.toString();
}

export default async function AdminDashboardPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { email } = await requireAdminPage();
  const rawParams = await searchParams;
  const parsedFilters = adminFiltersSchema.safeParse(rawParams);
  let states: Awaited<ReturnType<typeof loadProgrammeStates>> = [];
  try { states = await loadProgrammeStates(); } catch (error) { logAdminError('programme list', error); }
  const hasProgrammeParam = Object.prototype.hasOwnProperty.call(rawParams, 'programme');
  const requestedSlug = parsedFilters.success ? parsedFilters.data.programme : '';
  const cookieSlug = hasProgrammeParam ? '' : (await cookies()).get('admin_selected_programme')?.value ?? '';
  let selectedState = hasProgrammeParam
    ? states.find((item) => item.slug === requestedSlug)
    : states.find((item) => item.slug === cookieSlug);
  if (!selectedState) {
    try {
      const { data, error } = await adminServiceClient().from('applications').select('programme_id').order('created_at', { ascending: false }).limit(1).maybeSingle();
      if (error) throw error;
      if (data) selectedState = states.find((item) => item.id === data.programme_id);
    } catch (error) { logAdminError('latest application programme lookup', error); }
  }
  selectedState ??= [...states].reverse().find((item) => item.status === 'open') ?? states[states.length - 1];
  const filters = { ...(parsedFilters.success ? parsedFilters.data : adminFiltersSchema.parse({})), programme: selectedState?.slug ?? '' };
  const definition = selectedState ? getProgramme(selectedState.slug) : undefined;
  const trackField = definition?.form.sections.flatMap((section) => section.fields).find((field) => field.key === 'track');
  const start = (filters.page - 1) * ADMIN_PAGE_SIZE;
  const client = adminServiceClient();

  let rows: Array<{ id: string; full_name: string; email: string; phone: string; track: string | null; status: string; created_at: string }> = [];
  let total = 0;
  let loadError = false;
  try {
    if (!selectedState) throw new Error('No programme rows were found. Run migration 003_programmes.sql.');
    const query = applyApplicationFilters(
      client.from('applications').select('id,full_name,email,phone,track,status,created_at', { count: 'exact' }).eq('programme_id', selectedState.id),
      filters,
    );
    const { data, count, error } = await query.order('created_at', { ascending: false }).range(start, start + ADMIN_PAGE_SIZE - 1);
    if (error) throw error;
    rows = data ?? [];
    total = count ?? 0;
  } catch (error) {
    logAdminError('application list', error);
    loadError = true;
  }

  const monday = new Date();
  monday.setUTCHours(0, 0, 0, 0);
  monday.setUTCDate(monday.getUTCDate() - ((monday.getUTCDay() + 6) % 7));
  const trackOptions = trackField?.options ?? [];
  const [totalApplications, newThisWeek, statusCounts, trackCounts] = selectedState ? await Promise.all([
    countWhere(selectedState.id),
    countWhere(selectedState.id, undefined, undefined, monday.toISOString()),
    Promise.all(adminStatuses.map(async (status) => [status, await countWhere(selectedState.id, 'status', status)] as const)),
    Promise.all(trackOptions.map(async (track) => [track, await countWhere(selectedState.id, 'track', track)] as const)),
  ]).catch((error) => {
    logAdminError('overview counts', error);
    return [0, 0, adminStatuses.map((status) => [status, 0] as const), trackOptions.map((track) => [track, 0] as const)] as const;
  }) : [0, 0, adminStatuses.map((status) => [status, 0] as const), [] as Array<readonly [string, number]>];

  const countPages = Math.max(1, Math.ceil(total / ADMIN_PAGE_SIZE));
  const previousHref = `/admin${filters.page > 2 ? `?${toSearchParams(filters, filters.page - 1)}` : filters.page === 2 ? `?${toSearchParams(filters, 1)}` : ''}`;
  const nextHref = `/admin?${toSearchParams(filters, filters.page + 1)}`;

  return (
    <>
      <header className="admin-topbar">
        <Link href="/admin" className="admin-brand"><Image className="admin-brand-logo" src="/images/praetorcore-emblem.png" alt={siteConfig.name} width={1536} height={1024} priority /><span>{siteConfig.adminLabel}</span></Link>
        <div className="admin-topbar-user"><span>{email}</span><form action={signOutAction}><button className="admin-button" type="submit">Sign out</button></form></div>
      </header>
      <section className="admin-main">
        <div className="admin-title-row"><div><h1>Applications</h1><div className="admin-muted">Review and manage applications for {definition?.title ?? 'the selected programme'}.</div></div><div className="admin-programme-tools"><ProgrammeSwitcher programmes={states.map((item) => ({ id: item.id, slug: item.slug, title: getProgramme(item.slug)?.title ?? item.slug, status: item.status }))} selected={filters.programme} /><Link className="admin-button" href="/admin/programmes">Manage programmes</Link></div></div>
        <section className="admin-cards" aria-label="Application overview">
          <div className="admin-card"><div className="admin-card-label">Total applications</div><div className="admin-card-value">{totalApplications}</div></div>
          <div className="admin-card"><div className="admin-card-label">New this week</div><div className="admin-card-value">{newThisWeek}</div></div>
        </section>
        <section className="admin-count-groups">
          <div className="admin-count-panel"><h2>Applications by status</h2><div className="admin-count-list">{statusCounts.map(([status, count]) => <span key={status} className="admin-count-chip">{status}: <strong>{count}</strong></span>)}</div></div>
          {trackField && <div className="admin-count-panel"><h2>Applications by track</h2><div className="admin-count-list">{trackCounts.map(([track, count]) => <span key={track} className="admin-count-chip">{track}: <strong>{count}</strong></span>)}</div></div>}
        </section>
        {loadError ? <div className="admin-empty" role="alert">Applications could not be loaded. Please refresh and try again.</div> : selectedState && <AdminDashboard rows={rows} total={total} page={filters.page} pageSize={ADMIN_PAGE_SIZE} pageCount={countPages} filters={filters} previousHref={previousHref} nextHref={nextHref} programmeId={selectedState.id} hasTrack={Boolean(trackField)} trackOptions={trackOptions} />}
      </section>
    </>
  );
}
