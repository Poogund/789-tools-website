'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { User } from '@supabase/supabase-js';

/**
 * Sync Supabase Auth user to customers table
 * Creates or updates customer record when user logs in
 * 
 * @param user - Supabase Auth User object
 * @returns Customer ID or null if error
 */
export async function syncUserToCustomerTable(user: User) {
  try {
    const supabase = createServerSupabaseClient();
    
    // Extract user data
    const authId = user.id;
    const email = user.email;
    const name = user.email || user.user_metadata?.full_name || user.user_metadata?.name || 'User';
    
    // Use upsert to handle both insert and update
    // If email exists, update auth_id and name; otherwise insert
    // Note: Using email as conflict key since it has UNIQUE constraint
    const { data, error } = await supabase
      .from('customers')
      .upsert(
        {
          auth_id: authId,
          email: email || '',
          name: name,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'email',
          // Update auth_id and name if email already exists
          ignoreDuplicates: false,
        }
      )
      .select()
      .single();

    if (error) {
      console.error('[syncUserToCustomerTable] Error:', error);
      throw error;
    }

    return data?.id || null;
  } catch (error) {
    console.error('[syncUserToCustomerTable] Failed to sync user:', error);
    throw error;
  }
}

