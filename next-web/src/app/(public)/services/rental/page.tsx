import { rentalServiceConfig } from '@/config/services';
import { siteConfig } from '@/config/site';
import { getCategories, getProducts } from '@/lib/catalog-repository';
import Link from 'next/link';
import SafeImage from '@/components/common/SafeImage';

export default async function RentalServicePage() {
  const { hero, process, categories, features, cta } = rentalServiceConfig;
  
  const dbCategories = await getCategories();
  const products = await getProducts();
  
  const rentalProducts = products.filter(p => p.rent_price).slice(0, 6);

  return (
    <main className="rental-service-page">
      {/* Hero Section - Modern & Clean */}
      <section className="rental-hero">
        <div className="rental-hero-background"></div>
        <div className="container">
          <div className="rental-hero-content">
            <div className="rental-hero-badge">
              <i className="fa-solid fa-tools"></i>
              <span>บริการให้เช่า</span>
            </div>
            <h1 className="rental-hero-title">
              เช่าเครื่องมือก่อสร้าง<br />
              <span className="rental-hero-highlight">คุณภาพสูง</span>
            </h1>
            <p className="rental-hero-description">
              เช่าเครื่องมือช่างคุณภาพสูง สะดวก รวดเร็ว พร้อมบริการซ่อมและคำปรึกษาหน้างานโดยทีมงานมืออาชีพ
            </p>
            <div className="rental-hero-cta">
              <a 
                href={`tel:${siteConfig.phone}`}
                className="rental-btn rental-btn-primary"
              >
                <i className="fa-solid fa-phone"></i>
                <span>โทรเลย {siteConfig.phone}</span>
              </a>
              <Link 
                href="/contact"
                className="rental-btn rental-btn-secondary"
              >
                <i className="fa-solid fa-file-invoice"></i>
                <span>ขอใบเสนอราคา</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="rental-benefits">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">ทำไมต้องเลือกเรา</h2>
            <p className="section-subtitle">บริการให้เช่าเครื่องมือก่อสร้างที่ครบวงจร</p>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fa-solid fa-truck-fast"></i>
              </div>
              <h3>จัดส่งเร็ว</h3>
              <p>จัดส่งเครื่องมือถึงหน้างานอย่างรวดเร็ว พร้อมใช้งานทันที</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h3>รับประกันคุณภาพ</h3>
              <p>เครื่องมือทุกชิ้นผ่านการตรวจสอบพร้อมรับประกันคุณภาพ</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fa-solid fa-wrench"></i>
              </div>
              <h3>บริการซ่อม</h3>
              <p>ทีมช่างมืออาชีพพร้อมให้บริการซ่อมและบำรุงรักษา</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fa-solid fa-headset"></i>
              </div>
              <h3>คำปรึกษาฟรี</h3>
              <p>ให้คำปรึกษาเลือกเครื่องมือที่เหมาะสมกับงานของคุณ</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fa-solid fa-money-bill-wave"></i>
              </div>
              <h3>ราคายุติธรรม</h3>
              <p>ราคาเช่าที่เป็นธรรม ไม่มีค่าใช้จ่ายแอบแฝง</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fa-solid fa-clock"></i>
              </div>
              <h3>ยืดหยุ่นเวลา</h3>
              <p>เช่าได้ตามระยะเวลาที่ต้องการ ไม่จำกัดขั้นต่ำ</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Process Section */}
      <section className="rental-process">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">ขั้นตอนการเช่า</h2>
            <p className="section-subtitle">ง่ายๆ เพียง 4 ขั้นตอน</p>
          </div>
          <div className="process-timeline">
            {process.steps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="process-number">{index + 1}</div>
                <div className="process-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                {index < process.steps.length - 1 && (
                  <div className="process-connector">
                    <i className="fa-solid fa-arrow-down"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rental Products */}
      {rentalProducts.length > 0 && (
        <section className="rental-products">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">สินค้าแนะนำสำหรับเช่า</h2>
              <p className="section-subtitle">เครื่องมือคุณภาพสูงพร้อมใช้งาน</p>
            </div>
            <div className="products-grid">
              {rentalProducts.map((product) => (
                <Link 
                  key={product.id}
                  href={`/products/${product.slug || product.id}`}
                  className="product-card"
                >
                  <div className="product-image">
                    <SafeImage
                      src={product.image_url || '/placeholder-product.jpg'}
                      alt={product.name}
                      className="product-img"
                      fallbackSrc="/placeholder-product.jpg"
                    />
                    {product.is_promotion && (
                      <span className="product-badge">SALE</span>
                    )}
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-pricing">
                      <span className="rent-price">
                        เช่าเริ่มต้น <strong>฿{new Intl.NumberFormat('th-TH').format(product.rent_price || 0)}</strong>
                      </span>
                      {product.price && (
                        <span className="buy-price">
                          ซื้อ ฿{new Intl.NumberFormat('th-TH').format(product.price)}
                        </span>
                      )}
                    </div>
                    <div className="product-action">
                      <span className="view-details">
                        ดูรายละเอียด <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="section-footer">
              <Link href="/products" className="rental-btn rental-btn-outline">
                <span>ดูสินค้าทั้งหมด</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="rental-categories">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">หมวดหมู่เครื่องมือ</h2>
            <p className="section-subtitle">เลือกเครื่องมือตามประเภทงาน</p>
          </div>
          <div className="categories-grid">
            {categories.items.map((category, index) => {
              const categoryImage = dbCategories.find(c => c.name === category.title)?.image_url || category.image;
              return (
                <Link 
                  key={index} 
                  href="/products"
                  className="category-card"
                >
                  <div className="category-image">
                    <SafeImage
                      src={categoryImage}
                      alt={category.title}
                      className="category-img"
                      fallbackSrc={`https://placehold.co/400x300/eee/ccc?text=${encodeURIComponent(category.title)}`}
                    />
                  </div>
                  <div className="category-info">
                    <h3>{category.title}</h3>
                    <span className="category-link">
                      ดูสินค้า <i className="fa-solid fa-chevron-right"></i>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="rental-cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-icon">
              <i className="fa-solid fa-handshake"></i>
            </div>
            <h2>พร้อมเริ่มต้นเช่าเครื่องมือกับเรา?</h2>
            <p>
              ติดต่อเราวันนี้เพื่อรับคำปรึกษาและใบเสนอราคา<br />
              โทร <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a> หรือ{' '}
              <a href="mailto:789Tools@gmail.com">ส่งอีเมล</a>
            </p>
            <div className="cta-buttons">
              <a 
                href={`tel:${siteConfig.phone}`}
                className="rental-btn rental-btn-primary rental-btn-large"
              >
                <i className="fa-solid fa-phone"></i>
                <span>โทรเลย</span>
              </a>
              <Link 
                href="/contact"
                className="rental-btn rental-btn-secondary rental-btn-large"
              >
                <i className="fa-solid fa-envelope"></i>
                <span>ติดต่อเรา</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
