import { supabaseBrowserClient } from '@/lib/supabase/client';

/**
 * Client-side function to get current user account data
 * Used by AuthContext and other client components
 */
export async function getCurrentUserAccountClient() {
  try {
    const { data: { user } } = await supabaseBrowserClient.auth.getUser();
    
    if (!user) {
      return null;
    }

    // Get customer data from customers table
    const { data: customer, error } = await supabaseBrowserClient
      .from('customers')
      .select('name, email')
      .eq('auth_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching customer data:', error);
      // Return basic user info if customer lookup fails
      return {
        name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
        email: user.email || '',
      };
    }

    return customer || {
      name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
      email: user.email || '',
    };
  } catch (error) {
    console.error('Error in getCurrentUserAccountClient:', error);
    return null;
  }
}
