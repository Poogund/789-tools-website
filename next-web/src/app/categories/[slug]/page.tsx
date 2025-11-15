import { getCategoryBySlug, getProductsByCategory } from '@/lib/catalog-repository';
import { Category, Product } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductsClient from '../../products/ProductsClient';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all categories (optional, for static generation)
export async function generateStaticParams() {
  const categories = await import('@/lib/catalog-repository').then(mod => 
    mod.getCategories()
  );
  
  return categories.map((category: Category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    return {
      title: 'หมวดหมู่ไม่พบ - 789 TOOLS',
    };
  }

  return {
    title: `${category.name} - 789 TOOLS`,
    description: category.description || `ซื้อสินค้าหมวด ${category.name} ที่ 789 TOOLS ศูนย์รวมเครื่องมือก่อสร้างคุณภาพสูง`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  // Fetch category data
  const category = await getCategoryBySlug(slug);
  
  // Handle not found
  if (!category) {
    notFound();
  }

  // Fetch products in this category
  const products: Product[] = await getProductsByCategory(slug);

  return (
    <div className="shop-page-main">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs">
          <Link href="/">หน้าแรก</Link>
          <i className="fa-solid fa-chevron-right"></i>
          <Link href="/products">สินค้าทั้งหมด</Link>
          <i className="fa-solid fa-chevron-right"></i>
          <span>{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="category-header">
          <h1 className="category-title">{category.name}</h1>
          {category.description && (
            <p className="category-description">{category.description}</p>
          )}
        </div>

        {/* Products Grid */}
        <div className="shop-content">
          {/* Sort bar with product count */}
          <div className="sort-bar">
            <span className="product-count">
              กำลังแสดง {products.length} รายการ ในหมวดหมู่ {category.name}
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
  );
}
