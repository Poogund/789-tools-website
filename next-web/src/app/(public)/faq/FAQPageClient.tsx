'use client';

import { useState } from 'react';
import { siteConfig } from '@/config/site';
import { FAQItem } from '@/types';
import Link from 'next/link';

interface FAQPageClientProps {
  faqItems: FAQItem[];
}

export default function FAQPageClient({ faqItems }: FAQPageClientProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  const faqs = faqItems.map(item => ({
    id: item.id,
    question: item.question,
    answer: item.answer,
    category: 'general'
  }));

  const toggleExpanded = (faqId: string) => {
    setExpandedItems(prev => 
      prev.includes(faqId) 
        ? prev.filter(id => id !== faqId)
        : [...prev, faqId]
    );
  };

  const expandAll = () => {
    setExpandedItems(faqs.map(faq => faq.id));
  };

  const collapseAll = () => {
    setExpandedItems([]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-color/10 via-yellow-400/10 to-primary-color/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-color to-yellow-400 rounded-3xl mb-8 shadow-xl">
              <i className="fa-solid fa-question-circle text-white text-4xl"></i>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-dark-color thai-text leading-tight">
              คำถามที่พบบ่อย
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 thai-text leading-relaxed">
              ค้นหาคำตอบสำหรับคำถามที่คุณสงสัย
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white px-6 py-3 rounded-full shadow-lg border border-gray-100">
                <span className="text-sm text-gray-600 thai-text">คำถามทั้งหมด</span>
                <span className="text-lg font-black text-primary-color ml-2">{faqs.length}+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Action Buttons */}
          <div className="flex justify-between items-center mb-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center text-gray-700">
              <i className="fa-solid fa-info-circle mr-3 text-primary-color text-xl"></i>
              <span className="font-bold thai-text">พบ {faqs.length} คำถาม</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={expandAll}
                className="px-5 py-2 bg-primary-color/10 text-primary-color rounded-xl font-bold hover:bg-primary-color/20 transition-all thai-text"
              >
                <i className="fa-solid fa-expand mr-2"></i>
                ขยายทั้งหมด
              </button>
              <button
                onClick={collapseAll}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all thai-text"
              >
                <i className="fa-solid fa-compress mr-2"></i>
                ย่อทั้งหมด
              </button>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isExpanded = expandedItems.includes(faq.id);
              
              return (
                <div 
                  key={faq.id} 
                  className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'border-primary-color shadow-xl' : 'border-gray-100 hover:border-primary-color/50'
                  }`}
                >
                  <button
                    onClick={() => toggleExpanded(faq.id)}
                    className={`w-full px-8 py-6 text-left flex items-center justify-between transition-all duration-300 ${
                      isExpanded ? 'bg-gradient-to-r from-primary-color/5 to-yellow-400/5' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center flex-1 gap-6">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black transition-all ${
                        isExpanded 
                          ? 'bg-gradient-to-br from-primary-color to-yellow-400 text-white' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      
                      <h3 className={`text-xl font-black transition-colors thai-text ${
                        isExpanded ? 'text-primary-color' : 'text-dark-color'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>
                    
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      isExpanded 
                        ? 'bg-gradient-to-br from-primary-color to-yellow-400 text-white rotate-180' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <i className="fa-solid fa-chevron-down"></i>
                    </div>
                  </button>
                  
                  <div className={`transition-all duration-300 ${
                    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}>
                    <div className="px-8 py-6 bg-gradient-to-br from-gray-50 to-white border-t-2 border-gray-100">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mt-1">
                          <i className="fa-solid fa-check text-green-600"></i>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-lg thai-text flex-1">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {faqs.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                <i className="fa-solid fa-search text-gray-400 text-3xl"></i>
              </div>
              <h3 className="text-2xl font-black text-gray-700 mb-3 thai-text">ไม่พบคำถาม</h3>
              <p className="text-gray-500 mb-8 thai-text">ติดต่อเราสอบถามข้อมูลเพิ่มเติม</p>
            </div>
          )}
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
              <i className="fa-solid fa-headset text-white text-4xl"></i>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white thai-text">ยังมีคำถามเพิ่มเติม?</h2>
            <p className="text-xl mb-10 text-white/90 thai-text">ติดต่อเราได้ตลอด 24 ชั่วโมง</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center bg-white text-primary-color px-10 py-4 rounded-xl font-black hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl text-lg thai-text"
              >
                <i className="fa-solid fa-phone mr-3"></i>
                โทรหาเรา
              </a>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm border-2 border-white text-white px-10 py-4 rounded-xl font-black hover:bg-white/30 transition-all text-lg thai-text"
              >
                <i className="fa-solid fa-message mr-3"></i>
                ติดต่อเรา
              </Link>
              <a 
                href={siteConfig.links.line}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#00C300] text-white px-10 py-4 rounded-xl font-black hover:bg-[#00B300] transition-all shadow-xl hover:shadow-2xl text-lg"
              >
                <i className="fa-brands fa-line mr-3"></i>
                LINE Official
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
