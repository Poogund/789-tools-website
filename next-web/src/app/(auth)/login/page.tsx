'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

function LoginContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
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
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Premium Animated Background */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float-delayed"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float-slow"></div>
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='white' stroke-width='0.5' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Premium Login Card */}
        <div 
          className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/10 transition-all duration-700 hover:bg-white/10 hover:shadow-[0_25px_50px_-12px_rgba(139,92,246,0.25)]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Glow effect on hover */}
          <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-xl transition-all duration-700 ${isHovering ? 'opacity-100' : 'opacity-0'}`}></div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Premium Header */}
            <div className="mb-12 text-center">
              {/* Animated logo */}
              <div className="relative w-28 h-28 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-white text-4xl"></i>
                </div>
                {/* Orbit rings */}
                <div className="absolute -inset-6 border border-purple-500/20 rounded-full animate-spin-slow"></div>
                <div className="absolute -inset-8 border border-blue-500/10 rounded-full animate-spin-slow-reverse"></div>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl font-bold text-white tracking-tight leading-tight">
                  ยินดีต้อนรับ
                  <span className="block text-3xl font-light text-gray-400 mt-3 leading-relaxed">กลับมาอีกครั้ง</span>
                </h1>
                <p className="text-gray-500 text-base font-light tracking-wide leading-relaxed max-w-sm mx-auto">เข้าสู่ระบบเพื่อเริ่มต้นการเดินทางของคุณ</p>
              </div>
            </div>

            {/* Premium Error Message */}
            {error && (
              <div className="mb-10 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 backdrop-blur-sm animate-slideDown">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-exclamation-triangle text-red-400 text-base"></i>
                </div>
                <span className="text-red-300 text-base font-medium leading-relaxed">{error}</span>
              </div>
            )}

            {/* Premium Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Email Field */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">อีเมล</label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-all duration-500 ${focusedField === 'email' ? 'text-purple-400' : 'text-gray-600'}`}>
                    <i className="fas fa-envelope text-xl"></i>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`block w-full pl-14 pr-5 py-5 bg-white/5 backdrop-blur-sm border rounded-2xl focus:outline-none focus:ring-2 text-white placeholder-gray-600 text-base transition-all duration-500 font-medium ${
                      focusedField === 'email' 
                        ? 'border-purple-500/50 focus:ring-purple-500/30 bg-white/10 shadow-lg shadow-purple-500/20' 
                        : 'border-white/10 hover:border-white/20 hover:bg-white/10'
                    }`}
                    placeholder="your@email.com"
                    required
                  />
                  {/* Field highlight */}
                  {focusedField === 'email' && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/10 to-blue-600/10 blur-md -z-10"></div>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">รหัสผ่าน</label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-all duration-500 ${focusedField === 'password' ? 'text-purple-400' : 'text-gray-600'}`}>
                    <i className="fas fa-lock text-xl"></i>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className={`block w-full pl-14 pr-16 py-5 bg-white/5 backdrop-blur-sm border rounded-2xl focus:outline-none focus:ring-2 text-white placeholder-gray-600 text-base transition-all duration-500 font-medium ${
                      focusedField === 'password' 
                        ? 'border-purple-500/50 focus:ring-purple-500/30 bg-white/10 shadow-lg shadow-purple-500/20' 
                        : 'border-white/10 hover:border-white/20 hover:bg-white/10'
                    }`}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-600 hover:text-purple-400 transition-all duration-300"
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xl`}></i>
                  </button>
                  {/* Field highlight */}
                  {focusedField === 'password' && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/10 to-blue-600/10 blur-md -z-10"></div>
                  )}
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-5 w-5 rounded-lg border-white/20 bg-white/10 text-purple-600 focus:ring-purple-500/50 focus:ring-offset-0 focus:ring-offset-transparent transition-all duration-300"
                  />
                  <label htmlFor="remember" className="ml-3 block text-sm text-gray-400 font-medium cursor-pointer">
                    จดจำฉันไว้
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-purple-400 hover:text-purple-300 transition-all duration-300 border-b border-transparent hover:border-purple-400">
                    ลืมรหัสผ่าน?
                  </a>
                </div>
              </div>

              {/* Premium Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full relative group overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white py-6 px-8 rounded-2xl font-bold hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 text-lg mt-10 shadow-xl hover:shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin text-xl"></i>
                      <span>กำลังเข้าสู่ระบบ...</span>
                    </>
                  ) : (
                    <>
                      <span>เข้าสู่ระบบ</span>
                      <i className="fas fa-arrow-right text-base"></i>
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Premium Divider */}
            <div className="mt-12">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-8 bg-transparent text-gray-500 text-sm font-semibold uppercase tracking-wider">หรือเข้าสู่ระบบด้วย</span>
                </div>
              </div>
            </div>

            {/* Premium Social Login */}
            <div className="mt-10 grid grid-cols-2 gap-5">
              <button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                className="group relative overflow-hidden flex items-center justify-center gap-3 py-5 px-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-blue-500/30 transition-all duration-500 text-base font-medium"
              >
                <i className="fab fa-facebook text-xl group-hover:text-blue-400 transition-colors duration-300"></i>
                <span>Facebook</span>
                {/* Hover glow */}
                <div className="absolute inset-0 bg-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="group relative overflow-hidden flex items-center justify-center gap-3 py-5 px-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-red-500/30 transition-all duration-500 text-base font-medium"
              >
                <i className="fab fa-google text-xl group-hover:text-red-400 transition-colors duration-300"></i>
                <span>Google</span>
                {/* Hover glow */}
                <div className="absolute inset-0 bg-red-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Premium Register Link */}
            <div className="mt-12 text-center">
              <p className="text-base text-gray-500 leading-relaxed">
                ยังไม่มีบัญชีใช่ไหม?{' '}
                <Link href="/register" className="font-bold text-white hover:text-purple-400 transition-all duration-300 border-b border-transparent hover:border-purple-400">
                  สร้างบัญชีใหม่
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          25% {
            transform: translate(30px, -30px) scale(1.05);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.95);
          }
          75% {
            transform: translate(20px, 30px) scale(1.02);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          25% {
            transform: translate(-20px, 30px) scale(0.95);
          }
          50% {
            transform: translate(30px, -20px) scale(1.05);
          }
          75% {
            transform: translate(-30px, -30px) scale(0.98);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(20px, -40px) scale(1.08);
          }
          66% {
            transform: translate(-40px, 20px) scale(0.92);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes spin-slow-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 90s linear infinite;
        }
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">
          <i className="fas fa-spinner fa-spin text-4xl"></i>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
