import Link from 'next/link';

export default function CategoryNotFound() {
  return (
    <main className="shop-page-main">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs">
          <Link href="/">หน้าแรก</Link>
          <i className="fa-solid fa-chevron-right"></i>
          <Link href="/products">สินค้าทั้งหมด</Link>
          <i className="fa-solid fa-chevron-right"></i>
          <span>หมวดหมู่ไม่พบ</span>
        </nav>

        {/* Not Found Content */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          textAlign: 'center',
          padding: '60px 20px',
          minHeight: '400px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ 
            fontSize: '4rem', 
            color: '#ccc', 
            marginBottom: '24px' 
          }}>
            <i className="fa-solid fa-folder-open"></i>
          </div>
          
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            color: 'var(--dark-color)', 
            marginBottom: '16px' 
          }}>
            ไม่พบหมวดหมู่สินค้า
          </h1>
          
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#666', 
            marginBottom: '32px',
            maxWidth: '500px',
            lineHeight: '1.6'
          }}>
            ขออภัย หมวดหมู่สินค้าที่คุณกำลังมองหาอาจถูกลบไปแล้ว 
            หรือ URL ไม่ถูกต้อง ลองเลือกหมวดหมู่อื่น ๆ ของเราหรือกลับไปยังหน้าสินค้าทั้งหมด
          </p>
          
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link 
              href="/products" 
              className="btn btn-primary"
              style={{ 
                padding: '14px 24px', 
                fontSize: '1rem',
                textDecoration: 'none'
              }}
            >
              <i className="fa-solid fa-arrow-left" style={{ marginRight: '8px' }}></i>
              กลับไปหน้าสินค้าทั้งหมด
            </Link>
            
            <Link 
              href="/" 
              className="btn"
              style={{ 
                padding: '14px 24px', 
                fontSize: '1rem',
                backgroundColor: '#f5f5f5',
                color: 'var(--dark-color)',
                border: '1px solid #ddd',
                textDecoration: 'none',
                borderRadius: '8px'
              }}
            >
              <i className="fa-solid fa-home" style={{ marginRight: '8px' }}></i>
              กลับไปหน้าแรก
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
