'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCartStore } from '@/features/cart';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup } from '@/components/ui/radio-group';
import { MainLayout, Container, Section, Grid } from '@/components/layout/MainLayout';
import { useToast } from '@/hooks/use-toast';

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
  const { user, userAccount } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGuestCheckout, setIsGuestCheckout] = useState(!user);
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [activeStep, setActiveStep] = useState(0); // 0: Shipping, 1: Payment, 2: Review

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: userAccount?.name || '',
      email: userAccount?.email || user?.email || '',
    },
  });

  // Update form values when user logs in
  useEffect(() => {
    if (userAccount && !isGuestCheckout) {
      setValue('name', userAccount.name);
      setValue('email', userAccount.email);
    }
  }, [userAccount, isGuestCheckout, setValue]);

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
          paymentMethod,
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
    <MainLayout>
      {/* Breadcrumbs */}
      <Section className="bg-white border-b border-gray-200 py-4">
        <Container>
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-primary-color hover:text-accent-color transition-colors font-medium">
              <i className="fas fa-home mr-1"></i>
              หน้าแรก
            </Link>
            <i className="fa-solid fa-chevron-right text-gray-400 text-xs"></i>
            <Link href="/cart" className="text-primary-color hover:text-accent-color transition-colors font-medium">
              ตะกร้าสินค้า
            </Link>
            <i className="fa-solid fa-chevron-right text-gray-400 text-xs"></i>
            <span className="text-gray-900 font-semibold">ชำระเงิน</span>
          </nav>
        </Container>
      </Section>

      {/* Checkout Content */}
      <Section className="py-8 md:py-12">
        <Container>
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              <i className="fas fa-credit-card text-primary-color mr-3"></i>
              ชำระเงิน
            </h1>
            <p className="text-gray-600">กรุณากรอกข้อมูลเพื่อดำเนินการสั่งซื้อ</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column: Checkout Form */}
            <div className="lg:col-span-2">
              {/* Step Indicators */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  {[
                    { step: 0, title: 'ข้อมูลจัดส่ง', icon: 'fa-truck' },
                    { step: 1, title: 'วิธีชำระเงิน', icon: 'fa-credit-card' },
                    { step: 2, title: 'ยืนยันคำสั่งซื้อ', icon: 'fa-check-circle' }
                  ].map((item) => (
                    <div key={item.step} className="flex items-center">
                      <button
                        type="button"
                        onClick={() => setActiveStep(item.step)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                          activeStep === item.step
                            ? 'bg-primary-color text-white shadow-md'
                            : activeStep > item.step
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <i className={`fas ${item.icon}`}></i>
                        <span className="text-sm font-medium hidden sm:inline">
                          {item.title}
                        </span>
                      </button>
                      {item.step < 2 && (
                        <div className={`w-8 h-0.5 mx-2 ${
                          activeStep > item.step ? 'bg-green-400' : 'bg-gray-300'
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Checkout Type Selection */}
                {user && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">ประเภทการสั่งซื้อ</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setIsGuestCheckout(false)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            !isGuestCheckout
                              ? 'border-primary-color bg-primary-color/10 shadow-md'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <i className="fas fa-user-circle text-2xl mb-2 text-primary-color"></i>
                          <div className="font-semibold text-gray-900">สมาชิก</div>
                          <div className="text-sm text-gray-600">ใช้ข้อมูลบัญชี</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsGuestCheckout(true)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            isGuestCheckout
                              ? 'border-primary-color bg-primary-color/10 shadow-md'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <i className="fas fa-user text-2xl mb-2 text-gray-600"></i>
                          <div className="font-semibold text-gray-900">แขก</div>
                          <div className="text-sm text-gray-600">สั่งซื้อโดยไม่ต้องสมัคร</div>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Step 1: Shipping Information */}
                {activeStep === 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center">
                        <i className="fas fa-shipping-fast text-primary-color mr-3"></i>
                        ข้อมูลการจัดส่ง
                      </CardTitle>
                    </CardHeader>
                  <CardContent className="space-y-5">
                    {/* Name & Phone Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-900 font-semibold">
                          ชื่อ-นามสกุล <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                          <Input
                            id="name"
                            {...register('name')}
                            disabled={!!user && !isGuestCheckout}
                            className={`pl-10 h-12 ${errors.name ? 'border-red-500' : ''} ${
                              !!user && !isGuestCheckout ? 'bg-gray-100' : ''
                            }`}
                            placeholder="นายสมชาย ใจดี"
                          />
                        </div>
                        {errors.name && (
                          <p className="text-sm text-red-600 font-medium">{errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-900 font-semibold">
                          เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <i className="fas fa-phone absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                          <Input
                            id="phone"
                            type="tel"
                            {...register('phone')}
                            className={`pl-10 h-12 ${errors.phone ? 'border-red-500' : ''}`}
                            placeholder="0812345678"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-sm text-red-600 font-medium">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-900 font-semibold">
                        อีเมล <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          disabled={!!user && !isGuestCheckout}
                          className={`pl-10 h-12 ${errors.email ? 'border-red-500' : ''} ${
                            !!user && !isGuestCheckout ? 'bg-gray-100' : ''
                          }`}
                          placeholder="your@email.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-600 font-medium">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-gray-900 font-semibold">
                        ที่อยู่จัดส่ง <span className="text-red-500">*</span>
                      </Label>
                      <textarea
                        id="address"
                        {...register('address')}
                        rows={4}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color text-gray-900 ${
                          errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="บ้านเลขที่, ซอย, ถนน, ตำบล, อำเภอ"
                      />
                      {errors.address && (
                        <p className="text-sm text-red-600 font-medium">{errors.address.message}</p>
                      )}
                    </div>

                    {/* Province & Postal Code Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="province" className="text-gray-900 font-semibold">
                          จังหวัด
                        </Label>
                        <div className="relative">
                          <i className="fas fa-map-marker-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                          <Input
                            id="province"
                            {...register('province')}
                            className="pl-10 h-12"
                            placeholder="กรุงเทพมหานคร"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="postalCode" className="text-gray-900 font-semibold">
                          รหัสไปรษณีย์
                        </Label>
                        <div className="relative">
                          <i className="fas fa-mail-bulk absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                          <Input
                            id="postalCode"
                            {...register('postalCode')}
                            className="pl-10 h-12"
                            placeholder="10110"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                )}

                {/* Step 2: Payment Method */}
                {activeStep === 1 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center">
                        <i className="fas fa-wallet text-primary-color mr-3"></i>
                        วิธีการชำระเงิน
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Bank Transfer */}
                    <label
                      className={`flex items-start p-5 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === 'transfer'
                          ? 'border-primary-color bg-primary-color/10 shadow-md'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="transfer"
                        checked={paymentMethod === 'transfer'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1 w-5 h-5 text-primary-color focus:ring-primary-color"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <i className="fas fa-university text-primary-color text-xl"></i>
                          <span className="font-bold text-gray-900 text-lg">โอนเงินผ่านธนาคาร</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          โอนเงินเข้าบัญชีธนาคาร (จะแจ้งเลขบัญชีหลังยืนยันคำสั่งซื้อ)
                        </p>
                      </div>
                    </label>

                    {/* Cash on Delivery */}
                    <label
                      className={`flex items-start p-5 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-primary-color bg-primary-color/10 shadow-md'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1 w-5 h-5 text-primary-color focus:ring-primary-color"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <i className="fas fa-hand-holding-usd text-green-600 text-xl"></i>
                          <span className="font-bold text-gray-900 text-lg">เก็บเงินปลายทาง (COD)</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          ชำระเงินเมื่อได้รับสินค้า (อาจมีค่าธรรมเนียมเพิ่มเติม)
                        </p>
                      </div>
                    </label>

                    {/* Bank Transfer Details */}
                    {paymentMethod === 'transfer' && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-3">บัญชีธนาคาร</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { name: 'กสิกรไทย', logo: 'fa-university', color: 'text-green-600' },
                            { name: 'ไทยพาณิชย์', logo: 'fa-university', color: 'text-purple-600' },
                            { name: 'กรุงเทพ', logo: 'fa-university', color: 'text-blue-600' },
                            { name: 'กรุงไทย', logo: 'fa-university', color: 'text-red-600' }
                          ].map((bank, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded border">
                              <i className={`fas ${bank.logo} ${bank.color}`}></i>
                              <span className="text-sm font-medium">{bank.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* PromptPay QR Preview */}
                    {paymentMethod === 'promptpay' && (
                      <div className="mt-4 p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-3">PromptPay QR Code</h4>
                        <div className="flex items-center gap-4">
                          <div className="w-24 h-24 bg-white p-2 rounded border-2 border-green-400">
                            <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                              <i className="fas fa-qrcode text-3xl text-gray-600"></i>
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-700 mb-2">
                              สแกน QR Code เพื่อชำระเงินผ่าน PromptPay
                            </p>
                            <p className="text-xs text-gray-600">
                              เบอร์โทร: 089-XXX-XXXX
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                )}

                {/* Step 3: Order Review */}
                {activeStep === 2 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center">
                        <i className="fas fa-clipboard-check text-primary-color mr-3"></i>
                        ยืนยันคำสั่งซื้อ
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800">
                          <i className="fas fa-info-circle mr-2"></i>
                          กรุณาตรวจสอบข้อมูลคำสั่งซื้อให้ถูกต้องก่อนยืนยัน
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between gap-4">
                  {activeStep > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveStep(activeStep - 1)}
                      className="px-6 h-12"
                    >
                      <i className="fas fa-arrow-left mr-2"></i>
                      ย้อนกลับ
                    </Button>
                  )}
                  
                  {activeStep < 2 ? (
                    <Button
                      type="button"
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="ml-auto px-6 h-12 bg-gradient-to-r from-primary-color to-accent-color"
                    >
                      ถัดไป
                      <i className="fas fa-arrow-right ml-2"></i>
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="ml-auto px-6 h-14 bg-gradient-to-r from-primary-color to-accent-color hover:from-primary-color/90 hover:to-accent-color/90 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          กำลังดำเนินการ...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-check-circle mr-2"></i>
                          ยืนยันคำสั่งซื้อ
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </div>
            </div>

            {/* Right Column: Order Summary (Sticky) */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <Card className="shadow-xl border-2">
                  <CardHeader className="bg-gradient-to-r from-primary-color to-accent-color text-white">
                    <CardTitle className="text-2xl flex items-center">
                      <i className="fas fa-shopping-bag mr-3"></i>
                      สรุปคำสั่งซื้อ
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Order Items */}
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {items.map((item) => {
                        const itemPrice = item.salePrice ?? item.price;
                        return (
                          <div key={item.productId} className="flex gap-3 pb-4 border-b border-gray-200 last:border-0">
                            {item.imageUrl && (
                              <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://placehold.co/100x100/eee/999?text=สินค้า';
                                  }}
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                                {item.name}
                              </h4>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">x{item.quantity}</span>
                                <span className="font-bold text-primary-color">
                                  ฿{formatPrice(itemPrice * item.quantity)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <Separator className="bg-gray-200" />

                    {/* Summary Totals */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-700">
                        <span>ยอดรวมสินค้า</span>
                        <span className="font-semibold">฿{formatPrice(total)}</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>ค่าจัดส่ง</span>
                        <span className="text-green-600 font-semibold">ฟรี</span>
                      </div>
                    </div>

                    <Separator className="bg-gray-200" />

                    {/* Grand Total */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">ยอดรวมทั้งหมด</span>
                        <span className="text-3xl font-bold text-accent-color">
                          ฿{formatPrice(total)}
                        </span>
                      </div>
                    </div>

                    {/* Security Badge */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <i className="fas fa-lock text-green-600 text-2xl mb-2"></i>
                      <p className="text-sm text-green-800 font-semibold">
                        การชำระเงินปลอดภัย 100%
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
        </Container>
      </Section>
    </MainLayout>
  );
}
