import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { syncUserToCustomerTable } from '@/lib/actions/auth';

/**
 * OAuth callback handler for Supabase social login (API-C1)
 * Handles redirects from Google/Facebook OAuth
 * Spec: F05, Plan: §5.1
 * 
 * IMPORTANT: Uses createServerClient with cookies support to properly create session cookies
 */
export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');

    // Guard clause: Check if code is provided
    if (!code) {
      throw new Error('No code provided');
    }

    // Create Supabase client with cookies support for route handler
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    );

    // Exchange code for session (this will create session cookies)
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error('[auth/callback] Error exchanging code:', exchangeError);
      throw exchangeError;
    }

    // Get user after exchange
    const { data: { user }, error: getUserError } = await supabase.auth.getUser();

    if (getUserError) {
      console.error('[auth/callback] Error getting user:', getUserError);
      throw getUserError;
    }

    // Guard clause: Check if user exists
    if (!user) {
      throw new Error('User not found after exchange');
    }

    // Sync user to customers table (async - don't block redirect)
    syncUserToCustomerTable(user).catch((syncError: any) => {
      console.error('[auth/callback] Sync error (non-blocking):', syncError);
    });

    // Redirect to account page (DoD TASK-041)
    return NextResponse.redirect(`${origin}/account`);
  } catch (error) {
    console.error('[auth/callback] Error:', error);
    // Error handling: Redirect to login with error
    const { origin } = new URL(request.url);
    const errorMessage = error instanceof Error ? error.message : 'auth_callback_failed';
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(errorMessage)}`);
  }
}

