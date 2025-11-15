import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ติดต่อเรา - 789 TOOLS',
  description: 'ติดต่อ 789 Tools เพื่อสอบถามข้อมูลสินค้า เช่าหรือซ่อมเครื่องมือก่อสร้าง และขอใบเสนอราคา เบอร์โทร อีเมล ที่อยู่ และฟอร์มติดต่อ',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

