'use client';

import { useState } from 'react';
import { siteConfig } from '@/config/site';

interface ProductActionsProps {
  productId: string;
  productName: string;
  price: number;
  salePrice?: number;
}

export default function ProductActions({ productId, productName, price, salePrice }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality with cart context/store
    const finalPrice = salePrice || price;
    alert(`เพิ่ม ${productName} จำนวน ${quantity} ชิ้น ราคารวม ฿${(finalPrice * quantity).toLocaleString('th-TH')} ลงรถเข็น`);
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
          type="button"
        >
          <i className="fa-solid fa-cart-shopping"></i>
          เพิ่มลงรถเข็น
        </button>
      </div>
    </>
  );
}

