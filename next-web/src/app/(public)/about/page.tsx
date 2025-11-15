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
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section - Modern & Clean */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-color/5 via-yellow-400/5 to-primary-color/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-color to-yellow-400 rounded-3xl mb-8 shadow-xl">
              <i className="fa-solid fa-building text-white text-4xl"></i>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-dark-color thai-text leading-tight">
              เกี่ยวกับ 789 Tools
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 thai-text leading-relaxed max-w-3xl mx-auto">
              ศูนย์รวมเครื่องมือก่อสร้างครบวงจร พร้อมให้บริการทั้งการ <span className="font-bold text-primary-color">ขาย</span> <span className="font-bold text-yellow-400">เช่า</span> และ <span className="font-bold text-primary-color">ซ่อม</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white px-6 py-3 rounded-full shadow-lg border border-gray-100">
                <span className="text-sm text-gray-600 thai-text">ก่อตั้งเมื่อ</span>
                <span className="text-lg font-bold text-primary-color ml-2">2015</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-lg border border-gray-100">
                <span className="text-sm text-gray-600 thai-text">ลูกค้าพึงพอใจ</span>
                <span className="text-lg font-bold text-primary-color ml-2">1000+</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-lg border border-gray-100">
                <span className="text-sm text-gray-600 thai-text">สินค้าในสต็อก</span>
                <span className="text-lg font-bold text-primary-color ml-2">500+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section - Clean Layout */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-primary-color text-sm font-bold mb-4 thai-text tracking-wider">OUR STORY</div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-dark-color thai-text leading-tight">
                  เรื่องราวของเรา
                </h2>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed thai-text">
                  <p>
                    บริษัท <strong className="text-primary-color">789 Tools</strong> ก่อตั้งขึ้นจากความตั้งใจที่จะเป็น <strong>"คู่หูของช่าง"</strong> โดยเริ่มต้นจากร้านขายเครื่องมือตัดพื้นถนนเล็กๆ ในจังหวัด ปทุมธานี เมื่อหลายปีก่อน
                  </p>
                  <p>
                    วันนี้เราขยายสู่ศูนย์รวมเครื่องมือก่อสร้างที่มีสินค้าและบริการครบวงจร ทั้งขาย เช่า และซ่อม เพื่อรองรับความต้องการของผู้รับเหมามืออาชีพทั่วประเทศ
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary-color/20 to-yellow-400/20 rounded-3xl p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-black text-primary-color mb-4">789</div>
                    <div className="text-xl font-bold text-gray-700 thai-text">TOOLS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Modern Cards */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-primary-color text-sm font-bold mb-4 thai-text tracking-wider">OUR VALUES</div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-dark-color thai-text">ค่านิยมของเรา</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto thai-text">สิ่งที่เรายึดถือและปฏิบัติในทุกการทำงาน</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 group">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-color to-yellow-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-star text-white text-3xl"></i>
                </div>
                <h3 className="text-2xl font-black mb-4 text-dark-color thai-text">คุณภาพ</h3>
                <p className="text-gray-700 leading-relaxed thai-text">
                  เราคัดสรรเครื่องมือและอะไหล่คุณภาพสูงเพื่อประสิทธิภาพงานก่อสร้างที่ดีที่สุด
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 group">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-color to-yellow-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-user-check text-white text-3xl"></i>
                </div>
                <h3 className="text-2xl font-black mb-4 text-dark-color thai-text">ความเชี่ยวชาญ</h3>
                <p className="text-gray-700 leading-relaxed thai-text">
                  ทีมงานของเรามีประสบการณ์ด้านงานช่าง พร้อมให้คำปรึกษาอย่างมืออาชีพ
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 group">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-color to-yellow-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-hand-holding-heart text-white text-3xl"></i>
                </div>
                <h3 className="text-2xl font-black mb-4 text-dark-color thai-text">ความรับผิดชอบ</h3>
                <p className="text-gray-700 leading-relaxed thai-text">
                  ดูแลลูกค้าทั้งก่อนและหลังการขาย ด้วยบริการซ่อมและการรับประกันที่ใส่ใจ
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="text-primary-color text-sm font-bold mb-4 thai-text tracking-wider">FEATURED PRODUCTS</div>
                <h2 className="text-4xl md:text-5xl font-black mb-4 text-dark-color thai-text">สินค้าแนะนำ</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {featuredProducts.map((product) => (
                  <Link 
                    key={product.id} 
                    href={`/products/${product.slug}`}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group border border-gray-100"
                  >
                    {product.image_url && (
                      <div className="aspect-video bg-gray-100 overflow-hidden">
                        <SafeImage
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          fallbackSrc="https://placehold.co/400x300/eee/ccc?text=Product"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-dark-color mb-3 thai-text group-hover:text-primary-color transition-colors">{product.name}</h4>
                      <p className="text-2xl font-black text-primary-color">
                        ฿{new Intl.NumberFormat('th-TH').format(product.sale_price || product.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Team Section - Modern Design */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-primary-color text-sm font-bold mb-4 thai-text tracking-wider">OUR TEAM</div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-dark-color thai-text">ทีมงานของเรา</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto thai-text">
                เบื้องหลังความสำเร็จของ 789 Tools คือทีมงานที่ทุ่มเทและมีความเชี่ยวชาญ
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: 'fa-user-tie', title: 'คุณผู้การ', desc: 'ผู้ก่อตั้งและผู้บริหาร' },
                { icon: 'fa-wrench', title: 'ทีมช่าง', desc: 'ช่างผู้เชี่ยวชาญด้านการซ่อมและบำรุงรักษา' },
                { icon: 'fa-headset', title: 'ทีมบริการลูกค้า', desc: 'ดูแลลูกค้าด้วยความใส่ใจและรวดเร็ว' }
              ].map((member, idx) => (
                <div key={idx} className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 group">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary-color/20 to-yellow-400/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary-color to-yellow-400 rounded-full flex items-center justify-center">
                      <i className={`fa-solid ${member.icon} text-white text-4xl`}></i>
                    </div>
                  </div>
                  <h3 className="text-xl font-black mb-2 text-dark-color thai-text">{member.title}</h3>
                  <p className="text-gray-600 thai-text">{member.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Clean & Modern */}
      <section className="py-20 bg-gradient-to-br from-primary-color via-yellow-400 to-primary-color relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl mb-8">
              <i className="fa-solid fa-handshake text-white text-4xl"></i>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white thai-text">พร้อมเป็นส่วนหนึ่งของครอบครัว 789 Tools?</h2>
            <p className="text-xl mb-10 text-white/90 thai-text">ติดต่อเราเพื่อสอบถามข้อมูลเพิ่มเติมหรือร่วมงานกับเรา</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-primary-color px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl text-lg thai-text"
              >
                <i className="fa-solid fa-envelope mr-3"></i>
                ติดต่อเรา
              </Link>
              <a 
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white/30 transition-all text-lg thai-text"
              >
                <i className="fa-solid fa-phone mr-3"></i>
                โทรเลย
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
