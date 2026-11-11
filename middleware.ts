import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

const idleCookie = 'admin_last_activity';
const idleSeconds = 8 * 60 * 60;

function protectHeaders(response: NextResponse, isAdminPage: boolean) {
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  if (isAdminPage) {
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'no-referrer');
  }
  return response;
}

function copyCookies(from: NextResponse, to: NextResponse) {
  from.cookies.getAll().forEach((cookie) => to.cookies.set(cookie));
  return to;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isApi = pathname.startsWith('/api/admin');
  const isLoginPage = pathname === '/admin/login';
  const isAdminPage = pathname === '/admin' || pathname.startsWith('/admin/');
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  let response = NextResponse.next({ request });
  if (!url || !key) {
    if (isLoginPage) return protectHeaders(response, true);
    const target = isApi
      ? NextResponse.json({ error: 'Authentication required.' }, { status: 503 })
      : NextResponse.redirect(new URL('/admin/login?error=configuration', request.url));
    return protectHeaders(target, isAdminPage);
  }

  const supabase = createServerClient(url, key, {
    cookieOptions: { maxAge: idleSeconds, path: '/', sameSite: 'lax', httpOnly: true, secure: process.env.NODE_ENV === 'production' },
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data: { user }, error } = await supabase.auth.getUser();
  const hasSession = Boolean(user && !error);

  if (hasSession && !isLoginPage) {
    const activity = request.cookies.get(idleCookie)?.value;
    const lastActive = activity ? Number(activity) : 0;
    const expired = !Number.isFinite(lastActive) || lastActive <= 0 || Date.now() - lastActive > idleSeconds * 1000;
    if (expired) {
      await supabase.auth.signOut();
      const redirectResponse = NextResponse.redirect(new URL('/admin/login?error=expired', request.url));
      redirectResponse.cookies.delete(idleCookie);
      return protectHeaders(copyCookies(response, redirectResponse), isAdminPage);
    }
    response.cookies.set(idleCookie, String(Date.now()), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: idleSeconds,
    });
  }

  if (!hasSession && !isLoginPage) {
    if (isApi) return protectHeaders(NextResponse.json({ error: 'Authentication required.' }, { status: 401 }), false);
    return protectHeaders(NextResponse.redirect(new URL('/admin/login', request.url)), true);
  }

  return protectHeaders(response, isAdminPage);
}

export const config = { matcher: ['/admin/:path*', '/api/admin', '/api/admin/:path*'] };