import Link from 'next/link';
import { Category } from '@/types';

interface CategoriesSectionProps {
  categories: Category[];
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="categories-section">
      <div className="container">
        <div className="categories-header">
          <div className="categories-title">
            <h2>หมวดหมู่สินค้า</h2>
            <p>เลือกได้ตามใจต้องการ</p>
          </div>
          <Link href="/products" className="btn btn-primary">
            ดูสินค้าทั้งหมด <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
        <div className="category-grid">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/categories/${category.slug}`}
                className="category-card"
              >
                <div className="category-image">
                  {category.image_url ? (
                    <img src={category.image_url} alt={category.name} />
                  ) : (
                    <div className="category-placeholder">
                      <i className="fa-solid fa-tools"></i>
                    </div>
                  )}
                </div>
                <div className="category-info">
                  <h3>{category.name}</h3>
                  {category.description && (
                    <p>{category.description}</p>
                  )}
                </div>
              </Link>
            ))
          ) : (
            // Fallback categories if no data
            <>
              <div className="category-card">
                <div className="category-image">
                  <div className="category-placeholder">
                    <i className="fa-solid fa-tools"></i>
                  </div>
                </div>
                <div className="category-info">
                  <h3>รถตัดคอนกรีต</h3>
                  <p>รถตัดคอนกรีต คุณภาพดี</p>
                </div>
              </div>
              <div className="category-card">
                <div className="category-image">
                  <div className="category-placeholder">
                    <i className="fa-solid fa-bolt"></i>
                  </div>
                </div>
                <div className="category-info">
                  <h3>เครื่องขัดมัน</h3>
                  <p>เครื่องขัดพื้นคอนกรีต</p>
                </div>
              </div>
              <div className="category-card">
                <div className="category-image">
                  <div className="category-placeholder">
                    <i className="fa-solid fa-hammer"></i>
                  </div>
                </div>
                <div className="category-info">
                  <h3>เครื่องตบดิน</h3>
                  <p>เครื่องตบดินระบบไฮดรอลิค</p>
                </div>
              </div>
              <div className="category-card">
                <div className="category-image">
                  <div className="category-placeholder">
                    <i className="fa-solid fa-broom"></i>
                  </div>
                </div>
                <div className="category-info">
                  <h3>เครื่องเป่าพื้น</h3>
                  <p>เครื่องเป่าพื้นคอนกรีต</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
