'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ProgrammeState } from '@/lib/programme-state';

type ProgrammeRow = ProgrammeState & { title: string; applicationsCount: number };
export function ProgrammeManager({ programmes }: { programmes: ProgrammeRow[] }) {
  const router = useRouter(); const [values, setValues] = useState(() => Object.fromEntries(programmes.map((item) => [item.slug, { status: item.status, closesAt: item.closes_at?.slice(0, 10) ?? '', maxApplications: item.max_applications === null ? '' : String(item.max_applications) }])) as Record<string, { status: ProgrammeState['status']; closesAt: string; maxApplications: string }>);
  const [messages, setMessages] = useState<Record<string, string>>({}); const [busy, setBusy] = useState<string | null>(null);
  async function save(slug: string) {
    const value = values[slug]; setBusy(slug); setMessages((prev) => ({ ...prev, [slug]: '' }));
    try {
      const response = await fetch(`/api/admin/programmes/${encodeURIComponent(slug)}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: value.status, closesAt: value.closesAt ? new Date(`${value.closesAt}T23:59:59.999Z`).toISOString() : null, maxApplications: value.maxApplications === '' ? null : Number(value.maxApplications) }) });
      const result = await response.json(); if (!response.ok) throw new Error(result.error || 'Could not save programme settings.');
      setMessages((prev) => ({ ...prev, [slug]: 'Saved.' })); router.refresh();
    } catch (error) { setMessages((prev) => ({ ...prev, [slug]: error instanceof Error ? error.message : 'Could not save programme settings.' })); }
    finally { setBusy(null); }
  }
  return <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Programme</th><th>Applications</th><th>Status</th><th>Closing date</th><th>Application cap</th><th></th></tr></thead><tbody>{programmes.map((item) => <tr key={item.id}><td>{item.title}</td><td>{item.applicationsCount}</td><td><select aria-label={`${item.title} status`} value={values[item.slug].status} onChange={(event) => setValues((prev) => ({ ...prev, [item.slug]: { ...prev[item.slug], status: event.target.value as ProgrammeState['status'] } }))}><option value="draft">Draft</option><option value="open">Open</option><option value="closed">Closed</option><option value="archived">Archived</option></select></td><td><input aria-label={`${item.title} closing date`} type="date" value={values[item.slug].closesAt} onChange={(event) => setValues((prev) => ({ ...prev, [item.slug]: { ...prev[item.slug], closesAt: event.target.value } }))} /></td><td><input aria-label={`${item.title} application cap`} type="number" min="0" value={values[item.slug].maxApplications} placeholder="No cap" onChange={(event) => setValues((prev) => ({ ...prev, [item.slug]: { ...prev[item.slug], maxApplications: event.target.value } }))} /></td><td><button className="admin-button admin-button-primary" type="button" disabled={busy === item.slug} onClick={() => void save(item.slug)}>{busy === item.slug ? 'Saving.' : 'Save'}</button>{messages[item.slug] && <div className="admin-muted" role="status">{messages[item.slug]}</div>}</td></tr>)}</tbody></table></div>;
}
