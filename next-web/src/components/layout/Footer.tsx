export default function Footer() {
  return (
    <footer className="site-footer" style={{
      backgroundColor: '#2c2c2c',
      color: '#ccc',
      fontSize: 'clamp(0.85rem, 2vw, 0.95rem)'
    }}>
      <div className="footer-main" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="footer-grid" style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1.5fr 1.5fr 1.5fr',
            gap: '30px'
          }}>
            <div className="footer-column">
              <h3 style={{
                fontSize: 'clamp(1.2rem, 3vw, 1.4rem)',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '16px'
              }}>789 TOOLS</h3>
              <p style={{
                lineHeight: '1.6',
                marginBottom: '24px',
                color: '#ccc'
              }}>ศูนย์รวมเครื่องมือช่างก่อสร้างครบวงจร ขาย-เช่า รถตัดคอนกรีต เครื่องขัดมัน เครื่องตบดิน พร้อมบริการซ่อมโดยช่างผู้เชี่ยวชาญ</p>
              <div className="social-links" style={{ display: 'flex', gap: '12px' }}>
                <a href="https://facebook.com/789tools" target="_blank" rel="noopener noreferrer" className="social-link facebook" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#1877f2',
                  color: '#ffffff',
                  borderRadius: '50%',
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease'
                }}>
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="https://line.me/ti/p/~@789tools" target="_blank" rel="noopener noreferrer" className="social-link line" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#06c755',
                  color: '#ffffff',
                  borderRadius: '50%',
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease'
                }}>
                  <i className="fa-brands fa-line"></i>
                </a>
                <a href="https://m.me/789tools" target="_blank" rel="noopener noreferrer" className="social-link messenger" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#0084ff',
                  color: '#ffffff',
                  borderRadius: '50%',
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease'
                }}>
                  <i className="fa-brands fa-facebook-messenger"></i>
                </a>
              </div>
            </div>
            
            <div className="footer-column">
              <h4 style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '16px'
              }}>ศูนย์ช่วยเหลือ</h4>
              <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>บริการหลังการขาย</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>วิธีสั่งซื้อสินค้า</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>วิธีการชำระเงิน</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>การบริการจัดส่งสินค้า</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>เงื่อนไขการเปลี่ยน-คืนสินค้า</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>นโยบายความเป็นส่วนตัว</a></li>
                <li style={{ marginBottom: '8px' }}><a href="/faq" style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>คำถามที่พบบ่อย</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4 style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '16px'
              }}>หมวดหมู่สินค้ายอดนิยม</h4>
              <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                <li style={{ marginBottom: '8px' }}><a href="/products" style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>เครื่องตัดถนน</a></li>
                <li style={{ marginBottom: '8px' }}><a href="/products" style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>เครื่องขัดมันพื้นปูน</a></li>
                <li style={{ marginBottom: '8px' }}><a href="/products" style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>เครื่องตบดิน</a></li>
                <li style={{ marginBottom: '8px' }}><a href="/products" style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>เครื่องปั่นไฟ</a></li>
                <li style={{ marginBottom: '8px' }}><a href="/products" style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}>โม่ผสมปูน</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4 style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '16px'
              }}>ติดต่อเรา</h4>
              <div className="contact-info">
                <div className="contact-item" style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: '#ccc'
                }}>
                  <i className="fa-solid fa-phone" style={{ marginRight: '12px', color: '#fdd835' }}></i>
                  <a href="tel:0657898285" style={{
                    color: '#ccc',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}>065-789-8285</a>
                </div>
                <div className="contact-item" style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: '#ccc'
                }}>
                  <i className="fa-solid fa-line" style={{ marginRight: '12px', color: '#06c755' }}></i>
                  <a href="https://line.me/ti/p/~@789tools" target="_blank" rel="noopener noreferrer" style={{
                    color: '#ccc',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}>@789tools</a>
                </div>
                <div className="contact-item" style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  color: '#ccc'
                }}>
                  <i className="fa-solid fa-envelope" style={{ marginRight: '12px', color: '#fdd835' }}></i>
                  <a href="mailto:789Tools@gmail.com" style={{
                    color: '#ccc',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}>789Tools@gmail.com</a>
                </div>
                <div className="contact-item" style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '12px',
                  color: '#ccc'
                }}>
                  <i className="fa-solid fa-location-dot" style={{ marginRight: '12px', color: '#fdd835', marginTop: '2px' }}></i>
                  <span>7/307 ถ.เสมาฟ้าคราม ต.คูคต อ.ลำลูกกา, ปทุมธานี</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom" style={{
        backgroundColor: '#1a1a1a',
        padding: '20px 0',
        borderTop: '1px solid #333'
      }}>
        <div className="container">
          <div className="footer-bottom-content" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <p style={{ margin: '0', color: '#ccc' }}>&copy; 2025 789 Tools. All Rights Reserved.</p>
            <div className="footer-links" style={{ display: 'flex', gap: '24px' }}>
              <a href="#" style={{
                color: '#ccc',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}>นโยบายความเป็นส่วนตัว</a>
              <a href="#" style={{
                color: '#ccc',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}>ข้อกำหนดการใช้งาน</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
