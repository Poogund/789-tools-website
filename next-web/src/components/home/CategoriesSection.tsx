import Link from 'next/link';
import { Category } from '@/types';
import SafeImage from '@/components/common/SafeImage';

interface CategoriesSectionProps {
  categories: Category[];
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  // Use categories from Supabase, fallback to empty array if none provided
  const displayCategories = categories && categories.length > 0 ? categories : [];

  return (
    <section className="categories-section" style={{ backgroundColor: '#e0e0e0', padding: '60px 0' }}>
      <div className="container">
        <div className="categories-header">
          <div className="categories-title">
            <h2 className="thai-text">หมวดหมู่สินค้า</h2>
            <p className="thai-text">เลือกได้ตามใจต้องการ</p>
          </div>
          <a href="/products" className="btn btn-primary thai-text">
            ดูสินค้าทั้งหมด <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
        <div className="category-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '24px'
        }}>
          {displayCategories.map((category) => (
            <Link key={category.id} href={`/products/category/${category.slug}`} className="category-card" style={{
              display: 'block',
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              backgroundColor: '#ffffff'
            }}>
              <div className="category-image" style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
                <SafeImage
                  src={category.image_url || ''}
                  alt={category.name}
                  className="category-img"
                  fallbackSrc="https://placehold.co/400x400/e0e0e0/999?text=Category"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
              <div className="card-name-overlay thai-text" style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))',
                color: '#ffffff',
                padding: '24px 12px 12px 12px',
                textAlign: 'center',
                transition: 'background 0.3s ease'
              }}>
                <h3 style={{
                  
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  padding: '0',
                  margin: '0'
                }}>{category.name}</h3>
                {category.description && (
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#ffffff',
                    margin: '4px 0 0 0',
                    opacity: '0.9',
                    fontWeight: '400'
                  }}>{category.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
