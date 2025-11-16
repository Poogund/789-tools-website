'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabaseBrowserClient } from '@/lib/supabase/client';

/**
 * Account Sidebar Component
 * TASK-042: Account Layout (F08-1)
 * Spec: F08, Plan: §6.4
 * 
 * Sidebar navigation for account section with logout functionality
 * Design reference: legacy/assets/css/styles.css (.shop-sidebar)
 */
export default function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await supabaseBrowserClient.auth.signOut();
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('[AccountSidebar] Logout error:', error);
    }
  };

  const menuItems = [
    { href: '/account', label: 'โปรไฟล์', exact: true },
    { href: '/account/orders', label: 'ประวัติคำสั่งซื้อ', exact: false },
    // Future: { href: '/account/rentals', label: 'ประวัติการเช่า', exact: false },
  ];

  return (
    <aside className="account-sidebar">
      <nav className="account-sidebar-nav">
        <ul className="account-sidebar-list">
          {menuItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`account-sidebar-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="account-sidebar-footer">
        <button
          onClick={handleLogout}
          className="account-sidebar-logout"
          type="button"
        >
          ออกจากระบบ
        </button>
      </div>
    </aside>
  );
}

