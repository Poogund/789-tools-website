import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderDetailsForCurrentUser } from "@/lib/account-repository";

interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

function formatDate(dateString?: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(amount);
}

function getStatusText(status: string) {
  const map: Record<string, string> = {
    pending: "รอดำเนินการ",
    confirmed: "ยืนยันแล้ว",
    processing: "กำลังดำเนินการ",
    shipped: "จัดส่งแล้ว",
    completed: "เสร็จสิ้น",
    cancelled: "ยกเลิก",
  };
  return map[status] || status;
}

function getStatusBadgeClass(status: string) {
  const map: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    processing: "bg-indigo-100 text-indigo-800",
    shipped: "bg-purple-100 text-purple-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return map[status] || "bg-gray-100 text-gray-800";
}

function getPaymentStatusText(status: string) {
  const map: Record<string, string> = {
    unpaid: "ยังไม่ชำระ",
    paid: "ชำระแล้ว",
    failed: "ชำระไม่สำเร็จ",
  };
  return map[status] || status;
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = params;

  const order = await getOrderDetailsForCurrentUser(id);

  if (!order) {
    // ไม่เจอ หรือไม่ใช่ของ user นี้
    notFound();
  }

  const items = order.order_items || [];

  const itemsSubtotal = items.reduce((sum, item) => sum + item.total_price, 0);
  const shippingCost = 0; // ปัจจุบันยัง fix 0; ปรับในอนาคตได้
  const grandTotal = itemsSubtotal + shippingCost;

  return (
    <div className="space-y-6">
      {/* Header + Back */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-dark-color thai-text">
            รายละเอียดคำสั่งซื้อ
          </h1>
          <p className="text-gray-600 text-sm thai-text">
            เลขที่คำสั่งซื้อ #{order.id.substring(0, 8)} • สร้างเมื่อ{" "}
            {formatDate(order.created_at)}
          </p>
        </div>

        <Link
          href="/account/orders"
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors thai-text"
        >
          <i className="fa-solid fa-chevron-left mr-2 text-xs" />
          ย้อนกลับไปหน้าประวัติคำสั่งซื้อ
        </Link>
      </div>

      {/* Status summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white rounded-lg shadow-md p-4 space-y-2">
          <div className="text-xs font-semibold text-gray-500 uppercase thai-text">
            สถานะคำสั่งซื้อ
          </div>
          <span
            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
              order.status
            )} thai-text`}
          >
            {getStatusText(order.status)}
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 space-y-2">
          <div className="text-xs font-semibold text-gray-500 uppercase thai-text">
            การชำระเงิน
          </div>
          <div className="text-sm text-gray-900 thai-text">
            วิธีชำระ:{" "}
            {order.payment_method === "transfer" ? "โอนเงิน" : "บัตรเครดิต"}
          </div>
          <div className="text-sm text-gray-600 thai-text">
            สถานะ: {getPaymentStatusText(order.payment_status)}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 space-y-2">
          <div className="text-xs font-semibold text-gray-500 uppercase thai-text">
            ยอดรวมคำสั่งซื้อ
          </div>
          <div className="text-xl font-semibold text-primary-color thai-text">
            {formatCurrency(order.total_amount)}
          </div>
        </div>
      </div>

      {/* Shipping address */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-2">
        <h2 className="text-lg font-semibold text-dark-color thai-text">
          ที่อยู่จัดส่ง
        </h2>
        <div className="text-sm text-gray-900 thai-text">
          {order.customer_name}
        </div>
        <div className="text-sm text-gray-900 thai-text">
          โทร: {order.customer_phone || "-"}
        </div>
        <div className="text-sm text-gray-900 thai-text whitespace-pre-line">
          {order.customer_address}
        </div>
      </div>

      {/* Items table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-dark-color thai-text">
            รายการสินค้า
          </h2>
        </div>

        {items.length === 0 ? (
          <div className="p-6 text-center text-gray-500 thai-text">
            ไม่พบรายการสินค้าในคำสั่งซื้อนี้
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider thai-text">
                    สินค้า
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider thai-text">
                    จำนวน
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider thai-text">
                    ราคาต่อหน่วย
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider thai-text">
                    ราคารวม
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 thai-text">
                      {item.product_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 thai-text">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 thai-text">
                      {formatCurrency(item.unit_price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 thai-text">
                      {formatCurrency(item.total_price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Price summary */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex justify-end">
            <div className="w-full max-w-sm space-y-2">
              <div className="flex justify-between text-sm thai-text">
                <span className="text-gray-600">ราคารวมสินค้า</span>
                <span className="text-gray-900">
                  {formatCurrency(itemsSubtotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm thai-text">
                <span className="text-gray-600">ค่าจัดส่ง</span>
                <span className="text-gray-900">
                  {formatCurrency(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold thai-text">
                <span className="text-gray-900">ยอดชำระทั้งหมด</span>
                <span className="text-primary-color">
                  {formatCurrency(grandTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
