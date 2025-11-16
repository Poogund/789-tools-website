import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { getProducts } from '@/lib/catalog-repository';
import SafeImage from '@/components/common/SafeImage';

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา - 789 TOOLS',
  description: 'เรียนรู้เกี่ยวกับ 789 Tools ศูนย์รวมเครื่องมือช่างและบริการครบวงจร ประวัติ ภารกิจ และค่านิยมของเรา',
};

export default async function AboutPage() {
  const products = await getProducts();
  const featuredProducts = products.filter(p => p.is_featured).slice(0, 3);

  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-background"></div>
        <div className="container mx-auto px-4">
          <div className="about-hero-content">
            <div className="about-hero-badge">
              <i className="fa-solid fa-building"></i>
            </div>
            <h1 className="about-hero-title">
              เกี่ยวกับ <span className="about-hero-highlight">789 Tools</span>
            </h1>
            <p className="about-hero-description">
              ศูนย์รวมเครื่องมือก่อสร้างครบวงจร พร้อมให้บริการทั้งการขาย เช่า และซ่อม
              เพื่อเป็นคู่หูที่เชื่อถือได้ของช่างมืออาชีพทั่วประเทศ
            </p>
            <div className="about-hero-stats">
              <div className="stat-item">
                <div className="stat-number">2015</div>
                <div className="stat-label">ก่อตั้งเมื่อ</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">ลูกค้าพึงพอใจ</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">สินค้าในสต็อก</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="container mx-auto px-4">
          <div className="about-story-content">
            <div className="about-story-text">
              <div className="section-badge">OUR STORY</div>
              <h2 className="section-title">เรื่องราวของเรา</h2>
              <div className="about-story-paragraphs">
                <p>
                  บริษัท <strong>789 Tools</strong> ก่อตั้งขึ้นจากความตั้งใจที่จะเป็น{' '}
                  <strong>"คู่หูของช่าง"</strong> โดยเริ่มต้นจากร้านขายเครื่องมือตัดพื้นถนนเล็กๆ 
                  ในจังหวัดปทุมธานี เมื่อหลายปีก่อน
                </p>
                <p>
                  วันนี้เราขยายสู่ศูนย์รวมเครื่องมือก่อสร้างที่มีสินค้าและบริการครบวงจร 
                  ทั้งขาย เช่า และซ่อม เพื่อรองรับความต้องการของผู้รับเหมามืออาชีพทั่วประเทศ
                </p>
                <p>
                  เรามุ่งมั่นที่จะให้บริการด้วยความซื่อสัตย์ ใส่ใจในรายละเอียด 
                  และพร้อมให้คำปรึกษาอย่างมืออาชีพ เพื่อให้ลูกค้าได้เครื่องมือที่เหมาะสมกับงานมากที่สุด
                </p>
              </div>
            </div>
            <div className="about-story-visual">
              <div className="story-visual-card">
                <div className="story-visual-number">789</div>
                <div className="story-visual-label">TOOLS</div>
                <div className="story-visual-icon">
                  <i className="fa-solid fa-wrench"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="container mx-auto px-4">
          <div className="section-header">
            <div className="section-badge">OUR MISSION</div>
            <h2 className="section-title">พันธกิจของเรา</h2>
            <p className="section-subtitle">
              เรามุ่งมั่นที่จะเป็นศูนย์รวมเครื่องมือก่อสร้างที่ครบวงจรและเชื่อถือได้
            </p>
          </div>
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <h3 className="mission-title">เป้าหมาย</h3>
              <p className="mission-text">
                ให้บริการเครื่องมือก่อสร้างคุณภาพสูง พร้อมทั้งการให้เช่าและซ่อมแซม
                เพื่อตอบสนองความต้องการของช่างมืออาชีพทุกประเภท
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">
                <i className="fa-solid fa-handshake"></i>
              </div>
              <h3 className="mission-title">พันธสัญญา</h3>
              <p className="mission-text">
                มุ่งเน้นความพึงพอใจของลูกค้าเป็นหลัก ด้วยการให้บริการที่รวดเร็ว 
                ซื่อสัตย์ และใส่ใจในทุกขั้นตอน
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h3 className="mission-title">วิสัยทัศน์</h3>
              <p className="mission-text">
                เป็นผู้นำในวงการเครื่องมือก่อสร้าง โดยการพัฒนาบริการอย่างต่อเนื่อง
                และสร้างความสัมพันธ์ที่ยั่งยืนกับลูกค้า
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="container mx-auto px-4">
          <div className="section-header">
            <div className="section-badge">OUR VALUES</div>
            <h2 className="section-title">ค่านิยมของเรา</h2>
            <p className="section-subtitle">
              สิ่งที่เรายึดถือและปฏิบัติในทุกการทำงาน
            </p>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <i className="fa-solid fa-star"></i>
              </div>
              <h3 className="value-title">คุณภาพ</h3>
              <p className="value-text">
                เราคัดสรรเครื่องมือและอะไหล่คุณภาพสูงเพื่อประสิทธิภาพงานก่อสร้างที่ดีที่สุด
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <i className="fa-solid fa-user-check"></i>
              </div>
              <h3 className="value-title">ความเชี่ยวชาญ</h3>
              <p className="value-text">
                ทีมงานของเรามีประสบการณ์ด้านงานช่าง พร้อมให้คำปรึกษาอย่างมืออาชีพ
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <i className="fa-solid fa-heart"></i>
              </div>
              <h3 className="value-title">ความรับผิดชอบ</h3>
              <p className="value-text">
                ดูแลลูกค้าทั้งก่อนและหลังการขาย ด้วยบริการซ่อมและการรับประกันที่ใส่ใจ
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <i className="fa-solid fa-clock"></i>
              </div>
              <h3 className="value-title">ความรวดเร็ว</h3>
              <p className="value-text">
                ให้บริการอย่างรวดเร็วและทันเวลา เพื่อไม่ให้งานของลูกค้าต้องหยุดชะงัก
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h3 className="value-title">ความน่าเชื่อถือ</h3>
              <p className="value-text">
                สร้างความไว้วางใจด้วยการทำงานที่โปร่งใส ซื่อสัตย์ และตรงต่อเวลา
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <i className="fa-solid fa-users"></i>
              </div>
              <h3 className="value-title">การบริการ</h3>
              <p className="value-text">
                ใส่ใจในทุกความต้องการของลูกค้า พร้อมให้คำแนะนำและสนับสนุนอย่างเต็มที่
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <div className="container mx-auto px-4">
          <div className="section-header">
            <div className="section-badge">OUR TEAM</div>
            <h2 className="section-title">ทีมงานของเรา</h2>
            <p className="section-subtitle">
              เบื้องหลังความสำเร็จของ 789 Tools คือทีมงานที่ทุ่มเทและมีความเชี่ยวชาญ
            </p>
          </div>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">
                <i className="fa-solid fa-user-tie"></i>
              </div>
              <h3 className="team-name">คุณผู้การ</h3>
              <p className="team-role">ผู้ก่อตั้งและผู้บริหาร</p>
              <p className="team-description">
                นำทีมด้วยวิสัยทัศน์และประสบการณ์ในการพัฒนาธุรกิจเครื่องมือก่อสร้าง
              </p>
            </div>
            <div className="team-card">
              <div className="team-avatar">
                <i className="fa-solid fa-wrench"></i>
              </div>
              <h3 className="team-name">ทีมช่าง</h3>
              <p className="team-role">ช่างผู้เชี่ยวชาญ</p>
              <p className="team-description">
                มีประสบการณ์ด้านการซ่อมและบำรุงรักษาเครื่องมือก่อสร้างทุกประเภท
              </p>
            </div>
            <div className="team-card">
              <div className="team-avatar">
                <i className="fa-solid fa-headset"></i>
              </div>
              <h3 className="team-name">ทีมบริการลูกค้า</h3>
              <p className="team-role">ดูแลลูกค้า</p>
              <p className="team-description">
                ดูแลลูกค้าด้วยความใส่ใจและรวดเร็ว พร้อมให้คำปรึกษาในทุกเรื่อง
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="about-products">
          <div className="container mx-auto px-4">
            <div className="section-header">
              <div className="section-badge">FEATURED PRODUCTS</div>
              <h2 className="section-title">สินค้าแนะนำ</h2>
              <p className="section-subtitle">
                สินค้าคุณภาพที่เราแนะนำสำหรับงานก่อสร้างทุกประเภท
              </p>
            </div>
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="product-card"
                >
                  {product.image_url && (
                    <div className="product-image">
                      <SafeImage
                        src={product.image_url}
                        alt={product.name}
                        className="product-img"
                        fallbackSrc="https://placehold.co/400x300/eee/ccc?text=Product"
                      />
                    </div>
                  )}
                  <div className="product-info">
                    <h4 className="product-name">{product.name}</h4>
                    <div className="product-price">
                      ฿{new Intl.NumberFormat('th-TH').format(product.sale_price || product.price)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container mx-auto px-4">
          <div className="cta-content">
            <div className="cta-icon">
              <i className="fa-solid fa-handshake"></i>
            </div>
            <h2 className="cta-title">พร้อมเป็นส่วนหนึ่งของครอบครัว 789 Tools?</h2>
            <p className="cta-description">
              ติดต่อเราเพื่อสอบถามข้อมูลเพิ่มเติมหรือร่วมงานกับเรา
            </p>
            <div className="cta-buttons">
              <Link href="/contact" className="cta-btn primary">
                <i className="fa-solid fa-envelope"></i>
                ติดต่อเรา
              </Link>
              <a href={`tel:${siteConfig.phone}`} className="cta-btn secondary">
                <i className="fa-solid fa-phone"></i>
                โทรเลย
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
