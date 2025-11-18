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
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary-color via-secondary-color to-dark-color relative overflow-hidden">
        {/* Industrial Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        <Container size="sm" className="relative flex items-center justify-center min-h-screen py-12">
        
        <Card className="relative w-full max-w-md shadow-2xl border-4 border-secondary-color bg-white">
          <CardHeader className="space-y-3 text-center pb-8 bg-gradient-to-b from-light-gray-bg to-white border-b-4 border-primary-color">
            {/* Logo/Icon - Industrial Style */}
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary-color to-accent-color rounded-2xl flex items-center justify-center mb-4 shadow-2xl transform hover:scale-105 transition-transform">
              <i className="fas fa-user-plus text-white text-3xl"></i>
            </div>
            
            <CardTitle className="text-4xl font-black text-gray-900 tracking-tight">
              สร้างบัญชีใหม่
            </CardTitle>
            <CardDescription className="text-gray-700 text-lg font-semibold">
              789 TOOLS - เครื่องมือช่างมืออาชีพ
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 p-8">
            {/* Error Message - Industrial Style */}
            {error && (
              <div className="bg-red-50 border-4 border-red-500 p-5 rounded-xl shadow-lg animate-shake">
                <div className="flex items-center">
                  <i className="fas fa-exclamation-triangle text-red-600 mr-3 text-xl"></i>
                  <p className="text-base text-red-800 font-bold">{error}</p>
                </div>
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Two Column Layout for Name and Phone - Industrial Style */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name Field */}
                <div className="space-y-3">
                  <Label htmlFor="fullName" className="text-text-color font-bold text-base flex items-center">
                    <i className="fas fa-user mr-2 text-primary-color"></i>
                    ชื่อ-นามสกุล <span className="text-danger-color">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-14 border-3 border-secondary-color focus:border-primary-color focus:ring-4 focus:ring-primary-color/30 transition-all text-lg font-semibold pl-4 rounded-xl shadow-md"
                      placeholder="นายสมชาย ใจดี"
                      required
                    />
                  </div>
                </div>

              {/* Phone Number Field */}
                <div className="space-y-3">
                  <Label htmlFor="phoneNumber" className="text-text-color font-bold text-base flex items-center">
                    <i className="fas fa-phone mr-2 text-primary-color"></i>
                    เบอร์โทรศัพท์ <span className="text-danger-color">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="h-14 border-3 border-secondary-color focus:border-primary-color focus:ring-4 focus:ring-primary-color/30 transition-all text-lg font-semibold pl-4 rounded-xl shadow-md"
                      placeholder="0812345678"
                      required
                    />
                  </div>
                </div>
            </div>

              {/* Email Field - Industrial Style */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-text-color font-bold text-base flex items-center">
                  <i className="fas fa-envelope mr-2 text-primary-color"></i>
                  อีเมล <span className="text-danger-color">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 border-3 border-secondary-color focus:border-primary-color focus:ring-4 focus:ring-primary-color/30 transition-all text-lg font-semibold pl-4 rounded-xl shadow-md"
                    placeholder="your@email.com"
                    required
                  />
              </div>
            </div>

              {/* Two Column Layout for Passwords - Industrial Style */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password Field */}
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-text-color font-bold text-base flex items-center">
                    <i className="fas fa-lock mr-2 text-primary-color"></i>
                    รหัสผ่าน <span className="text-danger-color">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 border-3 border-secondary-color focus:border-primary-color focus:ring-4 focus:ring-primary-color/30 transition-all text-lg font-semibold pl-4 pr-14 rounded-xl shadow-md"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary-color transition-colors w-10 h-10 flex items-center justify-center"
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xl`}></i>
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-3">
                  <Label htmlFor="confirmPassword" className="text-text-color font-bold text-base flex items-center">
                    <i className="fas fa-lock mr-2 text-primary-color"></i>
                    ยืนยันรหัสผ่าน <span className="text-danger-color">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-14 border-3 border-secondary-color focus:border-primary-color focus:ring-4 focus:ring-primary-color/30 transition-all text-lg font-semibold pl-4 pr-14 rounded-xl shadow-md"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary-color transition-colors w-10 h-10 flex items-center justify-center"
                    >
                      <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} text-xl`}></i>
                    </button>
                  </div>
                </div>
            </div>

              {/* Terms & Conditions - Industrial Style */}
              <div className="flex items-start gap-4 p-6 bg-light-gray-bg rounded-xl border-2 border-secondary-color">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-5 h-5 mt-1 rounded-md border-3 border-secondary-color text-primary-color focus:ring-4 focus:ring-primary-color"
                  required
                />
                <label htmlFor="terms" className="text-base text-text-color cursor-pointer font-semibold">
                  ฉันยอมรับ{' '}
                  <Link href="/terms" className="text-primary-color hover:text-accent-color font-black transition-colors underline decoration-2 underline-offset-2">
                    ข้อกำหนดและเงื่อนไข
                  </Link>{' '}
                  และ{' '}
                  <Link href="/privacy" className="text-primary-color hover:text-accent-color font-black transition-colors underline decoration-2 underline-offset-2">
                    นโยบายความเป็นส่วนตัว
                  </Link>
                </label>
              </div>

              {/* Submit Button - Industrial Strength */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-16 bg-gradient-to-r from-primary-color via-accent-color to-accent-color hover:from-primary-color/90 hover:via-accent-color/90 hover:to-accent-color/90 text-white font-black text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-[1.02] active:scale-[0.98] border-2 border-accent-color rounded-xl"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-3 text-2xl"></i>
                    <span className="tracking-wide">กำลังสมัครสมาชิก...</span>
                  </>
                ) : (
                  <>
                    <span className="tracking-wide">สร้างบัญชี</span>
                    <i className="fas fa-arrow-right ml-3 text-2xl"></i>
                  </>
                )}
              </Button>
          </form>

            {/* Divider - Industrial Style */}
            <div className="relative my-8">
              <Separator className="bg-gray-300 h-0.5" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 text-base text-text-color font-bold">
                หรือสมัครด้วย
              </span>
            </div>

            {/* Social Register - Industrial Strength */}
            <div className="space-y-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialRegister('facebook')}
                className="w-full h-14 border-3 border-facebook-color text-facebook-color hover:bg-facebook-color hover:text-white font-bold text-base shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] rounded-xl"
              >
                <i className="fab fa-facebook text-2xl mr-3"></i>
                สมัครด้วย Facebook
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialRegister('google')}
                className="w-full h-14 border-3 border-danger-color text-danger-color hover:bg-danger-color hover:text-white font-bold text-base shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] rounded-xl"
              >
                <i className="fab fa-google text-2xl mr-3"></i>
                สมัครด้วย Google
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex-col space-y-4 pt-8 bg-light-gray-bg border-t-4 border-secondary-color">
            <p className="text-base text-text-color text-center font-semibold">
              มีบัญชีอยู่แล้ว?{' '}
              <Link 
                href="/login" 
                className="text-primary-color hover:text-accent-color font-black transition-colors text-lg underline decoration-2 underline-offset-4"
              >
                เข้าสู่ระบบ
              </Link>
            </p>
          </CardFooter>
        </Card>
        </Container>
      </div>
    </MainLayout>
  );
}
