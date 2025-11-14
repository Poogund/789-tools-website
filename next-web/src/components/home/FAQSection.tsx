'use client';

import { FAQItem } from '@/types';
import { useEffect } from 'react';

interface FAQSectionProps {
  faqItems: FAQItem[];
}

export default function FAQSection({ faqItems }: FAQSectionProps) {
  // Legacy fallback FAQ items
  const fallbackFaqItems = [
    {
      id: "faq-1",
      question: "มีบริการเก็บเงินปลายทางไหม?",
      answer: "มีครับ เรามีบริการจัดส่งและเก็บเงินปลายทาง (COD) ทั่วประเทศ มั่นใจได้ว่าได้รับของแน่นอนก่อนชำระเงิน"
    },
    {
      id: "faq-2",
      question: "สินค้ามีรับประกันหรือไม่?",
      answer: "สินค้าทุกชิ้นจาก 789 Tools เป็นของแท้ 100% และมีการรับประกันจากผู้ผลิตโดยตรงตามเงื่อนไขที่กำหนด ท่านสามารถตรวจสอบรายละเอียดการรับประกันได้ที่หน้าสินค้าแต่ละรายการ"
    },
    {
      id: "faq-3",
      question: "ขั้นตอนการเช่าเครื่องมือทำอย่างไร?",
      answer: "สำหรับการเช่าเครื่องมือ กรุณาติดต่อเราโดยตรงผ่านเบอร์โทรศัพท์หรือ LINE Official เพื่อสอบถามคิวว่างและเงื่อนไขการเช่า เจ้าหน้าที่จะให้ข้อมูลและแนะนำขั้นตอนอย่างละเอียดครับ"
    },
    {
      id: "faq-4",
      question: "ถ้าเครื่องมือมีปัญหาระหว่างใช้งานทำอย่างไร?",
      answer: "หากพบปัญหาการใช้งาน สามารถติดต่อทีมช่างเทคนิคของเราได้ทันที เรามีทีมผู้เชี่ยวชาญพร้อมให้คำปรึกษาและแก้ไขปัญหาเบื้องต้นทางโทรศัพท์ หรือนัดหมายเพื่อเข้าตรวจสอบตามความเหมาะสม"
    }
  ];

  const displayFaqItems = faqItems.length > 0 ? faqItems : fallbackFaqItems;

  useEffect(() => {
    // Add click event listeners for FAQ accordion (matching legacy behavior)
    const questions = document.querySelectorAll(".faq-question");
    questions.forEach((question) => {
      question.addEventListener("click", () => {
        const faqItem = question.parentElement;
        if (faqItem) {
          faqItem.classList.toggle("active");
        }
      });
    });

    // Cleanup event listeners
    return () => {
      questions.forEach((question) => {
        question.removeEventListener("click", () => {});
      });
    };
  }, [displayFaqItems]);

  return (
    <section className="faq-section">
      <div className="container">
        <h2>คำถามที่พบบ่อย</h2>
        <div className="faq-accordion">
          {displayFaqItems.map((faq) => (
            <div key={faq.id} className="faq-item">
              <div className="faq-question">
                <span>{faq.question}</span>
                <div className="faq-icon"></div>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
