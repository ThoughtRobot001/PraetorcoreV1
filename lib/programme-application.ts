import { createHash } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getProgramme } from '@/content/programmes';
import { buildSchema } from '@/lib/programme-schema';
import { createSupabaseAdminClient } from '@/lib/supabase-server';

const MAX_BODY_BYTES = 20 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 5;
const attemptsByIpHash = new Map<string, number[]>();
const response = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store, max-age=0' } });
function ipHash(req: NextRequest) { const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip')?.trim() || 'unknown'; return createHash('sha256').update(ip).digest('hex'); }
function allowedAttempt(hash: string) { const now = Date.now(); const attempts = (attemptsByIpHash.get(hash) ?? []).filter((stamp) => now - stamp < RATE_LIMIT_WINDOW_MS); if (attempts.length >= RATE_LIMIT_MAX_ATTEMPTS) { attemptsByIpHash.set(hash, attempts); return false; } attempts.push(now); attemptsByIpHash.set(hash, attempts); return true; }
async function readBody(request: NextRequest) { const length = Number(request.headers.get('content-length')); if (Number.isFinite(length) && length > MAX_BODY_BYTES) return { body: '', tooLarge: true }; if (!request.body) return { body: '', tooLarge: false }; const reader = request.body.getReader(); const chunks: Uint8Array[] = []; let total = 0; while (true) { const { done, value } = await reader.read(); if (done) break; total += value.byteLength; if (total > MAX_BODY_BYTES) return { body: '', tooLarge: true }; chunks.push(value); } const bytes = new Uint8Array(total); let offset = 0; for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; } return { body: new TextDecoder().decode(bytes), tooLarge: false }; }
function normalizePhone(value: string) { const cleaned = value.replace(/[\s\-()]/g, ''); if (cleaned.startsWith('+234')) return cleaned; if (cleaned.startsWith('234')) return `+${cleaned}`; return `+234${cleaned.slice(1)}`; }

export async function handleProgrammeApply(request: NextRequest, slug: string) {
  const definition = getProgramme(slug);
  if (!definition) return response({ ok: false, message: 'This programme is unavailable.' }, 404);
  const { body, tooLarge } = await readBody(request);
  if (tooLarge) return response({ ok: false, message: 'Request is too large.' }, 413);
  let input: unknown;
  try { input = JSON.parse(body); } catch { return response({ ok: false, message: 'Invalid request body.' }, 400); }
  if (typeof input === 'object' && input !== null && 'website' in input && typeof input.website === 'string' && input.website.trim()) return response({ ok: true, message: 'Submission received' });
  const hash = ipHash(request);
  if (!allowedAttempt(hash)) return response({ ok: false, message: 'Too many attempts. Please try again in a few minutes.' }, 429);
  const parsed = buildSchema(definition).safeParse(input);
  if (!parsed.success) { const errors: Record<string, string> = {}; parsed.error.issues.forEach((issue) => { const key = issue.path[0]; if (typeof key === 'string') errors[key] = issue.message; }); return response({ ok: false, errors, message: 'Validation failed' }, 422); }

  try {
    const supabase = createSupabaseAdminClient();
    const { data: programme, error: programmeError } = await supabase.from('programmes').select('id,status,opens_at,closes_at,max_applications').eq('slug', slug).maybeSingle();
    if (programmeError || !programme) return response({ ok: false, message: 'Programme is unavailable. Please try again later.' }, 503);
    if (programme.status !== 'open' || (programme.opens_at && Date.now() < new Date(programme.opens_at).getTime()) || (programme.closes_at && Date.now() > new Date(programme.closes_at).getTime())) return response({ ok: false, message: definition.form.closedMessage ?? 'Applications for this programme are closed.' }, 403);
    if (programme.max_applications !== null) { const { count, error } = await supabase.from('applications').select('id', { count: 'exact', head: true }).eq('programme_id', programme.id); if (error) throw error; if ((count ?? 0) >= programme.max_applications) return response({ ok: false, message: definition.form.fullMessage ?? 'Applications for this programme are full.' }, 403); }
    const fields = definition.form.sections.flatMap((section) => section.fields);
    const data = parsed.data as Record<string, unknown>;
    const coreKeys = new Set(fields.filter((field) => (field.group ?? 'answers') === 'core').map((field) => field.key));
    const answers: Record<string, unknown> = { consent: data.consent };
    const sensitive: Record<string, unknown> = {};
    fields.forEach((field) => { if (coreKeys.has(field.key)) return; const value = data[field.key]; if ((field.group ?? 'answers') === 'sensitive') sensitive[field.key] = value; else answers[field.key] = value; });
    const readCore = (key: string) => String(data[key] ?? '');
    const insert = await supabase.from('applications').insert({ programme_id: programme.id, full_name: readCore('fullName'), email: readCore('email'), phone: readCore('phone'), email_normalized: readCore('email').trim().toLowerCase(), phone_normalized: normalizePhone(readCore('phone')), track: coreKeys.has('track') ? readCore('track') : null, answers, sensitive, source_ip_hash: hash }).select('id').single();
    if (insert.error) { if (insert.error.code === '23505') return response({ ok: false, message: 'It looks like you have already signed up with this email or phone number. If you think this is a mistake, contact us.' }, 409); console.error('[Programme application database error]', { code: insert.error.code ?? 'unknown' }); return response({ ok: false, message: 'Something went wrong. Please try again.' }, 500); }
    return response({ ok: true, message: 'Application submitted successfully', firstName: readCore('fullName').trim().split(' ')[0] });
  } catch (error) { const record = error as { code?: unknown }; console.error('[Programme application error]', { code: typeof record?.code === 'string' ? record.code : 'unknown' }); return response({ ok: false, message: 'Something went wrong. Please try again.' }, 500); }
}
