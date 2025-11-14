import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <img 
                src="/logo.png" 
                alt="789 TOOLS" 
                className="footer-logo-img"
              />
            </div>
            <p className="footer-description">
              {siteConfig.description}
            </p>
            <div className="footer-contact">
              <div className="contact-item">
                <i className="fa-solid fa-phone"></i>
                <span>{siteConfig.phone}</span>
              </div>
              <div className="contact-item">
                <i className="fa-brands fa-line"></i>
                <span>{siteConfig.lineId}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">เมนูลัด</h3>
            <ul className="footer-links">
              <li>
                <Link href="/">หน้าแรก</Link>
              </li>
              <li>
                <Link href="/products">สินค้าทั้งหมด</Link>
              </li>
              <li>
                <Link href="/services/repair">บริการซ่อม</Link>
              </li>
              <li>
                <Link href="/services/rental">บริการเช่า</Link>
              </li>
              <li>
                <Link href="/blog">บทความ</Link>
              </li>
              <li>
                <Link href="/about">เกี่ยวกับเรา</Link>
              </li>
              <li>
                <Link href="/contact">ติดต่อเรา</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h3 className="footer-title">หมวดหมู่สินค้า</h3>
            <ul className="footer-links">
              <li>
                <Link href="/categories/concrete-cutter">รถตัดคอนกรีต</Link>
              </li>
              <li>
                <Link href="/categories/power-trowel">เครื่องขัดมัน</Link>
              </li>
              <li>
                <Link href="/categories/compactor">เครื่องตบดิน</Link>
              </li>
              <li>
                <Link href="/categories/power-generator">เครื่องปั่นไฟ</Link>
              </li>
              <li>
                <Link href="/categories/concrete-mixer">โม่ผสมปูน</Link>
              </li>
              <li>
                <Link href="/categories/screed">เครื่องราดปูน</Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="footer-section">
            <h3 className="footer-title">ติดต่อเรา</h3>
            <div className="social-links">
              <a 
                href={siteConfig.links.line}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link social-line"
              >
                <i className="fa-brands fa-line"></i>
                LINE
              </a>
              <a 
                href={siteConfig.links.messenger}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link social-messenger"
              >
                <i className="fa-brands fa-facebook-messenger"></i>
                Messenger
              </a>
              <a 
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link social-facebook"
              >
                <i className="fa-brands fa-facebook"></i>
                Facebook
              </a>
            </div>
            <div className="footer-bank">
              <h4>บัญชีธนาคาร</h4>
              <p>ธนาคารกสิกรไทย</p>
              <p>เลขที่บัญชี: xxx-xxxx-xxxx</p>
              <p>ชื่อบัญชี: 789 TOOLS</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; 2024 789 TOOLS. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link href="/privacy">นโยบายความเป็นส่วนตัว</Link>
            <Link href="/terms">เงื่อนไขการให้บริการ</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: #1f2937;
          color: white;
          padding: 3rem 0 1rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-section {
          display: flex;
          flex-direction: column;
        }

        .footer-logo {
          margin-bottom: 1rem;
        }

        .footer-logo-img {
          height: 40px;
          width: auto;
        }

        .footer-description {
          color: #9ca3af;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #9ca3af;
        }

        .footer-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: white;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .footer-links a {
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-links a:hover {
          color: #3b82f6;
        }

        .social-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          color: white;
          text-decoration: none;
          transition: background 0.3s ease;
        }

        .social-link:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .social-line:hover {
          background: #00c300;
        }

        .social-messenger:hover {
          background: #0084ff;
        }

        .social-facebook:hover {
          background: #1877f2;
        }

        .footer-bank {
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem;
          border-radius: 0.5rem;
        }

        .footer-bank h4 {
          margin: 0 0 0.5rem 0;
          color: white;
        }

        .footer-bank p {
          margin: 0.25rem 0;
          color: #9ca3af;
          font-size: 0.875rem;
        }

        .footer-bottom {
          border-top: 1px solid #374151;
          padding-top: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #9ca3af;
        }

        .footer-bottom-links {
          display: flex;
          gap: 1rem;
        }

        .footer-bottom-links a {
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-bottom-links a:hover {
          color: #3b82f6;
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
