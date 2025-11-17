'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCartStore } from '@/features/cart';

export default function CartSyncProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { syncWithDatabase, loadFromDatabase, setUserId } = useCartStore();

  useEffect(() => {
    if (user) {
      // User is logged in - sync cart with database
      const syncCart = async () => {
        try {
          // First try to load existing cart from database
          await loadFromDatabase(user.id);
        } catch (error) {
          console.error('Error loading cart from database:', error);
          // If loading fails, just set userId and sync current cart
          await syncWithDatabase(user.id);
        }
      };

      syncCart();
    } else {
      // User is logged out - clear userId
      setUserId(null);
    }
  }, [user, syncWithDatabase, loadFromDatabase, setUserId]);

  return <>{children}</>;
}
