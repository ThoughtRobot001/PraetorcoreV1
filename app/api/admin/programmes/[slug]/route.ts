import { NextRequest, NextResponse } from 'next/server';
import { programmeUpdateSchema } from '@/lib/admin-schemas';
import { adminServiceClient, logAdminError, requireAdminApi, writeAdminAudit } from '@/lib/admin-auth';

const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store, max-age=0' } });
export async function PATCH(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const auth = await requireAdminApi(); if ('response' in auth) return auth.response;
  const { slug } = await context.params; let input: unknown;
  try { input = await request.json(); } catch { return json({ error: 'Invalid request body.' }, 400); }
  const parsed = programmeUpdateSchema.safeParse(input); if (!parsed.success) return json({ error: 'Invalid programme update.' }, 400);
  const client = adminServiceClient();
  const { data: current, error: lookupError } = await client.from('programmes').select('id,status,closes_at,max_applications').eq('slug', slug).maybeSingle();
  if (lookupError) { logAdminError('programme lookup', lookupError); return json({ error: 'Could not load this programme.' }, 500); }
  if (!current) return json({ error: 'Programme not found.' }, 404);
  const changes: Record<string, unknown> = {};
  const audit: Array<[string, unknown, unknown]> = [];
  if (parsed.data.status !== undefined && parsed.data.status !== current.status) { changes.status = parsed.data.status; audit.push(['status', current.status, parsed.data.status]); }
  if (parsed.data.closesAt !== undefined && parsed.data.closesAt !== current.closes_at) { changes.closes_at = parsed.data.closesAt; audit.push(['closes_at', current.closes_at, parsed.data.closesAt]); }
  if (parsed.data.maxApplications !== undefined && parsed.data.maxApplications !== current.max_applications) { changes.max_applications = parsed.data.maxApplications; audit.push(['max_applications', current.max_applications, parsed.data.maxApplications]); }
  if (!Object.keys(changes).length) return json({ ok: true });
  const { error } = await client.from('programmes').update(changes).eq('id', current.id);
  if (error) { logAdminError('programme update', error); return json({ error: 'Could not save programme settings.' }, 500); }
  try { await Promise.all(audit.map(([field, previous, value]) => writeAdminAudit(auth.email, 'update_programme', null, { programme_id: current.id, programme_slug: slug, field, previous, value }))); }
  catch (error) { logAdminError('programme update audit', error); return json({ error: 'Settings were saved, but an audit record could not be written.' }, 500); }
  return json({ ok: true });
}
