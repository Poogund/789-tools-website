import { rentalTermsConfig } from '@/config/services';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

export default function RentalTermsPage() {
  const { title, lastUpdated, sections, contact } = rentalTermsConfig;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-color/10 via-yellow-400/10 to-primary-color/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-color to-yellow-400 rounded-3xl mb-8 shadow-xl">
              <i className="fa-solid fa-file-contract text-white text-4xl"></i>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4 text-dark-color thai-text leading-tight">
              {title}
            </h1>
            <p className="text-lg text-gray-600 thai-text">{lastUpdated}</p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            {sections.map((section, index) => (
              <div key={index} className="mb-12 last:mb-0">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-color to-yellow-400 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 shadow-lg">
                    <span className="text-white font-black text-xl">{index + 1}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-dark-color thai-text">
                    {section.title}
                  </h2>
                </div>
                <div className="ml-24 space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-color to-yellow-400 rounded-lg flex items-center justify-center mr-4 mt-1">
                        <i className="fa-solid fa-check text-white text-sm"></i>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-lg thai-text flex-1">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Contact Section */}
            <div className="mt-12 p-8 bg-gradient-to-br from-primary-color/10 to-yellow-400/10 rounded-2xl border-2 border-primary-color/20">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-color to-yellow-400 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                  <i className="fa-solid fa-phone-volume text-white text-2xl"></i>
                </div>
                <h3 className="text-3xl font-black text-dark-color thai-text">
                  {contact.title}
                </h3>
              </div>
              <p className="text-gray-700 mb-8 text-lg ml-28 thai-text">{contact.description}</p>
              <div className="flex flex-col sm:flex-row gap-4 ml-28">
                <a 
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center justify-center bg-gradient-to-r from-primary-color to-yellow-400 text-white px-8 py-4 rounded-xl font-black hover:from-yellow-400 hover:to-primary-color transition-all shadow-lg hover:shadow-xl thai-text"
                >
                  <i className="fa-solid fa-phone mr-3"></i>
                  {contact.phone}
                </a>
                <a 
                  href="mailto:789Tools@gmail.com"
                  className="inline-flex items-center justify-center bg-accent-color text-white px-8 py-4 rounded-xl font-black hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl"
                >
                  <i className="fa-solid fa-envelope mr-3"></i>
                  ส่งอีเมล
                </a>
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center bg-dark-color text-white px-8 py-4 rounded-xl font-black hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl thai-text"
                >
                  <i className="fa-solid fa-message mr-3"></i>
                  ติดต่อผ่านแบบฟอร์ม
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white thai-text">
              พร้อมเริ่มต้นเช่าเครื่องมือกับเรา?
            </h2>
            <p className="text-xl mb-10 text-white/90 thai-text">
              ติดต่อทีมงานของเราเพื่อรับคำปรึกษาและข้อมูลรายละเอียดเพิ่มเติม
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/services/rental"
                className="inline-flex items-center justify-center bg-white text-primary-color px-10 py-4 rounded-xl font-black hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl text-lg thai-text"
              >
                <i className="fa-solid fa-tools mr-3"></i>
                ดูบริการเช่า
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm border-2 border-white text-white px-10 py-4 rounded-xl font-black hover:bg-white/30 transition-all text-lg thai-text"
              >
                <i className="fa-solid fa-calendar-check mr-3"></i>
                จองเลย
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
