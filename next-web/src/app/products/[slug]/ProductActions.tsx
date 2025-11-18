'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { useCartStore } from '@/features/cart';
import { useToast } from '@/hooks/use-toast';

interface ProductActionsProps {
  productId: string;
  productName: string;
  price: number;
  salePrice?: number;
  imageUrl?: string;
}

export default function ProductActions({ productId, productName, price, salePrice, imageUrl }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    try {
      setIsAdding(true);
      
      // Add item to cart
      addItem({
        productId,
        name: productName,
        price,
        salePrice,
        quantity,
        imageUrl: imageUrl || '',
      });

      // Show success message
      const finalPrice = salePrice || price;
      toast({
        title: "เพิ่มสินค้าลงรถเข็น",
        description: `${productName} (${quantity} ชิ้น) - ฿${(finalPrice * quantity).toLocaleString('th-TH')}`,
        variant: "success",
      });
      
      // Reset quantity
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถเพิ่มสินค้าลงรถเข็นได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      {/* Contact Buttons */}
      <div className="contact-buttons-group">
        <a 
          href={siteConfig.links.line}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-line flex-1"
        >
          <i className="fa-brands fa-line"></i>
          แอดเฟรน
        </a>
        <a 
          href={siteConfig.links.tel}
          className="btn btn-danger flex-1"
        >
          <i className="fa-solid fa-phone"></i>
          โทรสั่งซื้อ
        </a>
      </div>

      {/* Quantity Selector */}
      <div className="quantity-wrapper">
        <label htmlFor="quantity-input" className="quantity-label">จำนวน:</label>
        <div className="quantity-selector">
          <button 
            className="btn-quantity" 
            onClick={() => handleQuantityChange(-1)}
            type="button"
            aria-label="ลดจำนวน"
          >
            <i className="fa-solid fa-minus"></i>
          </button>
          <input 
            id="quantity-input" 
            type="text" 
            value={quantity} 
            readOnly 
            className="quantity-input"
            aria-label="จำนวนสินค้า"
          />
          <button 
            className="btn-quantity" 
            onClick={() => handleQuantityChange(1)}
            type="button"
            aria-label="เพิ่มจำนวน"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons-group">
        <button 
          className="btn btn-primary btn-add-to-cart"
          onClick={handleAddToCart}
          disabled={isAdding}
          type="button"
        >
          <i className={`fa-solid ${isAdding ? 'fa-spinner fa-spin' : 'fa-cart-shopping'}`}></i>
          {isAdding ? 'กำลังเพิ่ม...' : 'เพิ่มลงรถเข็น'}
        </button>
      </div>
    </>
  );
}

