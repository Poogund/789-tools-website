import { rentalServiceConfig } from '@/config/services';
import { siteConfig } from '@/config/site';
import { getCategories, getProducts } from '@/lib/catalog-repository';
import Link from 'next/link';
import SafeImage from '@/components/common/SafeImage';

export default async function RentalServicePage() {
  const { hero, process, categories, features, cta } = rentalServiceConfig;
  
  const dbCategories = await getCategories();
  const products = await getProducts();
  
  const categoryImages: Record<string, string> = {};
  dbCategories.forEach(cat => {
    if (cat.image_url) {
      categoryImages[cat.name] = cat.image_url;
    }
  });
  
  const rentalProducts = products.filter(p => p.rent_price).slice(0, 4);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-color/10 via-yellow-400/10 to-primary-color/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-color to-yellow-400 rounded-3xl mb-8 shadow-xl">
              <i className="fa-solid fa-tools text-white text-4xl"></i>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-dark-color thai-text leading-tight">
              {hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-10 thai-text leading-relaxed">
              {hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center bg-gradient-to-r from-primary-color to-yellow-400 text-white px-10 py-4 rounded-xl font-bold hover:from-yellow-400 hover:to-primary-color transition-all shadow-xl hover:shadow-2xl text-lg thai-text"
              >
                <i className="fa-solid fa-phone mr-3"></i>
                โทรเลย
              </a>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center bg-white border-2 border-primary-color text-primary-color px-10 py-4 rounded-xl font-bold hover:bg-primary-color hover:text-white transition-all shadow-xl hover:shadow-2xl text-lg thai-text"
              >
                <i className="fa-solid fa-file-invoice mr-3"></i>
                ขอใบเสนอราคา
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-primary-color text-sm font-bold mb-4 thai-text tracking-wider">RENTAL PROCESS</div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-dark-color thai-text">{process.title}</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto thai-text">ขั้นตอนง่ายๆ เพียง 4 ขั้นตอน</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.steps.map((step, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 group text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-color/20 to-yellow-400/20 rounded-full blur-xl"></div>
                    <div className="relative bg-gradient-to-br from-primary-color to-yellow-400 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto text-2xl font-black group-hover:scale-110 transition-transform shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-black mb-4 text-dark-color thai-text">{step.title}</h3>
                  <p className="text-gray-700 leading-relaxed thai-text">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-primary-color text-sm font-bold mb-4 thai-text tracking-wider">POPULAR CATEGORIES</div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-dark-color thai-text">{categories.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {categories.items.map((category, index) => {
                const categoryImage = categoryImages[category.title] || category.image;
                return (
                  <Link 
                    key={index} 
                    href="/products"
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group border border-gray-100"
                  >
                    <div className="aspect-video bg-gray-100 overflow-hidden">
                      <SafeImage
                        src={categoryImage}
                        alt={category.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        fallbackSrc={`https://placehold.co/400x300/eee/ccc?text=${encodeURIComponent(category.title)}`}
                      />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-lg font-black text-dark-color group-hover:text-primary-color transition-colors thai-text">{category.title}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="text-center">
              <Link 
                href="/products"
                className="inline-flex items-center justify-center bg-gradient-to-r from-primary-color to-yellow-400 text-white px-10 py-4 rounded-xl font-bold hover:from-yellow-400 hover:to-primary-color transition-all shadow-xl hover:shadow-2xl text-lg thai-text"
              >
                {categories.buttonText} <i className="fa-solid fa-arrow-right ml-3"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-primary-color text-sm font-bold mb-4 thai-text tracking-wider">WHY CHOOSE US</div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-dark-color thai-text">{features.title}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.items.map((feature, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 group text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-color to-yellow-400 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                    <i className={`fa-solid ${feature.icon} text-white text-3xl`}></i>
                  </div>
                  <h3 className="text-xl font-black mb-4 text-dark-color thai-text">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed thai-text">{feature.description}</p>
                </div>
              ))}
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
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white thai-text">{cta.title}</h2>
            <p className="text-xl mb-10 text-white/90 thai-text">
              โทรหาเราที่ <a href={`tel:${siteConfig.phone}`} className="underline font-bold hover:no-underline">{siteConfig.phone}</a> หรือ{' '}
              <a href="mailto:789Tools@gmail.com" className="underline font-bold hover:no-underline">ส่งอีเมล</a> {cta.description}
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center bg-white text-primary-color px-10 py-4 rounded-xl font-black hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl text-lg thai-text"
            >
              <i className="fa-solid fa-envelope mr-3"></i>
              {cta.buttonText}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
