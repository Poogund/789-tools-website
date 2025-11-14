import { getProductBySlug, getProductImages, getProductsByCategory, getCategories } from '@/lib/catalog-repository';
import { Product, ProductImage, Category } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductDetailClient from './ProductDetailClient';

interface ProductPageProps {
  params: { slug: string };
}

// Generate static params for all products (optional, for static generation)
export async function generateStaticParams() {
  const products = await import('@/lib/catalog-repository').then(mod => 
    mod.getProducts()
  );
  
  return products.map((product: Product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  
  if (!product) {
    return {
      title: 'สินค้าไม่พบ - 789 TOOLS',
    };
  }

  return {
    title: `${product.name} - 789 TOOLS`,
    description: product.description || `ซื้อ ${product.name} ที่ 789 TOOLS ศูนย์รวมเครื่องมือก่อสร้างคุณภาพสูง`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Fetch product data
  const product = await getProductBySlug(params.slug);
  
  // Handle not found
  if (!product) {
    notFound();
  }

  // Fetch product images
  const productImages: ProductImage[] = await getProductImages(product.id);
  
  // Fetch related products (same category, excluding current product)
  let relatedProducts: Product[] = [];
  if (product.category_id) {
    const categoryProducts = await getProductsByCategory(product.category_id);
    relatedProducts = categoryProducts.filter(p => p.id !== product.id).slice(0, 4);
  }

  // Fetch category for breadcrumbs
  let category: Category | null = null;
  if (product.category_id) {
    const categories = await getCategories();
    category = categories.find(c => c.id === product.category_id) || null;
  }

  return (
    <main className="product-detail-page">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs">
          <Link href="/">หน้าแรก</Link>
          <i className="fa-solid fa-chevron-right"></i>
          <Link href="/products">สินค้าทั้งหมด</Link>
          {category && (
            <>
              <i className="fa-solid fa-chevron-right"></i>
              <Link href={`/products?category=${category.slug}`}>{category.name}</Link>
            </>
          )}
          <i className="fa-solid fa-chevron-right"></i>
          <span>{product.name}</span>
        </nav>

        {/* Main product detail container */}
        <div className="product-detail-container">
          {/* Product Gallery */}
          <section className="product-gallery">
            <ProductDetailClient 
              product={product} 
              images={productImages}
            />
          </section>

          {/* Product Info */}
          <section className="product-info">
            <h1 className="product-title">{product.name}</h1>

            {/* Rating */}
            <div className="product-meta-links">
              <div className="product-rating">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star-half-stroke"></i>
              </div>
              <span className="product-rating-value">(4.5)</span>
              <a href="#reviews" className="reviews-link">12 รีวิว</a>
            </div>

            <hr />

            {/* Price */}
            <div className="product-price">
              {product.sale_price ? (
                <>
                  <span className="price-sale">฿{new Intl.NumberFormat('th-TH').format(product.sale_price)}</span>
                  <div className="price-original-wrapper">
                    <span className="price-original">฿{new Intl.NumberFormat('th-TH').format(product.price)}</span>
                    <span className="sale-tag">
                      -{Math.round(((product.price - product.sale_price) / product.price) * 100)}%
                    </span>
                  </div>
                </>
              ) : (
                <span className="price-sale">฿{new Intl.NumberFormat('th-TH').format(product.price)}</span>
              )}
            </div>

            {/* Rent Price */}
            {product.rent_price && (
              <div className="product-rent-price">
                <span className="rent-label">เช่าเริ่มต้นที่:</span>
                <span className="rent-price">฿{new Intl.NumberFormat('th-TH').format(product.rent_price)}/วัน</span>
              </div>
            )}

            {/* Status */}
            <div className="product-status">
              <span className="status-label">สถานะ:</span>
              <span className="status-value">
                {product.is_active ? 'มีสินค้า' : 'สินค้าหมด'}
              </span>
            </div>

            {/* Product Features */}
            {product.features && product.features.length > 0 && (
              <div className="product-features-box">
                <h3>คุณสมบัติเด่น:</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Product Actions */}
            <div className="product-actions">
              {/* Quantity Selector */}
              <div className="quantity-wrapper">
                <label htmlFor="quantity-input" className="quantity-label">จำนวน:</label>
                <div className="quantity-selector">
                  <button className="btn-quantity" onClick={() => {}}>
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <input 
                    id="quantity-input" 
                    type="text" 
                    value="1" 
                    readOnly 
                    className="quantity-input"
                  />
                  <button className="btn-quantity" onClick={() => {}}>
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons-group">
                <button className="btn btn-primary btn-add-to-cart">
                  <i className="fa-solid fa-cart-shopping"></i>
                  เพิ่มลงรถเข็น
                </button>
                <button className="btn btn-wishlist">
                  <i className="fa-regular fa-heart"></i>
                </button>
              </div>
            </div>

            <hr />

            {/* Assurances */}
            <div className="product-assurances">
              <div className="assurance-item">
                <i className="fa-solid fa-shield-halved"></i>
                <span><b>รับประกัน:</b> 1 ปี (ตามเงื่อนไข)</span>
              </div>
              <div className="assurance-item">
                <i className="fa-solid fa-truck-fast"></i>
                <span><b>จัดส่ง:</b> ส่งด่วนฟรี ทั่วประเทศ</span>
              </div>
              <div className="assurance-item">
                <i className="fa-solid fa-credit-card"></i>
                <span><b>การชำระเงิน:</b> เก็บเงินปลายทาง, บัตรเครดิต</span>
              </div>
            </div>
          </section>
        </div>

        {/* Product Tabs */}
        <section className="product-tabs-section">
          <nav className="tabs-nav">
            <button data-tab="description" className="tab-button active">
              รายละเอียดสินค้า
            </button>
            <button data-tab="specs" className="tab-button">
              คุณสมบัติ (Specifications)
            </button>
            <button data-tab="reviews" className="tab-button">
              รีวิว (12)
            </button>
          </nav>

          <div className="tab-content-wrapper">
            {/* Description Tab */}
            <div id="tab-description" className="tab-panel active">
              <div className="product-description">
                {product.description ? (
                  <div dangerouslySetInnerHTML={{ __html: product.description }} />
                ) : (
                  <p>ไม่มีรายละเอียดสินค้าในขณะนี้</p>
                )}
              </div>
            </div>

            {/* Specifications Tab */}
            <div id="tab-specs" className="tab-panel">
              <h3>ข้อมูลทางเทคนิค</h3>
              <table className="specs-table">
                <tbody>
                  {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key}>
                      <td className="spec-label">{key}</td>
                      <td className="spec-value">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h3 style={{ marginTop: '24px' }}>สิ่งที่อยู่ในกล่อง</h3>
              <ul style={{ listStyle: 'disc', listStylePosition: 'inside', marginLeft: '20px' }}>
                {product.included_items && product.included_items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Reviews Tab */}
            <div id="tab-reviews" className="tab-panel">
              <h3>รีวิวจากลูกค้า</h3>
              <div className="reviews-list">
                <p>กำลังโหลดรีวิว...</p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-products-section">
            <h2>สินค้าที่เกี่ยวข้อง</h2>
            <div className="shopee-product-grid">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="shopee-product-card">
                  <Link href={`/products/${relatedProduct.slug}`}>
                    <div className="card-image-container">
                      <img 
                        src={relatedProduct.image_url || '/placeholder-product.jpg'} 
                        alt={relatedProduct.name}
                      />
                      {relatedProduct.is_promotion && (
                        <span className="card-sale-badge">SALE</span>
                      )}
                      {relatedProduct.is_featured && !relatedProduct.is_promotion && (
                        <span className="card-badge">แนะนำ</span>
                      )}
                    </div>
                    <div className="card-info-container">
                      <h3 className="card-title">{relatedProduct.name}</h3>
                      <div className="card-price">
                        {relatedProduct.sale_price ? (
                          <>
                            <span className="sale-price">
                              ฿{new Intl.NumberFormat('th-TH').format(relatedProduct.sale_price)}
                            </span>
                            <span className="original-price">
                              ฿{new Intl.NumberFormat('th-TH').format(relatedProduct.price)}
                            </span>
                          </>
                        ) : (
                          <span className="sale-price">
                            ฿{new Intl.NumberFormat('th-TH').format(relatedProduct.price)}
                          </span>
                        )}
                      </div>
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
          </section>
        )}
      </div>
    </main>
  );
}
