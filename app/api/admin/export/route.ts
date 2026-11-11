import { NextRequest, NextResponse } from 'next/server';
import { exportQuerySchema } from '@/lib/admin-schemas';
import { applyApplicationFilters, paramsToObject } from '@/lib/admin-query';
import { adminServiceClient, logAdminError, requireAdminApi, writeAdminAudit } from '@/lib/admin-auth';
import { getProgramme } from '@/content/programmes';

export const dynamic = 'force-dynamic';
const errorResponse = (message: string, status: number) => NextResponse.json({ error: message }, { status, headers: { 'Cache-Control': 'no-store, max-age=0' } });

function csvCell(value: unknown) {
  let cell = value === null || value === undefined ? '' : String(value);
  if (/^[=+\-@\t\r]/.test(cell)) cell = `'${cell}`;
  return `"${cell.replace(/"/g, '""')}"`;
}

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if ('response' in auth) return auth.response;
  const parsed = exportQuerySchema.safeParse(paramsToObject(request.nextUrl.searchParams));
  if (!parsed.success) return errorResponse('Invalid export filters.', 400);
  const { includeAccessibilityAnswers, includeNotes, ...filters } = parsed.data;
  const programme = getProgramme(filters.programme);
  if (!programme) return errorResponse('Invalid programme.', 400);
  const state = await adminServiceClient().from('programmes').select('id').eq('slug', filters.programme).maybeSingle();
  if (state.error || !state.data) return errorResponse('Programme not found.', 404);
  const fields = programme.form.sections.flatMap((section) => section.fields);
  const columns = [
    { label: 'Submitted', get: (row: Record<string, any>) => row.created_at },
    ...fields.filter((field) => field.group === 'core' || (field.group ?? 'answers') === 'answers' || (field.group === 'sensitive' && includeAccessibilityAnswers)).map((field) => ({ label: field.label, get: (row: Record<string, any>) => field.group === 'core' ? ({ fullName: row.full_name, email: row.email, phone: row.phone, track: row.track } as Record<string, unknown>)[field.key] : field.group === 'sensitive' ? row.sensitive?.[field.key] : row.answers?.[field.key] })),
    { label: 'Status', get: (row: Record<string, any>) => row.status },
    { label: 'Status updated', get: (row: Record<string, any>) => row.status_updated_at },
    { label: 'Status updated by', get: (row: Record<string, any>) => row.status_updated_by },
  ];
  if (includeNotes) columns.push({ label: 'Notes', get: (row: Record<string, any>) => row.notes });

  const rows: Record<string, unknown>[] = [];
  for (let offset = 0; ; offset += 500) {
    const query = applyApplicationFilters(
      adminServiceClient().from('applications').select('id,created_at,status,status_updated_at,status_updated_by,full_name,email,phone,track,answers,sensitive,notes').eq('programme_id', state.data.id),
      filters,
    );
    const { data, error } = await query.order('created_at', { ascending: false }).range(offset, offset + 499);
    if (error) { logAdminError('CSV export query', error); return errorResponse('Could not export applications.', 500); }
    const batch = (data ?? []) as unknown as Record<string, unknown>[];
    rows.push(...batch);
    if (batch.length < 500) break;
  }

  try {
    await writeAdminAudit(auth.email, 'export', null, {
      programme_id: state.data.id,
      filters: { q: filters.q, track: filters.track, status: filters.status, from: filters.from ?? '', to: filters.to ?? '' },
      includeAccessibilityAnswers,
      includeNotes,
      rowCount: rows.length,
    });
  } catch (error) { logAdminError('CSV export audit', error); return errorResponse('Could not record the export audit.', 500); }

  const csv = `\uFEFF${[columns.map((column) => column.label), ...rows.map((row) => columns.map((column) => column.get(row)))].map((row) => row.map(csvCell).join(',')).join('\r\n')}`;
  const date = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filters.programme}-applications-${date}.csv"`,
      'Cache-Control': 'no-store, max-age=0',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
    },
  });
}
