'use client';

import { useState } from 'react';
import { siteConfig } from '@/config/site';
import { Review } from '@/types';
import Link from 'next/link';
import SafeImage from '@/components/common/SafeImage';

interface ReviewsPageClientProps {
  reviews: Review[];
}

export default function ReviewsPageClient({ reviews: initialReviews }: ReviewsPageClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(initialReviews.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = initialReviews.slice(startIndex, endIndex);

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return Array.from({ length: 5 }, (_, i) => (
      <i 
        key={i} 
        className={`fa-solid fa-star ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      ></i>
    ));
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-color/10 via-yellow-400/10 to-primary-color/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-color to-yellow-400 rounded-3xl mb-8 shadow-xl">
              <i className="fa-solid fa-star text-white text-4xl"></i>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-dark-color thai-text leading-tight">
              รีวิวหน้างาน
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 thai-text leading-relaxed">
              รีวิวจากลูกค้าจริงที่ใช้บริการ 789 Tools ทั้งการซื้อ เช่า และซ่อมเครื่องมือ
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white px-6 py-3 rounded-full shadow-lg border border-gray-100">
                <span className="text-sm text-gray-600 thai-text">รีวิวทั้งหมด</span>
                <span className="text-lg font-black text-primary-color ml-2">{initialReviews.length}+</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-lg border border-gray-100">
                <span className="text-sm text-gray-600 thai-text">คะแนนเฉลี่ย</span>
                <span className="text-lg font-black text-yellow-400 ml-2">4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {initialReviews.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {currentReviews.map((review: Review) => (
                  <div key={review.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all border border-gray-100 group">
                    {review.image_url && (
                      <div className="aspect-video bg-gray-100 overflow-hidden">
                        <SafeImage
                          src={review.image_url}
                          alt={review.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          fallbackSrc="https://placehold.co/400x300/eee/ccc?text=รีวิว"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      {review.rating && (
                        <div className="flex items-center mb-4">
                          {renderStars(review.rating)}
                          <span className="ml-3 text-sm font-bold text-gray-600">
                            ({review.rating}/5)
                          </span>
                        </div>
                      )}
                      
                      {review.content && (
                        <p className="text-gray-700 mb-4 italic leading-relaxed thai-text line-clamp-3">
                          "{review.content}"
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div>
                          <p className="font-black text-dark-color thai-text">{review.name}</p>
                          {review.created_at && (
                            <p className="text-sm text-gray-500">{formatDate(review.created_at)}</p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary-color hover:text-white transition-all flex items-center justify-center text-gray-600">
                            <i className="fa-solid fa-thumbs-up text-sm"></i>
                          </button>
                          <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary-color hover:text-white transition-all flex items-center justify-center text-gray-600">
                            <i className="fa-solid fa-share text-sm"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${
                      currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-primary-color to-yellow-400 text-white hover:from-yellow-400 hover:to-primary-color shadow-lg'
                    }`}
                  >
                    <i className="fa-solid fa-chevron-left mr-2"></i>
                    ก่อนหน้า
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-6 py-3 rounded-xl font-bold transition-all ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-primary-color to-yellow-400 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-primary-color to-yellow-400 text-white hover:from-yellow-400 hover:to-primary-color shadow-lg'
                    }`}
                  >
                    ถัดไป
                    <i className="fa-solid fa-chevron-right ml-2"></i>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                <i className="fa-solid fa-star text-gray-400 text-3xl"></i>
              </div>
              <h3 className="text-2xl font-black text-gray-700 mb-3 thai-text">ยังไม่มีรีวิว</h3>
              <p className="text-gray-500 mb-8 thai-text">เรากำลังรวบรวมรีวิวจากลูกค้า</p>
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
              <i className="fa-solid fa-comments text-white text-4xl"></i>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white thai-text">ต้องการใช้บริการของเรา?</h2>
            <p className="text-xl mb-10 text-white/90 thai-text">ติดต่อเราได้ตลอด 24 ชั่วโมง</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center bg-white text-primary-color px-10 py-4 rounded-xl font-black hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl text-lg thai-text"
              >
                <i className="fa-solid fa-phone mr-3"></i>
                โทรเลย
              </a>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm border-2 border-white text-white px-10 py-4 rounded-xl font-black hover:bg-white/30 transition-all text-lg thai-text"
              >
                <i className="fa-solid fa-message mr-3"></i>
                ติดต่อเรา
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
