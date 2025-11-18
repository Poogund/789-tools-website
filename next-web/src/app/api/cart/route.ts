import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { CartItem } from '@/types';

interface CartSyncRequest {
  userId: string;
  cartItems: CartItem[];
}

interface CartUpdateRequest {
  userId: string;
  action: 'add' | 'update' | 'remove' | 'clear';
  item?: CartItem;
  productId?: string;
  quantity?: number;
}

// GET - Retrieve user's cart from database
export async function GET(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Get user's cart from database
    const { data: cart, error: cartError } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (cartError && cartError.code !== 'PGRST116') {
      console.error('Error fetching cart:', cartError);
      return NextResponse.json(
        { error: 'Failed to fetch cart', details: cartError.message },
        { status: 500 }
      );
    }

    // If no cart exists, return empty cart
    if (!cart) {
      return NextResponse.json({ cartItems: [] }, { status: 200 });
    }

    // Get cart items
    const { data: cartItems, error: itemsError } = await supabase
      .from('cart_items')
      .select('*')
      .eq('cart_id', cart.id)
      .order('created_at', { ascending: false });

    if (itemsError) {
      console.error('Error fetching cart items:', itemsError);
      return NextResponse.json(
        { error: 'Failed to fetch cart items', details: itemsError.message },
        { status: 500 }
      );
    }

    // Transform database items to CartItem format
    const transformedItems: CartItem[] = (cartItems || []).map((item: any) => ({
      productId: item.product_id,
      name: item.product_name,
      price: item.price,
      salePrice: item.sale_price,
      quantity: item.quantity,
      imageUrl: item.image_url,
    }));

    return NextResponse.json({ cartItems: transformedItems }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error in GET /api/cart:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST - Sync entire cart (used for login sync)
export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const body: CartSyncRequest = await request.json();
    const { userId, cartItems } = body;

    if (!userId || !cartItems) {
      return NextResponse.json(
        { error: 'userId and cartItems are required' },
        { status: 400 }
      );
    }

    // Get or create user's cart
    const { data: cart, error: cartError } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', userId)
      .single();

    let cartId: string;

    if (cartError && cartError.code !== 'PGRST116') {
      console.error('Error fetching cart:', cartError);
      return NextResponse.json(
        { error: 'Failed to fetch cart', details: cartError.message },
        { status: 500 }
      );
    }

    if (!cart) {
      // Create new cart
      const { data: newCart, error: createError } = await supabase
        .from('carts')
        .insert({ user_id: userId })
        .select('id')
        .single();

      if (createError) {
        console.error('Error creating cart:', createError);
        return NextResponse.json(
          { error: 'Failed to create cart', details: createError.message },
          { status: 500 }
        );
      }
      cartId = newCart.id;
    } else {
      cartId = cart.id;
    }

    // Clear existing cart items
    const { error: clearError } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cartId);

    if (clearError) {
      console.error('Error clearing cart items:', clearError);
      return NextResponse.json(
        { error: 'Failed to clear existing cart items', details: clearError.message },
        { status: 500 }
      );
    }

    // Insert new cart items
    if (cartItems.length > 0) {
      const dbItems = cartItems.map((item) => ({
        cart_id: cartId,
        product_id: item.productId,
        product_name: item.name,
        price: item.price,
        sale_price: item.salePrice || null,
        quantity: item.quantity,
        image_url: item.imageUrl || null,
      }));

      const { error: insertError } = await supabase
        .from('cart_items')
        .insert(dbItems);

      if (insertError) {
        console.error('Error inserting cart items:', insertError);
        return NextResponse.json(
          { error: 'Failed to insert cart items', details: insertError.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { message: 'Cart synced successfully', cartId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error in POST /api/cart:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT - Update specific cart item (add/update/remove)
export async function PUT(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const body: CartUpdateRequest = await request.json();
    const { userId, action, item, productId, quantity } = body;

    if (!userId || !action) {
      return NextResponse.json(
        { error: 'userId and action are required' },
        { status: 400 }
      );
    }

    // Get user's cart
    const { data: cart, error: cartError } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (cartError || !cart) {
      return NextResponse.json(
        { error: 'User cart not found' },
        { status: 404 }
      );
    }

    const cartId = cart.id;

    switch (action) {
      case 'add':
        if (!item) {
          return NextResponse.json(
            { error: 'item is required for add action' },
            { status: 400 }
          );
        }

        // Check if item already exists
        const { data: existingItem } = await supabase
          .from('cart_items')
          .select('id, quantity')
          .eq('cart_id', cartId)
          .eq('product_id', item.productId)
          .single();

        if (existingItem) {
          // Update existing item quantity
          const { error: updateError } = await supabase
            .from('cart_items')
            .update({ quantity: existingItem.quantity + item.quantity })
            .eq('id', existingItem.id);

          if (updateError) {
            return NextResponse.json(
              { error: 'Failed to update cart item', details: updateError.message },
              { status: 500 }
            );
          }
        } else {
          // Add new item
          const { error: insertError } = await supabase
            .from('cart_items')
            .insert({
              cart_id: cartId,
              product_id: item.productId,
              product_name: item.name,
              price: item.price,
              sale_price: item.salePrice || null,
              quantity: item.quantity,
              image_url: item.imageUrl || null,
            });

          if (insertError) {
            return NextResponse.json(
              { error: 'Failed to add cart item', details: insertError.message },
              { status: 500 }
            );
          }
        }
        break;

      case 'update':
        if (!productId || quantity === undefined) {
          return NextResponse.json(
            { error: 'productId and quantity are required for update action' },
            { status: 400 }
          );
        }

        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          const { error: deleteError } = await supabase
            .from('cart_items')
            .delete()
            .eq('cart_id', cartId)
            .eq('product_id', productId);

          if (deleteError) {
            return NextResponse.json(
              { error: 'Failed to remove cart item', details: deleteError.message },
              { status: 500 }
            );
          }
        } else {
          // Update item quantity
          const { error: updateError } = await supabase
            .from('cart_items')
            .update({ quantity })
            .eq('cart_id', cartId)
            .eq('product_id', productId);

          if (updateError) {
            return NextResponse.json(
              { error: 'Failed to update cart item', details: updateError.message },
              { status: 500 }
            );
          }
        }
        break;

      case 'remove':
        if (!productId) {
          return NextResponse.json(
            { error: 'productId is required for remove action' },
            { status: 400 }
          );
        }

        const { error: deleteError } = await supabase
          .from('cart_items')
          .delete()
          .eq('cart_id', cartId)
          .eq('product_id', productId);

        if (deleteError) {
          return NextResponse.json(
            { error: 'Failed to remove cart item', details: deleteError.message },
            { status: 500 }
          );
        }
        break;

      case 'clear':
        // Clear all cart items
        const { error: clearError } = await supabase
          .from('cart_items')
          .delete()
          .eq('cart_id', cartId);

        if (clearError) {
          return NextResponse.json(
            { error: 'Failed to clear cart', details: clearError.message },
            { status: 500 }
          );
        }
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported actions: add, update, remove, clear' },
          { status: 400 }
        );
    }

    return NextResponse.json(
      { message: `Cart ${action} action completed successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error in PUT /api/cart:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
