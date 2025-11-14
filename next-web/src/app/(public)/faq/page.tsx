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
    <div className="min-h-screen">
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
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mb-6">
            <button
              onClick={expandAll}
              className="text-sm text-primary-color hover:text-yellow-600 font-medium transition-colors"
            >
              <i className="fa-solid fa-chevron-down mr-1"></i>
              ขยายทั้งหมด
            </button>
            <button
              onClick={collapseAll}
              className="text-sm text-primary-color hover:text-yellow-600 font-medium transition-colors"
            >
              <i className="fa-solid fa-chevron-up mr-1"></i>
              ย่อทั้งหมด
            </button>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((faq: FAQ) => {
              const isExpanded = expandedItems.includes(faq.id);
              const categoryInfo = categories.find(cat => cat.id === faq.category);
              
              return (
                <div 
                  key={faq.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <button
                    onClick={() => toggleExpanded(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors faq-question-button"
                  >
                    <div className="flex items-center flex-1">
                      {/* Category Icon */}
                      <div className="text-primary-color mr-3">
                        <i className={`fa-solid ${categoryInfo?.icon || 'fa-question-circle'}`}></i>
                      </div>
                      
                      {/* Question */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-dark-color pr-4">
                          {faq.question}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {categoryInfo?.name}
                        </p>
                      </div>
                    </div>
                    
                    {/* Expand/Collapse Icon */}
                    <div className={`text-primary-color transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}>
                      <i className="fa-solid fa-chevron-down text-xl"></i>
                    </div>
                  </button>
                  
                  {/* Answer */}
                  {isExpanded && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <i className="fa-solid fa-search text-4xl text-gray-300 mb-4"></i>
              <p className="text-gray-500 text-lg">ไม่พบคำถามในหมวดหมู่นี้</p>
            </div>
          )}
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
