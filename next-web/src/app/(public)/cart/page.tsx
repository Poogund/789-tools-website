'use client';

import { useCartStore } from '@/features/cart';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MainLayout, Container, Section, Grid } from '@/components/layout/MainLayout';
import { useToast } from '@/hooks/use-toast';

export default function CartPage() {
  const { items, total, removeItem, updateQuantity } = useCartStore();
  const router = useRouter();
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH').format(price);
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => {
      const price = item.salePrice || item.price;
      return sum + (price * item.quantity);
    }, 0);
  };

  const calculateSavings = () => {
    return items.reduce((sum, item) => {
      if (item.salePrice && item.salePrice < item.price) {
        return sum + ((item.price - item.salePrice) * item.quantity);
      }
      return sum;
    }, 0);
  };

  const calculateVAT = (amount: number) => {
    return amount * 0.07; // 7% VAT
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(productId);
      toast({
        title: "ลบสินค้า",
        description: "ลบสินค้าออกจากตะกร้าแล้ว",
        variant: "default",
      });
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "ตะกร้าว่าง",
        description: "กรุณาเพิ่มสินค้าในตะกร้าก่อนชำระเงิน",
        variant: "destructive",
      });
      return;
    }
    router.push('/checkout');
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
            <span className="text-text-color font-black text-lg">ตะกร้าสินค้า</span>
          </nav>
        </Container>
      </Section>

      {/* Cart Content - Industrial Style */}
      <Section className="py-12 md:py-16">
        <Container>
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-text-color mb-4 flex items-center">
              <i className="fas fa-shopping-cart text-primary-color mr-4 text-3xl md:text-4xl"></i>
              ตะกร้าสินค้า
            </h1>
            <p className="text-lg text-secondary-color font-semibold">
              {items.length > 0 ? `คุณมีสินค้า ${items.length} รายการในตะกร้า` : 'ตะกร้าของคุณว่างเปล่า'}
            </p>
          </div>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Left Column: Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => {
                  const itemPrice = item.salePrice ?? item.price;
                  const itemTotal = itemPrice * item.quantity;

                  return (
                    <Card key={item.productId} className="overflow-hidden hover:shadow-2xl transition-all border-3 border-secondary-color">
                      <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Product Image - Industrial Style */}
                          {item.imageUrl && (
                            <div className="flex-shrink-0">
                              <div className="w-full md:w-36 h-36 bg-light-gray-bg rounded-xl overflow-hidden border-2 border-secondary-color">
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://placehold.co/200x200/eee/999?text=สินค้า';
                                  }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Product Details - Industrial Style */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex-1 pr-4">
                                <h3 className="font-black text-xl text-text-color mb-2 line-clamp-2">
                                  {item.name}
                                </h3>
                                {item.salePrice && (
                                  <div className="flex items-center gap-3 text-base">
                                    <span className="text-secondary-color line-through font-semibold">
                                      ฿{formatPrice(item.price)}
                                    </span>
                                    <span className="bg-danger-color text-white px-3 py-1 rounded-full text-sm font-black border-2 border-danger-color">
                                      ลด {Math.round(((item.price - item.salePrice) / item.price) * 100)}%
                                    </span>
                                  </div>
                                )}
                              </div>
                              
                              {/* Remove Button - Industrial Style */}
                              <button
                                onClick={() => removeItem(item.productId)}
                                className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-secondary-color hover:text-danger-color hover:bg-danger-color/10 rounded-xl transition-all border-2 border-secondary-color hover:border-danger-color"
                                aria-label="ลบสินค้า"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>

                            {/* Price and Quantity Row */}
                            <div className="flex flex-wrap items-center justify-between gap-4">
                              {/* Price - Industrial Style */}
                              <div>
                                <div className="text-2xl font-black text-primary-color">
                                  ฿{formatPrice(itemPrice)}
                                </div>
                                <div className="text-sm text-secondary-color font-semibold">ราคาต่อชิ้น</div>
                              </div>

                              {/* Quantity Selector - Industrial Style */}
                              <div className="flex items-center gap-4">
                                <span className="text-base text-text-color font-bold">จำนวน:</span>
                                <div className="inline-flex items-center border-3 border-secondary-color rounded-xl overflow-hidden shadow-md">
                                  <button
                                    onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                    className="w-12 h-12 flex items-center justify-center bg-white hover:bg-primary-color hover:text-white transition-all text-text-color font-bold text-lg"
                                    aria-label="ลดจำนวน"
                                  >
                                    <i className="fas fa-minus"></i>
                                  </button>
                                  <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => {
                                      const newQuantity = parseInt(e.target.value) || 1;
                                      handleQuantityChange(item.productId, newQuantity);
                                    }}
                                    className="w-20 h-12 text-center border-0 border-x-3 border-secondary-color focus:outline-none focus:ring-4 focus:ring-primary-color font-black text-text-color text-lg"
                                  />
                                  <button
                                    onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                    className="w-12 h-12 flex items-center justify-center bg-white hover:bg-primary-color hover:text-white transition-all text-text-color font-bold text-lg"
                                    aria-label="เพิ่มจำนวน"
                                  >
                                    <i className="fas fa-plus"></i>
                                  </button>
                                </div>
                              </div>

                              {/* Item Total - Industrial Style */}
                              <div className="text-right">
                                <div className="text-2xl font-black text-accent-color">
                                  ฿{formatPrice(itemTotal)}
                                </div>
                                <div className="text-sm text-secondary-color font-semibold">รวม</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

                {/* Continue Shopping Button (Mobile) - Industrial Style */}
                <div className="lg:hidden">
                  <Link href="/products">
                    <Button variant="outline" className="w-full h-14 border-3 border-secondary-color text-text-color font-bold text-base hover:bg-secondary-color hover:text-white transition-all rounded-xl">
                      <i className="fas fa-arrow-left mr-3 text-lg"></i>
                      เลือกซื้อสินค้าเพิ่มเติม
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column: Order Summary (Sticky) - Industrial Style */}
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <Card className="shadow-2xl border-4 border-secondary-color">
                    <CardHeader className="bg-gradient-to-r from-primary-color via-accent-color to-accent-color text-white border-b-4 border-secondary-color">
                      <CardTitle className="text-3xl font-black flex items-center">
                        <i className="fas fa-receipt mr-4 text-2xl"></i>
                        สรุปยอด
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      {/* Savings Badge - Industrial Style */}
                      {calculateSavings() > 0 && (
                        <div className="bg-green-50 border-3 border-green-500 rounded-xl p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-green-700 font-black text-base flex items-center">
                              <i className="fas fa-tag mr-3 text-lg"></i>
                              ประหยัดทั้งหมด
                            </span>
                            <span className="text-green-700 font-black text-xl">
                              -฿{formatPrice(calculateSavings())}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Summary Details - Industrial Style */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-text-color">
                          <span className="font-bold text-base">ยอดรวมสินค้า</span>
                          <span className="font-black text-base">฿{formatPrice(calculateSubtotal())}</span>
                        </div>
                        <div className="flex justify-between items-center text-base text-secondary-color">
                          <span className="font-semibold">ส่วนลด</span>
                          <span className="text-green-600 font-black">
                            -฿{formatPrice(calculateSavings())}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-base text-secondary-color">
                          <span className="font-semibold">ภาษีมูลค่าเพิ่ม (VAT 7%)</span>
                          <span className="font-black">
                            ฿{formatPrice(calculateVAT(calculateSubtotal() - calculateSavings()))}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-base text-secondary-color">
                          <span className="font-semibold">ค่าจัดส่ง</span>
                          <span className="text-green-600 font-black">ฟรี</span>
                        </div>
                      </div>

                      <Separator className="bg-gray-200" />

                      {/* Grand Total - Industrial Style */}
                      <div className="pt-6 border-t-4 border-secondary-color">
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-black text-text-color">ยอดรวมทั้งหมด</span>
                          <span className="text-3xl font-black text-accent-color">
                            ฿{formatPrice(
                              Math.round(
                                (calculateSubtotal() - calculateSavings()) + 
                                calculateVAT(calculateSubtotal() - calculateSavings())
                              )
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Checkout Button - Industrial Strength */}
                      <Button
                        onClick={handleCheckout}
                        className="w-full h-16 bg-gradient-to-r from-primary-color via-accent-color to-accent-color hover:from-primary-color/90 hover:via-accent-color/90 hover:to-accent-color/90 text-white font-black text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-[1.02] active:scale-[0.98] border-2 border-accent-color rounded-xl"
                      >
                        <i className="fas fa-credit-card mr-3 text-2xl"></i>
                        ดำเนินการชำระเงิน
                      </Button>

                      {/* Continue Shopping (Desktop) - Industrial Style */}
                      <div className="hidden lg:block">
                        <Link href="/products">
                          <Button variant="outline" className="w-full h-14 border-3 border-secondary-color text-text-color font-bold text-base hover:bg-secondary-color hover:text-white transition-all rounded-xl">
                            <i className="fas fa-arrow-left mr-3 text-lg"></i>
                            เลือกซื้อสินค้าเพิ่มเติม
                          </Button>
                        </Link>
                      </div>

                      {/* Trust Badges - Industrial Style */}
                      <div className="flex items-center justify-center space-x-8 text-sm text-secondary-color">
                        <div className="flex items-center font-semibold">
                          <i className="fas fa-shield-alt mr-2 text-green-600 text-lg"></i>
                          <span>ปลอดภัย</span>
                        </div>
                        <div className="flex items-center font-semibold">
                          <i className="fas fa-truck mr-2 text-primary-color text-lg"></i>
                          <span>จัดส่งฟรี</span>
                        </div>
                        <div className="flex items-center font-semibold">
                          <i className="fas fa-undo mr-2 text-accent-color text-lg"></i>
                          <span>คืนสินค้า</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            /* Empty State - Industrial Style */
            <Card className="max-w-2xl mx-auto border-4 border-secondary-color shadow-2xl">
              <CardContent className="p-16 text-center">
                <div className="inline-flex items-center justify-center w-40 h-40 bg-light-gray-bg rounded-full mb-8 border-4 border-secondary-color">
                  <i className="fas fa-shopping-cart text-secondary-color text-6xl"></i>
                </div>
                <h2 className="text-4xl font-black text-text-color mb-6">ตะกร้าของคุณว่างเปล่า</h2>
                <p className="text-lg text-secondary-color font-semibold mb-10">เริ่มเลือกซื้อสินค้าคุณภาพจาก 789 TOOLS กันเลย</p>
                <Link href="/products">
                  <Button className="h-16 px-10 bg-gradient-to-r from-primary-color via-accent-color to-accent-color hover:from-primary-color/90 hover:via-accent-color/90 hover:to-accent-color/90 text-white font-black text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-[1.02] active:scale-[0.98] border-2 border-accent-color rounded-xl">
                    <i className="fas fa-store mr-3 text-2xl"></i>
                    เลือกซื้อสินค้า
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </Container>
      </Section>
    </MainLayout>
  );
}
