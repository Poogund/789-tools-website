'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link href="/" className="navbar-logo">
            <img 
              src="/logo.png" 
              alt="789 TOOLS" 
              className="logo-img"
            />
          </Link>

          {/* Main Navigation */}
          <nav className="navbar-nav">
            <ul className="nav-list">
              <li>
                <Link href="/" className="nav-link">หน้าแรก</Link>
              </li>
              <li>
                <Link href="/products" className="nav-link">สินค้า</Link>
              </li>
              <li>
                <Link href="/services/repair" className="nav-link">บริการ</Link>
              </li>
              <li>
                <Link href="/blog" className="nav-link">บทความ</Link>
              </li>
              <li>
                <Link href="/about" className="nav-link">เกี่ยวกับ</Link>
              </li>
              <li>
                <Link href="/contact" className="nav-link">ติดต่อ</Link>
              </li>
            </ul>
          </nav>

          {/* Action Buttons */}
          <div className="navbar-actions">
            <a 
              href={siteConfig.links.line}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-line"
            >
              <i className="fa-brands fa-line"></i>
              แอดไลน์
            </a>
            <a 
              href={siteConfig.links.tel}
              className="btn btn-phone"
            >
              <i className="fa-solid fa-phone"></i>
              {siteConfig.phone}
            </a>
            <Link href="/cart" className="btn btn-cart">
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="cart-count">0</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          background: #fff;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .navbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
        }

        .logo-img {
          height: 50px;
          width: auto;
        }

        .navbar-nav {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .nav-list {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 2rem;
        }

        .nav-link {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .nav-link:hover {
          color: #2563eb;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn-line {
          background: #00c300;
          color: white;
        }

        .btn-line:hover {
          background: #00a000;
        }

        .btn-phone {
          background: #2563eb;
          color: white;
        }

        .btn-phone:hover {
          background: #1d4ed8;
        }

        .btn-cart {
          background: #f59e0b;
          color: white;
          position: relative;
        }

        .btn-cart:hover {
          background: #d97706;
        }

        .cart-count {
          background: #dc2626;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          position: absolute;
          top: -8px;
          right: -8px;
        }

        @media (max-width: 768px) {
          .navbar-content {
            flex-direction: column;
            gap: 1rem;
          }

          .nav-list {
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
          }

          .navbar-actions {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </header>
  );
}
