import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'บทความไม่พบ | 789 เครื่องมือช่าง',
  description: 'ไม่พบบทความที่คุณค้นหา กรุณาลองค้นหาบทความอื่นๆ จากเว็บไซต์ 789 เครื่องมือช่าง',
};

export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-light-gray-bg flex items-center justify-center">
      <div className="text-center px-4">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-primary-color/10 rounded-full">
            <i className="fa-solid fa-newspaper text-primary-color text-5xl"></i>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-dark-color mb-4 thai-text">
          ไม่พบบทความ
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto thai-text">
          ขออภัย ไม่พบบทความที่คุณกำลังค้นหา 
          บทความนี้อาจถูกลบไปแล้ว หรือ URL อาจไม่ถูกต้อง
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center bg-primary-color text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors thai-text"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>
            กลับไปหน้าบทความทั้งหมด
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center border-2 border-primary-color text-primary-color px-8 py-3 rounded-lg font-semibold hover:bg-primary-color hover:text-white transition-colors thai-text"
          >
            <i className="fa-solid fa-home mr-2"></i>
            กลับหน้าแรก
          </Link>
        </div>

        {/* Search Suggestion */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-dark-color mb-3 thai-text">
            ค้นหาบทความอื่นๆ
          </h3>
          <p className="text-gray-600 mb-4 thai-text">
            ลองค้นหาบทความเกี่ยวกับวิธีเลือกเครื่องมือ การดูแลรักษา หรือเคสงานจริง
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 bg-section-bg-gray text-text-color text-sm rounded-full thai-text">
              วิธีเลือกเครื่องมือ
            </span>
            <span className="px-3 py-1 bg-section-bg-gray text-text-color text-sm rounded-full thai-text">
              การดูแลรักษา
            </span>
            <span className="px-3 py-1 bg-section-bg-gray text-text-color text-sm rounded-full thai-text">
              เคสงานจริง
            </span>
            <span className="px-3 py-1 bg-section-bg-gray text-text-color text-sm rounded-full thai-text">
              คู่มือการใช้งาน
            </span>
          </div>
        </div>

        {/* Contact Help */}
        <div className="mt-8 text-gray-600 thai-text">
          <p className="mb-2">ต้องการความช่วยเหลือเพิ่มเติมหรือไม่?</p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <a 
              href="tel:02-xxx-xxxx" 
              className="flex items-center text-accent-color hover:text-primary-color transition-colors"
            >
              <i className="fa-solid fa-phone mr-1"></i>
              โทร: 02-xxx-xxxx
            </a>
            <span className="text-gray-400">|</span>
            <a 
              href="https://line.me/ti/p/~@789tools" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-accent-color hover:text-primary-color transition-colors"
            >
              <i className="fa-brands fa-line mr-1"></i>
              LINE Official
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
