'use client';

import { useState } from 'react';
import { FAQItem } from '@/types';

interface FAQSectionProps {
  faqItems: FAQItem[];
}

export default function FAQSection({ faqItems }: FAQSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Use FAQ items from database or fallback to static data
  const displayFAQs = faqItems.length > 0 ? faqItems.slice(0, 5) : [
    {
      id: '1',
      question: 'สินค้ามีการรับประกันหรือไม่?',
      answer: 'สินค้าทุกชิ้นรับประกันคุณภาพ ตามเงื่อนไขของผู้ผลิต พร้อมบริการหลังการขาย',
      sort_order: 1,
      is_active: true
    },
    {
      id: '2',
      question: 'มีบริการเก็บเงินปลายทางหรือไม่?',
      answer: 'มีบริการเก็บเงินปลายทาง (COD) ทั่วประเทศ สำหรับสินค้าทุกรายการ',
      sort_order: 2,
      is_active: true
    },
    {
      id: '3',
      question: 'สามารถเช่าเครื่องมือได้หรือไม่?',
      answer: 'สามารถเช่าเครื่องมือได้ มีทั้งรายวันและรายเดือน ติดต่อสอบถามรายละเอียดได้',
      sort_order: 3,
      is_active: true
    }
  ];

  return (
    <section className="faq-section">
      <div className="container">
        <h2>คำถามที่พบบ่อย</h2>
        <div className="faq-accordion">
          {displayFAQs.map((faq, index) => (
            <div key={faq.id} className="faq-item">
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <i className={`fa-solid fa-chevron-${activeIndex === index ? 'up' : 'down'}`}></i>
              </button>
              <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        {faqItems.length > 5 && (
          <div className="faq-footer">
            <a href="/faq" className="btn btn-secondary">ดูคำถามเพิ่มเติม</a>
          </div>
        )}
      </div>
    </section>
  );
}
