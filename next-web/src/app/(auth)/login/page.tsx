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
    <MainLayout className="bg-gradient-to-br from-primary-color via-industrial-dark-gray to-black">
      <Container size="sm" className="flex items-center justify-center min-h-screen py-12">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        
        <Card className="w-full max-w-[400px] relative z-10 border-0 bg-white shadow-2xl">
          <CardHeader className="space-y-4 text-center pb-6 pt-8">
          {/* Logo/Icon */}
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-color to-accent-color rounded-2xl flex items-center justify-center shadow-lg">
            <i className="fas fa-tools text-white text-2xl"></i>
          </div>
          
          <CardTitle className="text-3xl font-bold text-gray-900">
            เข้าสู่ระบบ
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            ยินดีต้อนรับกลับสู่ 789 TOOLS
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

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                อีเมล
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

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                รหัสผ่าน
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

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-primary-color focus:ring-primary-color"
                />
                <span className="text-gray-700">จดจำฉันไว้</span>
              </label>
              <Link 
                href="/forgot-password" 
                className="text-primary-color hover:text-accent-color font-medium transition-colors"
              >
                ลืมรหัสผ่าน?
              </Link>
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
                  กำลังเข้าสู่ระบบ...
                </>
              ) : (
                <>
                  เข้าสู่ระบบ
                  <i className="fas fa-arrow-right ml-2"></i>
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <Separator className="bg-gray-200" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-gray-500 font-medium">
              หรือเข้าสู่ระบบด้วย
            </span>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin('facebook')}
              className="w-full h-12 border-gray-300 hover:bg-facebook hover:text-white hover:border-facebook transition-all"
            >
              <i className="fab fa-facebook text-lg mr-3"></i>
              เข้าสู่ระบบด้วย Facebook
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin('google')}
              className="w-full h-12 border-gray-300 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
            >
              <i className="fab fa-google text-lg mr-3"></i>
              เข้าสู่ระบบด้วย Google
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex-col space-y-4 pt-6">
          <Separator className="bg-gray-200" />
          <p className="text-sm text-gray-600 text-center">
            ยังไม่มีบัญชีใช่ไหม?{' '}
            <Link 
              href="/register" 
              className="text-primary-color hover:text-accent-color font-semibold transition-colors"
            >
              สร้างบัญชีใหม่
            </Link>
          </p>
        </CardFooter>
      </Card>
      </Container>
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
