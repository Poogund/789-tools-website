import { supabaseBrowserClient } from '@/lib/supabase/client';
import { CartItem } from '@/types';

// Cart functions for Supabase sync
export async function saveCartToDatabase(userId: string, items: CartItem[]): Promise<void> {
  try {
    // First, find or create cart for this user
    const { data: cart, error: cartError } = await supabaseBrowserClient
      .from('carts')
      .select('id')
      .eq('customer_id', userId)
      .single();

    let cartId: string;
    
    if (cartError || !cart) {
      // Create new cart if not found
      const { data: newCart, error: createError } = await supabaseBrowserClient
        .from('carts')
        .insert({ customer_id: userId })
        .select('id')
        .single();
      
      if (createError || !newCart) {
        console.error('Error creating cart:', createError);
        throw createError;
      }
      cartId = newCart.id;
    } else {
      cartId = cart.id;
    }

    // Clear existing cart items
    await supabaseBrowserClient
      .from('cart_items')
      .delete()
      .eq('cart_id', cartId);

    // Insert new cart items
    if (items.length > 0) {
      const cartItemsToInsert = items.map(item => ({
        cart_id: cartId,
        product_id: item.productId,
        quantity: item.quantity,
        price: item.price,
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
    console.log('Loading cart from database for user:', userId.substring(0, 8) + '...');
    
    // First find the cart for this user
    const { data: cart, error: cartError } = await supabaseBrowserClient
      .from('carts')
      .select('id')
      .eq('customer_id', userId)
      .single();

    if (cartError || !cart) {
      console.log('No cart found for user:', cartError?.message || 'No cart');
      return [];
    }

    console.log('Found cart:', cart.id);
    
    // Load cart items for this cart
    const { data, error } = await supabaseBrowserClient
      .from('cart_items')
      .select('*')
      .eq('cart_id', cart.id);

    if (error) {
      console.error('Supabase error loading cart items:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        cartId: cart.id
      });
      return [];
    }

    if (!data || data.length === 0) {
      console.log('No cart items found for cart');
      return [];
    }

    console.log('Loaded', data.length, 'cart items from database');

    // Convert database items to CartItem format
    const cartItems: CartItem[] = data.map(item => ({
      productId: item.product_id,
      quantity: item.quantity,
      price: item.price,
      salePrice: undefined, // Database doesn't have sale_price column
      name: '', // Will be populated from product data
      image: '', // Will be populated from product data
      slug: '', // Will be populated from product data
    }));

    return cartItems;
  } catch (error) {
    console.error('Unexpected error in loadCartFromDatabase:', {
      error: error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      userId: userId ? 'present' : 'missing'
    });
    return [];
  }
}

export async function clearCartFromDatabase(userId: string): Promise<void> {
  try {
    // Find the cart for this user first
    const { data: cart, error: cartError } = await supabaseBrowserClient
      .from('carts')
      .select('id')
      .eq('customer_id', userId)
      .single();

    if (cartError || !cart) {
      console.log('No cart found to clear for user');
      return;
    }

    // Clear cart items for this cart
    await supabaseBrowserClient
      .from('cart_items')
      .delete()
      .eq('cart_id', cart.id);
  } catch (error) {
    console.error('Error in clearCartFromDatabase:', error);
  }
}
