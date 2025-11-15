'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCartStore } from '@/features/cart';
import Link from 'next/link';

// Zod Schema for checkout form
const checkoutSchema = z.object({
  name: z.string().min(1, 'กรุณากรอกชื่อ'),
  phone: z.string().min(1, 'กรุณากรอกเบอร์โทรศัพท์'),
  email: z.string().email('กรุณากรอกอีเมลให้ถูกต้อง'),
  address: z.string().min(1, 'กรุณากรอกที่อยู่'),
  province: z.string().optional(),
  postalCode: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clear } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  // Guard Clause: Redirect to cart if empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  // Don't render if cart is empty (will redirect)
  if (items.length === 0) {
    return null;
  }

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      setIsSubmitting(true);

      // Call API to create order
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerInfo: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            province: data.province,
            postalCode: data.postalCode,
          },
          cartItems: items,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ');
      }

      const result = await response.json();
      const orderId = result.orderId;

      // Clear cart
      clear();

      // Redirect to success page
      router.push(`/order-success?orderId=${orderId}`);
    } catch (error) {
      console.error('Checkout error:', error);
      alert(error instanceof Error ? error.message : 'เกิดข้อผิดพลาด');
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH').format(price);
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
            <Link href="/cart" className="text-accent-color hover:text-primary-color transition-colors thai-text">
              ตะกร้าสินค้า
            </Link>
            <i className="fa-solid fa-chevron-right text-gray-400 text-xs"></i>
            <span className="text-gray-600 thai-text">ชำระเงิน</span>
          </nav>
        </div>
      </section>

      {/* Checkout Content */}
      <main className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-color mb-8 thai-text">ชำระเงิน</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-bold text-dark-color mb-6 thai-text">ข้อมูลการจัดส่ง</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-dark-color mb-2 thai-text">
                      ชื่อ-นามสกุล <span className="text-danger-color">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name')}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color ${
                        errors.name ? 'border-danger-color' : 'border-gray-300'
                      } thai-text`}
                      placeholder="กรุณากรอกชื่อ-นามสกุล"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-danger-color thai-text">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-dark-color mb-2 thai-text">
                      เบอร์โทรศัพท์ <span className="text-danger-color">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color ${
                        errors.phone ? 'border-danger-color' : 'border-gray-300'
                      } thai-text`}
                      placeholder="กรุณากรอกเบอร์โทรศัพท์"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-danger-color thai-text">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-dark-color mb-2 thai-text">
                      อีเมล <span className="text-danger-color">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email')}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color ${
                        errors.email ? 'border-danger-color' : 'border-gray-300'
                      } thai-text`}
                      placeholder="กรุณากรอกอีเมล"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-danger-color thai-text">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-semibold text-dark-color mb-2 thai-text">
                      ที่อยู่จัดส่ง <span className="text-danger-color">*</span>
                    </label>
                    <textarea
                      id="address"
                      {...register('address')}
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color ${
                        errors.address ? 'border-danger-color' : 'border-gray-300'
                      } thai-text`}
                      placeholder="กรุณากรอกที่อยู่จัดส่ง"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-danger-color thai-text">{errors.address.message}</p>
                    )}
                  </div>

                  {/* Province (Optional) */}
                  <div>
                    <label htmlFor="province" className="block text-sm font-semibold text-dark-color mb-2 thai-text">
                      จังหวัด
                    </label>
                    <input
                      type="text"
                      id="province"
                      {...register('province')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color thai-text"
                      placeholder="กรุณากรอกจังหวัด (ไม่บังคับ)"
                    />
                  </div>

                  {/* Postal Code (Optional) */}
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-semibold text-dark-color mb-2 thai-text">
                      รหัสไปรษณีย์
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      {...register('postalCode')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color thai-text"
                      placeholder="กรุณากรอกรหัสไปรษณีย์ (ไม่บังคับ)"
                    />
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-semibold text-dark-color mb-4 thai-text">
                      วิธีการชำระเงิน <span className="text-danger-color">*</span>
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border-2 border-primary-color rounded-lg cursor-pointer bg-primary-color/5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="transfer"
                          defaultChecked
                          className="w-5 h-5 text-primary-color focus:ring-primary-color"
                        />
                        <div className="ml-3">
                          <div className="font-semibold text-dark-color thai-text">โอนเงิน</div>
                          <div className="text-sm text-gray-600 thai-text">
                            โอนเงินเข้าบัญชีธนาคาร (จะแจ้งเลขบัญชีหลังยืนยันคำสั่งซื้อ)
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button (inside form) */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-primary-color text-white py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors thai-text ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                          กำลังดำเนินการ...
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-check mr-2"></i>
                          ยืนยันคำสั่งซื้อ
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold text-dark-color mb-6 thai-text">สรุปคำสั่งซื้อ</h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {items.map((item) => {
                    const itemPrice = item.salePrice ?? item.price;
                    const itemTotal = itemPrice * item.quantity;

                    return (
                      <div key={item.productId} className="flex items-start gap-3 pb-4 border-b border-gray-200 last:border-0">
                        {item.imageUrl && (
                          <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://placehold.co/64x64/eee/ccc?text=สินค้า';
                              }}
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-dark-color mb-1 thai-text line-clamp-2 text-sm">
                            {item.name}
                          </h3>
                          <div className="text-sm text-gray-600 thai-text">
                            จำนวน: {item.quantity} x ฿{formatPrice(itemPrice)}
                          </div>
                          <div className="text-sm font-bold text-danger-color mt-1 thai-text">
                            ฿{formatPrice(itemTotal)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-6"></div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-dark-color thai-text">ยอดรวมทั้งหมด</span>
                  <span className="text-2xl font-bold text-danger-color thai-text">฿{formatPrice(total)}</span>
                </div>

                {/* Back to Cart */}
                <Link
                  href="/cart"
                  className="block w-full text-center py-3 text-gray-600 hover:text-primary-color transition-colors mt-4 thai-text"
                >
                  <i className="fa-solid fa-arrow-left mr-2"></i>
                  กลับไปแก้ไขตะกร้า
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

