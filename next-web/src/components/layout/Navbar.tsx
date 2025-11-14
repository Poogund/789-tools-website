'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';
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
      <div className="bg-primary-color border-b border-yellow-400">
        <div className="container mx-auto px-4 py-2 flex flex-col gap-2 text-xs font-semibold text-gray-900 md:flex-row md:items-center md:justify-between">
          <span>เรื่องเครื่องมือก่อสร้างมั่นใจในเรา มีบริการจัดเก็บปลายทางทั่วประเทศ</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-700">ไทย / อังกฤษ</a>
            <a href="#" className="hover:text-gray-700">
              <i className="fas fa-user mr-1"></i>
              Login / Register
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-dark-color border-b border-black/60">
        <div className="container mx-auto px-4">
          <div className="py-4 gap-4 grid grid-cols-1 md:grid-cols-[auto,1fr,auto] md:items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center justify-center md:justify-start">
              <img
                src="/logo.png"
                alt="789 TOOLS"
                className="h-14 w-auto"
              />
            </Link>

            {/* Search Bar */}
            <div className="w-full">
              <form className="flex w-full items-center rounded-full bg-light-color pr-3 shadow-inner">
                <input
                  type="text"
                  placeholder="ค้นหาสินค้าที่คุณต้องการ..."
                  className="flex-1 rounded-l-full border-2 border-transparent px-5 py-3 text-sm text-gray-800 focus:outline-none"
                />
                <button type="submit" className="text-dark-color text-lg">
                  <i className="fas fa-magnifying-glass"></i>
                </button>
              </form>
            </div>

            {/* Contact Info - Desktop Only */}
            <div className="hidden md:flex items-center justify-end gap-3">
              <a
                href="https://facebook.com/789tools"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-facebook-color px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-90"
              >
                <i className="fab fa-facebook"></i>
                789TOOLS
              </a>
              <a
                href="https://line.me/ti/p/~@789tools"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-line-color px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-90"
              >
                <i className="fab fa-line"></i>
                @789TOOLS
              </a>
              <a
                href="tel:0657898285"
                className="inline-flex items-center gap-2 rounded-full bg-primary-color px-4 py-2 text-sm font-bold text-gray-900 shadow hover:bg-yellow-300"
              >
                <i className="fas fa-phone"></i>
                โทร 065-789-8285
              </a>
            </div>

            {/* Mobile Icons */}
            <div className="md:hidden flex items-center justify-end gap-3">
              <a href="#" className="text-light-color text-xl">
                <i className="fas fa-shopping-cart"></i>
              </a>
              <button
                onClick={toggleMobileMenu}
                className="text-light-color text-xl"
              >
                <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-dark-color border-t border-black/60">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-6 flex-1 justify-center">
              <li>
                <Link href="/" className="text-light-color hover:text-primary-color font-medium transition-colors">
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-light-color hover:text-primary-color font-medium transition-colors">
                  สินค้าทั้งหมด <i className="fas fa-caret-down ml-1"></i>
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-light-color hover:text-primary-color font-medium transition-colors">
                  บริการให้เช่า <i className="fas fa-caret-down ml-1"></i>
                </Link>
              </li>
              <li>
                <Link href="/parts-services" className="text-light-color hover:text-primary-color font-medium transition-colors">
                  อะไหล่ & บริการ <i className="fas fa-caret-down ml-1"></i>
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-light-color hover:text-primary-color font-medium transition-colors">
                  รีวิวหน้างาน
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-light-color hover:text-primary-color font-medium transition-colors">
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-light-color hover:text-primary-color font-medium transition-colors">
                  ติดต่อเรา
                </Link>
              </li>
              <li>
                <Link href="#" className="text-light-color hover:text-primary-color font-medium transition-colors">
                  <i className="fas fa-user mr-1"></i> Login / Register
                </Link>
              </li>
            </ul>

            {/* Desktop Cart Icon */}
            <div className="hidden md:flex items-center">
              <a href="#" className="text-light-color text-xl hover:text-primary-color">
                <i className="fas fa-shopping-cart"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={closeMobileMenu}>
          <div className="fixed right-0 top-0 h-full w-80 max-w-full bg-dark-color shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-light-color font-bold">เมนู</span>
                <button 
                  onClick={closeMobileMenu}
                  className="text-light-color text-xl"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
            <nav className="p-0">
              <ul className="list-none m-0 p-0">
                <li>
                  <Link 
                    href="/" 
                    onClick={closeMobileMenu}
                    className="block px-6 py-4 text-light-color hover:bg-gray-800 border-b border-gray-700"
                  >
                    หน้าแรก
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/products" 
                    onClick={closeMobileMenu}
                    className="block px-6 py-4 text-light-color hover:bg-gray-800 border-b border-gray-700"
                  >
                    สินค้าทั้งหมด
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/services" 
                    onClick={closeMobileMenu}
                    className="block px-6 py-4 text-light-color hover:bg-gray-800 border-b border-gray-700"
                  >
                    บริการให้เช่า
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/parts-services" 
                    onClick={closeMobileMenu}
                    className="block px-6 py-4 text-light-color hover:bg-gray-800 border-b border-gray-700"
                  >
                    อะไหล่ & บริการ
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/reviews" 
                    onClick={closeMobileMenu}
                    className="block px-6 py-4 text-light-color hover:bg-gray-800 border-b border-gray-700"
                  >
                    รีวิวหน้างาน
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    onClick={closeMobileMenu}
                    className="block px-6 py-4 text-light-color hover:bg-gray-800 border-b border-gray-700"
                  >
                    เกี่ยวกับเรา
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    onClick={closeMobileMenu}
                    className="block px-6 py-4 text-light-color hover:bg-gray-800 border-b border-gray-700"
                  >
                    ติดต่อเรา
                  </Link>
                </li>
                <li className="border-t border-gray-700">
                  <Link 
                    href="#" 
                    onClick={closeMobileMenu}
                    className="block px-6 py-4 text-light-color hover:bg-gray-800"
                  >
                    <i className="fas fa-user mr-2"></i> Login / Register
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
