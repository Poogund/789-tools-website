import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
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
    (set) => ({
      items: [],
      total: 0,

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

          return {
            items: newItems,
            total: calculateTotal(newItems),
          };
        });
      },

      clear: () => {
        set({
          items: [],
          total: 0,
        });
      },
    }),
    {
      name: '789tools-cart', // localStorage key
    }
  )
);

