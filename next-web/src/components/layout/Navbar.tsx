'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Debug: Log to confirm Navbar is rendering
  useEffect(() => {
    console.log('✅ Navbar component mounted');
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate header height and set CSS variable
  useEffect(() => {
    const calculateHeaderHeight = () => {
      const stickyWrapper = document.querySelector('.sticky-header-wrapper');
      if (stickyWrapper) {
        const height = stickyWrapper.getBoundingClientRect().height;
        const headerHeight = height > 0 ? height : 122; // Fallback to 122px if height is 0
        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
      } else {
        // Fallback if element not found
        document.documentElement.style.setProperty('--header-height', '122px');
      }
    };

    // Calculate on mount with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      calculateHeaderHeight();
    }, 100);

    // Calculate on resize and scroll (header might change height on scroll)
    window.addEventListener('resize', calculateHeaderHeight);
    window.addEventListener('scroll', calculateHeaderHeight);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', calculateHeaderHeight);
      window.removeEventListener('scroll', calculateHeaderHeight);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('menu-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('menu-open');
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

      {/* Sticky Header Wrapper - includes both header and nav */}
      <div className={`sticky-header-wrapper ${isScrolled ? 'sticky' : ''}`}>
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
              <Link href="/cart" className="cart-icon" aria-label="Shopping Cart">
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>
            </div>
            <div className="nav-icons mobile-nav-icons">
              <button 
                className={`hamburger-menu ${mobileMenuOpen ? 'active' : ''}`}
                aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
                aria-expanded={mobileMenuOpen}
                onClick={toggleMobileMenu}
              >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
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
              <a href="/services/rental">
                บริการให้เช่า <i className="fa-solid fa-caret-down"></i>
              </a>
            </li>
            <li>
              <a href="/services/repair">
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
            {/* Cart removed - cart icon is in main header contact-info */}
          </div>
        </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      >
        <div 
          className={`mobile-menu-panel ${mobileMenuOpen ? 'active' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Bar in Mobile Menu */}
          <div className="mobile-menu-search">
            <form className="mobile-search-form" role="search" onSubmit={(e) => { e.preventDefault(); closeMobileMenu(); }}>
              <input
                type="text"
                placeholder="ค้นหาสินค้า..."
                aria-label="Search"
              />
              <button type="submit" aria-label="Search Button">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>

          {/* Quick Contact Buttons */}
          <div className="mobile-menu-quick-contact">
            <a href="tel:0657898285" className="quick-contact-btn phone-btn">
              <i className="fa-solid fa-phone"></i>
              <span>โทรเลย</span>
            </a>
            <a href="#" className="quick-contact-btn line-btn">
              <i className="fa-brands fa-line"></i>
              <span>LINE</span>
            </a>
            <a href="#" className="quick-contact-btn facebook-btn">
              <i className="fa-brands fa-facebook"></i>
              <span>Facebook</span>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="mobile-menu-nav">
            <ul className="nav-links mobile-nav-links">
              <li className="menu-item">
                <a 
                  href="/" 
                  onClick={closeMobileMenu}
                  className="menu-link"
                >
                  <i className="fa-solid fa-home"></i>
                  <span>หน้าแรก</span>
                </a>
              </li>
              <li className="menu-item">
                <a 
                  href="/products" 
                  onClick={closeMobileMenu}
                  className="menu-link"
                >
                  <i className="fa-solid fa-toolbox"></i>
                  <span>สินค้าทั้งหมด</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </a>
              </li>
              <li className="menu-item">
                <a 
                  href="/services/rental" 
                  onClick={closeMobileMenu}
                  className="menu-link"
                >
                  <i className="fa-solid fa-calendar-check"></i>
                  <span>บริการให้เช่า</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </a>
              </li>
              <li className="menu-item">
                <a 
                  href="/services/repair" 
                  onClick={closeMobileMenu}
                  className="menu-link"
                >
                  <i className="fa-solid fa-wrench"></i>
                  <span>อะไหล่ & บริการ</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </a>
              </li>
              <li className="menu-item">
                <a 
                  href="/reviews" 
                  onClick={closeMobileMenu}
                  className="menu-link"
                >
                  <i className="fa-solid fa-star"></i>
                  <span>รีวิวหน้างาน</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </a>
              </li>
              <li className="menu-item">
                <a 
                  href="/about" 
                  onClick={closeMobileMenu}
                  className="menu-link"
                >
                  <i className="fa-solid fa-info-circle"></i>
                  <span>เกี่ยวกับเรา</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </a>
              </li>
              <li className="menu-item">
                <a 
                  href="/contact" 
                  onClick={closeMobileMenu}
                  className="menu-link"
                >
                  <i className="fa-solid fa-envelope"></i>
                  <span>ติดต่อเรา</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </a>
              </li>
            </ul>
          </nav>

          {/* Login Section */}
          <div className="mobile-menu-footer">
            <a 
              href="#" 
              onClick={closeMobileMenu}
              className="mobile-menu-login"
            >
              <i className="fa-solid fa-user"></i>
              <span>Login / Register</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
