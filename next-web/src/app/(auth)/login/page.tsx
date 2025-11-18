'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MainLayout } from '@/components/layout/MainLayout'; // ใช้ Layout เดิมเพื่อให้มี Navbar

function LoginContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth(); // สมมติว่าใน AuthContext มีฟังก์ชัน socialLogin ด้วย ถ้าไม่มีต้องไปเพิ่มทีหลัง

  const redirectTo = searchParams?.get('redirectTo') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    if (result.error) {
      setError(result.error);
    } else {
      router.push(redirectTo);
    }
    setLoading(false);
  };

  // ฟังก์ชัน Mock สำหรับ Social Login (ต้องไปเชื่อม Supabase จริงใน AuthContext)
  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    console.log(`Logging in with ${provider}...`);
    // TODO: เรียก supabase.auth.signInWithOAuth({ provider }) ที่นี่
  };

  return (
    <MainLayout>
      {/* Wrapper หลัก - ใช้ bg-slate-900 (สีเทาเข้มก่อสร้าง) แทนสีม่วงเดิม */}
      <div className="min-h-screen flex items-center justify-center bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Background Decoration (ลายตะแกรงเหล็กจางๆ) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        {/* Card Login */}
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl border-t-8 border-yellow-500 relative z-10">
          
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-20 w-20 bg-blue-900 rounded-full flex items-center justify-center shadow-lg mb-6">
              <i className="fas fa-tools text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 font-thai">
              ยินดีต้อนรับกลับมา
            </h2>
            <p className="mt-2 text-sm text-gray-600 font-thai">
              เข้าสู่ระบบเพื่อจัดการคำสั่งซื้อและดูสถานะสินค้า
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-md flex items-start gap-3">
              <i className="fas fa-exclamation-circle text-red-600 mt-0.5"></i>
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <Label htmlFor="email" className="text-gray-700 font-bold mb-1 block">อีเมล</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 sm:text-sm bg-gray-50"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <Label htmlFor="password" className="text-gray-700 font-bold block">รหัสผ่าน</Label>
                  <Link href="/forgot-password" className="text-sm font-medium text-blue-900 hover:text-blue-700 underline">
                    ลืมรหัสผ่าน?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 sm:text-sm bg-gray-50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Login Button */}
            <div>
              <Button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-bold rounded-lg text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <i className="fas fa-circle-notch fa-spin"></i> กำลังเข้าสู่ระบบ...
                  </span>
                ) : (
                  'เข้าสู่ระบบ'
                )}
              </Button>
            </div>
          </form>

          {/* Social Login Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">หรือ เข้าสู่ระบบด้วย</span>
              </div>
            </div>

            {/* Social Buttons Grid */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <i className="fab fa-facebook text-[#1877F2] text-xl mr-2"></i>
                Facebook
              </button>
              
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <img 
                  src="https://www.svgrepo.com/show/475656/google-color.svg" 
                  alt="Google" 
                  className="h-5 w-5 mr-2"
                />
                Google
              </button>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              ยังไม่มีบัญชีสมาชิก?{' '}
              <Link href="/register" className="font-bold text-yellow-600 hover:text-yellow-700 underline decoration-2 underline-offset-2">
                สมัครสมาชิกใหม่
              </Link>
            </p>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}