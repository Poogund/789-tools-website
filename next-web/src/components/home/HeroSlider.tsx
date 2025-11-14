'use client';

import { useState, useEffect } from 'react';
import { HeroSlide } from '@/types';

interface HeroSliderProps {
  slides: HeroSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slides
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) {
    // Fallback hero section if no slides
    return (
      <section className="min-h-[85vh] py-16 text-center md:text-left md:justify-start hero-section">
        <div className="hero-content-container container items-center md:items-start">
          <h1 className="text-4xl md:text-6xl font-bold">ศูนย์รวมเครื่องมือช่าง<br />&amp; เครื่องจักรก่อสร้าง</h1>
          <p className="hero-subtitle text-2xl md:text-4xl font-bold text-brand-primary mb-6">ขาย-เช่า ครบ จบที่เดียว</p>
          <div className="hero-buttons flex flex-col md:flex-row gap-4">
            <a href="tel:0657898285" className="btn btn-primary">โทรเลย</a>
            <a href="/products" className="btn btn-secondary">ดูสินค้า</a>
          </div>
        </div>
      </section>
    );
  }

  const slide = slides[currentSlide];

  return (
    <section className="min-h-[85vh] py-16 text-center md:text-left md:justify-start hero-section">
      <div className="hero-slider">
        {/* Slide Content */}
        <div className="hero-slide active" style={{ 
          backgroundImage: slide.image_url ? `url(${slide.image_url})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className="hero-overlay">
            <div className="hero-content-container container items-center md:items-start">
              <h1 className="text-4xl md:text-6xl font-bold">{slide.headline}</h1>
              {slide.subheadline && <p className="hero-subtitle text-2xl md:text-4xl font-bold text-brand-primary mb-6">{slide.subheadline}</p>}
              <div className="hero-buttons flex flex-col md:flex-row gap-4">
                <a href="tel:0657898285" className="btn btn-primary">โทรเลย</a>
                {slide.button_text && slide.button_url && (
                  <a href={slide.button_url} className="btn btn-secondary">
                    {slide.button_text}
                  </a>
                )}
                {!slide.button_text && (
                  <a href="/products" className="btn btn-secondary">ดูสินค้า</a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button className="hero-nav prev" onClick={prevSlide}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className="hero-nav next" onClick={nextSlide}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {slides.length > 1 && (
          <div className="hero-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
