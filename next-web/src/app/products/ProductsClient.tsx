'use client';

import { Product } from '@/types';
import Link from 'next/link';

interface ProductsClientProps {
  products: Product[];
}

export default function ProductsClient({ products }: ProductsClientProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH').format(price);
  };

  if (products.length === 0) {
    return (
      <div className="no-products">
        <div className="no-products-icon">
          <i className="fa-solid fa-box-open"></i>
        </div>
        <h3>ไม่พบสินค้า</h3>
        <p>ไม่มีสินค้าในหมวดหมู่นี้ในขณะนี้</p>
        <Link href="/products" className="btn btn-primary">
          ดูสินค้าทั้งหมด
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="shopee-product-grid">
        {products.map((product) => (
          <div key={product.id} className="shopee-product-card">
            <Link href={`/products/${product.slug}`}>
              <div className="card-image-container">
                <img 
                  src={product.image_url || '/placeholder-product.jpg'} 
                  alt={product.name}
                />
                {product.is_promotion && (
                  <span className="card-sale-badge">SALE</span>
                )}
                {product.is_featured && !product.is_promotion && (
                  <span className="card-badge">แนะนำ</span>
                )}
              </div>
              <div className="card-info-container">
                <h3 className="card-title">{product.name}</h3>
                <div className="card-price">
                  {product.sale_price ? (
                    <>
                      <span className="sale-price">฿{formatPrice(product.sale_price)}</span>
                      <span className="original-price">฿{formatPrice(product.price)}</span>
                    </>
                  ) : (
                    <span className="sale-price">฿{formatPrice(product.price)}</span>
                  )}
                </div>
                {product.rent_price && (
                  <div className="card-rent-price">
                    เช่าเริ่มต้นที่ ฿{formatPrice(product.rent_price)}
                  </div>
                )}
                <div className="card-review-sold">
                  <div className="star-rating">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star-half-stroke"></i>
                  </div>
                  <span className="items-sold">ขายแล้ว {Math.floor(Math.random() * 50) + 5} ชิ้น</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination - static for now */}
      <nav className="pagination">
        <a href="#" className="page-arrow disabled">
          <i className="fa-solid fa-chevron-left"></i>
        </a>
        <a href="#" className="page-number active">1</a>
        <a href="#" className="page-number">2</a>
        <a href="#" className="page-number">3</a>
        <a href="#" className="page-arrow">
          <i className="fa-solid fa-chevron-right"></i>
        </a>
      </nav>
    </>
  );
}
