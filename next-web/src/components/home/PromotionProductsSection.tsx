import Link from 'next/link';
import { Product } from '@/types';

interface PromotionProductsSectionProps {
  products: Product[];
}

export default function PromotionProductsSection({ products }: PromotionProductsSectionProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH').format(price);
  };

  return (
    <section className="promotion-products-section">
      <div className="container">
        <div className="section-header">
          <div className="section-title">
            <h2>สินค้าโปรโมชั่น</h2>
            <p>สินค้าราคาพิเศษ</p>
          </div>
          <Link href="/promotions" className="btn btn-primary">
            ดูสินค้าโปรเพิ่มเติม <i className="fa-solid fa-tag"></i>
          </Link>
        </div>
        <div className="product-grid-fixed">
          {products.length > 0 ? (
            products.slice(0, 8).map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`} className="product-card">
                <div className="product-image">
                  <img 
                    src={product.image_url || '/placeholder-product.jpg'} 
                    alt={product.name}
                  />
                  <span className="product-badge promotion">โปร</span>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="product-price">
                    {product.original_price ? (
                      <>
                        <span className="sale-price">฿{formatPrice(product.price)}</span>
                        <span className="original-price">฿{formatPrice(product.original_price)}</span>
                      </>
                    ) : (
                      <span className="current-price">฿{formatPrice(product.price)}</span>
                    )}
                  </div>
                  {product.rent_price && (
                    <div className="rent-price">เช่าเริ่มต้นที่ ฿{formatPrice(product.rent_price)}</div>
                  )}
                </div>
              </Link>
            ))
          ) : (
            // Fallback promotion products if no data
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="product-card">
                  <div className="product-image">
                    <div className="product-placeholder">
                      <i className="fa-solid fa-tag"></i>
                    </div>
                    <span className="product-badge promotion">โปร</span>
                  </div>
                  <div className="product-info">
                    <h3>สินค้าโปรโมชั่น #{i}</h3>
                    <div className="product-price">
                      <span className="sale-price">฿{(40000 * i).toLocaleString('th-TH')}</span>
                      <span className="original-price">฿{(50000 * i).toLocaleString('th-TH')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
