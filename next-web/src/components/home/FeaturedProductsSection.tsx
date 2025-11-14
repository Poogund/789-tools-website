import Link from 'next/link';
import { Product } from '@/types';

interface FeaturedProductsSectionProps {
  products: Product[];
}

export default function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH').format(price);
  };

  return (
    <section className="featured-products-section">
      <div className="container">
        <div className="section-header">
          <div className="section-title">
            <h2>สินค้าแนะนำ</h2>
            <p>เลือกซื้อสินค้าแนะนำ</p>
          </div>
          <Link href="/products" className="btn btn-primary">
            ดูสินค้าเพิ่มเติม <i className="fa-solid fa-play"></i>
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
                  {product.is_featured && (
                    <span className="product-badge featured">แนะนำ</span>
                  )}
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="product-price">
                    {product.sale_price ? (
                      <>
                        <span className="sale-price">฿{formatPrice(product.sale_price)}</span>
                        <span className="original-price">฿{formatPrice(product.price)}</span>
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
            // Fallback featured products if no data
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="product-card">
                  <div className="product-image">
                    <div className="product-placeholder">
                      <i className="fa-solid fa-tools"></i>
                    </div>
                    <span className="product-badge featured">แนะนำ</span>
                  </div>
                  <div className="product-info">
                    <h3>สินค้าแนะนำ #{i}</h3>
                    <div className="product-price">
                      <span className="current-price">฿{(50000 * i).toLocaleString('th-TH')}</span>
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
