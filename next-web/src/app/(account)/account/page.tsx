import { getCurrentUserAccount } from "@/lib/account-repository";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { MainLayout, Container, Section } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/**
 * Component ลูก (Async) สำหรับดึงข้อมูล
 */
async function AccountDashboard() {
  const account = await getCurrentUserAccount();

  // Middleware ควรจะป้องกันปัญหานี้ แต่เผื่อไว้
  if (!account) {
    redirect("/login");
  }

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    let completed = 0;
    let total = 2;
    
    if (account.name && account.name !== "ผู้ใช้งาน") completed++;
    if (account.email && account.email !== "") completed++;
    
    return Math.round((completed / total) * 100);
  };

  const completionPercentage = calculateProfileCompletion();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader className="bg-gradient-to-r from-primary-color to-accent-color text-white">
            <CardTitle className="text-lg">
              <i className="fas fa-user-circle mr-2"></i>
              เมนูบัญชี
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <nav className="space-y-1">
              {[
                { href: "/account", icon: "fa-dashboard", label: "ภาพรวม", active: true },
                { href: "/account/profile", icon: "fa-user-edit", label: "แก้ไขโปรไฟล์" },
                { href: "/account/orders", icon: "fa-shopping-bag", label: "ประวัติการสั่งซื้อ" },
                { href: "/account/password", icon: "fa-key", label: "เปลี่ยนรหัสผ่าน" },
                { href: "/account/addresses", icon: "fa-map-marked-alt", label: "ที่อยู่จัดส่ง" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                    item.active
                      ? "bg-primary-color/10 text-primary-color font-semibold border-r-3 border-primary-color"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <i className={`fas ${item.icon} w-5`}></i>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3 space-y-6">
        {/* Welcome Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <i className="fas fa-home text-primary-color mr-3"></i>
              ภาพรวมบัญชี
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* User Info */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-color to-accent-color rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {account.name?.charAt(0) || "U"}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  สวัสดี, {account.name || "ผู้ใช้งาน"}
                </h3>
                <p className="text-gray-600">{account.email}</p>
              </div>
              <Button variant="outline" size="sm">
                <i className="fas fa-edit mr-2"></i>
                แก้ไข
              </Button>
            </div>

            <Separator />

            {/* Profile Completion */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">ความสมบูรณ์โปรไฟล์</h4>
                <span className="text-sm font-medium text-primary-color">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-primary-color to-accent-color h-3 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {completionPercentage < 100 
                  ? "กรุณากรอกข้อมูลให้ครบถ้วนเพื่อประสบการณ์ที่ดีขึ้น"
                  : "โปรไฟล์ของคุณสมบูรณ์!"
                }
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/account/orders">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-shopping-bag text-blue-600 text-xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">ประวัติการสั่งซื้อ</h4>
                <p className="text-sm text-gray-600">ดูรายการสั่งซื้อทั้งหมด</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/account/profile">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-user-edit text-green-600 text-xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">แก้ไขข้อมูลส่วนตัว</h4>
                <p className="text-sm text-gray-600">อัปเดตโปรไฟล์ของคุณ</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/account/password">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-key text-orange-600 text-xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">เปลี่ยนรหัสผ่าน</h4>
                <p className="text-sm text-gray-600">รักษาความปลอดภัยบัญชี</p>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Recent Orders Preview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">
              <i className="fas fa-clock text-primary-color mr-2"></i>
              คำสั่งซื้อล่าสุด
            </CardTitle>
            <Link href="/account/orders" className="text-primary-color hover:text-accent-color text-sm font-medium">
              ดูทั้งหมด <i className="fas fa-arrow-right ml-1"></i>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <i className="fas fa-inbox text-4xl mb-3"></i>
              <p>ยังไม่มีประวัติการสั่งซื้อ</p>
              <Link href="/products" className="inline-block mt-3 text-primary-color hover:text-accent-color font-medium">
                เริ่มช้อปปิ้ง <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/**
 * Loading Skeleton
 */
function DashboardLoading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Account Dashboard Page
 *
 * Main page component with MainLayout wrapper
 */
export default function AccountPage() {
  return (
    <MainLayout>
      <Section className="py-8">
        <Container>
          <Suspense fallback={<DashboardLoading />}>
            {/* @ts-ignore: Next.js/React สามารถ handle Promise นี้ได้ แต่ TS ใน Layout ไม่เข้าใจ */}
            <AccountDashboard />
          </Suspense>
        </Container>
      </Section>
    </MainLayout>
  );
}
