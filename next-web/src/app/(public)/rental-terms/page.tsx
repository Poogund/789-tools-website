import { rentalTermsConfig } from '@/config/services';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

export default function RentalTermsPage() {
  const { title, lastUpdated, sections, contact } = rentalTermsConfig;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-color to-yellow-400 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-lg opacity-90">{lastUpdated}</p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {sections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-dark-color pb-2 border-b-2 border-primary-color">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <i className="fa-solid fa-check-circle text-primary-color mt-1 mr-3 flex-shrink-0"></i>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Section */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-dark-color">
                <i className="fa-solid fa-phone-volume text-primary-color mr-2"></i>
                {contact.title}
              </h3>
              <p className="text-gray-700 mb-4">{contact.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center justify-center bg-primary-color text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                >
                  <i className="fa-solid fa-phone mr-2"></i>
                  {contact.phone}
                </a>
                <a 
                  href="mailto:789Tools@gmail.com"
                  className="inline-flex items-center justify-center bg-accent-color text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  <i className="fa-solid fa-envelope mr-2"></i>
                  ส่งอีเมล
                </a>
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  <i className="fa-solid fa-message mr-2"></i>
                  ติดต่อผ่านแบบฟอร์ม
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional CTA Section */}
      <section className="py-16 bg-section-bg-gray">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-dark-color">
            พร้อมเริ่มต้นเช่าเครื่องมือกับเรา?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            ติดต่อทีมงานของเราเพื่อรับคำปรึกษาและข้อมูลรายละเอียดเพิ่มเติม
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/services/rental"
              className="inline-block bg-primary-color text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              <i className="fa-solid fa-tools mr-2"></i>
              ดูบริการเช่า
            </Link>
            <Link 
              href="/contact"
              className="inline-block bg-dark-color text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              <i className="fa-solid fa-calendar-check mr-2"></i>
              จองเลย
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
