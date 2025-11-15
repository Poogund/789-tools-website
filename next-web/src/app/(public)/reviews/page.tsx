import { getReviews } from '@/lib/catalog-repository';
import { Review } from '@/types';
import { Metadata } from 'next';
import ReviewsPageClient from './ReviewsPageClient';

export const metadata: Metadata = {
  title: 'รีวิวหน้างาน - 789 TOOLS',
  description: 'รีวิวจากลูกค้าจริงที่ใช้บริการ 789 Tools ทั้งการซื้อ เช่า และซ่อมเครื่องมือ',
};

export default async function ReviewsPage() {
  const reviews: Review[] = await getReviews();
  
  return <ReviewsPageClient reviews={reviews} />;
}