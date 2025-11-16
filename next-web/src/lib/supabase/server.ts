import { createClient } from '@supabase/supabase-js';

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
 * Create Supabase client for server-side operations that need session cookies
 * Uses ANON_KEY to allow Supabase Auth to create session cookies properly
 * 
 * IMPORTANT: This function uses ANON_KEY (not SERVICE_ROLE_KEY) because:
 * - Auth operations (login, callback) need to create session cookies
 * - SERVICE_ROLE_KEY bypasses RLS but cannot create user sessions
 * - Use createServerSupabaseAdminClient() for admin operations that need to bypass RLS
 */
export function createServerSupabaseClient() {
  return createClient(supabaseUrl!, supabaseAnonKey!, {
    auth: {
      persistSession: false,
    },
  });
}

/**
 * Create Supabase client with SERVICE_ROLE_KEY for admin operations
 * Use this only when you need to bypass RLS policies
 * WARNING: This should NOT be used for auth operations as it cannot create session cookies
 */
export function createServerSupabaseAdminClient() {
  if (!supabaseServiceRoleKey) {
    console.warn('[createServerSupabaseAdminClient] SERVICE_ROLE_KEY not found, falling back to anon key');
    return createServerSupabaseClient();
  }
  
  return createClient(supabaseUrl!, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
    },
  });
}
