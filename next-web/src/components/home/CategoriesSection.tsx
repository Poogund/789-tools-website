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
      image_url: "/category-concrete-cutter.jpg"
    },
    {
      id: "cat-002",
      name: "เครื่องขัดมันพื้นปูน",
      image_url: "/category-power-trowel.jpg"
    },
    {
      id: "cat-003",
      name: "ใบและถาดขัดมัน",
      image_url: "/category-blades-pans.jpg"
    },
    {
      id: "cat-004",
      name: "เครื่องปาดปูน",
      image_url: "/category-screed.jpg"
    },
    {
      id: "cat-005",
      name: "เครื่องตบดิน",
      image_url: "/category-compactor.jpg"
    },
    {
      id: "cat-006",
      name: "เครื่องผสมและผลิต",
      image_url: "/category-concrete-mixer.jpg"
    },
    {
      id: "cat-007",
      name: "เครื่องปั่นไฟ",
      image_url: "/category-power-generator.jpg"
    },
    {
      id: "cat-008",
      name: "เครื่องดูดฝุ่นอุตสาหกรรม",
      image_url: "/category-industrial-vacuum.jpg"
    }
  ];

  const displayCategories = categories.length > 0 ? categories : fallbackCategories;

  return (
    <section className="categories-section">
      <div className="container">
        <div className="categories-header">
          <div className="categories-title">
            <h2>หมวดหมู่สินค้า</h2>
            <p>เลือกได้ตามใจต้องการ</p>
          </div>
          <a href="/products" className="btn btn-primary">
            ดูสินค้าทั้งหมด <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
        <div className="category-grid">
          {displayCategories.map((category) => (
            <Link key={category.id} href={`/products/category/${category.id}`} className="category-card">
              <div className="category-image">
                <img src={category.image_url} alt={category.name} loading="lazy" />
                {!category.image_url && (
                  <div className="category-image-placeholder">
                    <i className="fa-solid fa-tools"></i>
                  </div>
                )}
              </div>
              <div className="card-name-overlay">
                <h3>{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
