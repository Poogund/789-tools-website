import { Suspense } from 'react';
import OrderSuccessClient from './OrderSuccessClient';

// เราใช้ Suspense wrapper เพื่อให้ useSearchParams ทำงานได้อย่างถูกต้อง
export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<OrderSuccessFallback />}>
      <OrderSuccessClient />
    </Suspense>
  );
}

// สร้าง Fallback UI ขณะกำลังโหลด
function OrderSuccessFallback() {
  return (
    <main className="product-detail-page">
      <div className="container" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '1.2rem', color: '#666' }} className="thai-text">กำลังโหลดข้อมูลคำสั่งซื้อ...</p>
      </div>
    </main>
  );
}

