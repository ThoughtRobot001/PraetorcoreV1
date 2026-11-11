'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminStatuses } from '@/lib/admin-schemas';
import { StatusBadge } from '../../StatusBadge';

type Application = {
  id: string; created_at: string; full_name: string; gender: string; age_range: string; date_of_birth: string; phone: string; email: string; location: string; nationality: string; education: string; employment_status: string;
  difficulty_seeing: string; difficulty_hearing: string; difficulty_walking: string; difficulty_remembering: string; difficulty_self_care: string; difficulty_communicating: string;
  track: string; track_knowledge: string; previous_ict_training: string; linkedin_url: string | null; github_url: string | null; why_join: string; goals: string; can_attend_in_person: string; laptop_access: string; consent: boolean; status: string; status_updated_at: string | null; status_updated_by: string | null; notes: string | null;
};

function Field({ label, value }: { label: string; value: unknown }) {
  return <><dt>{label}</dt><dd>{value === null || value === undefined || value === '' ? '—' : String(value)}</dd></>;
}
function formatDate(value: string | null) { return value ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—'; }

export function ApplicationDetail({ application }: { application: Application }) {
  const router = useRouter();
  const [status, setStatus] = useState(application.status);
  const [notes, setNotes] = useState(application.notes ?? '');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [emailConfirmation, setEmailConfirmation] = useState('');

  async function update(payload: { type: 'status'; status: string } | { type: 'notes'; notes: string }) {
    setBusy(true); setMessage('');
    try {
      const response = await fetch(`/api/admin/applications/${application.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not save changes.');
      setMessage(payload.type === 'status' ? 'Status saved.' : 'Notes saved.'); router.refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Could not save changes.'); }
    finally { setBusy(false); }
  }

  async function deleteApplication() {
    setBusy(true); setMessage('');
    try {
      const response = await fetch(`/api/admin/applications/${application.id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ emailConfirmation }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not delete this application.');
      router.push('/admin'); router.refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Could not delete this application.'); }
    finally { setBusy(false); }
  }

  return (
    <>
      <div className="admin-title-row"><div><h1>{application.full_name}</h1><div className="admin-muted">Submitted {formatDate(application.created_at)} · {application.id}</div></div></div>
      <div className="admin-detail-actions"><label className="admin-field"><span>Status</span><select value={status} onChange={(event) => { const next = event.target.value; setStatus(next); void update({ type: 'status', status: next }); }}>{adminStatuses.map((value) => <option key={value}>{value}</option>)}</select></label><button className="admin-button admin-button-danger" type="button" onClick={() => setDeleteOpen(true)}>Delete application</button>{message && <span role="status" className="admin-muted">{message}</span>}</div>
      <div className="admin-detail-grid">
        <section className="admin-detail-panel"><h2>Personal information</h2><dl className="admin-detail-list"><Field label="Full name" value={application.full_name} /><Field label="Email" value={application.email} /><Field label="Phone" value={application.phone} /><Field label="Gender" value={application.gender} /><Field label="Age range" value={application.age_range} /><Field label="Date of birth" value={application.date_of_birth} /><Field label="Location" value={application.location} /><Field label="Nationality" value={application.nationality} /><Field label="Consent" value={application.consent ? 'Yes' : 'No'} /></dl></section>
        <section className="admin-detail-panel"><h2>Education and experience</h2><dl className="admin-detail-list"><Field label="Education" value={application.education} /><Field label="Employment status" value={application.employment_status} /><Field label="Previous ICT training" value={application.previous_ict_training} /></dl></section>
        <section className="admin-detail-panel"><h2>Training application</h2><dl className="admin-detail-list"><Field label="Track" value={application.track} /><Field label="Track knowledge" value={application.track_knowledge} /><Field label="Why join" value={application.why_join} /><Field label="Goals" value={application.goals} /><Field label="Can attend in person" value={application.can_attend_in_person} /><Field label="Laptop access" value={application.laptop_access} /><Field label="LinkedIn" value={application.linkedin_url} /><Field label="GitHub" value={application.github_url} /></dl></section>
        <section className="admin-detail-panel"><h2>Review history</h2><dl className="admin-detail-list"><dt>Status</dt><dd><StatusBadge status={application.status} /></dd><Field label="Status updated" value={formatDate(application.status_updated_at)} /><Field label="Updated by" value={application.status_updated_by} /></dl></section>
      </div>
      <details className="admin-sensitive"><summary>Sensitive information</summary><div className="admin-detail-panel" style={{ marginTop: 12 }}><dl className="admin-detail-list"><Field label="Difficulty seeing" value={application.difficulty_seeing} /><Field label="Difficulty hearing" value={application.difficulty_hearing} /><Field label="Difficulty walking" value={application.difficulty_walking} /><Field label="Difficulty remembering" value={application.difficulty_remembering} /><Field label="Difficulty self care" value={application.difficulty_self_care} /><Field label="Difficulty communicating" value={application.difficulty_communicating} /></dl></div></details>
      <section className="admin-detail-panel" style={{ marginTop: 14 }}><h2>Internal notes</h2><form className="admin-notes-form" onSubmit={(event) => { event.preventDefault(); void update({ type: 'notes', notes }); }}><textarea aria-label="Internal notes" value={notes} maxLength={2000} onChange={(event) => setNotes(event.target.value)} /><div className="admin-muted">{notes.length}/2000 characters</div><button className="admin-button admin-button-primary" type="submit" disabled={busy}>Save notes</button></form></section>
      {deleteOpen && <div className="admin-modal-backdrop" role="presentation"><section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="delete-title"><h2 id="delete-title">Delete application?</h2><p>This permanently deletes the application. Type <strong>{application.email}</strong> to confirm.</p><label className="admin-field"><span>Applicant email</span><input type="email" autoFocus value={emailConfirmation} onChange={(event) => setEmailConfirmation(event.target.value)} /></label>{message && <p className="admin-form-error" role="alert">{message}</p>}<div className="admin-modal-actions"><button className="admin-button" type="button" onClick={() => { setDeleteOpen(false); setMessage(''); }}>Cancel</button><button className="admin-button admin-button-danger" type="button" disabled={busy || emailConfirmation.trim().toLowerCase() !== application.email.toLowerCase()} onClick={deleteApplication}>{busy ? 'Deleting…' : 'Delete permanently'}</button></div></section></div>}
    </>
  );
}