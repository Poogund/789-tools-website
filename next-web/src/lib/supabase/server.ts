import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Use service role if available, otherwise fallback to anon key
// This allows the app to work even without service role key
const apiKey = supabaseServiceRoleKey || supabaseAnonKey;

if (!supabaseUrl || !apiKey) {
  const missingVars = [];
  if (!supabaseUrl) missingVars.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!apiKey) missingVars.push('SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  throw new Error(`Missing Supabase server env vars: ${missingVars.join(', ')}`);
}

export function createServerSupabaseClient() {
  // Log which key is being used (for debugging, remove in production)
  if (!supabaseServiceRoleKey && supabaseAnonKey) {
    console.warn('[createServerSupabaseClient] Using anon key as fallback - service role key not found');
  }
  
  return createClient(supabaseUrl!, apiKey!, {
    auth: {
      persistSession: false,
    },
  });
}
