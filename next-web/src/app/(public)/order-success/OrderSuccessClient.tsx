'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OrderSuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  // Guard Clause: Redirect to home if no orderId
  useEffect(() => {
    if (!orderId) {
      router.push('/');
    }
  }, [orderId, router]);

  // Don't render if no orderId (will redirect)
  if (!orderId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-light-gray-bg">
      {/* Breadcrumbs */}
      <section className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <nav className="breadcrumbs flex items-center space-x-2 text-sm">
            <Link href="/" className="text-accent-color hover:text-primary-color transition-colors thai-text">
              หน้าแรก
            </Link>
            <i className="fa-solid fa-chevron-right text-gray-400 text-xs"></i>
            <span className="text-gray-600 thai-text">ยืนยันคำสั่งซื้อ</span>
          </nav>
        </div>
      </section>

      {/* Success Content */}
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Success Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-success-color rounded-full mb-6">
                <i className="fa-solid fa-check text-white text-4xl"></i>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-dark-color mb-4 thai-text">
                ขอบคุณสำหรับคำสั่งซื้อ!
              </h1>
              <p className="text-xl text-gray-600 mb-2 thai-text">
                คำสั่งซื้อของคุณได้รับการยืนยันแล้ว
              </p>
            </div>

            {/* Order Info Card */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="text-center">
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-600 mb-2 thai-text">
                    เลขที่คำสั่งซื้อ
                  </label>
                  <div className="text-3xl font-bold text-primary-color thai-text font-mono">
                    {orderId}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-gray-600 mb-4 thai-text">
                    เราจะส่งอีเมลยืนยันคำสั่งซื้อไปยังอีเมลที่คุณระบุไว้
                  </p>
                  <p className="text-sm text-gray-500 thai-text">
                    กรุณาตรวจสอบอีเมลของคุณเพื่อดูรายละเอียดเพิ่มเติม
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-secondary-color text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors thai-text"
              >
                <i className="fa-solid fa-home mr-2"></i>
                กลับไปหน้าแรก
              </Link>
              <Link
                href="/account/orders"
                className="inline-flex items-center justify-center bg-primary-color text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors thai-text"
              >
                <i className="fa-solid fa-list mr-2"></i>
                ดูประวัติคำสั่งซื้อ
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-12 bg-section-bg-gray rounded-lg p-6">
              <h2 className="text-lg font-bold text-dark-color mb-4 thai-text">
                <i className="fa-solid fa-info-circle mr-2 text-primary-color"></i>
                ข้อมูลเพิ่มเติม
              </h2>
              <ul className="space-y-2 text-gray-700 thai-text">
                <li className="flex items-start">
                  <i className="fa-solid fa-check text-success-color mr-2 mt-1"></i>
                  <span>คำสั่งซื้อของคุณจะถูกประมวลผลภายใน 24 ชั่วโมง</span>
                </li>
                <li className="flex items-start">
                  <i className="fa-solid fa-check text-success-color mr-2 mt-1"></i>
                  <span>สำหรับการชำระเงินแบบโอนเงิน กรุณาโอนเงินตามจำนวนที่ระบุในอีเมล</span>
                </li>
                <li className="flex items-start">
                  <i className="fa-solid fa-check text-success-color mr-2 mt-1"></i>
                  <span>หากมีคำถามเพิ่มเติม กรุณาติดต่อเราที่เบอร์โทรศัพท์หรือ LINE</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

