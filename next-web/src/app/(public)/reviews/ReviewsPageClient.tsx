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
  const itemsPerPage = 6;
  const totalPages = Math.ceil(initialReviews.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = initialReviews.slice(startIndex, endIndex);

  // Calculate average rating
  const averageRating = initialReviews.length > 0
    ? (initialReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / initialReviews.length).toFixed(1)
    : '0';

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return Array.from({ length: 5 }, (_, i) => (
      <i 
        key={i} 
        className={`fa-solid fa-star ${i < rating ? 'star-filled' : 'star-empty'}`}
      ></i>
    ));
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 
                    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear() + 543}`;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="reviews-page">
      {/* Hero Section - More Natural */}
      <section className="reviews-hero">
        <div className="container">
          <div className="reviews-hero-content">
            <h1 className="reviews-hero-title">
              รีวิวจากลูกค้าจริง
            </h1>
            <p className="reviews-hero-description">
              ลูกค้าของเราพูดถึงเราอย่างไร
            </p>
            
            <div className="reviews-summary">
              <div className="summary-item">
                <span className="summary-number">{initialReviews.length}</span>
                <span className="summary-label">รีวิว</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-item">
                <div className="summary-rating">
                  <span className="summary-rating-number">{averageRating}</span>
                  <div className="summary-stars">
                    {Array.from({ length: 5 }, (_, i) => (
                      <i key={i} className="fa-solid fa-star star-filled"></i>
                    ))}
                  </div>
                </div>
                <span className="summary-label">คะแนนเฉลี่ย</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="reviews-grid-section">
        <div className="container">
          {initialReviews.length > 0 ? (
            <>
              <div className="reviews-grid">
                {currentReviews.map((review: Review, index: number) => (
                  <article key={review.id} className="review-card">
                    <div className="review-header">
                      <div className="review-author-info">
                        <div className="author-avatar">
                          {review.name.charAt(0)}
                        </div>
                        <div className="author-details">
                          <h3 className="author-name">{review.name}</h3>
                          {review.created_at && (
                            <time className="review-date">{formatDate(review.created_at)}</time>
                          )}
                        </div>
                      </div>
                      {review.rating && (
                        <div className="review-rating-badge">
                          {renderStars(review.rating)}
                        </div>
                      )}
                    </div>

                    {review.content && (
                      <div className="review-body">
                        <div className="quote-icon">
                          <i className="fa-solid fa-quote-left"></i>
                        </div>
                        <p className="review-text">{review.content}</p>
                      </div>
                    )}

                    {review.image_url && (
                      <div className="review-image">
                        <SafeImage
                          src={review.image_url}
                          alt={`รีวิวจาก ${review.name}`}
                          className="review-img"
                          fallbackSrc="/review-placeholder.jpg"
                        />
                      </div>
                    )}

                    <div className="review-footer">
                      <div className="review-verified">
                        <i className="fa-solid fa-check-circle"></i>
                        <span>รีวิวยืนยันแล้ว</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="reviews-pagination" aria-label="การนำทางหน้า">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-btn prev"
                    aria-label="หน้าก่อนหน้า"
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  
                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      const showPage = 
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 1 && page <= currentPage + 1);
                      
                      if (!showPage && page === currentPage - 2 && currentPage > 3) {
                        return <span key={page} className="pagination-ellipsis">...</span>;
                      }
                      if (!showPage && page === currentPage + 2 && currentPage < totalPages - 2) {
                        return <span key={page} className="pagination-ellipsis">...</span>;
                      }
                      if (!showPage) return null;
                      
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                          aria-label={`หน้า ${page}`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-btn next"
                    aria-label="หน้าถัดไป"
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </nav>
              )}
            </>
          ) : (
            <div className="reviews-empty">
              <div className="empty-icon">
                <i className="fa-regular fa-comment-dots"></i>
              </div>
              <h3>ยังไม่มีรีวิว</h3>
              <p>เรากำลังรวบรวมรีวิวจากลูกค้า</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="reviews-cta">
        <div className="container">
          <div className="cta-content">
            <h2>พร้อมเป็นส่วนหนึ่งของรีวิวเหล่านี้?</h2>
            <p>
              ติดต่อเราเพื่อใช้บริการและร่วมเป็นส่วนหนึ่งของรีวิวเหล่านี้
            </p>
            <div className="cta-buttons">
              <a 
                href={`tel:${siteConfig.phone}`}
                className="cta-btn primary"
              >
                <i className="fa-solid fa-phone"></i>
                โทร {siteConfig.phone}
              </a>
              <Link 
                href="/contact"
                className="cta-btn secondary"
              >
                <i className="fa-solid fa-envelope"></i>
                ส่งข้อความ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
