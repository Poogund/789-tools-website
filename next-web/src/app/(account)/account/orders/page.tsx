import { getOrdersForCurrentUser } from '@/lib/account-repository';
import Link from 'next/link';
import type { Order } from '@/types';

/**
 * Order History Page
 * TASK-043: Order History Page (F08-2)
 * Spec: F08, Plan: §6.4
 * 
 * Displays list of orders for the currently authenticated user
 * Each order is clickable and links to order detail page
 */

export default async function OrdersPage() {
  const orders = await getOrdersForCurrentUser();

  // Format date helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Format status text
  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: 'รอดำเนินการ',
      confirmed: 'ยืนยันแล้ว',
      processing: 'กำลังดำเนินการ',
      shipped: 'จัดส่งแล้ว',
      completed: 'เสร็จสิ้น',
      cancelled: 'ยกเลิก',
    };
    return statusMap[status] || status;
  };

  // Format status badge color
  const getStatusBadgeClass = (status: string) => {
    const badgeMap: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-indigo-100 text-indigo-800',
      shipped: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return badgeMap[status] || 'bg-gray-100 text-gray-800';
  };

  // Format payment status text
  const getPaymentStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      unpaid: 'ยังไม่ชำระ',
      paid: 'ชำระแล้ว',
      failed: 'ชำระไม่สำเร็จ',
    };
    return statusMap[status] || status;
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
    }).format(amount);
  };

  return (
    <div className="account-orders-page">
      {/* Page Header */}
      <h1 className="text-2xl font-semibold mb-4 text-dark-color thai-text">
        ประวัติคำสั่งซื้อ
      </h1>

      {/* Empty State */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-4">
            <i className="fa-solid fa-inbox text-6xl text-gray-300"></i>
          </div>
          <p className="text-lg text-gray-600 mb-4 thai-text">
            คุณยังไม่มีคำสั่งซื้อ
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-primary-color text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors thai-text"
          >
            ไปเลือกซื้อสินค้า
          </Link>
        </div>
      ) : (
        /* Orders Table */
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider thai-text">
                  เลขที่คำสั่งซื้อ
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider thai-text">
                  วันที่สั่งซื้อ
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider thai-text">
                  สถานะ
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider thai-text">
                  สถานะการชำระ
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider thai-text">
                  ยอดรวม
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider thai-text">
                  การดำเนินการ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="text-sm font-medium text-primary-color hover:text-primary-color/80 thai-text"
                    >
                      #{order.id.substring(0, 8)}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 thai-text">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                        order.status
                      )} thai-text`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 thai-text">
                    {getPaymentStatusText(order.payment_status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-right thai-text">
                    {formatCurrency(order.total_amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-color bg-primary-color/10 rounded-lg hover:bg-primary-color/20 transition-colors thai-text"
                    >
                      ดูรายละเอียด
                      <i className="fa-solid fa-chevron-right ml-2 text-xs"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
