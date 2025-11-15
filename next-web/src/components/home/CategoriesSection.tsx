import Link from 'next/link';
import { Category } from '@/types';

interface CategoriesSectionProps {
  categories: Category[];
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  // Legacy fallback categories if no data
  const fallbackCategories = [
    {
      id: "cat-001",
      name: "เครื่องจักรงานคอนกรีต",
      image_url: "/category-concrete-cutter.jpg",
      description: "รถตัดคอนกรีต เครื่องขัดคอนกรีต"
    },
    {
      id: "cat-002",
      name: "เครื่องขัดมันพื้นปูน",
      image_url: "/category-power-trowel.jpg",
      description: "เครื่องขัดมัน ใบขัดมัน ถาดขัดมัน"
    },
    {
      id: "cat-003",
      name: "ใบและถาดขัดมัน",
      image_url: "/category-blades-pans.jpg",
      description: "ใบเจียร ใบตัด ถาดขัดมัน"
    },
    {
      id: "cat-004",
      name: "เครื่องปาดปูน",
      image_url: "/category-screed.jpg",
      description: "เครื่องปาดปูน อุปกรณ์ปาดปูน"
    },
    {
      id: "cat-005",
      name: "เครื่องตบดิน",
      image_url: "/category-compactor.jpg",
      description: "เครื่องตบดิน แผ่นตบดิน"
    },
    {
      id: "cat-006",
      name: "เครื่องผสมและผลิต",
      image_url: "/category-concrete-mixer.jpg",
      description: "โม่ผสมปูน เครื่องผสมคอนกรีต"
    },
    {
      id: "cat-007",
      name: "เครื่องปั่นไฟ",
      image_url: "/category-power-generator.jpg",
      description: "เครื่องปั่นไฟ จ่ายไฟ สำรองไฟ"
    },
    {
      id: "cat-008",
      name: "เครื่องดูดฝุ่นอุตสาหกรรม",
      image_url: "/category-industrial-vacuum.jpg",
      description: "เครื่องดูดฝุ่น อุปกรณ์ทำความสะอาด"
    }
  ];

  const displayCategories = fallbackCategories;

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
            <Link key={category.id} href={`/products/category/${category.id}`} className="category-card" style={{
              display: 'block',
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              backgroundColor: '#ffffff'
            }}>
              <div className="category-image" style={{ position: 'relative' }}>
                <img 
                  src={category.image_url} 
                  alt={category.name} 
                  loading="lazy" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    aspectRatio: '1 / 1'
                  }}
                />
                {!category.image_url && (
                  <div className="category-image-placeholder" style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f5',
                    color: '#999'
                  }}>
                    <i className="fa-solid fa-tools" style={{ fontSize: '2rem' }}></i>
                  </div>
                )}
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
