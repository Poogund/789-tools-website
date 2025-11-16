'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        const hamburger = document.querySelector('.hamburger-menu');
        if (hamburger && !hamburger.contains(event.target as Node)) {
          setMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
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
      <div 
        ref={headerRef}
        className={`sticky-header-wrapper ${isScrolled ? 'sticky' : ''}`}
      >
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
                aria-label={mobileMenuOpen ? "ปิดเมนู" : "เปิดเมนู"}
                aria-expanded={mobileMenuOpen}
                onClick={toggleMobileMenu}
                type="button"
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

      {/* Mobile Menu - New Clean Implementation */}
      <div 
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
        aria-hidden={!mobileMenuOpen}
      >
        <div 
          ref={menuRef}
          className={`mobile-menu-panel ${mobileMenuOpen ? 'active' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Menu Header with Close Button */}
          <div className="mobile-menu-header">
            <h2>เมนู</h2>
            <button 
              className="mobile-menu-close"
              onClick={closeMobileMenu}
              aria-label="ปิดเมนู"
              type="button"
            >
              <i className="fa-solid fa-times"></i>
            </button>
          </div>

          {/* Search Bar */}
          <div className="mobile-menu-search">
            <form 
              className="mobile-search-form" 
              role="search" 
              onSubmit={(e) => { 
                e.preventDefault(); 
                closeMobileMenu(); 
              }}
            >
              <input
                type="text"
                placeholder="ค้นหาสินค้า..."
                aria-label="ค้นหาสินค้า"
              />
              <button type="submit" aria-label="ค้นหา">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>

          {/* Quick Contact Buttons */}
          <div className="mobile-menu-quick-contact">
            <a 
              href="tel:0657898285" 
              className="quick-contact-btn phone-btn"
              onClick={closeMobileMenu}
            >
              <i className="fa-solid fa-phone"></i>
              <span>โทรเลย</span>
            </a>
            <a 
              href="#" 
              className="quick-contact-btn line-btn"
              onClick={closeMobileMenu}
            >
              <i className="fa-brands fa-line"></i>
              <span>LINE</span>
            </a>
            <a 
              href="#" 
              className="quick-contact-btn facebook-btn"
              onClick={closeMobileMenu}
            >
              <i className="fa-brands fa-facebook"></i>
              <span>Facebook</span>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="mobile-menu-nav" aria-label="เมนูหลัก">
            <ul className="mobile-nav-links">
              <li>
                <Link 
                  href="/" 
                  onClick={closeMobileMenu}
                  className="mobile-menu-link"
                >
                  <i className="fa-solid fa-home"></i>
                  <span>หน้าแรก</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  onClick={closeMobileMenu}
                  className="mobile-menu-link"
                >
                  <i className="fa-solid fa-toolbox"></i>
                  <span>สินค้าทั้งหมด</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/rental" 
                  onClick={closeMobileMenu}
                  className="mobile-menu-link"
                >
                  <i className="fa-solid fa-calendar-check"></i>
                  <span>บริการให้เช่า</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/repair" 
                  onClick={closeMobileMenu}
                  className="mobile-menu-link"
                >
                  <i className="fa-solid fa-wrench"></i>
                  <span>อะไหล่ & บริการ</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </li>
              <li>
                <Link 
                  href="/reviews" 
                  onClick={closeMobileMenu}
                  className="mobile-menu-link"
                >
                  <i className="fa-solid fa-star"></i>
                  <span>รีวิวหน้างาน</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  onClick={closeMobileMenu}
                  className="mobile-menu-link"
                >
                  <i className="fa-solid fa-info-circle"></i>
                  <span>เกี่ยวกับเรา</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  onClick={closeMobileMenu}
                  className="mobile-menu-link"
                >
                  <i className="fa-solid fa-envelope"></i>
                  <span>ติดต่อเรา</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Footer with Login */}
          <div className="mobile-menu-footer">
            <Link 
              href="#" 
              onClick={closeMobileMenu}
              className="mobile-menu-login"
            >
              <i className="fa-solid fa-user"></i>
              <span>Login / Register</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
