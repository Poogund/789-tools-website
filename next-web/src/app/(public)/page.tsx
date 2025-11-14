import { getHeroSlides, getFeaturedProducts, getPromotionProducts, getCategories, getFaqItems } from '@/lib/catalog-repository';
import { HeroSlide as HeroSlideType, Product, Category, FAQItem } from '@/types';
import { Metadata } from 'next';

// Components will be created below
import HeroSlider from '@/components/home/HeroSlider';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection';
import PromotionProductsSection from '@/components/home/PromotionProductsSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: '789 TOOLS - ศูนย์รวมเครื่องมือช่างก่อสร้าง',
  description: '789 TOOLS: ศูนย์รวมเครื่องมือก่อสร้างครบวงจร ขาย-เช่า รถตัดคอนกรีต เครื่องขัดมัน เครื่องตบดิน พร้อมบริการซ่อมโดยช่างผู้เชี่ยวชาญ และบริการเก็บเงินปลายทาง',
};

// JSON-LD Structured Data
function generateJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "789 TOOLS",
    "description": "ศูนย์รวมเครื่องมือก่อสร้างครบวงจร ขาย-เช่า รถตัดคอนกรีต เครื่องขัดมัน เครื่องตบดิน",
    "url": "https://789tools.com",
    "telephone": "+66-65-789-8285",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "TH"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+66-65-789-8285",
      "contactType": "customer service",
      "availableLanguage": "Thai"
    },
    "sameAs": [
      "https://line.me/ti/p/~@789tools",
      "https://facebook.com/789tools"
    ]
  };
}

export default async function HomePage() {
  // Fetch data from repository
  const heroSlides: HeroSlideType[] = await getHeroSlides();
  const featuredProducts: Product[] = await getFeaturedProducts();
  const promotionProducts: Product[] = await getPromotionProducts();
  const categories: Category[] = await getCategories();
  const faqItems: FAQItem[] = await getFaqItems();

  const jsonLd = generateJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="homepage">
      {/* Hero Slider Section */}
      <HeroSlider slides={heroSlides} />

      {/* Categories Section */}
      <CategoriesSection categories={categories} />

      {/* Partners Section - from legacy */}
      <section className="partners-section">
        <div className="container">
          <h2 className="thai-text">พาร์ทเนอร์แบรนด์ของเรา</h2>
          <p className="thai-text">เราคัดสรรเฉพาะแบรนด์เครื่องมือคุณภาพที่ช่างทั่วประเทศไว้ใจ</p>
          <div className="logos-container">
            <img src="/brand-bosch.svg" alt="Bosch Logo" />
            <img src="/brand-makita.svg" alt="Makita Logo" />
            <img src="/brand-dewalt.svg" alt="DeWalt Logo" />
            <img src="/brand-honda.svg" alt="Honda Logo" />
            <img src="/brand-marton.png" alt="Marton Logo" />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProductsSection products={featuredProducts} />

      {/* Promotion Products Section */}
      <PromotionProductsSection products={promotionProducts} />

      {/* Why Us Section - Static content from legacy */}
      <section className="why-us-section">
        <div className="container">
          <h2 className="thai-text">ทำไมลูกค้าต้องเลือก 789 Tools</h2>
          <div className="features-container" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'nowrap'
          }}>
            <div className="feature-item" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              flex: '1',
              minWidth: '0'
            }}>
              <i className="fa-solid fa-shield" style={{
                fontSize: '3rem',
                color: '#fdd835',
                marginBottom: '12px'
              }}></i>
              <p className="thai-text" style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#2c2c2c',
                margin: '0',
                lineHeight: '1.3'
              }}>รับประกัน<br />ในคุณภาพ</p>
            </div>
            <div className="feature-item cod-item" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              flex: '1',
              minWidth: '0',
              position: 'relative'
            }}>
              <div className="cod-icon-wrapper" style={{
                position: 'relative',
                display: 'inline-block'
              }}>
                <i className="fa-solid fa-truck" style={{
                  fontSize: '3rem',
                  color: '#fdd835',
                  marginBottom: '12px'
                }}></i>
                <span className="cod-badge" style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-15px',
                  backgroundColor: '#06c755',
                  color: '#ffffff',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: '700'
                }}>COD</span>
              </div>
              <p className="thai-text" style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#2c2c2c',
                margin: '0',
                lineHeight: '1.3'
              }}>เก็บเงิน<br />ปลายทางได้</p>
            </div>
            <div className="feature-item" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              flex: '1',
              minWidth: '0'
            }}>
              <i className="fa-solid fa-gear" style={{
                fontSize: '3rem',
                color: '#fdd835',
                marginBottom: '12px'
              }}></i>
              <p className="thai-text" style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#2c2c2c',
                margin: '0',
                lineHeight: '1.3'
              }}>อะไหล่แท้<br />ครบทุกชิ้น</p>
            </div>
            <div className="feature-item" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              flex: '1',
              minWidth: '0'
            }}>
              <i className="fa-solid fa-screwdriver-wrench" style={{
                fontSize: '3rem',
                color: '#fdd835',
                marginBottom: '12px'
              }}></i>
              <p className="thai-text" style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#2c2c2c',
                margin: '0',
                lineHeight: '1.3'
              }}>มีบริการให้เช่า<br />เครื่องมือครบวงจร</p>
            </div>
            <div className="feature-item" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              flex: '1',
              minWidth: '0'
            }}>
              <i className="fa-solid fa-headset" style={{
                fontSize: '3rem',
                color: '#fdd835',
                marginBottom: '12px'
              }}></i>
              <p className="thai-text" style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#2c2c2c',
                margin: '0',
                lineHeight: '1.3'
              }}>มีทีมงาน<br />คอยให้คำปรึกษา</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* FAQ Section */}
      <FAQSection faqItems={faqItems} />

      {/* CTA Section */}
      <CTASection />
      </main>
    </>
  );
}
