'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Product } from '@/types';

interface PromotionProductsSectionProps {
  products: Product[];
}

type PromotionCard = {
  id: string;
  name: string;
  link: string;
  image: string;
  price: number;
  originalPrice?: number;
};

const fallbackPromotions: PromotionCard[] = [
  {
    id: 'promo-001',
    name: 'รถตัดพื้นคอนกรีต',
    link: '#',
    image: '/รถตัดพื้นคอนกรีต.png',
    price: 21900,
    originalPrice: 25900,
  },
  {
    id: 'promo-002',
    name: 'แมงปอขัดหน้าปูน',
    link: '#',
    image: '/แมงปอขัดหน้าปูน.png',
    price: 17900,
    originalPrice: 23000,
  },
  {
    id: 'promo-003',
    name: 'เครื่องตบดิน',
    link: '#',
    image: '/เครื่องตบดิน.png',
    price: 18000,
    originalPrice: 22900,
  },
  {
    id: 'promo-004',
    name: 'โม่ผสมปูน',
    link: '#',
    image: '/โม่ผสมปูนฉาบ.png',
    price: 12900,
    originalPrice: 16900,
  },
  {
    id: 'promo-005',
    name: 'เครื่องปั่นไฟ',
    link: '#',
    image: '/เครื่องปั่นไฟ.png',
    price: 9900,
    originalPrice: 13900,
  },
  {
    id: 'promo-006',
    name: 'เครื่องดูดฝุ่นอุตสาหกรรม',
    link: '#',
    image: '/เครื่องดูดฝุ่น.png',
    price: 8200,
    originalPrice: 11500,
  },
];

const VISIBLE_COUNT = 3;
const AUTOPLAY_DELAY = 5000;

export default function PromotionProductsSection({ products }: PromotionProductsSectionProps) {
  const formatPrice = (price: number) => new Intl.NumberFormat('th-TH').format(price);

  const normalizedProducts = useMemo<PromotionCard[]>(() => {
    if (!products || products.length === 0) {
      return [];
    }

    return products
      .filter((product) => product)
      .map((product) => ({
        id: product.id,
        name: product.name,
        link: product.slug ? `/products/${product.slug}` : '#',
        image: product.image_url || product.image_path || '/placeholder-product.jpg',
        price: product.price,
        originalPrice: product.original_price,
      }));
  }, [products]);

  const cards = useMemo<PromotionCard[]>(() => {
    if (normalizedProducts.length >= 6) {
      return normalizedProducts.slice(0, 6);
    }

    const combined = [...normalizedProducts, ...fallbackPromotions];
    return combined.slice(0, 6);
  }, [normalizedProducts]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [cards.length]);

  useEffect(() => {
    if (cards.length <= VISIBLE_COUNT) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(timer);
  }, [cards.length]);

  const handlePrev = () => {
    if (cards.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleNext = () => {
    if (cards.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const visibleProducts = useMemo(() => {
    if (cards.length <= VISIBLE_COUNT) {
      return cards;
    }

    return Array.from({ length: VISIBLE_COUNT }, (_, index) => {
      const cardIndex = (currentIndex + index) % cards.length;
      return cards[cardIndex];
    });
  }, [cards, currentIndex]);

  if (cards.length === 0) {
    return null;
  }

  return (
    <section className="promotion-products-section">
      <div className="container">
        <div className="section-header">
          <div className="section-title">
            <h2 className="thai-text">สินค้าโปรโมชั่น</h2>
            <p className="thai-text">สินค้าราคาพิเศษ</p>
          </div>
          <Link href="/promotions" className="btn btn-primary thai-text">
            ดูสินค้าโปรเพิ่มเติม <i className="fa-solid fa-tag"></i>
          </Link>
        </div>

        <div className="promotion-slider">
          <button
            type="button"
            className="promotion-slider-button prev"
            onClick={handlePrev}
            aria-label="ดูสินค้าโปรโมชั่นก่อนหน้า"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <div className="product-grid-fixed promotion-slider-grid">
            {visibleProducts.map((product, index) => (
              <Link key={`${product.id}-${index}`} href={product.link} className="product-card">
                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                  <span className="product-badge promotion">โปร</span>
                </div>
                <div className="product-info">
                  <h3 className="thai-text">{product.name}</h3>
                  <div className="product-price">
                    <span className="current-price">฿ {formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="original-price">฿ {formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="promotion-slider-button next"
            onClick={handleNext}
            aria-label="ดูสินค้าโปรโมชั่นถัดไป"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
