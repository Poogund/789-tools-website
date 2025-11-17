'use server';

import { createServerSupabaseAdminClient } from '@/lib/supabase/server';
import type { User } from '@supabase/supabase-js';

/**
 * Sync Supabase Auth user to customers table
 * Creates or updates customer record when user logs in
 * 
 * @param user - Supabase Auth User object
 * @returns Customer ID or null if error
 * 
 * NOTE: Uses admin client to bypass RLS since this is called from server action
 * and we already have the authenticated user object from client-side auth
 */
export async function syncUserToCustomerTable(user: User) {
  try {
    // Use admin client to bypass RLS - we already have authenticated user from client
    const supabase = await createServerSupabaseAdminClient();
    
    // Extract user data
    const authId = user.id;
    const email = user.email;
    const name = user.email || user.user_metadata?.full_name || user.user_metadata?.name || 'User';
    
    // Check if customer already exists by auth_id
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id, email, auth_id')
      .eq('auth_id', authId)
      .maybeSingle();

    // If customer exists with this auth_id, update it
    if (existingCustomer) {
      const { data, error } = await supabase
        .from('customers')
        .update({
          email: email || '',
          name: name,
          updated_at: new Date().toISOString(),
        })
        .eq('auth_id', authId)
        .select()
        .single();

      if (error) {
        console.error('[syncUserToCustomerTable] Update error:', error);
        throw error;
      }

      return data?.id || null;
    }

    // If customer exists with this email but different auth_id, update it
    if (email) {
      const { data: existingByEmail } = await supabase
        .from('customers')
        .select('id, email, auth_id')
        .eq('email', email)
        .maybeSingle();

      if (existingByEmail) {
        const { data, error } = await supabase
          .from('customers')
          .update({
            auth_id: authId,
            name: name,
            updated_at: new Date().toISOString(),
          })
          .eq('email', email)
          .select()
          .single();

        if (error) {
          console.error('[syncUserToCustomerTable] Update by email error:', error);
          throw error;
        }

        return data?.id || null;
      }
    }

    // Insert new customer
    const { data, error } = await supabase
      .from('customers')
      .insert({
        auth_id: authId,
        email: email || '',
        name: name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('[syncUserToCustomerTable] Insert error:', error);
      
      // If it's a unique constraint error, try to update instead
      if (error.code === '23505' || error.message?.includes('unique') || error.message?.includes('duplicate')) {
        // Try to get existing customer and update
        if (email) {
          const { data: existing } = await supabase
            .from('customers')
            .select('id')
            .eq('email', email)
            .maybeSingle();
          
          if (existing) {
            const { data: updated, error: updateError } = await supabase
              .from('customers')
              .update({
                auth_id: authId,
                name: name,
                updated_at: new Date().toISOString(),
              })
              .eq('email', email)
              .select()
              .single();
            
            if (updateError) {
              throw updateError;
            }
            
            return updated?.id || null;
          }
        }
      }
      
      throw error;
    }

    return data?.id || null;
  } catch (error: any) {
    console.error('[syncUserToCustomerTable] Failed to sync user:', error);
    
    // Don't throw permission errors - let login continue
    if (error?.code === '42501' || error?.message?.includes('permission') || error?.message?.includes('policy')) {
      console.warn('[syncUserToCustomerTable] Permission denied - this may be due to RLS policies');
      return null;
    }
    
    throw error;
  }
}