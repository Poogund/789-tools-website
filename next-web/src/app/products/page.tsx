import { getProducts, getCategories, getProductsByCategory } from '@/lib/catalog-repository';
import { Product, Category } from '@/types';
import { Metadata } from 'next';
import Link from 'next/link';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'สินค้าทั้งหมด - 789 TOOLS',
  description: 'รวมสินค้าเครื่องมือก่อสร้าง เครื่องตัดคอนกรีต เครื่องขัดมัน เครื่องตบดิน เครื่องปั่นไฟ โม่ผสมปูน พร้อมตัวกรองสินค้าตามหมวดหมู่ จัดส่งทั่วประเทศ',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  // Fetch all products and categories
  const allProducts: Product[] = await getProducts();
  const categories: Category[] = await getCategories();
  
  // Filter products by category if specified
  let products: Product[] = allProducts;
  let selectedCategory: Category | null = null;
  
  if (searchParams.category) {
    products = await getProductsByCategory(searchParams.category);
    selectedCategory = categories.find(cat => cat.slug === searchParams.category) || null;
  }

  return (
    <div className="shop-page-main">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs">
          <Link href="/">หน้าแรก</Link>
          <i className="fa-solid fa-chevron-right"></i>
          <span>สินค้าทั้งหมด</span>
        </nav>

        <div className="shop-layout">
          {/* Sidebar with category filters */}
          <aside className="shop-sidebar">
            <div className="filter-group">
              <h3 className="filter-title">
                <i className="fa-solid fa-list"></i> หมวดหมู่สินค้า
              </h3>
              <ul className="filter-list">
                <li>
                  <Link 
                    href="/products" 
                    className={!selectedCategory ? 'active' : ''}
                  >
                    สินค้าทั้งหมด ({allProducts.length})
                  </Link>
                </li>
                {categories.map((category) => {
                  const categoryProductCount = allProducts.filter(p => p.category_id === category.id).length;
                  return (
                    <li key={category.id}>
                      <Link 
                        href={`/products?category=${category.slug}`}
                        className={selectedCategory?.id === category.id ? 'active' : ''}
                      >
                        {category.name} ({categoryProductCount})
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Main product grid */}
          <div className="shop-content">
            {/* Sort bar with product count */}
            <div className="sort-bar">
              <span className="product-count">
                กำลังแสดง {products.length} รายการ
                {selectedCategory && ` ในหมวดหมู่ ${selectedCategory.name}`}
              </span>
              <div className="sort-select">
                <label htmlFor="sort-by">เรียงตาม:</label>
                <select id="sort-by">
                  <option>ยอดนิยม</option>
                  <option>ใหม่ล่าสุด</option>
                  <option>ราคา: น้อยไปมาก</option>
                  <option>ราคา: มากไปน้อย</option>
                </select>
              </div>
            </div>

            {/* Product grid */}
            <ProductsClient products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
