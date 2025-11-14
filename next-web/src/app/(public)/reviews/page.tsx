'use client';

import { useState } from 'react';
import { reviewsConfig, Review } from '@/config/reviews';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

export default function ReviewsPage() {
  const { hero, reviews, pagination, cta } = reviewsConfig;
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = pagination.itemsPerPage;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = reviews.slice(startIndex, endIndex);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i 
        key={i} 
        className={`fa-solid fa-star ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      ></i>
    ));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

      {/* Reviews Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentReviews.map((review: Review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Review Image */}
                <div className="aspect-w-16 aspect-h-12 bg-gray-100">
                  <img
                    src={review.imageUrl}
                    alt={review.caption}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/400x300/eee/ccc?text=รีวิว';
                    }}
                  />
                </div>
                
                {/* Review Content */}
                <div className="p-6">
                  {/* Rating */}
                  {review.rating && (
                    <div className="flex items-center mb-3">
                      {renderStars(review.rating)}
                      {review.verified && (
                        <span className="ml-2 text-sm text-green-600 font-medium">
                          <i className="fa-solid fa-check-circle mr-1"></i>
                          ยืนยันแล้ว
                        </span>
                      )}
                    </div>
                  )}
                  
                  {/* Caption */}
                  <p className="text-gray-700 mb-4 italic">"{review.caption}"</p>
                  
                  {/* Customer Info */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div>
                      {review.customerName && (
                        <p className="font-medium text-dark-color">{review.customerName}</p>
                      )}
                      {review.date && <p>{review.date}</p>}
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-primary-color hover:text-yellow-600 transition-colors">
                        <i className="fa-solid fa-thumbs-up"></i>
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <i className="fa-solid fa-share"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-primary-color text-white hover:bg-yellow-500'
                }`}
              >
                <i className="fa-solid fa-chevron-left mr-2"></i>
                ก่อนหน้า
              </button>
              
              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-primary-color text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-primary-color text-white hover:bg-yellow-500'
                }`}
              >
                ถัดไป
                <i className="fa-solid fa-chevron-right ml-2"></i>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-section-bg-gray">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-dark-color">{cta.title}</h2>
          <p className="text-xl text-gray-600 mb-8">{cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center bg-primary-color text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              <i className="fa-solid fa-phone mr-2"></i>
              โทรเลย
            </a>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center bg-dark-color text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              <i className="fa-solid fa-message mr-2"></i>
              {cta.buttonText}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
