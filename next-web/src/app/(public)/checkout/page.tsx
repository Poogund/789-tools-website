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
      {/* Breadcrumbs - Industrial Style */}
      <Section className="bg-white border-b-4 border-secondary-color py-6">
        <Container>
          <nav className="flex items-center space-x-3 text-base">
            <Link href="/" className="text-primary-color hover:text-accent-color transition-colors font-bold flex items-center">
              <i className="fas fa-home mr-2 text-lg"></i>
              หน้าแรก
            </Link>
            <i className="fa-solid fa-chevron-right text-secondary-color text-sm"></i>
            <Link href="/cart" className="text-primary-color hover:text-accent-color transition-colors font-bold">
              ตะกร้าสินค้า
            </Link>
            <i className="fa-solid fa-chevron-right text-secondary-color text-sm"></i>
            <span className="text-text-color font-black text-lg">ชำระเงิน</span>
          </nav>
        </Container>
      </Section>

      {/* Checkout Content - Industrial Style */}
      <Section className="py-12 md:py-16">
        <Container>
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-text-color mb-4 flex items-center">
              <i className="fas fa-credit-card text-primary-color mr-4 text-3xl md:text-4xl"></i>
              ชำระเงิน
            </h1>
            <p className="text-lg text-secondary-color font-semibold">กรุณากรอกข้อมูลเพื่อดำเนินการสั่งซื้อ</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column: Checkout Form */}
            <div className="lg:col-span-2">
              {/* Step Indicators - Industrial Style */}
              <div className="mb-8">
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
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all border-2 ${
                          activeStep === item.step
                            ? 'bg-primary-color text-white shadow-lg border-primary-color'
                            : activeStep > item.step
                            ? 'bg-green-50 text-green-700 border-green-500'
                            : 'bg-light-gray-bg text-secondary-color border-secondary-color hover:bg-secondary-color hover:text-white'
                        }`}
                      >
                        <i className={`fas ${item.icon} text-lg`}></i>
                        <span className="text-base font-bold hidden sm:inline">
                          {item.title}
                        </span>
                      </button>
                      {item.step < 2 && (
                        <div className={`w-12 h-1 mx-3 rounded-full ${
                          activeStep > item.step ? 'bg-green-500' : 'bg-secondary-color'
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Checkout Type Selection - Industrial Style */}
                {user && (
                  <Card className="border-3 border-secondary-color shadow-xl">
                    <CardHeader className="bg-light-gray-bg border-b-3 border-secondary-color">
                      <CardTitle className="text-2xl font-black text-text-color flex items-center">
                        <i className="fas fa-user-tag text-primary-color mr-3 text-xl"></i>
                        ประเภทการสั่งซื้อ
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-2 gap-6">
                        <button
                          type="button"
                          onClick={() => setIsGuestCheckout(false)}
                          className={`p-6 rounded-xl border-3 transition-all ${
                            !isGuestCheckout
                              ? 'border-primary-color bg-primary-color/10 shadow-lg border-4'
                              : 'border-secondary-color hover:border-primary-color hover:bg-light-gray-bg'
                          }`}
                        >
                          <i className="fas fa-user-circle text-3xl mb-3 text-primary-color"></i>
                          <div className="font-black text-lg text-text-color">สมาชิก</div>
                          <div className="text-base text-secondary-color font-semibold">ใช้ข้อมูลบัญชี</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsGuestCheckout(true)}
                          className={`p-6 rounded-xl border-3 transition-all ${
                            isGuestCheckout
                              ? 'border-primary-color bg-primary-color/10 shadow-lg border-4'
                              : 'border-secondary-color hover:border-primary-color hover:bg-light-gray-bg'
                          }`}
                        >
                          <i className="fas fa-user text-3xl mb-3 text-secondary-color"></i>
                          <div className="font-black text-lg text-text-color">แขก</div>
                          <div className="text-base text-secondary-color font-semibold">สั่งซื้อโดยไม่ต้องสมัคร</div>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Step 1: Shipping Information - Industrial Style */}
                {activeStep === 0 && (
                  <Card className="border-3 border-secondary-color shadow-xl">
                    <CardHeader className="bg-light-gray-bg border-b-3 border-secondary-color">
                      <CardTitle className="text-2xl font-black text-text-color flex items-center">
                        <i className="fas fa-shipping-fast text-primary-color mr-3 text-xl"></i>
                        ข้อมูลการจัดส่ง
                      </CardTitle>
                    </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Name & Phone Row - Industrial Style */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-text-color font-bold text-base flex items-center">
                          <i className="fas fa-user mr-2 text-primary-color"></i>
                          ชื่อ-นามสกุล <span className="text-danger-color">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="name"
                            {...register('name')}
                            disabled={!!user && !isGuestCheckout}
                            className="h-14 border-3 border-secondary-color focus:border-primary-color focus:ring-4 focus:ring-primary-color/30 transition-all text-lg font-semibold pl-4 rounded-xl shadow-md"
                            placeholder="กรุณากรอกชื่อ-นามสกุล"
                          />
                        </div>
                        {errors.name && (
                          <p className="text-danger-color text-base font-semibold">{errors.name.message}</p>
                        )}
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="phone" className="text-text-color font-bold text-base flex items-center">
                          <i className="fas fa-phone mr-2 text-primary-color"></i>
                          เบอร์โทรศัพท์ <span className="text-danger-color">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="phone"
                            type="tel"
                            {...register('phone')}
                            className="h-14 border-3 border-secondary-color focus:border-primary-color focus:ring-4 focus:ring-primary-color/30 transition-all text-lg font-semibold pl-4 rounded-xl shadow-md"
                            placeholder="0812345678"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-danger-color text-base font-semibold">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Email - Industrial Style */}
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-text-color font-bold text-base flex items-center">
                        <i className="fas fa-envelope mr-2 text-primary-color"></i>
                        อีเมล <span className="text-danger-color">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          disabled={!!user && !isGuestCheckout}
                          className={`h-14 border-3 border-secondary-color focus:border-primary-color focus:ring-4 focus:ring-primary-color/30 transition-all text-lg font-semibold pl-4 rounded-xl shadow-md ${
                            errors.email ? 'border-danger-color' : ''
                          } ${
                            !!user && !isGuestCheckout ? 'bg-light-gray-bg' : ''
                          }`}
                          placeholder="your@email.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-danger-color text-base font-semibold">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Address - Industrial Style */}
                    <div className="space-y-3">
                      <Label htmlFor="address" className="text-text-color font-bold text-base flex items-center">
                        <i className="fas fa-map-marker-alt mr-2 text-primary-color"></i>
                        ที่อยู่จัดส่ง <span className="text-danger-color">*</span>
                      </Label>
                      <textarea
                        id="address"
                        {...register('address')}
                        rows={4}
                        className={`w-full px-4 py-4 border-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-color text-lg font-semibold text-text-color shadow-md ${
                          errors.address ? 'border-danger-color' : 'border-secondary-color'
                        }`}
                        placeholder="บ้านเลขที่, ซอย, ถนน, ตำบล, อำเภอ"
                      />
                      {errors.address && (
                        <p className="text-danger-color text-base font-semibold">{errors.address.message}</p>
                      )}
                    </div>

                    {/* Province & Postal Code Row - Industrial Style */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="province" className="text-text-color font-bold text-base flex items-center">
                          <i className="fas fa-map-marker-alt mr-2 text-primary-color"></i>
                          จังหวัด
                        </Label>
                        <div className="relative">
                          <Input
                            id="province"
                            {...register('province')}
                            className="h-14 border-3 border-secondary-color focus:border-primary-color focus:ring-4 focus:ring-primary-color/30 transition-all text-lg font-semibold pl-4 rounded-xl shadow-md"
                            placeholder="กรุงเทพมหานคร"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="postalCode" className="text-text-color font-bold text-base flex items-center">
                          <i className="fas fa-mail-bulk mr-2 text-primary-color"></i>
                          รหัสไปรษณีย์
                        </Label>
                        <div className="relative">
                          <Input
                            id="postalCode"
                            {...register('postalCode')}
                            className="h-14 border-3 border-secondary-color focus:border-primary-color focus:ring-4 focus:ring-primary-color/30 transition-all text-lg font-semibold pl-4 rounded-xl shadow-md"
                            placeholder="10110"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                )}

                {/* Step 2: Payment Method - Industrial Style */}
                {activeStep === 1 && (
                  <Card className="border-3 border-secondary-color shadow-xl">
                    <CardHeader className="bg-light-gray-bg border-b-3 border-secondary-color">
                      <CardTitle className="text-2xl font-black text-text-color flex items-center">
                        <i className="fas fa-wallet text-primary-color mr-3 text-xl"></i>
                        วิธีการชำระเงิน
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Bank Transfer - Industrial Style */}
                    <label
                      className={`flex items-start p-6 border-3 rounded-xl cursor-pointer transition-all ${
                        paymentMethod === 'transfer'
                          ? 'border-primary-color bg-primary-color/10 shadow-lg border-4'
                          : 'border-secondary-color hover:border-primary-color hover:bg-light-gray-bg'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="transfer"
                        checked={paymentMethod === 'transfer'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-2 w-6 h-6 text-primary-color focus:ring-4 focus:ring-primary-color/30"
                      />
                      <div className="ml-5 flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <i className="fas fa-university text-primary-color text-2xl"></i>
                          <span className="font-black text-xl text-text-color">โอนเงินผ่านธนาคาร</span>
                        </div>
                        <p className="text-base text-secondary-color font-semibold">
                          โอนเงินเข้าบัญชีธนาคาร (จะแจ้งเลขบัญชีหลังยืนยันคำสั่งซื้อ)
                        </p>
                      </div>
                    </label>

                    {/* Cash on Delivery - Industrial Style */}
                    <label
                      className={`flex items-start p-6 border-3 rounded-xl cursor-pointer transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-primary-color bg-primary-color/10 shadow-lg border-4'
                          : 'border-secondary-color hover:border-primary-color hover:bg-light-gray-bg'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-2 w-6 h-6 text-primary-color focus:ring-4 focus:ring-primary-color/30"
                      />
                      <div className="ml-5 flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <i className="fas fa-hand-holding-usd text-green-600 text-2xl"></i>
                          <span className="font-black text-xl text-text-color">เก็บเงินปลายทาง (COD)</span>
                        </div>
                        <p className="text-base text-secondary-color font-semibold">
                          ชำระเงินเมื่อได้รับสินค้า (อาจมีค่าธรรมเนียมเพิ่มเติม)
                        </p>
                      </div>
                    </label>

                    {/* Bank Transfer Details - Industrial Style */}
                    {paymentMethod === 'transfer' && (
                      <div className="mt-6 p-6 bg-primary-color/5 border-3 border-primary-color rounded-xl">
                        <h4 className="font-black text-xl text-primary-color mb-4 flex items-center">
                          <i className="fas fa-university mr-3 text-2xl"></i>
                          บัญชีธนาคาร
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { name: 'กสิกรไทย', logo: 'fa-university', color: 'text-green-600' },
                            { name: 'ไทยพาณิชย์', logo: 'fa-university', color: 'text-purple-600' },
                            { name: 'กรุงเทพ', logo: 'fa-university', color: 'text-blue-600' },
                            { name: 'กรุงไทย', logo: 'fa-university', color: 'text-red-600' }
                          ].map((bank, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl border-2 border-secondary-color shadow-md">
                              <i className={`fas ${bank.logo} ${bank.color} text-xl`}></i>
                              <span className="text-base font-bold text-text-color">{bank.name}</span>
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

                {/* Step 3: Order Review - Industrial Style */}
                {activeStep === 2 && (
                  <Card className="border-3 border-secondary-color shadow-xl">
                    <CardHeader className="bg-light-gray-bg border-b-3 border-secondary-color">
                      <CardTitle className="text-2xl font-black text-text-color flex items-center">
                        <i className="fas fa-clipboard-check text-primary-color mr-3 text-xl"></i>
                        ยืนยันคำสั่งซื้อ
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="bg-primary-color/10 border-3 border-primary-color rounded-xl p-6">
                        <p className="text-base font-bold text-primary-color flex items-center">
                          <i className="fas fa-info-circle mr-3 text-xl"></i>
                          กรุณาตรวจสอบข้อมูลคำสั่งซื้อให้ถูกต้องก่อนยืนยัน
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Navigation Buttons - Industrial Style */}
                <div className="flex justify-between gap-6">
                  {activeStep > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveStep(activeStep - 1)}
                      className="h-14 border-3 border-secondary-color text-text-color font-bold text-base hover:bg-secondary-color hover:text-white transition-all rounded-xl"
                    >
                      <i className="fas fa-arrow-left mr-3 text-lg"></i>
                      ย้อนกลับ
                    </Button>
                  )}
                  {activeStep < 2 ? (
                    <Button
                      type="button"
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="h-14 bg-gradient-to-r from-primary-color via-accent-color to-accent-color hover:from-primary-color/90 hover:via-accent-color/90 hover:to-accent-color/90 text-white font-black text-base shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] border-2 border-accent-color rounded-xl"
                    >
                      ถัดไป
                      <i className="fas fa-arrow-right ml-3 text-lg"></i>
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-16 bg-gradient-to-r from-primary-color via-accent-color to-accent-color hover:from-primary-color/90 hover:via-accent-color/90 hover:to-accent-color/90 text-white font-black text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-[1.02] active:scale-[0.98] border-2 border-accent-color rounded-xl"
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-3 text-xl"></i>
                          กำลังดำเนินการ...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-check mr-3 text-xl"></i>
                          ยืนยันคำสั่งซื้อ
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </div>
            </div>

            {/* Right Column: Order Summary (Sticky) - Industrial Style */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <Card className="shadow-2xl border-4 border-secondary-color">
                  <CardHeader className="bg-gradient-to-r from-primary-color via-accent-color to-accent-color text-white border-b-4 border-secondary-color">
                    <CardTitle className="text-3xl font-black flex items-center">
                      <i className="fas fa-shopping-bag mr-4 text-2xl"></i>
                      สรุปคำสั่งซื้อ
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Order Items - Industrial Style */}
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {items.map((item) => {
                        const itemPrice = item.salePrice ?? item.price;
                        return (
                          <div key={item.productId} className="flex gap-4 pb-4 border-b-2 border-secondary-color last:border-0">
                            {item.imageUrl && (
                              <div className="flex-shrink-0 w-20 h-20 bg-light-gray-bg rounded-xl overflow-hidden border-2 border-secondary-color">
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
                              <h4 className="font-black text-base text-text-color line-clamp-2 mb-2">
                                {item.name}
                              </h4>
                              <div className="flex justify-between items-center text-base">
                                <span className="text-secondary-color font-semibold">x{item.quantity}</span>
                                <span className="font-black text-primary-color">
                                  ฿{formatPrice(itemPrice * item.quantity)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <Separator className="bg-secondary-color" />

                    {/* Summary Totals - Industrial Style */}
                    <div className="space-y-4">
                      <div className="flex justify-between text-text-color">
                        <span className="font-bold text-base">ยอดรวมสินค้า</span>
                        <span className="font-black text-base">฿{formatPrice(total)}</span>
                      </div>
                      <div className="flex justify-between text-secondary-color">
                        <span className="font-semibold text-base">ค่าจัดส่ง</span>
                        <span className="text-green-600 font-black text-base">ฟรี</span>
                      </div>
                    </div>

                    <Separator className="bg-secondary-color" />

                    {/* Grand Total - Industrial Style */}
                    <div className="bg-light-gray-bg border-3 border-secondary-color rounded-xl p-6">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-black text-text-color">ยอดรวมทั้งหมด</span>
                        <span className="text-3xl font-black text-accent-color">
                          ฿{formatPrice(total)}
                        </span>
                      </div>
                    </div>

                    {/* Security Badge - Industrial Style */}
                    <div className="bg-green-50 border-3 border-green-500 rounded-xl p-6 text-center">
                      <i className="fas fa-lock text-green-600 text-3xl mb-3"></i>
                      <p className="text-base font-black text-green-800">
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
