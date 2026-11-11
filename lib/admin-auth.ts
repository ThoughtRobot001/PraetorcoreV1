import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase-server';

export const ADMIN_IDLE_SECONDS = 8 * 60 * 60;

function publicSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error('Admin Supabase Auth is not configured.');
  return { url, key };
}

export async function createSupabaseSessionClient() {
  const { url, key } = publicSupabaseConfig();
  const cookieStore = await cookies();
  return createServerClient(url, key, {
    cookieOptions: { maxAge: ADMIN_IDLE_SECONDS, path: '/', sameSite: 'lax', httpOnly: true, secure: process.env.NODE_ENV === 'production' },
    cookies: {
      getAll() { return cookieStore.getAll(); },
      setAll(cookiesToSet) {
        try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); } catch { /* Server components cannot write cookies; middleware refreshes them. */ }
      },
    },
  });
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const allowed = (process.env.ADMIN_EMAILS ?? '').split(',').map((item) => item.trim().toLowerCase()).filter(Boolean);
  return allowed.includes(email.trim().toLowerCase());
}

function safeErrorText(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  return message
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[redacted-email]')
    .replace(/\+?\d[\d().\s-]{7,}\d/g, '[redacted-phone]');
}

export function logAdminError(operation: string, error: unknown) {
  const record = error as { code?: unknown } | null;
  console.error(`[admin] ${operation} failed`, {
    code: typeof record?.code === 'string' ? record.code : 'unknown',
    message: safeErrorText(error),
  });
}

export async function writeAdminAudit(
  adminEmail: string,
  action: 'login' | 'view' | 'update_status' | 'update_notes' | 'update_programme' | 'export' | 'delete',
  applicationId: string | null = null,
  detail: Record<string, unknown> = {},
) {
  const { error } = await createSupabaseAdminClient().from('admin_audit_log').insert({
    admin_email: adminEmail,
    action,
    application_id: applicationId,
    detail,
  });
  if (error) throw error;
}

export async function requireAdminPage() {
  let session;
  try {
    session = await createSupabaseSessionClient();
  } catch (error) {
    logAdminError('auth configuration', error);
    redirect('/admin/login?error=configuration');
  }
  const { data, error } = await session.auth.getUser();
  if (error || !data.user) redirect('/admin/login');
  const email = data.user.email?.trim();
  if (!isAdminEmail(email)) redirect('/api/admin-denied');
  return { user: data.user, email: email! };
}

export async function requireAdminApi() {
  let session;
  try {
    session = await createSupabaseSessionClient();
  } catch (error) {
    logAdminError('auth configuration', error);
    return { response: NextResponse.json({ error: 'Admin authentication is unavailable.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } }) };
  }
  const { data, error } = await session.auth.getUser();
  if (error || !data.user) {
    return { response: NextResponse.json({ error: 'Authentication required.' }, { status: 401, headers: { 'Cache-Control': 'no-store' } }) };
  }
  const email = data.user.email?.trim();
  if (!isAdminEmail(email)) {
    await session.auth.signOut();
    return { response: NextResponse.json({ error: 'You do not have access.' }, { status: 403, headers: { 'Cache-Control': 'no-store' } }) };
  }
  return { user: data.user, email: email!, session };
}

export function adminServiceClient() {
  return createSupabaseAdminClient();
}
