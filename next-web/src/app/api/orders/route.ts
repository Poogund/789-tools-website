import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { CartItem } from '@/types';

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  province?: string;
  postalCode?: string;
}

interface CreateOrderRequest {
  customerInfo: CustomerInfo;
  cartItems: CartItem[];
}

// Helper function to calculate total amount
function calculateTotalAmount(cartItems: CartItem[]): number {
  return cartItems.reduce((sum, item) => {
    const price = item.salePrice ?? item.price;
    return sum + price * item.quantity;
  }, 0);
}

// Generate order number (format: ORD-YYYYMMDD-HHMMSS-XXXX)
function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  return `ORD-${year}${month}${day}-${hours}${minutes}${seconds}-${random}`;
}

export async function POST(request: Request) {
  try {
    // Initialize Supabase client and get user session
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Parse request body
    const body: CreateOrderRequest = await request.json();
    const { customerInfo, cartItems } = body;

    // Validate input
    if (!customerInfo || !cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: customerInfo and cartItems are required' },
        { status: 400 }
      );
    }

    // Validate customer info
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      return NextResponse.json(
        { error: 'Missing required customer information' },
        { status: 400 }
      );
    }

    // --- SECURITY FIX: Fetch authoritative product prices from DB ---
    const productIds = cartItems.map(item => item.productId);
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('id, name, price, sale_price')
      .in('id', productIds);

    if (productsError) {
      console.error('Error fetching products:', productsError);
      return NextResponse.json({ error: 'Could not verify products in cart' }, { status: 500 });
    }

    const productPriceMap = new Map(productsData.map(p => [p.id, p]));

    // --- SERVER-SIDE CALCULATION ---
    let subtotal = 0;
    const secureOrderItems = cartItems.map(item => {
      const product = productPriceMap.get(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      const unitPrice = product.sale_price ?? product.price;
      const totalPrice = unitPrice * item.quantity;
      subtotal += totalPrice;

      return {
        order_id: '', // Will be set after order is created
        product_id: item.productId,
        product_name: product.name, // Use authoritative name
        quantity: item.quantity,
        unit_price: unitPrice,
        total_price: totalPrice,
      };
    });
    
    const shippingCost = 0; // Default shipping cost
    const totalAmount = subtotal + shippingCost;
    const orderNumber = generateOrderNumber();

    // --- BUG FIX: Link order to logged-in user ---
    // Step 1: Insert order
    const { data: newOrder, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_id: user ? user.id : null, // Link to user if logged in
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        shipping_address: customerInfo.address,
        shipping_province: customerInfo.province || null,
        shipping_postal_code: customerInfo.postalCode || null,
        subtotal: subtotal,
        shipping_cost: shippingCost,
        total: totalAmount,
        payment_method: 'transfer',
        payment_status: 'pending',
        order_status: 'pending',
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return NextResponse.json(
        { error: 'Failed to create order', details: orderError.message },
        { status: 500 }
      );
    }

    if (!newOrder) {
      return NextResponse.json(
        { error: 'Failed to create order: No order returned' },
        { status: 500 }
      );
    }

    // Step 2: Insert order items with the new order_id
    const finalOrderItems = secureOrderItems.map(item => ({
      ...item,
      order_id: newOrder.id,
    }));

    const { error: orderItemsError } = await supabase
      .from('order_items')
      .insert(finalOrderItems);

    if (orderItemsError) {
      console.error('Error creating order items:', orderItemsError);
      // Attempt to roll back the order creation
      await supabase.from('orders').delete().eq('id', newOrder.id);
      
      return NextResponse.json(
        { error: 'Failed to create order items', details: orderItemsError.message },
        { status: 500 }
      );
    }

    // Return order ID and number
    return NextResponse.json(
      { 
        orderId: newOrder.id,
        orderNumber: newOrder.order_number,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Unexpected error in POST /api/orders:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}

