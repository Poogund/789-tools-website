import { getProductBySlug, getProductImages, getProductsByCategory, getCategories, getReviews } from '@/lib/catalog-repository';
import { Product, ProductImage, Category, Review } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductDetailClient from './ProductDetailClient';
import ProductActions from './ProductActions';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all products (optional, for static generation)
export async function generateStaticParams() {
  try {
    const products = await import('@/lib/catalog-repository').then(mod => 
      mod.getProducts()
    );
    
    // Filter out products without slugs
    return products
      .filter((product: Product) => product.slug)
      .map((product: Product) => ({
        slug: product.slug,
      }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    // Await params since it's a Promise in Next.js 15+
    const { slug } = await params;
    
    // Ensure slug exists
    if (!slug) {
      return {
        title: 'สินค้าไม่พบ - 789 TOOLS',
        description: 'ไม่พบสินค้าที่คุณกำลังมองหา',
      };
    }

    const product = await getProductBySlug(slug);
    
    if (!product) {
      return {
        title: 'สินค้าไม่พบ - 789 TOOLS',
        description: 'ไม่พบสินค้าที่คุณกำลังมองหา',
      };
    }

    return {
      title: `${product.name} - 789 TOOLS`,
      description: product.description || `ซื้อ ${product.name} ที่ 789 TOOLS ศูนย์รวมเครื่องมือก่อสร้างคุณภาพสูง`,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'สินค้าไม่พบ - 789 TOOLS',
      description: 'เกิดข้อผิดพลาดในการโหลดข้อมูลสินค้า',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await params since it's a Promise in Next.js 15+
  const { slug } = await params;
  
  console.log('[ProductPage] Received slug:', slug);
  
  // Ensure slug exists
  if (!slug) {
    console.error('[ProductPage] No slug provided');
    notFound();
  }

  console.log('[ProductPage] Fetching product for slug:', slug);

  // Fetch product data
  const product = await getProductBySlug(slug);
  
  // Handle not found - log for debugging
  if (!product) {
    console.error(`[ProductPage] Product not found for slug: ${slug}`);
    notFound();
  }

  console.log('[ProductPage] Product found:', product.name);

  // Fetch product images
  const productImages: ProductImage[] = await getProductImages(product.id);
  
  // Fetch category for breadcrumbs and related products
  let category: Category | null = null;
  if (product.category_id) {
    const categories = await getCategories();
    category = categories.find(c => c.id === product.category_id) || null;
  }
  
  // Fetch related products (same category, excluding current product)
  let relatedProducts: Product[] = [];
  if (category && category.slug) {
    const categoryProducts = await getProductsByCategory(category.slug);
    relatedProducts = categoryProducts.filter(p => p.id !== product.id).slice(0, 4);
  }
  
  // If we don't have enough related products, fetch more from all products
  if (relatedProducts.length < 4) {
    const { getProducts } = await import('@/lib/catalog-repository');
    const allProducts = await getProducts();
    const additionalProducts = allProducts
      .filter((p: Product) => p.id !== product.id && !relatedProducts.some((rp: Product) => rp.id === p.id))
      .slice(0, 4 - relatedProducts.length);
    relatedProducts = [...relatedProducts, ...additionalProducts];
  }
  
  // Ensure we have exactly 4 products (or as many as available)
  relatedProducts = relatedProducts.slice(0, 4);

  // Fetch reviews for this product (using all reviews for now, can filter by product_id later)
  const allReviews: Review[] = await getReviews();
  const productReviews = allReviews.slice(0, 10); // Show first 10 reviews
  const reviewCount = productReviews.length;
  const averageRating = reviewCount > 0 
    ? (productReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviewCount).toFixed(1)
    : '4.5'; // Default rating if no reviews

  return (
    <div className="product-detail-page">
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
          <ProductDetailClient 
            product={product} 
            images={productImages}
          />

          {/* Product Info */}
          <section className="product-info">
            <h1 className="product-title">{product.name}</h1>

            {/* Rating */}
            <div className="product-meta-links">
              <div className="product-rating">
                {Array.from({ length: 5 }).map((_, i) => {
                  const ratingNum = parseFloat(averageRating);
                  const fullStars = Math.floor(ratingNum);
                  const hasHalfStar = ratingNum % 1 >= 0.5;
                  
                  if (i < fullStars) {
                    return <i key={i} className="fa-solid fa-star"></i>;
                  } else if (i === fullStars && hasHalfStar) {
                    return <i key={i} className="fa-solid fa-star-half-stroke"></i>;
                  } else {
                    return <i key={i} className="fa-regular fa-star"></i>;
                  }
                })}
              </div>
              <span className="product-rating-value">({averageRating})</span>
              <a href="#reviews" className="reviews-link">{reviewCount} รีวิว</a>
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

            {/* Status & Stock */}
            <div className="product-status">
              <span className="status-label">สถานะ:</span>
              <span className="status-value">
                {product.is_active ? (
                  <>
                    <i className="fa-solid fa-check-circle"></i> มีสินค้า
                    {product.stock_quantity !== undefined && product.stock_quantity !== null && (
                      <span className="stock-info">
                        {product.stock_quantity > 10 ? (
                          <span className="text-green-600"> (มีสินค้ามากกว่า 10 ชิ้น)</span>
                        ) : product.stock_quantity > 0 ? (
                          <span className="text-yellow-600"> (เหลือ {product.stock_quantity} ชิ้น)</span>
                        ) : (
                          <span className="text-red-600"> (สินค้าหมด)</span>
                        )}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-times-circle"></i> สินค้าหมด
                  </>
                )}
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
              <ProductActions 
                productId={product.id}
                productName={product.name}
                price={product.price}
                salePrice={product.sale_price}
                imageUrl={product.image_url || ''}
              />
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
              รีวิว ({reviewCount})
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
              {(product.specifications || product.specs) && (
                <table className="specs-table">
                  <tbody>
                    {Object.entries(product.specifications || product.specs || {}).map(([key, value]) => (
                      <tr key={key}>
                        <td className="spec-label">{key}</td>
                        <td className="spec-value">{String(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {(!product.specifications && !product.specs) && (
                <p>ไม่มีข้อมูลทางเทคนิคในขณะนี้</p>
              )}

              {product.included_items && product.included_items.length > 0 && (
                <>
                  <h3 style={{ marginTop: '24px' }}>สิ่งที่อยู่ในกล่อง</h3>
                  <ul style={{ listStyle: 'disc', listStylePosition: 'inside', marginLeft: '20px' }}>
                    {product.included_items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Reviews Tab */}
            <div id="tab-reviews" className="tab-panel">
              <h3>รีวิวจากลูกค้า</h3>
              <div className="reviews-list">
                {productReviews.length > 0 ? (
                  productReviews.map((review) => {
                    const rating = review.rating || 0;
                    const fullStars = Math.floor(rating);
                    const hasHalfStar = rating % 1 >= 0.5;
                    
                    return (
                      <div key={review.id} className="review-item">
                        <div className="review-header">
                          <span className="review-author">{review.name}</span>
                          <div className="review-rating">
                            {Array.from({ length: 5 }).map((_, i) => {
                              if (i < fullStars) {
                                return <i key={i} className="fa-solid fa-star"></i>;
                              } else if (i === fullStars && hasHalfStar) {
                                return <i key={i} className="fa-solid fa-star-half-stroke"></i>;
                              } else {
                                return <i key={i} className="fa-regular fa-star"></i>;
                              }
                            })}
                          </div>
                        </div>
                        <p className="review-body">&quot;{review.content}&quot;</p>
                        {review.created_at && (
                          <span className="review-date">
                            {new Date(review.created_at).toLocaleDateString('th-TH', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p>ยังไม่มีรีวิวสำหรับสินค้านี้</p>
                )}
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
    </div>
  );
}
