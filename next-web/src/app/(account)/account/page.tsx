import { getCurrentUserAccount } from "@/lib/account-repository";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

/**
 * Component ลูก (Async) สำหรับดึงข้อมูล
 */
async function AccountDashboard() {
  const account = await getCurrentUserAccount();

  // Middleware ควรจะป้องกันปัญหานี้ แต่เผื่อไว้
  if (!account) {
    redirect("/login");
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-3 thai-text">
        สวัสดี, {account.name || "ผู้ใช้งาน"}
      </h2>
      <p className="text-gray-600 mb-2">
        <span className="font-medium thai-text">อีเมล:</span> {account.email}
      </p>

      <hr className="my-6" />

      <p className="text-gray-600 mb-4 thai-text">
        คุณสามารถจัดการข้อมูลบัญชีและดูประวัติคำสั่งซื้อของคุณได้จากที่นี่
      </p>

      <Link
        href="/account/orders"
        className="inline-block px-5 py-2 bg-primary-color text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors thai-text"
      >
        ดูประวัติคำสั่งซื้อ
        <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
      </Link>
    </div>
  );
}

/**
 * Loading Skeleton
 */
function DashboardLoading() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <hr className="my-6" />
      <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
      <div className="h-10 bg-gray-200 rounded w-48"></div>
    </div>
  );
}

/**
 * Account Dashboard Page (TASK-042)
 *
 * นี่คือ Page หลัก (Sync) ที่ไม่มี async
 * มันจะ render Suspense เพื่อรอ Component ลูก (AccountDashboard)
 */
export default function AccountPage() {
  return (
    <div className="account-dashboard-page">
      <h1 className="text-2xl font-semibold mb-4 text-dark-color thai-text">
        บัญชีของฉัน
      </h1>

      <Suspense fallback={<DashboardLoading />}>
        {/* @ts-ignore: Next.js/React สามารถ handle Promise นี้ได้ แต่ TS ใน Layout ไม่เข้าใจ */}
        <AccountDashboard />
      </Suspense>
    </div>
  );
}
