import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { deleteApplicationSchema, updateApplicationSchema } from '@/lib/admin-schemas';
import { adminServiceClient, logAdminError, requireAdminApi, writeAdminAudit } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';
const idSchema = z.string().uuid();
const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store, max-age=0' } });

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if ('response' in auth) return auth.response;
  const { id } = await context.params;
  if (!idSchema.safeParse(id).success) return json({ error: 'Invalid application id.' }, 400);
  let input: unknown;
  try { input = await request.json(); } catch { return json({ error: 'Invalid request body.' }, 400); }
  const parsed = updateApplicationSchema.safeParse(input);
  if (!parsed.success) return json({ error: 'Invalid update.' }, 400);

  const client = adminServiceClient();
  const update = parsed.data.type === 'status'
    ? { status: parsed.data.status, status_updated_at: new Date().toISOString(), status_updated_by: auth.email }
    : { notes: parsed.data.notes };
  const { data, error } = await client.from('applications').update(update).eq('id', id).eq('programme_id', parsed.data.programmeId).select('id').maybeSingle();
  if (error) { logAdminError(`application ${parsed.data.type} update`, error); return json({ error: 'Could not save this change.' }, 500); }
  if (!data) return json({ error: 'Application not found.' }, 404);
  try {
    if (parsed.data.type === 'status') await writeAdminAudit(auth.email, 'update_status', id, { status: parsed.data.status, programme_id: parsed.data.programmeId });
    else await writeAdminAudit(auth.email, 'update_notes', id, { characterCount: parsed.data.notes.length, programme_id: parsed.data.programmeId });
  } catch (auditError) {
    logAdminError('application update audit', auditError);
    return json({ error: 'The change was saved, but its audit record could not be written.' }, 500);
  }
  return json({ ok: true });
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if ('response' in auth) return auth.response;
  const { id } = await context.params;
  if (!idSchema.safeParse(id).success) return json({ error: 'Invalid application id.' }, 400);
  let input: unknown;
  try { input = await request.json(); } catch { return json({ error: 'Invalid request body.' }, 400); }
  const parsed = deleteApplicationSchema.safeParse(input);
  if (!parsed.success) return json({ error: 'Type the applicant email to confirm deletion.' }, 400);

  const client = adminServiceClient();
  const { data: application, error: lookupError } = await client.from('applications').select('id,email').eq('id', id).eq('programme_id', parsed.data.programmeId).maybeSingle();
  if (lookupError) { logAdminError('application delete lookup', lookupError); return json({ error: 'Could not delete this application.' }, 500); }
  if (!application) return json({ error: 'Application not found.' }, 404);
  if (parsed.data.emailConfirmation.toLowerCase() !== application.email.trim().toLowerCase()) return json({ error: 'The email does not match this application.' }, 400);

  try { await writeAdminAudit(auth.email, 'delete', id, { confirmed: true, programme_id: parsed.data.programmeId }); }
  catch (auditError) { logAdminError('application delete audit', auditError); return json({ error: 'Could not record the deletion audit.' }, 500); }
  const { error } = await client.from('applications').delete().eq('id', id).eq('programme_id', parsed.data.programmeId);
  if (error) { logAdminError('application delete', error); return json({ error: 'Could not delete this application.' }, 500); }
  return json({ ok: true });
}

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if ('response' in auth) return auth.response;
  const { id } = await context.params;
  if (!idSchema.safeParse(id).success) return json({ error: 'Invalid application id.' }, 400);
  let input: unknown;
  try { input = await request.json(); } catch { return json({ error: 'Invalid request body.' }, 400); }
  const parsed = z.object({ programmeId: z.string().uuid() }).safeParse(input);
  if (!parsed.success) return json({ error: 'Invalid programme.' }, 400);
  const client = adminServiceClient();
  const { data, error } = await client.from('applications').select('id,sensitive').eq('id', id).eq('programme_id', parsed.data.programmeId).maybeSingle();
  if (error) { logAdminError('sensitive application view', error); return json({ error: 'Could not load sensitive information.' }, 500); }
  if (!data) return json({ error: 'Application not found.' }, 404);
  try { await writeAdminAudit(auth.email, 'view', id, { programme_id: parsed.data.programmeId, sensitive: true }); }
  catch (auditError) { logAdminError('sensitive view audit', auditError); return json({ error: 'Could not record the view audit.' }, 500); }
  return json({ ok: true, sensitive: data.sensitive ?? {} });
}
