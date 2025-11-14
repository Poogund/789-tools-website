import { ReactNode } from 'react';

export default function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* Navbar will be added here in TASK-020 */}
      {children}
      {/* Footer will be added here in TASK-020 */}
    </div>
  );
}
