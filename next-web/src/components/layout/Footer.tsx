export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3>789 TOOLS</h3>
              <p>ศูนย์รวมเครื่องมือช่างก่อสร้างครบวงจร ขาย-เช่า รถตัดคอนกรีต เครื่องขัดมัน เครื่องตบดิน พร้อมบริการซ่อมโดยช่างผู้เชี่ยวชาญ</p>
              <div className="social-links">
                <a href="https://facebook.com/789tools" target="_blank" rel="noopener noreferrer" className="social-link facebook">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="https://line.me/ti/p/~@789tools" target="_blank" rel="noopener noreferrer" className="social-link line">
                  <i className="fa-brands fa-line"></i>
                </a>
                <a href="https://m.me/789tools" target="_blank" rel="noopener noreferrer" className="social-link messenger">
                  <i className="fa-brands fa-facebook-messenger"></i>
                </a>
              </div>
            </div>
            
            <div className="footer-column">
              <h4>ศูนย์ช่วยเหลือ</h4>
              <ul>
                <li><a href="#">บริการหลังการขาย</a></li>
                <li><a href="#">วิธีสั่งซื้อสินค้า</a></li>
                <li><a href="#">วิธีการชำระเงิน</a></li>
                <li><a href="#">การบริการจัดส่งสินค้า</a></li>
                <li><a href="#">เงื่อนไขการเปลี่ยน-คืนสินค้า</a></li>
                <li><a href="#">นโยบายความเป็นส่วนตัว</a></li>
                <li><a href="#">คำถามที่พบบ่อย</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>หมวดหมู่สินค้ายอดนิยม</h4>
              <ul>
                <li><a href="#">เครื่องตัดถนน</a></li>
                <li><a href="#">เครื่องขัดมันพื้นปูน</a></li>
                <li><a href="#">เครื่องตบดิน</a></li>
                <li><a href="#">เครื่องปั่นไฟ</a></li>
                <li><a href="#">โม่ผสมปูน</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>ติดต่อเรา</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <i className="fa-solid fa-phone"></i>
                  <a href="tel:0657898285">065-789-8285</a>
                </div>
                <div className="contact-item">
                  <i className="fa-solid fa-line"></i>
                  <a href="https://line.me/ti/p/~@789tools" target="_blank" rel="noopener noreferrer">@789tools</a>
                </div>
                <div className="contact-item">
                  <i className="fa-solid fa-envelope"></i>
                  <a href="mailto:789Tools@gmail.com">789Tools@gmail.com</a>
                </div>
                <div className="contact-item">
                  <i className="fa-solid fa-location-dot"></i>
                  <span>7/307 ถ.เสมาฟ้าคราม ต.คูคต อ.ลำลูกกา, ปทุมธานี</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; 2025 789 Tools. All Rights Reserved.</p>
            <div className="footer-links">
              <a href="#">นโยบายความเป็นส่วนตัว</a>
              <a href="#">ข้อกำหนดการใช้งาน</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
