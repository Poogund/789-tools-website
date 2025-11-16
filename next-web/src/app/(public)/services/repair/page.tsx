import { repairServiceConfig } from '@/config/services';
import { siteConfig } from '@/config/site';
import { getCategories, getProducts } from '@/lib/catalog-repository';
import Link from 'next/link';
import SafeImage from '@/components/common/SafeImage';

export default async function RepairServicePage() {
  const { hero, categories, repairProcess, features, cta } = repairServiceConfig;
  
  const dbCategories = await getCategories();
  const allProducts = await getProducts();
  
  // Build category images map - first from category image_url, then from products
  const categoryImages: Record<string, string> = {};
  
  // First, add category images
  dbCategories.forEach(cat => {
    if (cat.image_url) {
      categoryImages[cat.name] = cat.image_url;
    }
  });
  
  // Then, for categories without images, find first product image from that category
  dbCategories.forEach(cat => {
    if (!categoryImages[cat.name] && cat.id) {
      const categoryProduct = allProducts.find(p => 
        p.category_id === cat.id && 
        p.image_url && 
        p.is_active
      );
      if (categoryProduct?.image_url) {
        categoryImages[cat.name] = categoryProduct.image_url;
      }
    }
  });

  return (
    <main className="repair-service-page">
      {/* Hero Section */}
      <section className="repair-hero">
        <div className="repair-hero-background"></div>
        <div className="container">
          <div className="repair-hero-content">
            <div className="repair-hero-badge">
              <i className="fa-solid fa-wrench"></i>
              <span>อะไหล่ & บริการ</span>
            </div>
            <h1 className="repair-hero-title">
              อะไหล่แท้ & บริการซ่อม<br />
              <span className="repair-hero-highlight">คุณภาพสูง</span>
            </h1>
            <p className="repair-hero-description">
              จำหน่ายอะไหล่แท้สำหรับเครื่องมือก่อสร้างทุกประเภท พร้อมบริการซ่อม และตรวจเช็กสภาพโดยทีมช่างมืออาชีพ
            </p>
            <div className="repair-hero-cta">
              <a 
                href={`tel:${siteConfig.phone}`}
                className="repair-btn repair-btn-primary"
              >
                <i className="fa-solid fa-phone"></i>
                <span>โทรเลย {siteConfig.phone}</span>
              </a>
              <Link 
                href="/contact"
                className="repair-btn repair-btn-secondary"
              >
                <i className="fa-solid fa-envelope"></i>
                <span>ติดต่อสอบถาม</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="repair-benefits">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">ทำไมต้องเลือกเรา</h2>
            <p className="section-subtitle">อะไหล่แท้และบริการซ่อมที่เชื่อถือได้</p>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fa-solid fa-certificate"></i>
              </div>
              <h3>อะไหล่แท้ 100%</h3>
              <p>มั่นใจในคุณภาพและความทนทานของอะไหล่ทุกชิ้น</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fa-solid fa-clock"></i>
              </div>
              <h3>บริการรวดเร็ว</h3>
              <p>มีอะไหล่ในสต็อกพร้อมจัดส่ง และการซ่อมเสร็จภายในเวลาที่กำหนด</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fa-solid fa-user-gear"></i>
              </div>
              <h3>ช่างผู้เชี่ยวชาญ</h3>
              <p>ทีมช่างมากประสบการณ์ ให้คำปรึกษาและซ่อมตรงจุด</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h3>รับประกันงานซ่อม</h3>
              <p>รับประกันคุณภาพงานซ่อมทุกครั้ง พร้อมบริการหลังการขาย</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fa-solid fa-toolbox"></i>
              </div>
              <h3>อะไหล่ครบวงจร</h3>
              <p>มีอะไหล่สำหรับเครื่องมือก่อสร้างทุกประเภท</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fa-solid fa-headset"></i>
              </div>
              <h3>คำปรึกษาฟรี</h3>
              <p>ให้คำปรึกษาเลือกอะไหล่ที่เหมาะสมและวิธีดูแลเครื่องมือ</p>
            </div>
          </div>
        </div>
      </section>

      {/* Parts Categories Section */}
      <section className="repair-categories">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{categories.title}</h2>
            <p className="section-subtitle">อะไหล่คุณภาพสูงสำหรับเครื่องมือทุกประเภท</p>
          </div>
          <div className="categories-grid">
            {categories.items.map((category, index) => {
              // Priority: 1. Category image from DB, 2. Product image from DB, 3. Config image, 4. Fallback
              let categoryImage = categoryImages[category.title] || category.image;
              
              // If still no image, try to find from products by category name match
              if (!categoryImage || categoryImage.includes('placehold')) {
                const matchingCategory = dbCategories.find(c => c.name === category.title);
                if (matchingCategory?.id) {
                  const categoryProduct = allProducts.find(p => 
                    p.category_id === matchingCategory.id && 
                    p.image_url && 
                    p.is_active
                  );
                  if (categoryProduct?.image_url) {
                    categoryImage = categoryProduct.image_url;
                  }
                }
              }
              
              return (
                <Link 
                  key={index} 
                  href="/products"
                  className="category-card"
                >
                  <div className="category-image">
                    <SafeImage
                      src={categoryImage}
                      alt={category.alt}
                      className="category-img"
                      fallbackSrc={`https://placehold.co/400x300/eee/ccc?text=${encodeURIComponent(category.title)}`}
                    />
                  </div>
                  <div className="category-info">
                    <h3>{category.title}</h3>
                    <span className="category-link">
                      ดูอะไหล่ <i className="fa-solid fa-chevron-right"></i>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="categories-note">
            <i className="fa-solid fa-info-circle"></i>
            <p>{categories.note}</p>
          </div>
        </div>
      </section>

      {/* Repair Process Section */}
      <section className="repair-process">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{repairProcess.title}</h2>
            <p className="section-subtitle">ขั้นตอนง่ายๆ เพียง 4 ขั้นตอน</p>
          </div>
          <div className="process-timeline">
            {repairProcess.steps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="process-number">{index + 1}</div>
                <div className="process-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                {index < repairProcess.steps.length - 1 && (
                  <div className="process-connector">
                    <i className="fa-solid fa-arrow-down"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="repair-features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{features.title}</h2>
            <p className="section-subtitle">คุณภาพที่เหนือกว่า</p>
          </div>
          <div className="features-grid">
            {features.items.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <i className={`fa-solid ${feature.icon}`}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="repair-cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-icon">
              <i className="fa-solid fa-tools"></i>
            </div>
            <h2>{cta.title}</h2>
            <p>
              {cta.description}<br />
              โทร <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a> หรือ{' '}
              <a href="mailto:789Tools@gmail.com">ส่งอีเมล</a>
            </p>
            <div className="cta-buttons">
              <a 
                href={`tel:${siteConfig.phone}`}
                className="repair-btn repair-btn-primary repair-btn-large"
              >
                <i className="fa-solid fa-phone"></i>
                <span>โทรเลย</span>
              </a>
              <Link 
                href="/contact"
                className="repair-btn repair-btn-secondary repair-btn-large"
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
