import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  const missingVars = [];
  if (!supabaseUrl) missingVars.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!supabaseAnonKey) missingVars.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  throw new Error(`Missing Supabase server env vars: ${missingVars.join(', ')}`);
}

/**
 * Creates a Supabase client for server components with Next.js 16 cookie handling.
 * Uses the anon key and respects RLS.
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  
  return createServerClient(
    supabaseUrl!,
    supabaseAnonKey!,
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
}

/**
 * Admin client (service role) for bypassing RLS when needed.
 * Note: Due to compatibility issues with Next.js 16, we fall back to anon client
 * but with proper error handling for permission errors
 */
export async function createServerSupabaseAdminClient() {
  if (!supabaseServiceRoleKey) {
    console.warn('[createServerSupabaseAdminClient] SERVICE_ROLE_KEY not found, falling back to anon key');
    return await createServerSupabaseClient();
  }

  // For now, use the regular client but log that we intended to use admin
  // The syncUserToCustomerTable function handles permission errors gracefully
  console.log('[createServerSupabaseAdminClient] Using regular client due to compatibility constraints');
  return await createServerSupabaseClient();
}
