'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { MainLayout, Container } from '@/components/layout/MainLayout';

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
    } catch (error: any) {
      setError(error.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider: 'facebook' | 'google') => {
    // TODO: Implement social registration
    console.log(`Register with ${provider}`);
  };

  return (
    <MainLayout className="bg-gradient-to-br from-primary-color via-industrial-dark-gray to-black">
      <Container size="sm" className="flex items-center justify-center min-h-screen py-12">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        
        <Card className="w-full max-w-[400px] relative z-10 border-0 bg-white shadow-2xl">
        <CardHeader className="space-y-3 text-center pb-8">
          {/* Logo/Icon */}
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-color to-accent-color rounded-2xl flex items-center justify-center shadow-lg">
            <i className="fas fa-user-plus text-white text-2xl"></i>
          </div>
          
          <CardTitle className="text-3xl font-bold text-gray-900">
            สร้างบัญชีใหม่
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            เริ่มต้นใช้งาน 789 TOOLS วันนี้
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <i className="fas fa-exclamation-circle text-red-500 text-lg mt-0.5"></i>
              <p className="text-sm text-red-800 font-medium">{error}</p>
            </div>
          )}

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Two Column Layout for Name and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name Field */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                  ชื่อ-นามสกุล <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-primary-color focus:ring-primary-color text-gray-900"
                    placeholder="นายสมชาย ใจดี"
                    required
                  />
                </div>
              </div>

              {/* Phone Number Field */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-700">
                  เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <i className="fas fa-phone absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-primary-color focus:ring-primary-color text-gray-900"
                    placeholder="0812345678"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                อีเมล <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-primary-color focus:ring-primary-color text-gray-900"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Two Column Layout for Passwords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  รหัสผ่าน <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-12 h-12 border-gray-300 focus:border-primary-color focus:ring-primary-color text-gray-900"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-color transition-colors"
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                  ยืนยันรหัสผ่าน <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-12 h-12 border-gray-300 focus:border-primary-color focus:ring-primary-color text-gray-900"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-color transition-colors"
                  >
                    <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-1 rounded border-gray-300 text-primary-color focus:ring-primary-color"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                ฉันยอมรับ{' '}
                <Link href="/terms" className="text-primary-color hover:text-accent-color font-semibold">
                  ข้อกำหนดและเงื่อนไข
                </Link>{' '}
                และ{' '}
                <Link href="/privacy" className="text-primary-color hover:text-accent-color font-semibold">
                  นโยบายความเป็นส่วนตัว
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-primary-color to-accent-color hover:from-primary-color/90 hover:to-accent-color/90 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  กำลังสมัครสมาชิก...
                </>
              ) : (
                <>
                  สร้างบัญชี
                  <i className="fas fa-arrow-right ml-2"></i>
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <Separator className="bg-gray-200" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-gray-500 font-medium">
              หรือสมัครด้วย
            </span>
          </div>

          {/* Social Register */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialRegister('facebook')}
              className="w-full h-12 border-gray-300 hover:bg-facebook hover:text-white hover:border-facebook transition-all"
            >
              <i className="fab fa-facebook text-lg mr-3"></i>
              สมัครด้วย Facebook
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialRegister('google')}
              className="w-full h-12 border-gray-300 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
            >
              <i className="fab fa-google text-lg mr-3"></i>
              สมัครด้วย Google
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex-col space-y-4 pt-6">
          <Separator className="bg-gray-200" />
          <p className="text-sm text-gray-600 text-center">
            มีบัญชีอยู่แล้ว?{' '}
            <Link 
              href="/login" 
              className="text-primary-color hover:text-accent-color font-semibold transition-colors"
            >
              เข้าสู่ระบบ
            </Link>
          </p>
        </CardFooter>
      </Card>
      </Container>
    </MainLayout>
  );
}
