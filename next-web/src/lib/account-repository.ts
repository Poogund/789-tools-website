//
// 📍 ตำแหน่ง: next-web/src/lib/account-repository.ts
// 🎯 TASK-042 & TASK-043: อัปเดตคลังอาวุธ account repository ให้สมบูรณ์
//
import {
  createServerSupabaseClient,
  createServerSupabaseAdminClient,
} from "@/lib/supabase/server";
import type { Order, OrderItem } from "@/types";

// ขยาย Type เพื่อรองรับการ Join ข้อมูล Product
type OrderItemWithProduct = OrderItem & {
  products: {
    name: string;
    image_url: string | null;
  } | null;
};

type OrderDetails = Order & {
  order_items: OrderItemWithProduct[];
};

// Database order type (snake_case fields from Supabase)
type DatabaseOrder = {
  id: string;
  customer_id: string;
  customer_name: string;
  customer_phone: string | null;
  customer_email: string;
  shipping_address: string | null;
  payment_method: string;
  payment_status: string;
  order_status: string;
  total: string;
  transfer_slip_url: string | null;
  omise_charge_id: string | null;
  created_at: string;
  updated_at: string;
};

// Database order item type (with joined product)
type DatabaseOrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: string;
  products: {
    name: string;
    image_url: string | null;
  } | null;
};

/**
 * (ฟังก์ชันใหม่สำหรับ TASK-042)
 * ดึงข้อมูล (ชื่อ/อีเมล) ของผู้ใช้ที่กำลัง Login อยู่
 * @returns {Promise<{name: string, email: string} | null>}
 */
export async function getCurrentUserAccount() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    console.log("[getCurrentUserAccount] No session found.");
    return null;
  }

  // ใช้ Admin Client (ที่ใช้ SERVICE_ROLE_KEY) เพื่อดึงข้อมูลจากตาราง 'customers'
  // เพราะ RLS อาจจะยังไม่ได้ตั้งค่าให้ user อ่านตารางนี้ได้
  const supabaseAdmin = await createServerSupabaseAdminClient();
  const { data: customer, error } = await supabaseAdmin
    .from("customers")
    .select("name, email")
    .eq("auth_id", session.user.id)
    .single();

  if (error || !customer) {
    console.warn(
      `[getCurrentUserAccount] ไม่พบ Customer profile สำหรับ auth_id: ${session.user.id}. จะใช้ข้อมูลจาก Auth แทน`
    );
    // Fallback: ถ้ายังไม่มี profile ในตาราง customers ใช้อีเมลจาก auth แทน
    return {
      name: session.user.email?.split("@")[0] || "ผู้ใช้งาน",
      email: session.user.email || "ไม่พบอีเมล",
    };
  }

  return customer;
}

/**
 * (ฟังก์ชันเดิมที่ปรับปรุงแล้วสำหรับ TASK-043 List)
 * Get orders for the currently authenticated user
 * @returns {Promise<Order[]>} Array of orders
 */
export async function getOrdersForCurrentUser(): Promise<Order[]> {
  try {
    const supabase = await createServerSupabaseClient();

    // 1. Get authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.log("[getOrdersForCurrentUser] User not authenticated");
      return [];
    }

    // 2. Find customer_id (ใช้ Admin Client เพื่อเลี่ยง RLS)
    const supabaseAdmin = await createServerSupabaseAdminClient();
    const { data: customer, error: customerError } = await supabaseAdmin
      .from("customers")
      .select("id")
      .eq("auth_id", user.id)
      .single();

    if (customerError || !customer) {
      console.log(
        "[getOrdersForCurrentUser] Customer record not found for auth_id:",
        user.id
      );
      return [];
    }

    // 3. Query orders by customer_id (ใช้ Admin Client เพื่อเลี่ยง RLS)
    const { data: orders, error: ordersError } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("customer_id", customer.id)
      .order("created_at", { ascending: false });

    if (ordersError) {
      console.error(
        "[getOrdersForCurrentUser] Error fetching orders:",
        ordersError
      );
      return [];
    }

    // 4. Map DB fields (snake_case) to Type fields (camelCase)
    //    [cite: poogund/789-tools-website/789-tools-website-d5d72f5d8691dffc8854eb9c242989f5b67a2519/next-web/src/types/index.ts]
    const mappedOrders: Order[] = (orders || []).map((order: DatabaseOrder) => ({
      id: order.id,
      customer_id: order.customer_id,
      customer_name: order.customer_name,
      customer_phone: order.customer_phone || "",
      customer_email: order.customer_email,
      customer_address: order.shipping_address || "",
      payment_method: (order.payment_method === 'card' ? 'card' : 'transfer') as 'transfer' | 'card',
      payment_status: order.payment_status as 'unpaid' | 'paid' | 'failed', // แมปตรงๆ (unpaid, paid, failed)
      status: order.order_status as 'pending' | 'confirmed' | 'processing' | 'shipped' | 'completed' | 'cancelled', // แมปตรงๆ (pending, confirmed, etc.)
      total_amount: parseFloat(order.total) || 0, // DB คือ 'total', Type คือ 'total_amount'
      transfer_slip_url: order.transfer_slip_url || undefined,
      omise_charge_id: order.omise_charge_id || undefined,
      created_at: order.created_at,
      updated_at: order.updated_at,
    }));

    return mappedOrders;
  } catch (error) {
    console.error("[getOrdersForCurrentUser] Unexpected error:", error);
    return [];
  }
}

/**
 * (ฟังก์ชันใหม่สำหรับ TASK-043 Detail)
 * ดึงข้อมูล Order 1 ใบ เฉพาะเมื่อเป็นของ User ที่ Login อยู่
 * @param orderId The ID of the order to fetch
 * @returns {Promise<OrderDetails | null>} Order details with items
 */
export async function getOrderDetailsForCurrentUser(
  orderId: string
): Promise<OrderDetails | null> {
  try {
    const supabase = await createServerSupabaseClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      console.log("[getOrderDetails] No session found.");
      return null;
    }

    const supabaseAdmin = await createServerSupabaseAdminClient();

    // 1. Find customer_id
    const { data: customer } = await supabaseAdmin
      .from("customers")
      .select("id")
      .eq("auth_id", session.user.id)
      .single();

    if (!customer) {
      console.error(
        `[getOrderDetails] ไม่พบ Customer profile สำหรับ auth_id: ${session.user.id}`
      );
      return null;
    }

    // 2. Fetch order IF it matches customer_id
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select(
        `
        *,
        order_items (
          *,
          products (name, image_url)
        )
      `
      )
      .eq("id", orderId)
      .eq("customer_id", customer.id) // Security check
      .single();

    if (error || !order) {
      console.error(
        `[getOrderDetails] Error fetching order ${orderId} for customer ${customer.id}:`,
        error
      );
      return null;
    }

    // 3. Map DB fields to Type fields
    const mappedOrder: OrderDetails = {
      ...order,
      customer_address: order.shipping_address || "",
      total_amount: parseFloat(order.total) || 0,
      payment_method: (order.payment_method === 'card' ? 'card' : 'transfer') as 'transfer' | 'card',
      payment_status: order.payment_status as 'unpaid' | 'paid' | 'failed',
      status: order.order_status as 'pending' | 'confirmed' | 'processing' | 'shipped' | 'completed' | 'cancelled',
      order_items: (order.order_items || []).map((item: DatabaseOrderItem) => ({
        ...item,
        products: item.products
          ? {
              name: item.products.name,
              image_url: item.products.image_url,
            }
          : { name: "สินค้าถูกลบ", image_url: null },
      })),
    };

    return mappedOrder;
  } catch (error) {
    console.error(`[getOrderDetails] Unexpected error:`, error);
    return null;
  }
}
