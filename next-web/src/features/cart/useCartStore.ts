import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types';
import { saveCartToDatabase, loadCartFromDatabase, clearCartFromDatabase } from '@/lib/cart-repository';

interface CartStore {
  items: CartItem[];
  total: number;
  userId: string | null;
  hasHydrated: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  syncWithDatabase: (userId: string) => Promise<void>;
  loadFromDatabase: (userId: string) => Promise<void>;
  setUserId: (userId: string | null) => void;
  setHasHydrated: (hydrated: boolean) => void;
}

// Helper function to calculate total
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => {
    const price = item.salePrice ?? item.price;
    return sum + price * item.quantity;
  }, 0);
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      userId: null as string | null,
      hasHydrated: false,

      addItem: (item: CartItem) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) => i.productId === item.productId
          );

          let newItems: CartItem[];

          if (existingItemIndex >= 0) {
            // Item already exists, update quantity
            newItems = state.items.map((existingItem, index) => {
              if (index === existingItemIndex) {
                return {
                  ...existingItem,
                  quantity: existingItem.quantity + item.quantity,
                };
              }
              return existingItem;
            });
          } else {
            // New item, add to cart
            newItems = [...state.items, item];
          }

          // Sync with database if user is logged in
          if (state.userId) {
            saveCartToDatabase(state.userId, newItems).catch(console.error);
          }

          return {
            items: newItems,
            total: calculateTotal(newItems),
          };
        });
      },

      removeItem: (productId: string) => {
        set((state) => {
          const newItems = state.items.filter(
            (item) => item.productId !== productId
          );
          
          // Sync with database if user is logged in
          if (state.userId) {
            saveCartToDatabase(state.userId, newItems).catch(console.error);
          }
          
          return {
            items: newItems,
            total: calculateTotal(newItems),
          };
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        set((state) => {
          if (quantity < 1) {
            // Remove item if quantity is less than 1
            const newItems = state.items.filter(
              (item) => item.productId !== productId
            );
            
            // Sync with database if user is logged in
            if (state.userId) {
              saveCartToDatabase(state.userId, newItems).catch(console.error);
            }
            
            return {
              items: newItems,
              total: calculateTotal(newItems),
            };
          }

          // Update quantity
          const newItems = state.items.map((item) => {
            if (item.productId === productId) {
              return { ...item, quantity };
            }
            return item;
          });

          // Sync with database if user is logged in
          if (state.userId) {
            saveCartToDatabase(state.userId, newItems).catch(console.error);
          }

          return {
            items: newItems,
            total: calculateTotal(newItems),
          };
        });
      },

      clear: () => {
        const state = get();
        set({
          items: [],
          total: 0,
        });
        
        // Clear from database if user is logged in
        if (state.userId) {
          clearCartFromDatabase(state.userId).catch(console.error);
        }
      },

      syncWithDatabase: async (userId: string) => {
        const { items } = get();
        try {
          await saveCartToDatabase(userId, items);
          set({ userId });
        } catch (error) {
          console.error('Error syncing cart with database:', error);
        }
      },

      loadFromDatabase: async (userId: string) => {
        try {
          const dbItems = await loadCartFromDatabase(userId);
          set({
            items: dbItems,
            total: calculateTotal(dbItems),
            userId,
          });
        } catch (error) {
          console.error('Error loading cart from database:', error);
          console.error('Error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : 'No stack trace',
            userId: userId ? 'present' : 'missing',
            errorType: typeof error
          });
          set({ userId });
        }
      },

      setUserId: (userId: string | null) => {
        set({ userId });
      },

      setHasHydrated: (hydrated: boolean) => {
        set({ hasHydrated: hydrated });
      },
    }),
    {
      name: '789tools-cart', // localStorage key
      skipHydration: false,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

