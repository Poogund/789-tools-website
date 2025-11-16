import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
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
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

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

  return res;
}

// Configure which routes this middleware runs on
export const config = {
  matcher: '/account/:path*',
};

