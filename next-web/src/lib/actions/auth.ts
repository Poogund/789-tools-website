'use server';

import { createServerSupabaseAdminClient } from '@/lib/supabase/server';
import type { User } from '@supabase/supabase-js';

/**
 * Syncs a Supabase Auth user to the public 'customers' table.
 * This function uses an admin client to perform an "upsert" operation,
 * creating or updating a customer record. It's designed to handle
 * common scenarios like new user sign-ups, returning user logins, and
 * account merging when a user signs in with a new auth provider but
 * uses an existing email.
 *
 * @param user - The Supabase Auth User object.
 * @returns The customer ID from the 'customers' table, or null if a
 * non-fatal permission error occurs (allowing login to proceed).
 * @throws Throws an error for unexpected database issues.
 */
export async function syncUserToCustomerTable(user: User): Promise<string | null> {
  try {
    const supabase = await createServerSupabaseAdminClient();
    const { id: authId, email, user_metadata } = user;

    // Determine the best name, falling back to a generic one.
    const name = user_metadata?.full_name || user_metadata?.name || email?.split('@')[0] || 'Anonymous';

    // Prepare the data for upsert.
    // We prioritize auth_id as the primary link.
    const customerData = {
      auth_id: authId,
      email: email || '',
      name,
      updated_at: new Date().toISOString(),
    };

    // Upsert on 'auth_id': handles new users and returning users efficiently.
    const { data, error } = await supabase
      .from('customers')
      .upsert(customerData, { onConflict: 'auth_id' })
      .select('id')
      .single();

    // If the upsert was successful, we're done.
    if (!error) {
      return data.id;
    }

    // If the upsert failed, it might be because the email is already in use
    // by a different auth_id (violating a UNIQUE constraint on email).
    // This is a common scenario when a user signs up with email/password
    // and later uses a social login with the same email.
    if (error.code === '23505' && email) { // '23505' is unique_violation
      console.warn(
        `[syncUser] Upsert on auth_id failed, likely due to email conflict.
        Attempting to merge by updating the record with the matching email.`
      );

      // In this case, we find the existing customer by their email and
      // update their auth_id to link them to the new login method.
      const { data: updatedData, error: updateError } = await supabase
        .from('customers')
        .update({
          auth_id: authId,
          name, // Also update name in case it's more complete now
          updated_at: new Date().toISOString(),
        })
        .eq('email', email)
        .select('id')
        .single();

      if (updateError) {
        console.error('[syncUser] Failed to merge account by email after conflict:', updateError);
        throw updateError; // The merge attempt failed, something is wrong.
      }

      console.log('[syncUser] Successfully merged account by email.');
      return updatedData.id;
    }

    // For any other errors, re-throw them.
    throw error;

  } catch (error: unknown) {
    console.error('[syncUser] General failure to sync user:', error);

    // Gracefully handle permission errors. This can happen if RLS is configured
    // to prevent even the admin from performing certain actions, or if the
    // admin client setup is incorrect. We don't want to block login for this.
    const err = error as { code?: string; message?: string };
    if (err?.code === '42501' || err?.message?.includes('permission') || err?.message?.includes('policy')) {
      console.warn('[syncUser] Permission denied. This is treated as non-fatal.');
      return null;
    }

    // Re-throw other errors to be handled by the caller.
    throw error;
  }
}
