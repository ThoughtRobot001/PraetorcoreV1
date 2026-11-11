import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseSessionClient } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseSessionClient();
    await supabase.auth.signOut();
  } catch {
    // Always return to the login screen without exposing auth details.
  }
  const response = NextResponse.redirect(new URL('/admin/login?error=access', request.url));
  response.cookies.delete('admin_last_activity');
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  return response;
}