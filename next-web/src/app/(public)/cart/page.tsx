'use client';

import { useCartStore } from '@/features/cart';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Metadata } from 'next';

export default function CartPage() {
  const { items, total, removeItem, updateQuantity } = useCartStore();
  const router = useRouter();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH').format(price);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      return;
    }
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-light-gray-bg">
      {/* Breadcrumbs */}
      <section className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <nav className="breadcrumbs flex items-center space-x-2 text-sm">
            <Link href="/" className="text-accent-color hover:text-primary-color transition-colors thai-text">
              หน้าแรก
            </Link>
            <i className="fa-solid fa-chevron-right text-gray-400 text-xs"></i>
            <span className="text-gray-600 thai-text">ตะกร้าสินค้า</span>
          </nav>
        </div>
      </section>

      {/* Cart Content */}
      <main className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-color mb-8 thai-text">ตะกร้าสินค้า</h1>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items List */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Table Header (Desktop) */}
                  <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-section-bg-gray border-b border-gray-200 font-semibold text-sm text-dark-color">
                    <div className="col-span-5 thai-text">สินค้า</div>
                    <div className="col-span-2 text-center thai-text">ราคา</div>
                    <div className="col-span-2 text-center thai-text">จำนวน</div>
                    <div className="col-span-2 text-center thai-text">รวม</div>
                    <div className="col-span-1"></div>
                  </div>

                  {/* Cart Items */}
                  <div className="divide-y divide-gray-200">
                    {items.map((item) => {
                      const itemPrice = item.salePrice ?? item.price;
                      const itemTotal = itemPrice * item.quantity;

                      return (
                        <div
                          key={item.productId}
                          className="grid grid-cols-12 gap-4 p-4 md:p-6 items-center hover:bg-gray-50 transition-colors"
                        >
                          {/* Product Image & Name */}
                          <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                            {item.imageUrl && (
                              <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://placehold.co/100x100/eee/ccc?text=สินค้า';
                                  }}
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-dark-color mb-1 thai-text line-clamp-2">
                                {item.name}
                              </h3>
                              {item.salePrice && (
                                <p className="text-xs text-gray-500 thai-text">
                                  ราคาปกติ: ฿{formatPrice(item.price)}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Price */}
                          <div className="col-span-6 md:col-span-2 text-center md:text-left">
                            <div className="text-danger-color font-bold thai-text">
                              ฿{formatPrice(itemPrice)}
                            </div>
                            {item.salePrice && (
                              <div className="text-xs text-gray-500 line-through thai-text">
                                ฿{formatPrice(item.price)}
                              </div>
                            )}
                          </div>

                          {/* Quantity Selector */}
                          <div className="col-span-6 md:col-span-2 flex justify-center md:justify-start">
                            <div className="quantity-selector inline-flex items-center border border-gray-300 rounded-lg overflow-hidden">
                              <button
                                onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                                aria-label="ลดจำนวน"
                              >
                                <i className="fa-solid fa-minus text-xs"></i>
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => {
                                  const newQuantity = parseInt(e.target.value) || 1;
                                  handleQuantityChange(item.productId, newQuantity);
                                }}
                                className="w-16 h-10 text-center border-0 focus:outline-none focus:ring-0 font-semibold"
                              />
                              <button
                                onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                                aria-label="เพิ่มจำนวน"
                              >
                                <i className="fa-solid fa-plus text-xs"></i>
                              </button>
                            </div>
                          </div>

                          {/* Item Total */}
                          <div className="col-span-6 md:col-span-2 text-center md:text-left">
                            <div className="text-danger-color font-bold text-lg thai-text">
                              ฿{formatPrice(itemTotal)}
                            </div>
                          </div>

                          {/* Remove Button */}
                          <div className="col-span-12 md:col-span-1 flex justify-end md:justify-center">
                            <button
                              onClick={() => removeItem(item.productId)}
                              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-danger-color transition-colors rounded-lg hover:bg-red-50"
                              aria-label="ลบสินค้า"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Cart Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                  <h2 className="text-xl font-bold text-dark-color mb-6 thai-text">สรุปยอด</h2>

                  {/* Subtotal */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 thai-text">ยอดรวม</span>
                      <span className="text-dark-color font-semibold thai-text">฿{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span className="thai-text">จำนวนสินค้า</span>
                      <span className="thai-text">{items.length} รายการ</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 my-6"></div>

                  {/* Grand Total */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-bold text-dark-color thai-text">ยอดรวมทั้งหมด</span>
                    <span className="text-2xl font-bold text-danger-color thai-text">฿{formatPrice(total)}</span>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    href="/checkout"
                    className="block w-full bg-primary-color text-white text-center py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors thai-text mb-4"
                  >
                    <i className="fa-solid fa-credit-card mr-2"></i>
                    ไปหน้าชำระเงิน
                  </Link>

                  {/* Continue Shopping */}
                  <Link
                    href="/products"
                    className="block w-full text-center py-3 text-gray-600 hover:text-primary-color transition-colors thai-text"
                  >
                    <i className="fa-solid fa-arrow-left mr-2"></i>
                    เลือกซื้อสินค้าเพิ่มเติม
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                <i className="fa-solid fa-shopping-cart text-gray-400 text-4xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-dark-color mb-4 thai-text">ตะกร้าของคุณว่างเปล่า</h2>
              <p className="text-gray-600 mb-8 thai-text">เริ่มเลือกซื้อสินค้าที่คุณสนใจกันเลย</p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-primary-color text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors thai-text"
              >
                <i className="fa-solid fa-store mr-2"></i>
                เลือกซื้อสินค้า
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

