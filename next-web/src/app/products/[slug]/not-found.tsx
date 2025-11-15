import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <main className="product-detail-page">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs">
          <Link href="/">หน้าแรก</Link>
          <i className="fa-solid fa-chevron-right"></i>
          <Link href="/products">สินค้าทั้งหมด</Link>
          <i className="fa-solid fa-chevron-right"></i>
          <span>สินค้าไม่พบ</span>
        </nav>

        {/* Not Found Content */}
        <div className="product-detail-container" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 20px',
          minHeight: '500px'
        }}>
          {/* Icon */}
          <div style={{ 
            fontSize: '6rem', 
            color: '#e0e0e0', 
            marginBottom: '32px',
            lineHeight: '1'
          }}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          
          {/* Title */}
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            color: '#212121', 
            marginBottom: '16px',
            marginTop: '0'
          }}>
            ไม่พบสินค้าที่คุณค้นหา
          </h1>
          
          {/* Description */}
          <p style={{ 
            fontSize: '1rem', 
            color: '#424242', 
            marginBottom: '40px',
            maxWidth: '600px',
            lineHeight: '1.6',
            marginTop: '0'
          }}>
            ขออภัย สินค้าที่คุณกำลังมองหาอาจถูกลบไปแล้ว หรือ URL ไม่ถูกต้อง
            <br />
            ลองค้นหาสินค้าอื่น ๆ ของเราหรือกลับไปยังหน้าสินค้าทั้งหมด
          </p>
          
          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            width: '100%',
            maxWidth: '600px'
          }}>
            <Link 
              href="/products" 
              className="btn btn-primary"
              style={{ 
                padding: '14px 28px', 
                fontSize: '1rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '8px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              <i className="fa-solid fa-arrow-left"></i>
              กลับไปหน้าสินค้าทั้งหมด
            </Link>
            
            <Link 
              href="/" 
              className="btn btn-primary"
              style={{ 
                padding: '14px 28px', 
                fontSize: '1rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '8px',
                fontWeight: '500',
                backgroundColor: '#1976d2',
                color: '#ffffff',
                transition: 'all 0.3s ease'
              }}
            >
              <i className="fa-solid fa-house"></i>
              กลับไปหน้าแรก
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
