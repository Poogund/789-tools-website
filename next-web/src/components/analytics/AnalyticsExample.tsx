'use client';

// Example component showing how to use analytics in client components
import { trackViewProduct, trackAddToCart, trackSubmitLead } from '@/lib/analytics';

export function AnalyticsExample() {
  const handleProductView = () => {
    trackViewProduct('prod-123', 'รถตัดคอนกรีต', 15000);
  };

  const handleAddToCart = () => {
    trackAddToCart('prod-123', 'รถตัดคอนกรีต', 15000, 1);
  };

  const handleSubmitLead = () => {
    trackSubmitLead('repair');
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold mb-2">Analytics Example</h3>
      <div className="space-y-2">
        <button 
          onClick={handleProductView}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Track View Product
        </button>
        <button 
          onClick={handleAddToCart}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm ml-2"
        >
          Track Add to Cart
        </button>
        <button 
          onClick={handleSubmitLead}
          className="px-3 py-1 bg-purple-500 text-white rounded text-sm ml-2"
        >
          Track Submit Lead
        </button>
      </div>
    </div>
  );
}
