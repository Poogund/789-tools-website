'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCartStore } from '@/features/cart';

export default function CartSyncProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { syncWithDatabase, loadFromDatabase, setUserId, items } = useCartStore();

  useEffect(() => {
    console.log('=== CartSyncProvider Debug ===');
    console.log('User:', user ? `logged in (${user.id})` : 'not logged in');
    console.log('Current cart items:', items.length);
    console.log('LocalStorage cart data:', localStorage.getItem('789tools-cart'));
    
    if (user) {
      // User is logged in - sync cart with database
      const syncCart = async () => {
        try {
          console.log('User logged in, loading cart from database...');
          // First try to load existing cart from database
          await loadFromDatabase(user.id);
        } catch (error) {
          console.error('Error loading cart from database:', error);
          // If loading fails, just set userId and sync current cart
          console.log('Falling back to syncing current cart to database...');
          await syncWithDatabase(user.id);
        }
      };

      syncCart();
    } else {
      // User is logged out - just clear userId, preserve cart items
      console.log('User logged out, preserving cart items in localStorage');
      setUserId(null);
    }
  }, [user, syncWithDatabase, loadFromDatabase, setUserId]); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>;
}
