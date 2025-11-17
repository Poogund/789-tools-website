import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser-side Supabase client for Next.js 16 App Router.
 * Uses @supabase/ssr which is compatible with Next.js 16.
 */
export const supabaseBrowserClient = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
