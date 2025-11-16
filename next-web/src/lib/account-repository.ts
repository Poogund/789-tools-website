import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { createServerSupabaseClient } from './supabase/server';
import type { Order } from '@/types';

/**
 * Account Repository
 * TASK-043: Order History Page (F08-2)
 * Spec: F08, Plan: §6.4
 * 
 * Repository for account-related data (orders, profile)
 * Separated from catalog-repository which is for public data
 */

/**
 * Create Supabase client with user session (reads from cookies)
 * Used for server components that need authenticated user data
 */
function createServerSupabaseClientWithSession() {
  const cookieStore = cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
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
 * Get orders for the currently authenticated user
 * Returns empty array if user is not authenticated or has no customer record
 * 
 * Logic:
 * 1. Get authenticated user from Supabase Auth
 * 2. Find customer_id from customers table using auth_id
 * 3. Query orders table by customer_id
 * 4. Order by created_at DESC (newest first)
 * 
 * @returns Array of orders for current user
 */
export async function getOrdersForCurrentUser(): Promise<Order[]> {
  try {
    // Create client with session (reads cookies)
    const supabase = createServerSupabaseClientWithSession();
    
    // Step 1: Get authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      // User not authenticated - return empty array
      console.log('[getOrdersForCurrentUser] User not authenticated');
      return [];
    }
    
    // Step 2: Find customer_id from customers table using auth_id
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('id')
      .eq('auth_id', user.id)
      .single();
    
    if (customerError || !customer) {
      // Customer record not found - return empty array
      console.log('[getOrdersForCurrentUser] Customer record not found for auth_id:', user.id);
      return [];
    }
    
    // Step 3: Query orders by customer_id, ordered by created_at DESC
    // Use server client (with service role) for more reliable query
    const supabaseServer = createServerSupabaseClient();
    const { data: orders, error: ordersError } = await supabaseServer
      .from('orders')
      .select('*')
      .eq('customer_id', customer.id)
      .order('created_at', { ascending: false });
    
    if (ordersError) {
      console.error('[getOrdersForCurrentUser] Error fetching orders:', ordersError);
      return [];
    }
    
    // Map database fields to Order type
    // Note: Database uses 'order_status' but Type interface uses 'status'
    // Also: Database uses 'total' but Type uses 'total_amount'
    const mappedOrders: Order[] = (orders || []).map((order: any) => ({
      id: order.id,
      customer_id: order.customer_id,
      customer_name: order.customer_name,
      customer_phone: order.customer_phone || '',
      customer_email: order.customer_email,
      customer_address: order.shipping_address || '',
      payment_method: order.payment_method,
      payment_status: order.payment_status === 'pending' ? 'unpaid' : 
                      order.payment_status === 'paid' ? 'paid' : 
                      order.payment_status === 'failed' ? 'failed' : 'unpaid',
      status: order.order_status === 'pending' ? 'pending' :
              order.order_status === 'confirmed' ? 'confirmed' :
              order.order_status === 'processing' ? 'processing' :
              order.order_status === 'shipped' ? 'shipped' :
              order.order_status === 'delivered' ? 'completed' :
              order.order_status === 'cancelled' ? 'cancelled' : 'pending',
      total_amount: parseFloat(order.total) || 0,
      transfer_slip_url: order.transfer_slip_url || undefined,
      omise_charge_id: order.omise_charge_id || undefined,
      created_at: order.created_at,
      updated_at: order.updated_at,
    }));
    
    return mappedOrders;
  } catch (error) {
    console.error('[getOrdersForCurrentUser] Unexpected error:', error);
    return [];
  }
}

