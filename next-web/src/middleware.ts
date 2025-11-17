import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware for protecting /account routes
 * TASK-042: Account Layout (F08-1)
 * Spec: F05/F08 (guard part), Plan: §5.3
 * 
 * Protects all routes starting with /account
 * Redirects to /login if user is not authenticated
 */
export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Get session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check if accessing /account routes
  if (request.nextUrl.pathname.startsWith('/account')) {
    // If no session, redirect to login
    if (!session) {
      const loginUrl = new URL('/login', request.url);
      // Preserve the original URL as redirect parameter
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return supabaseResponse;
}

// Configure which routes this middleware runs on
export const config = {
  matcher: '/account/:path*',
};

