'use client';

import { useState } from 'react';
import { faqConfig, FAQ } from '@/config/faq';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

export default function FAQPage() {
  const { hero, categories, faqs, cta } = faqConfig;
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const filteredFAQs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleExpanded = (faqId: string) => {
    setExpandedItems(prev => 
      prev.includes(faqId) 
        ? prev.filter(id => id !== faqId)
        : [...prev, faqId]
    );
  };

  const expandAll = () => {
    setExpandedItems(filteredFAQs.map(faq => faq.id));
  };

  const collapseAll = () => {
    setExpandedItems([]);
  };

  return (
    <div className="min-h-screen faq-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-color to-yellow-400 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{hero.title}</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">{hero.subtitle}</p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-8 bg-section-bg-gray">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-primary-color text-white shadow-lg'
                  : 'bg-white text-dark-color hover:bg-gray-100'
              }`}
            >
              <i className="fa-solid fa-list mr-2"></i>
              ทั้งหมด
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center ${
                  activeCategory === category.id
                    ? 'bg-primary-color text-white shadow-lg'
                    : 'bg-white text-dark-color hover:bg-gray-100'
                }`}
              >
                <i className={`fa-solid ${category.icon} mr-2`}></i>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-color rounded-full mb-6">
              <i className="fa-solid fa-question-circle text-white text-2xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-dark-color mb-4">คำถามที่คุณอาจสนใจ</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              คลิกเพื่อดูคำตอบของคำถามที่พบบ่อย หรือเลือกหมวดหมู่เพื่อค้นหาคำถามที่ต้องการ
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mb-8 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center text-sm text-gray-600">
              <i className="fa-solid fa-info-circle mr-2 text-primary-color"></i>
              <span>พบ {filteredFAQs.length} คำถามในหมวดหมู่นี้</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={expandAll}
                className="flex items-center gap-2 px-4 py-2 bg-primary-color/10 text-primary-color rounded-lg hover:bg-primary-color/20 transition-colors text-sm font-medium"
              >
                <i className="fa-solid fa-expand"></i>
                ขยายทั้งหมด
              </button>
              <button
                onClick={collapseAll}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                <i className="fa-solid fa-compress"></i>
                ย่อทั้งหมด
              </button>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((faq: FAQ, index: number) => {
              const isExpanded = expandedItems.includes(faq.id);
              const categoryInfo = categories.find(cat => cat.id === faq.category);
              
              return (
                <div 
                  key={faq.id} 
                  className={`group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary-color/20 ${
                    isExpanded ? 'shadow-lg border-primary-color/30' : ''
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <button
                    onClick={() => toggleExpanded(faq.id)}
                    className={`w-full px-6 py-5 text-left flex items-center justify-between transition-all duration-300 faq-question-button ${
                      isExpanded ? 'bg-gradient-to-r from-primary-color/5 to-yellow-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center flex-1 gap-4">
                      {/* Question Number */}
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        isExpanded 
                          ? 'bg-primary-color text-white' 
                          : 'bg-gray-100 text-gray-600 group-hover:bg-primary-color/10 group-hover:text-primary-color'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      
                      {/* Category Icon */}
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isExpanded 
                          ? 'bg-primary-color text-white' 
                          : 'bg-primary-color/10 text-primary-color group-hover:bg-primary-color group-hover:text-white'
                      }`}>
                        <i className={`fa-solid ${categoryInfo?.icon || 'fa-question-circle'}`}></i>
                      </div>
                      
                      {/* Question */}
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                          isExpanded ? 'text-primary-color' : 'text-dark-color group-hover:text-primary-color'
                        }`}>
                          {faq.question}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                            {categoryInfo?.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            <i className="fa-solid fa-clock mr-1"></i>
                            อ่านเวลา 1 นาที
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Expand/Collapse Icon */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isExpanded 
                        ? 'bg-primary-color text-white rotate-180' 
                        : 'bg-gray-100 text-gray-600 group-hover:bg-primary-color group-hover:text-white'
                    }`}>
                      <i className="fa-solid fa-chevron-down text-sm"></i>
                    </div>
                  </button>
                  
                  {/* Answer */}
                  <div className={`transition-all duration-300 ${
                    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}>
                    <div className="px-6 py-5 bg-gradient-to-br from-gray-50 to-white border-t border-gray-100">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                          <i className="fa-solid fa-check text-green-600 text-xs"></i>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 leading-relaxed text-base">
                            {faq.answer}
                          </p>
                          <div className="mt-4 flex items-center gap-4 text-sm">
                            <button className="flex items-center gap-1 text-gray-500 hover:text-primary-color transition-colors">
                              <i className="fa-solid fa-thumbs-up"></i>
                              <span>มีประโยชน์</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-500 hover:text-primary-color transition-colors">
                              <i className="fa-solid fa-share"></i>
                              <span>แชร์</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-500 hover:text-primary-color transition-colors">
                              <i className="fa-solid fa-copy"></i>
                              <span>คัดลอก</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredFAQs.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                <i className="fa-solid fa-search text-gray-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">ไม่พบคำถามในหมวดหมู่นี้</h3>
              <p className="text-gray-500 mb-6">ลองเปลี่ยนหมวดหมู่หรือติดต่อเราสอบถามข้อมูลเพิ่มเติม</p>
              <button
                onClick={() => setActiveCategory('all')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-color text-white rounded-lg hover:bg-yellow-500 transition-colors font-medium"
              >
                <i className="fa-solid fa-list"></i>
                ดูทั้งหมด
              </button>
            </div>
          )}

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-color/10 rounded-full mb-4">
                <i className="fa-solid fa-question text-primary-color text-xl"></i>
              </div>
              <div className="text-2xl font-bold text-dark-color mb-1">{faqs.length}+</div>
              <div className="text-sm text-gray-600">คำถามทั้งหมด</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <i className="fa-solid fa-check text-green-600 text-xl"></i>
              </div>
              <div className="text-2xl font-bold text-dark-color mb-1">100%</div>
              <div className="text-sm text-gray-600">คำตอบถูกต้อง</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <i className="fa-solid fa-clock text-blue-600 text-xl"></i>
              </div>
              <div className="text-2xl font-bold text-dark-color mb-1">24/7</div>
              <div className="text-sm text-gray-600">พร้อมตอบคำถาม</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                <i className="fa-solid fa-star text-purple-600 text-xl"></i>
              </div>
              <div className="text-2xl font-bold text-dark-color mb-1">4.9</div>
              <div className="text-sm text-gray-600">คะแนนพึงพอใจ</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-color text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{cta.title}</h2>
          <p className="text-xl mb-8">{cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center bg-white text-primary-color px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <i className="fa-solid fa-phone mr-2"></i>
              โทรหาเรา
            </a>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-color transition-colors"
            >
              <i className="fa-solid fa-message mr-2"></i>
              {cta.buttonText}
            </Link>
            <a 
              href={siteConfig.links.line}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-line-color text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              <i className="fa-brands fa-line mr-2"></i>
              LINE Official
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
