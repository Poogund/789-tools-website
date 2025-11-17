'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabaseBrowserClient } from '@/lib/supabase/client';
import { getCurrentUserAccountClient } from '@/lib/auth-client';
import { useCartStore } from '@/features/cart';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userAccount: { name: string; email: string } | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userAccount, setUserAccount] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user account data
  const fetchUserAccount = async () => {
    if (user) {
      try {
        const account = await getCurrentUserAccountClient();
        setUserAccount(account);
      } catch (error) {
        console.error('Error fetching user account:', error);
        setUserAccount(null);
      }
    } else {
      setUserAccount(null);
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabaseBrowserClient.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const account = await getCurrentUserAccountClient();
          setUserAccount(account);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabaseBrowserClient.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const account = await getCurrentUserAccountClient();
          setUserAccount(account);
        } else {
          setUserAccount(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ error: string | null }> => {
    try {
      const { error } = await supabaseBrowserClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        let errorMessage = 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ';
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'กรุณายืนยันอีเมลของคุณก่อนเข้าสู่ระบบ';
        }
        return { error: errorMessage };
      }

      return { error: null };
    } catch (error) {
      return { error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' };
    }
  };

  const logout = async () => {
    try {
      await supabaseBrowserClient.auth.signOut();
      setUser(null);
      setSession(null);
      setUserAccount(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const refreshUser = async () => {
    try {
      await fetchUserAccount();
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    userAccount,
    loading,
    login,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
