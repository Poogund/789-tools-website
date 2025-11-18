'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MainLayout } from '@/components/layout/MainLayout';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!fullName || !phoneNumber || !email || !password || !confirmPassword) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
      return;
    }

    setLoading(true);

    try {
      // TODO: Implement registration logic
      console.log('Register:', { fullName, phoneNumber, email, password });
      router.push('/login?message=สมัครสมาชิกสำเร็จ');
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการสมัครสมาชิก');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider: 'facebook' | 'google') => {
    // TODO: Implement social registration
    console.log(`Register with ${provider}`);
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Background Decoration (ลายตะแกรงเหล็กจางๆ) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        {/* Card Register */}
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl border-t-8 border-yellow-500 relative z-10">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-20 w-20 bg-blue-900 rounded-full flex items-center justify-center shadow-lg mb-6">
              <i className="fas fa-user-plus text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 font-thai">
              สร้างบัญชีใหม่
            </h2>
            <p className="mt-2 text-sm text-gray-600 font-thai">
              789 TOOLS - เครื่องมือช่างมืออาชีพ
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
            <div className="space-y-4">
              {/* Two Column Layout for Name and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName" className="text-gray-700 font-bold mb-1 block">ชื่อ-นามสกุล <span className="text-red-500">*</span></Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 sm:text-sm bg-gray-50"
                    placeholder="นายสมชาย ใจดี"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="text-gray-700 font-bold mb-1 block">เบอร์โทรศัพท์ <span className="text-red-500">*</span></Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 sm:text-sm bg-gray-50"
                    placeholder="0812345678"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 font-bold mb-1 block">อีเมล <span className="text-red-500">*</span></Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 sm:text-sm bg-gray-50"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Two Column Layout for Passwords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password" className="text-gray-700 font-bold mb-1 block">รหัสผ่าน <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none rounded-lg relative block w-full px-4 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 sm:text-sm bg-gray-50"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-gray-700 font-bold mb-1 block">ยืนยันรหัสผ่าน <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="appearance-none rounded-lg relative block w-full px-4 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 sm:text-sm bg-gray-50"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 mt-1 rounded border-gray-300 text-blue-900 focus:ring-blue-900"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                  ฉันยอมรับ{' '}
                  <Link href="/terms" className="text-blue-900 hover:text-blue-700 font-medium underline">
                    ข้อกำหนดและเงื่อนไข
                  </Link>{' '}
                  และ{' '}
                  <Link href="/privacy" className="text-blue-900 hover:text-blue-700 font-medium underline">
                    นโยบายความเป็นส่วนตัว
                  </Link>
                </label>
              </div>
            </div>

            {/* Register Button */}
            <div>
              <Button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-bold rounded-lg text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <i className="fas fa-circle-notch fa-spin"></i> กำลังสมัครสมาชิก...
                  </span>
                ) : (
                  'สร้างบัญชี'
                )}
              </Button>
            </div>
          </form>

          {/* Social Register Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">หรือ สมัครด้วย</span>
              </div>
            </div>

            {/* Social Buttons Grid */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleSocialRegister('facebook')}
                className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <i className="fab fa-facebook text-[#1877F2] text-xl mr-2"></i>
                Facebook
              </button>
              
              <button
                type="button"
                onClick={() => handleSocialRegister('google')}
                className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <Image 
                  src="https://www.svgrepo.com/show/475656/google-color.svg" 
                  alt="Google" 
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Google
              </button>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              มีบัญชีอยู่แล้ว?{' '}
              <Link href="/login" className="font-bold text-yellow-600 hover:text-yellow-700 underline decoration-2 underline-offset-2">
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
