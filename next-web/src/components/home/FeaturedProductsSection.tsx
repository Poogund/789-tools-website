import { Product } from '@/types';

interface FeaturedProductsSectionProps {
  products: Product[];
}

export default function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  // Legacy fallback products if no data - 6 products for 3x2 grid
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
    },
    {
      id: "prod-004",
      name: "เครื่องขัดมันพื้นปูน",
      image_path: "/แมงปอขัดหน้าปูน.png",
      price: "15,900",
      original_price: "19,900",
      discount_percentage: "-20%"
    },
    {
      id: "prod-005",
      name: "โม่ผสมปูน",
      image_path: "/โม่ผสมปูนฉาบ.png",
      price: "12,900",
      original_price: "16,900",
      discount_percentage: "-24%"
    },
    {
      id: "prod-006",
      name: "เครื่องปั่นไฟ",
      image_path: "/เครื่องปั่นไฟ.png",
      price: "9,900",
      original_price: "13,900",
      discount_percentage: "-29%"
    }
  ];

  const displayProducts = products.length > 0 ? products.slice(0, 6) : fallbackProducts;

  return (
    <section className="featured-products-section">
      <div className="container">
        <div className="section-header">
          <div className="section-title">
            <h2 className="thai-text">สินค้าแนะนำ</h2>
            <p className="thai-text">เลือกซื้อสินค้าแนะนำ</p>
          </div>
          <a href="/products" className="btn btn-primary thai-text">
            ดูสินค้าเพิ่มเติม <i className="fa-solid fa-play"></i>
          </a>
        </div>
        <div className="product-grid-fixed" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {displayProducts.map((product) => (
            <div key={product.id} className="product-card" style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}>
              <div className="discount-badge" style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: '#d32f2f',
                color: '#ffffff',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: '700',
                zIndex: '1'
              }}>{product.discount_percentage}</div>
              <div className="product-image-container" style={{
                position: 'relative',
                width: '100%',
                height: '180px', // Reduced height for smaller cards
                overflow: 'hidden'
              }}>
                <img 
                  src={product.image_path} 
                  alt={product.name} 
                  loading="lazy" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </div>
              <div className="product-info" style={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: '1'
              }}>
                <h3 className="product-name thai-text" style={{
                  fontSize: '1rem',
                  fontWeight: '700',
                  marginBottom: '12px',
                  color: '#2c2c2c',
                  lineHeight: '1.4'
                }}>{product.name}</h3>
                <div className="product-pricing" style={{
                  marginBottom: '16px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span className="current-price" style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    color: '#d32f2f'
                  }}>฿ {product.price}</span>
                  <span className="original-price" style={{
                    fontSize: '0.8rem',
                    color: '#757575',
                    textDecoration: 'line-through'
                  }}>฿ {product.original_price}</span>
                </div>
                <a href={`/products/${product.id}`} className="btn thai-text" style={{
                  width: '100%',
                  marginTop: 'auto',
                  padding: '10px 16px',
                  fontSize: '0.95rem',
                  textAlign: 'center',
                  textDecoration: 'none',
                  backgroundColor: '#000aff',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 0 rgba(0,0,0,0.2)'
                }}>ดูรายละเอียด</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
