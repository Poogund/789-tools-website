'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { MainLayout, Container } from '@/components/layout/MainLayout';

function LoginContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

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

  const handleSocialLogin = (provider: 'facebook' | 'google') => {
    // TODO: Implement social login
    console.log(`Login with ${provider}`);
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
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary-color to-accent-color rounded-2xl flex items-center justify-center mb-4 shadow-2xl transform hover:scale-105 transition-transform">
              <i className="fas fa-tools text-white text-3xl"></i>
            </div>
            <CardTitle className="text-4xl font-black text-gray-900 tracking-tight">
              เข้าสู่ระบบ
            </CardTitle>
            <CardDescription className="text-gray-700 text-lg font-semibold">
              789 TOOLS - เครื่องมือช่างมืออาชีพ
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 p-8">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-4 border-red-500 p-5 rounded-xl shadow-lg animate-shake">
                <div className="flex items-center">
                  <i className="fas fa-exclamation-triangle text-red-600 mr-3 text-xl"></i>
                  <p className="text-base text-red-800 font-bold">{error}</p>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field - Industrial Style */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-text-color font-bold text-base flex items-center">
                  <i className="fas fa-envelope mr-2 text-primary-color"></i>
                  อีเมล
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

              {/* Password Field - Industrial Style */}
              <div className="space-y-3">
                <Label htmlFor="password" className="text-text-color font-bold text-base flex items-center">
                  <i className="fas fa-lock mr-2 text-primary-color"></i>
                  รหัสผ่าน
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 text-var(--primary-color) border-3 border-gray-400 rounded-md focus:ring-3 focus:ring-var(--primary-color)" />
                  <span className="ml-3 text-text-color font-semibold group-hover:text-text-color transition-colors">จดจำฉันไว้</span>
                </label>
                <Link href="/forgot-password" className="text-var(--primary-color) hover:text-var(--accent-color) font-bold transition-colors text-base">
                  ลืมรหัสผ่าน?
                </Link>
              </div>

              {/* Login Button - Industrial Strength */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-16 bg-gradient-to-r from-primary-color via-accent-color to-accent-color hover:from-primary-color/90 hover:via-accent-color/90 hover:to-accent-color/90 text-white font-black text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-[1.02] active:scale-[0.98] border-2 border-accent-color rounded-xl"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-3 text-2xl"></i>
                    <span className="tracking-wide">กำลังเข้าสู่ระบบ...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt mr-3 text-2xl"></i>
                    <span className="tracking-wide">เข้าสู่ระบบ</span>
                  </>
                )}
              </Button>
            </form>

            {/* Divider - Industrial Style */}
            <div className="relative my-8">
              <Separator className="bg-gray-300 h-0.5" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 text-base text-text-color font-bold">
                หรือเข้าสู่ระบบด้วย
              </span>
            </div>

            {/* Social Login - Industrial Strength */}
            <div className="space-y-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin('facebook')}
                className="w-full h-14 border-3 border-facebook-color text-facebook-color hover:bg-facebook-color hover:text-white font-bold text-base shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] rounded-xl"
              >
                <i className="fab fa-facebook text-2xl mr-3"></i>
                เข้าสู่ระบบด้วย Facebook
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin('google')}
                className="w-full h-14 border-3 border-danger-color text-danger-color hover:bg-danger-color hover:text-white font-bold text-base shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] rounded-xl"
              >
                <i className="fab fa-google text-2xl mr-3"></i>
                เข้าสู่ระบบด้วย Google
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex-col space-y-4 pt-8 bg-light-gray-bg border-t-4 border-secondary-color">
            <p className="text-base text-text-color text-center font-semibold">
              ยังไม่มีบัญชีใช่ไหม?{' '}
              <Link 
                href="/register" 
                className="text-primary-color hover:text-accent-color font-black transition-colors text-lg underline decoration-2 underline-offset-4"
              >
                สร้างบัญชีใหม่
              </Link>
            </p>
          </CardFooter>
        </Card>
        </Container>
      </div>
    </MainLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-industrial-blue via-industrial-dark-gray to-black flex items-center justify-center">
        <div className="text-white">
          <i className="fas fa-spinner fa-spin text-4xl"></i>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
