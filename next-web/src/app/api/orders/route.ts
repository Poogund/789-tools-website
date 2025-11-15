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

    // Calculate total amount
    const subtotal = calculateTotalAmount(cartItems);
    const shippingCost = 0; // Default shipping cost (can be calculated later)
    const totalAmount = subtotal + shippingCost;

    // Connect to Supabase
    const supabase = createServerSupabaseClient();

    // Generate order number
    const orderNumber = generateOrderNumber();

    // Step 1: Insert order
    const { data: newOrder, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_id: null, // Will be set if customer is logged in (future enhancement)
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        shipping_address: customerInfo.address,
        shipping_province: customerInfo.province || null,
        shipping_postal_code: customerInfo.postalCode || null,
        subtotal: subtotal,
        shipping_cost: shippingCost,
        total: totalAmount,
        payment_method: 'transfer', // Default to transfer for MVP
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

    // Step 2: Insert order items
    const orderItems = cartItems.map((item) => {
      const unitPrice = item.salePrice ?? item.price;
      const totalPrice = unitPrice * item.quantity;

      return {
        order_id: newOrder.id,
        product_id: item.productId,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: unitPrice,
        total_price: totalPrice,
      };
    });

    const { error: orderItemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (orderItemsError) {
      console.error('Error creating order items:', orderItemsError);
      // Try to delete the order if items insertion fails
      await supabase.from('orders').delete().eq('id', newOrder.id);
      
      return NextResponse.json(
        { error: 'Failed to create order items', details: orderItemsError.message },
        { status: 500 }
      );
    }

    // Return order ID
    return NextResponse.json(
      { 
        orderId: newOrder.id,
        orderNumber: newOrder.order_number,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Unexpected error in POST /api/orders:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

