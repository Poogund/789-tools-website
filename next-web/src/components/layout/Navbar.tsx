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
      <div className="bg-yellow-400 py-1 text-center text-sm font-bold border-b border-yellow-500">
        <div className="container mx-auto px-4">
          <p className="inline-block">
            เรื่องเครื่องมือก่อสร้างมั่นใจในเรา มีบริการจัดเก็บปลายทางทั่วประเทศ
          </p>
          <div className="float-right space-x-4">
            <a href="#" className="hover:text-gray-700">ไทย / อังกฤษ</a>
            <a href="#" className="hover:text-gray-700">
              <i className="fas fa-user"></i> Login / Register
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-gray-900 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="789 TOOLS" 
                className="h-12 w-auto"
              />
            </Link>

            {/* Search Bar - Desktop Only */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <form className="flex w-full border border-gray-300 rounded-full overflow-hidden">
                <input
                  type="text"
                  placeholder="ค้นหาสินค้าที่คุณต้องการ..."
                  className="flex-1 px-4 py-2 outline-none"
                />
                <button type="submit" className="px-4 bg-gray-100 hover:bg-gray-200">
                  <i className="fas fa-magnifying-glass"></i>
                </button>
              </form>
            </div>

            {/* Contact Info - Desktop Only */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="text-blue-400 hover:text-blue-300 text-xl">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-green-400 hover:text-green-300 text-xl">
                <i className="fab fa-line"></i>
              </a>
              <a href="tel:0657898285" className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold hover:bg-yellow-300">
                <strong>โทร</strong> 065-789-8285
              </a>
            </div>

            {/* Mobile Icons */}
            <div className="md:hidden flex items-center space-x-3">
              <a href="#" className="text-white text-xl">
                <i className="fas fa-shopping-cart"></i>
              </a>
              <button 
                onClick={toggleMobileMenu}
                className="text-white text-xl"
              >
                <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-gray-900 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-6 flex-1 justify-center">
              <li>
                <Link href="/" className="text-white hover:text-yellow-400 font-medium transition-colors">
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white hover:text-yellow-400 font-medium transition-colors">
                  สินค้าทั้งหมด <i className="fas fa-caret-down ml-1"></i>
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white hover:text-yellow-400 font-medium transition-colors">
                  บริการให้เช่า <i className="fas fa-caret-down ml-1"></i>
                </Link>
              </li>
              <li>
                <Link href="/parts-services" className="text-white hover:text-yellow-400 font-medium transition-colors">
                  อะไหล่ & บริการ <i className="fas fa-caret-down ml-1"></i>
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-white hover:text-yellow-400 font-medium transition-colors">
                  รีวิวหน้างาน
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-yellow-400 font-medium transition-colors">
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-yellow-400 font-medium transition-colors">
                  ติดต่อเรา
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-yellow-400 font-medium transition-colors">
                  <i className="fas fa-user mr-1"></i> Login / Register
                </Link>
              </li>
            </ul>

            {/* Desktop Cart Icon */}
            <div className="hidden md:flex items-center">
              <a href="#" className="text-white text-xl hover:text-yellow-400">
                <i className="fas fa-shopping-cart"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={closeMobileMenu}>
          <div className="fixed right-0 top-0 h-full w-80 max-w-full bg-gray-900 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">เมนู</span>
                <button 
                  onClick={closeMobileMenu}
                  className="text-white text-xl"
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
                    className="block px-6 py-4 text-white hover:bg-gray-800 border-b border-gray-700"
                  >
                    หน้าแรก
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/products" 
                    onClick={closeMobileMenu}
                    className="block px-6 py-4 text-white hover:bg-gray-800 border-b border-gray-700"
                  >
                    สินค้าทั้งหมด
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/services" 
                    onClick={closeMobileMenu}
                    className="block px-6 py-4 text-white hover:bg-gray-800 border-b border-gray-700"
                  >
                    บริการให้เช่า
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/parts-services" 
                    onClick={closeMobileMenu}
                    className="block px-6 py-4 text-white hover:bg-gray-800 border-b border-gray-700"
                  >
                    อะไหล่ & บริการ
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/reviews" 
                    onClick={closeMobileMenu}
                    className="block px-6 py-4 text-white hover:bg-gray-800 border-b border-gray-700"
                  >
                    รีวิวหน้างาน
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    onClick={closeMobileMenu}
                    className="block px-6 py-4 text-white hover:bg-gray-800 border-b border-gray-700"
                  >
                    เกี่ยวกับเรา
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    onClick={closeMobileMenu}
                    className="block px-6 py-4 text-white hover:bg-gray-800 border-b border-gray-700"
                  >
                    ติดต่อเรา
                  </Link>
                </li>
                <li className="border-t border-gray-700">
                  <Link 
                    href="#" 
                    onClick={closeMobileMenu}
                    className="block px-6 py-4 text-white hover:bg-gray-800"
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
