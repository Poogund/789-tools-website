import { rentalServiceConfig } from '@/config/services';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

export default function RentalServicePage() {
  const { hero, process, categories, features, cta } = rentalServiceConfig;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-color to-yellow-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{hero.title}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">{hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`tel:${siteConfig.phone}`}
              className="inline-block bg-white text-primary-color px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              โทรเลย
            </a>
            <Link 
              href="/contact"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-color transition-colors"
            >
              ขอใบเสนอราคา
            </Link>
          </div>
        </div>
      </section>

      {/* Rental Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-dark-color">
            {process.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-color text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-dark-color">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Rental Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-dark-color">
            {categories.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {categories.items.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={category.image}
                    alt={category.alt}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-center">{category.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link 
              href="/products"
              className="inline-block bg-primary-color text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              {categories.buttonText} <i className="fa-solid fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-section-bg-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-dark-color">
            {features.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.items.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-primary-color text-4xl mb-4">
                  <i className={`fa-solid ${feature.icon}`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-dark-color">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-color text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{cta.title}</h2>
          <p className="text-xl mb-8">
            โทรหาเราที่ <a href={`tel:${siteConfig.phone}`} className="underline hover:no-underline">{siteConfig.phone}</a> หรือ{' '}
            <a href="mailto:789Tools@gmail.com" className="underline hover:no-underline">ส่งอีเมล</a> {cta.description}
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-primary-color px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {cta.buttonText}
          </Link>
        </div>
      </section>
    </div>
  );
}
