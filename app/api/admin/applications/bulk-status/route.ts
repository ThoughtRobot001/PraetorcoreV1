import { NextRequest, NextResponse } from 'next/server';
import { bulkStatusSchema } from '@/lib/admin-schemas';
import { adminServiceClient, logAdminError, requireAdminApi, writeAdminAudit } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';
const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store, max-age=0' } });

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi();
  if ('response' in auth) return auth.response;
  let input: unknown;
  try { input = await request.json(); } catch { return json({ error: 'Invalid request body.' }, 400); }
  const parsed = bulkStatusSchema.safeParse(input);
  if (!parsed.success) return json({ error: 'Invalid bulk status update.' }, 400);
  const ids = [...new Set(parsed.data.ids)];
  const { data, error } = await adminServiceClient().from('applications').update({
    status: parsed.data.status,
    status_updated_at: new Date().toISOString(),
    status_updated_by: auth.email,
  }).in('id', ids).eq('programme_id', parsed.data.programmeId).select('id');
  if (error) { logAdminError('bulk status update', error); return json({ error: 'Could not update the selected applications.' }, 500); }
  try {
    await Promise.all((data ?? []).map((row) => writeAdminAudit(auth.email, 'update_status', row.id, { status: parsed.data.status, bulk: true, programme_id: parsed.data.programmeId })));
  } catch (auditError) {
    logAdminError('bulk status audit', auditError);
    return json({ error: 'The status was saved, but an audit record could not be written.' }, 500);
  }
  return json({ ok: true, updated: data?.length ?? 0 });
}
