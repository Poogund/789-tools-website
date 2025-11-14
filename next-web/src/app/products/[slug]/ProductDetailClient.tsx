'use client';

import { useState, useEffect } from 'react';
import { Product, ProductImage } from '@/types';

interface ProductDetailClientProps {
  product: Product;
  images: ProductImage[];
}

export default function ProductDetailClient({ product, images }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Use product image_url as main image if no gallery images
  const allImages = images.length > 0 ? images : [{ 
    id: 'main', 
    product_id: product.id, 
    image_url: product.image_url || '/placeholder-product.jpg', 
    sort_order: 0 
  }];

  const handleImageSelect = (index: number) => {
    setSelectedImage(index);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  // Tab functionality
  useEffect(() => {
    const handleTabClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('tab-button')) {
        const tabName = target.getAttribute('data-tab');
        if (tabName) {
          // Remove active class from all tabs and panels
          document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
          });
          document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.remove('active');
          });
          
          // Add active class to clicked tab and corresponding panel
          target.classList.add('active');
          const panel = document.getElementById(`tab-${tabName}`);
          if (panel) {
            panel.classList.add('active');
          }
        }
      }
    };

    document.addEventListener('click', handleTabClick);
    return () => document.removeEventListener('click', handleTabClick);
  }, []);

  return (
    <>
      {/* Product Gallery */}
      <div className="product-gallery">
        {/* Main Image */}
        <div className="main-image-wrapper">
          <img
            src={allImages[selectedImage].image_url}
            alt={product.name}
            className="main-image"
          />
        </div>

        {/* Thumbnail List */}
        <div className="thumbnail-list">
          {allImages.map((image, index) => (
            <button
              key={image.id}
              className={`thumbnail-item ${selectedImage === index ? 'active' : ''}`}
              onClick={() => handleImageSelect(index)}
            >
              <img
                src={image.image_url}
                alt={`${product.name} - รูปที่ ${index + 1}`}
                className="thumbnail-image"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Actions with Quantity */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Update quantity input value
          const quantityInput = document.getElementById('quantity-input');
          if (quantityInput) {
            quantityInput.value = '${quantity}';
          }
        `
      }} />
    </>
  );
}
