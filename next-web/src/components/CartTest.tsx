'use client';

import { useCartStore } from '@/features/cart';
import { useState, useEffect } from 'react';

export default function CartTest() {
  const { items, addItem, removeItem, total } = useCartStore();
  const [localStorageData, setLocalStorageData] = useState<string>('');

  useEffect(() => {
    const updateLocalStorageDisplay = () => {
      const data = localStorage.getItem('789tools-cart');
      setLocalStorageData(data || 'No data in localStorage');
    };

    updateLocalStorageDisplay();
    
    // Listen for storage changes
    const handleStorageChange = () => {
      updateLocalStorageDisplay();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (for same-tab updates)
    const interval = setInterval(updateLocalStorageDisplay, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [items]);

  const addTestItem = () => {
    addItem({
      productId: 'test-' + Date.now(),
      name: 'Test Product',
      price: 100,
      quantity: 1,
      imageUrl: '/test.jpg'
    });
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-red-500 p-4 rounded-lg shadow-lg z-50 max-w-sm">
      <h3 className="font-bold text-red-600 mb-2">🛒 Cart Debug Panel</h3>
      
      <div className="space-y-2 text-xs">
        <div>
          <strong>Cart Items:</strong> {items.length}
        </div>
        <div>
          <strong>Total:</strong> ฿{total}
        </div>
        <div>
          <strong>LocalStorage:</strong>
          <div className="bg-gray-100 p-1 rounded mt-1 max-h-20 overflow-y-auto">
            <pre className="whitespace-pre-wrap break-all">
              {localStorageData.substring(0, 200)}...
            </pre>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={addTestItem}
          className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
        >
          Add Test Item
        </button>
        <button
          onClick={() => items.length > 0 && removeItem(items[0].productId)}
          className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
          disabled={items.length === 0}
        >
          Remove Last
        </button>
      </div>
    </div>
  );
}
