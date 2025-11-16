import { ReactNode } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AccountSidebar from '@/components/account/AccountSidebar';

/**
 * Account Layout
 * TASK-042: Account Layout (F08-1)
 * Spec: F08, Plan: §6.4
 * 
 * Layout for all /account routes with sidebar navigation
 * Includes breadcrumbs and 2-column layout (sidebar + content)
 */
export default function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="shop-page-main">
        <div className="container">
          {/* Breadcrumbs */}
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">หน้าแรก</Link>
            <i className="fas fa-chevron-right" aria-hidden="true"></i>
            <span>บัญชีของฉัน</span>
          </nav>

          {/* 2-column Layout: Sidebar + Content */}
          <div className="shop-layout">
            {/* Left Column: Account Sidebar */}
            <AccountSidebar />

            {/* Right Column: Account Content */}
            <div className="shop-content">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

