'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <p className="top-bar-message">
            เรื่องเครื่องมือก่อสร้างมั่นใจในเรา มีบริการจัดเก็บปลายทางทั่วประเทศ
          </p>
          <div className="top-bar-links">
            <a href="#">ไทย / อังกฤษ</a>
            <a href="#" className="top-bar-login">
              <i className="fa-solid fa-user"></i> Login / Register
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="container">
          <a href="/" className="logo">
            <img
              src="/logo.png"
              alt="โลโก้ 789 TOOLS"
            />
          </a>

          <form className="search-bar" role="search">
            <input
              type="text"
              placeholder="ค้นหาสินค้าที่คุณต้องการ..."
              aria-label="Search"
            />
            <button type="submit" aria-label="Search Button">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>

          <div className="contact-info">
            <a href="#" className="social-icon facebook-icon" aria-label="Facebook">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#" className="social-icon line-icon" aria-label="LINE">
              <i className="fa-brands fa-line"></i>
            </a>
            <a href="tel:0657898285" className="phone-number">
              <strong>โทร</strong> 065-789-8285
            </a>
          </div>
          <div className="nav-icons mobile-nav-icons">
            <button className="hamburger-menu" aria-label="Open Menu" onClick={toggleMobileMenu}>
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="container">
          <ul className="nav-links">
            <li><a href="/">หน้าแรก</a></li>
            <li>
              <a href="/products">
                สินค้าทั้งหมด <i className="fa-solid fa-caret-down"></i>
              </a>
            </li>
            <li>
              <a href="/services">
                บริการให้เช่า <i className="fa-solid fa-caret-down"></i>
              </a>
            </li>
            <li>
              <a href="/parts-services">
                อะไหล่ &amp; บริการ <i className="fa-solid fa-caret-down"></i>
              </a>
            </li>
            <li><a href="/reviews">รีวิวหน้างาน</a></li>
            <li><a href="/about">เกี่ยวกับเรา</a></li>
            <li><a href="/contact">ติดต่อเรา</a></li>
            <li className="nav-menu-login">
              <a href="#"><i className="fa-solid fa-user"></i> Login / Register</a>
            </li>
          </ul>
          <div className="nav-icons desktop-nav-icons">
            {/* Cart removed from desktop */}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">เมนู</span>
              <button 
                onClick={closeMobileMenu}
                className="mobile-menu-close"
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
            <nav className="mobile-menu-nav">
              <ul className="nav-links mobile-nav-links active">
                <li>
                  <a 
                    href="/" 
                    onClick={closeMobileMenu}
                  >
                    หน้าแรก
                  </a>
                </li>
                <li>
                  <a 
                    href="/products" 
                    onClick={closeMobileMenu}
                  >
                    สินค้าทั้งหมด
                  </a>
                </li>
                <li>
                  <a 
                    href="/services" 
                    onClick={closeMobileMenu}
                  >
                    บริการให้เช่า
                  </a>
                </li>
                <li>
                  <a 
                    href="/parts-services" 
                    onClick={closeMobileMenu}
                  >
                    อะไหล่ & บริการ
                  </a>
                </li>
                <li>
                  <a 
                    href="/reviews" 
                    onClick={closeMobileMenu}
                  >
                    รีวิวหน้างาน
                  </a>
                </li>
                <li>
                  <a 
                    href="/about" 
                    onClick={closeMobileMenu}
                  >
                    เกี่ยวกับเรา
                  </a>
                </li>
                <li>
                  <a 
                    href="/contact" 
                    onClick={closeMobileMenu}
                  >
                    ติดต่อเรา
                  </a>
                </li>
                <li className="nav-menu-login">
                  <a 
                    href="#" 
                    onClick={closeMobileMenu}
                  >
                    <i className="fa-solid fa-user mr-2"></i> Login / Register
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
