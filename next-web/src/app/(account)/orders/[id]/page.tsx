import { getOrderDetailsForCurrentUser } from "@/lib/account-repository";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

// --- Helper functions (เหมือนเดิม) ---
const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: "รอดำเนินการ",
    confirmed: "ยืนยันแล้ว",
    processing: "กำลังดำเนินการ",
    shipped: "จัดส่งแล้ว",
    completed: "เสร็จสิ้น",
    cancelled: "ยกเลิก",
  };
  return statusMap[status] || status;
};
const getPaymentStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    unpaid: "ยังไม่ชำระ",
    paid: "ชำระแล้ว",
    failed: "ชำระไม่สำเร็จ",
  };
  return statusMap[status] || status;
};
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(amount);
};
const defaultImageUrl = "/images/placeholder.png"; // หรือ path รูป default ของท่าน
// --- End Helper functions ---

/**
 * Component ลูก (Async) สำหรับดึงข้อมูล
 */
async function OrderDetails({ orderId }: { orderId: string }) {
  const order = await getOrderDetailsForCurrentUser(orderId);

  // ถ้าไม่เจอ Order หรือ Order ไม่ใช่ของ User นี้
  if (!order) {
    notFound();
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Order Summary */}
      <div className="p-6 border-b border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold thai-text">
            วันที่สั่งซื้อ
          </p>
          <p className="text-gray-800 thai-text">
            {formatDate(order.created_at)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold thai-text">
            สถานะคำสั่งซื้อ
          </p>
          <p className="text-gray-800 font-medium thai-text">
            {getStatusText(order.status)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold thai-text">
            สถานะการชำระเงิน
          </p>
          <p className="text-gray-800 font-medium thai-text">
            {getPaymentStatusText(order.payment_status)}
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs text-gray-500 uppercase font-semibold thai-text">
            ที่อยู่สำหรับจัดส่ง
          </p>
          <p className="text-gray-800 thai-text">
            {order.customer_name} ({order.customer_phone})
            <br />
            {order.customer_address || "N/A"}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-dark-color mb-4 thai-text">
          รายการสินค้า
        </h3>
        <ul className="divide-y divide-gray-200">
          {order.order_items.map((item) => (
            <li key={item.id} className="py-4 flex">
              <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden relative">
                <Image
                  src={item.products?.image_url || defaultImageUrl}
                  alt={item.products?.name || "สินค้า"}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
              </div>
              <div className="ml-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-md font-medium text-gray-900 thai-text">
                    {item.products?.name || "สินค้าถูกลบ"}
                  </h4>
                  <p className="text-sm text-gray-500 thai-text">
                    จำนวน: {item.quantity}
                  </p>
                </div>
                <p className="text-md font-semibold text-gray-900 text-right thai-text">
                  {formatCurrency(parseFloat(item.unit_price.toString()) * item.quantity)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Order Total */}
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-dark-color thai-text">
            ยอดรวมสุทธิ
          </span>
          <span className="text-xl font-bold text-primary-color thai-text">
            {formatCurrency(order.total_amount)}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Loading Skeleton
 */
function OrderDetailsLoading() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="p-6 border-b border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
      <div className="p-6">
        <div className="h-20 bg-gray-200 rounded mb-4"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

/**
 * Order Detail Page (TASK-043 Detail)
 *
 * นี่คือ Page หลัก (Sync) ที่ไม่มี async
 * มันจะ render Suspense เพื่อรอ Component ลูก (OrderDetails)
 */
export default function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const orderId = params.id;

  return (
    <div className="account-order-detail-page">
      {/* Breadcrumbs (ส่วนนี้ Sync ทำงานได้เลย) */}
      <nav className="text-sm mb-4" aria-label="Breadcrumb">
        <Link
          href="/account"
          className="text-gray-500 hover:text-primary-color thai-text"
        >
          บัญชีของฉัน
        </Link>
        <i className="fas fa-chevron-right mx-2 text-xs text-gray-400"></i>
        <Link
          href="/account/orders"
          className="text-gray-500 hover:text-primary-color thai-text"
        >
          ประวัติคำสั่งซื้อ
        </Link>
        <i className="fas fa-chevron-right mx-2 text-xs text-gray-400"></i>
        <span className="text-gray-700 font-medium thai-text">
          รายละเอียดคำสั่งซื้อ #{orderId.substring(0, 8)}
        </span>
      </nav>

      {/* Page Header (ส่วนนี้ Sync ทำงานได้เลย) */}
      <h1 className="text-2xl font-semibold mb-4 text-dark-color thai-text">
        รายละเอียดคำสั่งซื้อ #{orderId.substring(0, 8)}
      </h1>

      <Suspense fallback={<OrderDetailsLoading />}>
        <OrderDetails orderId={orderId} />
      </Suspense>
    </div>
  );
}
