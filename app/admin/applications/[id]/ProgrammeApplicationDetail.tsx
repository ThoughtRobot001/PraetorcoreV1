'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminStatuses } from '@/lib/admin-schemas';
import { StatusBadge } from '../../StatusBadge';
import type { ProgrammeDefinition } from '@/content/programmes/types';

type Application = { id: string; programme_id: string; created_at: string; full_name: string; email: string; phone: string; track: string | null; answers: Record<string, unknown>; status: string; status_updated_at: string | null; status_updated_by: string | null; notes: string | null };
function formatDate(value: string | null) { return value ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '-'; }
function Field({ label, value }: { label: string; value: unknown }) { return <><dt>{label}</dt><dd>{value === null || value === undefined || value === '' ? '-' : typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}</dd></>; }

export function ProgrammeApplicationDetail({ application, definition }: { application: Application; definition: ProgrammeDefinition }) {
  const router = useRouter(); const [status, setStatus] = useState(application.status); const [notes, setNotes] = useState(application.notes ?? ''); const [busy, setBusy] = useState(false); const [message, setMessage] = useState(''); const [deleteOpen, setDeleteOpen] = useState(false); const [emailConfirmation, setEmailConfirmation] = useState(''); const [sensitiveValues, setSensitiveValues] = useState<Record<string, unknown> | null>(null);
  const fields = definition.form.sections.flatMap((section) => section.fields);
  const answers = fields.filter((field) => (field.group ?? 'answers') === 'answers');
  const sensitive = fields.filter((field) => field.group === 'sensitive');
  const coreValues: Record<string, unknown> = { fullName: application.full_name, email: application.email, phone: application.phone, track: application.track };
  async function update(payload: { type: 'status'; status: string } | { type: 'notes'; notes: string }) {
    setBusy(true); setMessage('');
    try { const response = await fetch(`/api/admin/applications/${application.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, programmeId: application.programme_id }) }); const result = await response.json(); if (!response.ok) throw new Error(result.error || 'Could not save changes.'); setMessage(payload.type === 'status' ? 'Status saved.' : 'Notes saved.'); router.refresh(); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'Could not save changes.'); } finally { setBusy(false); }
  }
  async function deleteApplication() {
    setBusy(true); setMessage('');
    try { const response = await fetch(`/api/admin/applications/${application.id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ emailConfirmation, programmeId: application.programme_id }) }); const result = await response.json(); if (!response.ok) throw new Error(result.error || 'Could not delete this application.'); router.push(`/admin?programme=${definition.slug}`); router.refresh(); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'Could not delete this application.'); } finally { setBusy(false); }
  }
  async function auditSensitiveView(open: boolean) {
    if (!open) return;
    const response = await fetch(`/api/admin/applications/${application.id}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ programmeId: application.programme_id }) });
    if (!response.ok) setMessage('Could not record the sensitive information view.'); else { const result = await response.json(); setSensitiveValues(result.sensitive ?? {}); }
  }
  return <>
    <div className="admin-title-row"><div><h1>{application.full_name}</h1><div className="admin-muted">Submitted {formatDate(application.created_at)} · {application.id}</div></div></div>
    <div className="admin-detail-actions"><label className="admin-field"><span>Status</span><select value={status} onChange={(event) => { const next = event.target.value; setStatus(next); void update({ type: 'status', status: next }); }}>{adminStatuses.map((value) => <option key={value}>{value}</option>)}</select></label><button className="admin-button admin-button-danger" type="button" onClick={() => setDeleteOpen(true)}>Delete application</button>{message && <span role="status" className="admin-muted">{message}</span>}</div>
    <div className="admin-detail-grid"><section className="admin-detail-panel"><h2>Application details</h2><dl className="admin-detail-list"><Field label={definition.form.sections.flatMap((section) => section.fields).find((field) => field.key === 'fullName')?.label ?? 'Full name'} value={application.full_name} /><Field label={definition.form.sections.flatMap((section) => section.fields).find((field) => field.key === 'email')?.label ?? 'Email'} value={application.email} /><Field label={definition.form.sections.flatMap((section) => section.fields).find((field) => field.key === 'phone')?.label ?? 'Phone'} value={application.phone} />{definition.form.sections.flatMap((section) => section.fields).filter((field) => (field.group ?? 'answers') === 'core' && !['fullName', 'email', 'phone'].includes(field.key)).map((field) => <Field key={field.key} label={field.label} value={coreValues[field.key]} />)}{answers.map((field) => <Field key={field.key} label={field.label} value={application.answers?.[field.key]} />)}<Field label="Consent" value={application.answers?.consent} /></dl></section>
      <section className="admin-detail-panel"><h2>Review history</h2><dl className="admin-detail-list"><dt>Status</dt><dd><StatusBadge status={application.status} /></dd><Field label="Status updated" value={formatDate(application.status_updated_at)} /><Field label="Updated by" value={application.status_updated_by} /></dl></section></div>
    {sensitive.length > 0 && <details className="admin-sensitive" onToggle={(event) => { void auditSensitiveView(event.currentTarget.open); }}><summary>Sensitive information</summary><div className="admin-detail-panel" style={{ marginTop: 12 }}><dl className="admin-detail-list">{sensitive.map((field) => <Field key={field.key} label={field.label} value={sensitiveValues?.[field.key]} />)}</dl></div></details>}
    <section className="admin-detail-panel" style={{ marginTop: 14 }}><h2>Internal notes</h2><form className="admin-notes-form" onSubmit={(event) => { event.preventDefault(); void update({ type: 'notes', notes }); }}><textarea aria-label="Internal notes" value={notes} maxLength={2000} onChange={(event) => setNotes(event.target.value)} /><div className="admin-muted">{notes.length}/2000 characters</div><button className="admin-button admin-button-primary" type="submit" disabled={busy}>Save notes</button></form></section>
    {deleteOpen && <div className="admin-modal-backdrop" role="presentation"><section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="delete-title"><h2 id="delete-title">Delete application?</h2><p>This permanently deletes the application. Type <strong>{application.email}</strong> to confirm.</p><label className="admin-field"><span>Applicant email</span><input type="email" autoFocus value={emailConfirmation} onChange={(event) => setEmailConfirmation(event.target.value)} /></label>{message && <p className="admin-form-error" role="alert">{message}</p>}<div className="admin-modal-actions"><button className="admin-button" type="button" onClick={() => { setDeleteOpen(false); setMessage(''); }}>Cancel</button><button className="admin-button admin-button-danger" type="button" disabled={busy || emailConfirmation.trim().toLowerCase() !== application.email.toLowerCase()} onClick={deleteApplication}>{busy ? 'Deleting.' : 'Delete permanently'}</button></div></section></div>}
  </>;
}
