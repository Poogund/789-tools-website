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
      {/* Breadcrumbs */}
      <Section className="bg-white border-b border-gray-200 py-4">
        <Container>
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-primary-color hover:text-accent-color transition-colors font-medium">
              <i className="fas fa-home mr-1"></i>
              หน้าแรก
            </Link>
            <i className="fa-solid fa-chevron-right text-gray-400 text-xs"></i>
            <span className="text-gray-900 font-semibold">ตะกร้าสินค้า</span>
          </nav>
        </Container>
      </Section>

      {/* Cart Content */}
      <Section className="py-8 md:py-12">
        <Container>
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              <i className="fas fa-shopping-cart text-primary-color mr-3"></i>
              ตะกร้าสินค้า
            </h1>
            <p className="text-gray-600">
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
                    <Card key={item.productId} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          {/* Product Image */}
                          {item.imageUrl && (
                            <div className="flex-shrink-0">
                              <div className="w-full md:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
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

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex-1 pr-4">
                                <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">
                                  {item.name}
                                </h3>
                                {item.salePrice && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <span className="text-gray-500 line-through">
                                      ฿{formatPrice(item.price)}
                                    </span>
                                    <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                                      ลด {Math.round(((item.price - item.salePrice) / item.price) * 100)}%
                                    </span>
                                  </div>
                                )}
                              </div>
                              
                              {/* Remove Button */}
                              <button
                                onClick={() => removeItem(item.productId)}
                                className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                aria-label="ลบสินค้า"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>

                            {/* Price and Quantity Row */}
                            <div className="flex flex-wrap items-center justify-between gap-4">
                              {/* Price */}
                              <div>
                                <div className="text-2xl font-bold text-primary-color">
                                  ฿{formatPrice(itemPrice)}
                                </div>
                                <div className="text-sm text-gray-500">ราคาต่อชิ้น</div>
                              </div>

                              {/* Quantity Selector */}
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600 font-medium">จำนวน:</span>
                                <div className="inline-flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                                  <button
                                    onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                    className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-100 transition-colors text-gray-700 font-bold"
                                    aria-label="ลดจำนวน"
                                  >
                                    <i className="fas fa-minus text-sm"></i>
                                  </button>
                                  <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => {
                                      const newQuantity = parseInt(e.target.value) || 1;
                                      handleQuantityChange(item.productId, newQuantity);
                                    }}
                                    className="w-16 h-10 text-center border-0 border-x-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color font-bold text-gray-900"
                                  />
                                  <button
                                    onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                    className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-100 transition-colors text-gray-700 font-bold"
                                    aria-label="เพิ่มจำนวน"
                                  >
                                    <i className="fas fa-plus text-sm"></i>
                                  </button>
                                </div>
                              </div>

                              {/* Item Total */}
                              <div className="text-right">
                                <div className="text-2xl font-bold text-accent-color">
                                  ฿{formatPrice(itemTotal)}
                                </div>
                                <div className="text-sm text-gray-500">รวม</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

                {/* Continue Shopping Button (Mobile) */}
                <div className="lg:hidden">
                  <Link href="/products">
                    <Button variant="outline" className="w-full h-12 border-2">
                      <i className="fas fa-arrow-left mr-2"></i>
                      เลือกซื้อสินค้าเพิ่มเติม
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column: Order Summary (Sticky) */}
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <Card className="shadow-xl border-2">
                    <CardHeader className="bg-gradient-to-r from-primary-color to-accent-color text-white">
                      <CardTitle className="text-2xl flex items-center">
                        <i className="fas fa-receipt mr-3"></i>
                        สรุปยอด
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      {/* Savings Badge */}
                      {calculateSavings() > 0 && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-green-700 font-medium flex items-center">
                              <i className="fas fa-tag mr-2"></i>
                              ประหยัดทั้งหมด
                            </span>
                            <span className="text-green-700 font-bold text-lg">
                              -฿{formatPrice(calculateSavings())}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Summary Details */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-gray-700">
                          <span className="font-medium">ยอดรวมสินค้า</span>
                          <span className="font-semibold">฿{formatPrice(calculateSubtotal())}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <span>ส่วนลด</span>
                          <span className="text-green-600 font-medium">
                            -฿{formatPrice(calculateSavings())}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <span>ภาษีมูลค่าเพิ่ม (VAT 7%)</span>
                          <span className="font-medium">
                            ฿{formatPrice(calculateVAT(calculateSubtotal() - calculateSavings()))}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-600">
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
                            ฿{formatPrice(
                              Math.round(
                                (calculateSubtotal() - calculateSavings()) + 
                                calculateVAT(calculateSubtotal() - calculateSavings())
                              )
                            )}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-1">
                          รวมภาษีมูลค่าเพิ่ม 7%
                        </p>
                      </div>

                      {/* Checkout Button */}
                      <Button
                        onClick={handleCheckout}
                        className="w-full h-14 bg-gradient-to-r from-primary-color to-accent-color hover:from-primary-color/90 hover:to-accent-color/90 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                      >
                        <i className="fas fa-credit-card mr-2"></i>
                        ดำเนินการชำระเงิน
                      </Button>

                      {/* Continue Shopping (Desktop) */}
                      <div className="hidden lg:block">
                        <Link href="/products">
                          <Button variant="outline" className="w-full h-12 border-2">
                            <i className="fas fa-arrow-left mr-2"></i>
                            เลือกซื้อสินค้าเพิ่มเติม
                          </Button>
                        </Link>
                      </div>

                      {/* Trust Badges */}
                      <div className="pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-600">
                          <div>
                            <i className="fas fa-shield-alt text-green-600 text-lg mb-1"></i>
                            <div>ชำระเงินปลอดภัย</div>
                          </div>
                          <div>
                            <i className="fas fa-truck text-blue-600 text-lg mb-1"></i>
                            <div>จัดส่งฟรี</div>
                          </div>
                          <div>
                            <i className="fas fa-undo text-orange-600 text-lg mb-1"></i>
                            <div>คืนสินค้าได้</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            /* Empty State */
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-gray-100 rounded-full mb-6">
                  <i className="fas fa-shopping-cart text-gray-400 text-5xl"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">ตะกร้าของคุณว่างเปล่า</h2>
                <p className="text-gray-600 mb-8 text-lg">เริ่มเลือกซื้อสินค้าคุณภาพจาก 789 TOOLS กันเลย</p>
                <Link href="/products">
                  <Button className="h-14 px-8 bg-gradient-to-r from-primary-color to-accent-color hover:from-primary-color/90 hover:to-accent-color/90 text-white font-bold text-lg">
                    <i className="fas fa-store mr-2"></i>
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
