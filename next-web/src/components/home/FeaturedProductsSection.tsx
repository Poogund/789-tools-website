import { Product } from '@/types';

interface FeaturedProductsSectionProps {
  products: Product[];
}

export default function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  // Legacy fallback products if no data
  const fallbackProducts = [
    {
      id: "prod-001",
      name: "รถตัดพื้นคอนกรีต",
      image_path: "/รถตัดพื้นคอนกรีต.png",
      price: "21,900",
      original_price: "25,900",
      discount_percentage: "-16%"
    },
    {
      id: "prod-002",
      name: "แมงปอขัดหน้าปูน",
      image_path: "/แมงปอขัดหน้าปูน.png",
      price: "17,900",
      original_price: "23,000",
      discount_percentage: "-23%"
    },
    {
      id: "prod-003",
      name: "เครื่องตบดิน",
      image_path: "/เครื่องตบดิน.png",
      price: "18,000",
      original_price: "22,900",
      discount_percentage: "-22%"
    }
  ];

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  return (
    <section className="featured-products-section">
      <div className="container">
        <div className="section-header">
          <div className="section-title">
            <h2>สินค้าแนะนำ</h2>
            <p>เลือกซื้อสินค้าแนะนำ</p>
          </div>
          <a href="/products" className="btn btn-primary">
            ดูสินค้าเพิ่มเติม <i className="fa-solid fa-play"></i>
          </a>
        </div>
        <div className="product-grid-fixed">
          {displayProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="discount-badge">{product.discount_percentage}</div>
              <div className="product-image-container">
                <img src={product.image_path} alt={product.name} loading="lazy" />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-pricing">
                  <span className="current-price">฿ {product.price}</span>
                  <span className="original-price">฿ {product.original_price}</span>
                </div>
                <a href="#" className="btn btn-secondary">ดูรายละเอียด</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
