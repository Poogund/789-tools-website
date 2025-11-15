import { getFaqItems } from '@/lib/catalog-repository';
import { Metadata } from 'next';
import FAQPageClient from './FAQPageClient';

export const metadata: Metadata = {
  title: 'คำถามที่พบบ่อย - 789 TOOLS',
  description: 'คำถามที่พบบ่อยเกี่ยวกับสินค้า บริการเช่า และซ่อมเครื่องมือ',
};

export default async function FAQPage() {
  const faqItems = await getFaqItems();
  
  return <FAQPageClient faqItems={faqItems} />;
}
