import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { syncUserToCustomerTable } from '@/lib/actions/auth';

/**
 * OAuth callback handler for Supabase social login (API-C1)
 * Handles redirects from Google/Facebook OAuth
 * Spec: F05, Plan: §5.1
 */
export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');

    // Guard clause: Check if code is provided
    if (!code) {
      throw new Error('No code provided');
    }

    const supabase = createServerSupabaseClient();

    // Exchange code for session
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

    // Sync user to customers table (DoD TASK-040)
    await syncUserToCustomerTable(user);

    // Redirect to account page (DoD TASK-041)
    return NextResponse.redirect(`${origin}/account`);
  } catch (error) {
    console.error('[auth/callback] Error:', error);
    // Error handling: Redirect to login with error
    const { origin } = new URL(request.url);
    return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
  }
}

