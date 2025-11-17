// === File: next-web/src/app/(account)/account/page.tsx ===

import Link from "next/link";
import { redirect } from "next/navigation";
import { getCustomerProfileForCurrentUser } from "@/lib/account-repository";

export default async function AccountOverviewPage() {
  const profile = await getCustomerProfileForCurrentUser();

  // If no profile => not logged in or no customers row yet
  if (!profile) {
    redirect("/login?redirect=/account");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-dark-color thai-text">
          บัญชีของฉัน
        </h1>
        <p className="text-gray-600 mt-1 thai-text">
          ดูข้อมูลบัญชีและประวัติคำสั่งซื้อของคุณ
        </p>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <h2 className="text-lg font-semibold text-dark-color thai-text">
          ข้อมูลโปรไฟล์
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase thai-text">
              ชื่อ–นามสกุล
            </div>
            <div className="text-sm text-gray-900 thai-text">
              {profile.name}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase thai-text">
              อีเมล
            </div>
            <div className="text-sm text-gray-900">{profile.email}</div>
          </div>

          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase thai-text">
              เบอร์โทร
            </div>
            <div className="text-sm text-gray-900 thai-text">
              {profile.phone}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase thai-text">
              จังหวัด / รหัสไปรษณีย์
            </div>
            <div className="text-sm text-gray-900 thai-text">
              {profile.province || "-"} {profile.postalCode || ""}
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase thai-text">
            ที่อยู่จัดส่ง
          </div>
          <div className="text-sm text-gray-900 thai-text whitespace-pre-line">
            {profile.address}
          </div>
        </div>
      </div>

      {/* Link to orders */}
      <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-dark-color thai-text">
            ประวัติคำสั่งซื้อ
          </h2>
          <p className="text-gray-600 text-sm thai-text">
            ดูคำสั่งซื้อทั้งหมดที่คุณเคยสั่งจากร้าน 789 TOOLS
          </p>
        </div>
        <Link
          href="/account/orders"
          className="inline-flex items-center px-4 py-2 bg-primary-color text-white rounded-lg text-sm font-medium hover:bg-primary-color/90 transition-colors thai-text"
        >
          ดูประวัติคำสั่งซื้อ
          <i className="fa-solid fa-chevron-right ml-2 text-xs" />
        </Link>
      </div>
    </div>
  );
}
