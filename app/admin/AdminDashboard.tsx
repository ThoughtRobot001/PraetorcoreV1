'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { adminStatuses, type AdminFilters } from '@/lib/admin-schemas';
import { StatusBadge } from './StatusBadge';

interface ApplicationRow { id: string; full_name: string; email: string; phone: string; track: string | null; status: string; created_at: string }

function displayDate(date: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(date));
}

export function AdminDashboard({ rows, total, page, pageSize, pageCount, filters, previousHref, nextHref, programmeId, hasTrack, trackOptions }: {
  rows: ApplicationRow[]; total: number; page: number; pageSize: number; pageCount: number; filters: AdminFilters; previousHref: string; nextHref: string; programmeId: string; hasTrack: boolean; trackOptions: string[];
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState<(typeof adminStatuses)[number]>('reviewed');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const queryParams = new URLSearchParams();
  queryParams.set('programme', filters.programme);
  if (filters.q) queryParams.set('q', filters.q);
  if (filters.track) queryParams.set('track', filters.track);
  if (filters.status) queryParams.set('status', filters.status);
  if (filters.from) queryParams.set('from', filters.from);
  if (filters.to) queryParams.set('to', filters.to);
  queryParams.set('page', String(page));

  async function bulkUpdate() {
    if (!selected.length) return;
    setBusy(true); setMessage('');
    try {
      const response = await fetch('/api/admin/applications/bulk-status', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ids: selected, status, programmeId }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Status update failed.');
      setSelected([]); setMessage(`${selected.length} application(s) updated.`); router.refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Status update failed.'); }
    finally { setBusy(false); }
  }

  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <>
      <form className="admin-filters" action="/admin" method="get">
        <input type="hidden" name="programme" value={filters.programme} />
        <div className="admin-field"><label htmlFor="search">Search name, email, or phone</label><input id="search" name="q" type="search" defaultValue={filters.q} maxLength={120} /></div>
        {hasTrack && <div className="admin-field"><label htmlFor="track">Track</label><select id="track" name="track" defaultValue={filters.track}><option value="">All tracks</option>{trackOptions.map((track) => <option key={track}>{track}</option>)}</select></div>}
        <div className="admin-field"><label htmlFor="status">Status</label><select id="status" name="status" defaultValue={filters.status}><option value="">All statuses</option>{adminStatuses.map((value) => <option key={value} value={value}>{value}</option>)}</select></div>
        <div className="admin-field"><label htmlFor="date-from">From date</label><input id="date-from" type="date" name="from" defaultValue={filters.from} /></div>
        <div className="admin-field"><label htmlFor="date-to">To date</label><input id="date-to" type="date" name="to" defaultValue={filters.to} /></div>
        <button className="admin-button admin-button-primary" type="submit">Apply</button>
      </form>
      <div className="admin-table-wrap">
        {rows.length === 0 ? <div className="admin-empty">No applications match these filters.</div> : (
          <table className="admin-table">
            <thead><tr><th><span className="sr-only">Select</span></th><th>Name</th><th>Email</th><th>Phone</th>{hasTrack && <th>Track</th>}<th>Status</th><th>Submitted</th></tr></thead>
            <tbody>{rows.map((row) => <tr key={row.id} className="admin-clickable-row" tabIndex={0} aria-label={`Open application for ${row.full_name}`} onClick={(event) => { if ((event.target as HTMLElement).closest('input,button,a,select,label')) return; router.push(`/admin/applications/${row.id}?programme=${filters.programme}`); }} onKeyDown={(event) => { if (event.target !== event.currentTarget) return; if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); router.push(`/admin/applications/${row.id}?programme=${filters.programme}`); } }}>
              <td><input className="admin-check" type="checkbox" aria-label={`Select ${row.full_name}`} checked={selected.includes(row.id)} onClick={(event) => event.stopPropagation()} onChange={(event) => setSelected((current) => event.target.checked ? [...current, row.id] : current.filter((id) => id !== row.id))} /></td>
              <td><Link href={`/admin/applications/${row.id}?programme=${filters.programme}`}>{row.full_name}</Link></td><td>{row.email}</td><td>{row.phone}</td>{hasTrack && <td>{row.track ?? '-'}</td>}<td><StatusBadge status={row.status} /></td><td>{displayDate(row.created_at)}</td>
            </tr>)}</tbody>
          </table>
        )}
      </div>
      <div className="admin-bulkbar">
        <div className="admin-bulkbar-actions"><span>{selected.length} selected</span><select aria-label="Bulk status" value={status} onChange={(event) => setStatus(event.target.value as (typeof adminStatuses)[number])}>{adminStatuses.map((value) => <option key={value}>{value}</option>)}</select><button type="button" className="admin-button" onClick={bulkUpdate} disabled={!selected.length || busy}>{busy ? 'Saving…' : 'Set status'}</button>{message && <span role="status" className="admin-muted">{message}</span>}</div>
        <form action="/api/admin/export" method="get" className="admin-export-options">
          {Array.from(queryParams.entries()).map(([key, value]) => <input key={key} type="hidden" name={key} value={value} />)}
          <label><input type="checkbox" name="includeAccessibilityAnswers" value="1" /> Include sensitive answers</label>
          <label><input type="checkbox" name="includeNotes" value="1" /> Include notes</label>
          <button className="admin-button admin-button-primary" type="submit">Export CSV</button>
        </form>
      </div>
      <div className="admin-pagination"><span>{start}–{end} of {total} applications · Page {page} of {pageCount}</span><div className="admin-bulkbar-actions"><Link className="admin-button" aria-disabled={page <= 1} href={previousHref}>Previous</Link><Link className="admin-button" aria-disabled={page >= pageCount} href={nextHref}>Next</Link></div></div>
    </>
  );
}
