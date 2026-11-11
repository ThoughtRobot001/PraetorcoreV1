'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminLoginSchema } from '@/lib/admin-schemas';
import { ADMIN_IDLE_SECONDS, createSupabaseSessionClient, isAdminEmail, logAdminError, writeAdminAudit } from '@/lib/admin-auth';
import { loadProgrammeStates } from '@/lib/programme-state';

export interface LoginState { error: string | null }

export async function loginAction(_previousState: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = adminLoginSchema.safeParse({ email: formData.get('email'), password: formData.get('password') });
  if (!parsed.success) return { error: 'Enter a valid email and password.' };

  let supabase;
  try { supabase = await createSupabaseSessionClient(); }
  catch (error) {
    logAdminError('login configuration', error);
    return { error: 'Admin login is not configured yet.' };
  }

  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error || !data.user) return { error: 'Email or password is incorrect.' };
  const email = data.user.email?.trim() ?? '';
  if (!isAdminEmail(email)) {
    await supabase.auth.signOut();
    (await cookies()).delete('admin_last_activity');
    return { error: 'You do not have access.' };
  }

  (await cookies()).set('admin_last_activity', String(Date.now()), {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: ADMIN_IDLE_SECONDS,
  });
  try { await writeAdminAudit(email, 'login', null, {}); }
  catch (auditError) { logAdminError('login audit', auditError); }
  redirect('/admin');
}

export async function signOutAction() {
  try {
    const supabase = await createSupabaseSessionClient();
    await supabase.auth.signOut();
  } catch (error) { logAdminError('sign out', error); }
  (await cookies()).delete('admin_last_activity');
  redirect('/admin/login');
}

export async function rememberProgrammePreferenceAction(formData: FormData) {
  const slug = String(formData.get('programme') ?? '');
  const programmes = await loadProgrammeStates();
  const selected = programmes.find((programme) => programme.slug === slug);
  if (!selected) redirect('/admin');

  (await cookies()).set('admin_selected_programme', selected.slug, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/admin',
    maxAge: 30 * 24 * 60 * 60,
  });
  redirect(`/admin?programme=${encodeURIComponent(selected.slug)}`);
}
