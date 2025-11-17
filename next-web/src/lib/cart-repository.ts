import { supabaseBrowserClient } from '@/lib/supabase/client';
import { CartItem } from '@/types';

// Cart functions for Supabase sync
export async function saveCartToDatabase(userId: string, items: CartItem[]): Promise<void> {
  try {
    // Clear existing cart items
    await supabaseBrowserClient
      .from('cart_items')
      .delete()
      .eq('user_id', userId);

    // Insert new cart items
    if (items.length > 0) {
      const cartItemsToInsert = items.map(item => ({
        user_id: userId,
        product_id: item.productId,
        quantity: item.quantity,
        price: item.price,
        sale_price: item.salePrice || null,
        created_at: new Date().toISOString(),
      }));

      const { error } = await supabaseBrowserClient
        .from('cart_items')
        .insert(cartItemsToInsert);

      if (error) {
        console.error('Error saving cart to database:', error);
        throw error;
      }
    }
  } catch (error) {
    console.error('Error in saveCartToDatabase:', error);
    // Don't throw error to avoid breaking cart functionality
    // Just log it and continue with local storage
  }
}

export async function loadCartFromDatabase(userId: string): Promise<CartItem[]> {
  try {
    const { data, error } = await supabaseBrowserClient
      .from('cart_items')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error loading cart from database:', error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Convert database items to CartItem format
    const cartItems: CartItem[] = data.map(item => ({
      productId: item.product_id,
      quantity: item.quantity,
      price: item.price,
      salePrice: item.sale_price,
      // Add other required fields if needed
      name: '', // Will be populated from product data
      image: '', // Will be populated from product data
      slug: '', // Will be populated from product data
    }));

    return cartItems;
  } catch (error) {
    console.error('Error in loadCartFromDatabase:', error);
    return [];
  }
}

export async function clearCartFromDatabase(userId: string): Promise<void> {
  try {
    await supabaseBrowserClient
      .from('cart_items')
      .delete()
      .eq('user_id', userId);
  } catch (error) {
    console.error('Error in clearCartFromDatabase:', error);
  }
}
