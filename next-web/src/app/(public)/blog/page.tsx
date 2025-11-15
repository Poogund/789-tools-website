import { getBlogPosts } from '@/lib/catalog-repository';
import { BlogPost } from '@/types';
import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'บทความ - 789 TOOLS',
  description: 'บทความเกี่ยวกับเครื่องมือช่าง วิธีเลือกเครื่องมือ การดูแลรักษา และเคล็ดลับการใช้งาน',
};

export default async function BlogListPage() {
  const blogPosts: BlogPost[] = await getBlogPosts();

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-color to-yellow-400 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 thai-text">บทความ</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto thai-text">
            คู่มือ เคล็ดลับ และความรู้เกี่ยวกับเครื่องมือช่าง
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post: BlogPost) => (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  {/* Thumbnail */}
                  {post.thumbnail_url && (
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100 overflow-hidden">
                      <img
                        src={post.thumbnail_url}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://placehold.co/400x300/eee/ccc?text=บทความ';
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-6">
                    {/* Date */}
                    {post.published_at && (
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <i className="fa-solid fa-calendar mr-2"></i>
                        <span>{formatDate(post.published_at)}</span>
                      </div>
                    )}
                    
                    {/* Title */}
                    <h2 className="text-xl font-bold text-dark-color mb-3 thai-text group-hover:text-primary-color transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    
                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 thai-text line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    
                    {/* Read More */}
                    <div className="flex items-center text-primary-color font-medium thai-text">
                      <span>อ่านต่อ</span>
                      <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                <i className="fa-solid fa-newspaper text-gray-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2 thai-text">ยังไม่มีบทความ</h3>
              <p className="text-gray-500 mb-6 thai-text">เรากำลังรวบรวมบทความที่น่าสนใจให้คุณ</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-color text-white rounded-lg hover:bg-yellow-500 transition-colors font-medium thai-text"
              >
                <i className="fa-solid fa-home"></i>
                กลับหน้าแรก
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-section-bg-gray">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-dark-color thai-text">ต้องการคำปรึกษาเพิ่มเติม?</h2>
          <p className="text-xl text-gray-600 mb-8 thai-text">ติดต่อเราได้ตลอด 24 ชั่วโมง</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center bg-primary-color text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors thai-text"
            >
              <i className="fa-solid fa-phone mr-2"></i>
              โทรเลย
            </a>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center bg-dark-color text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors thai-text"
            >
              <i className="fa-solid fa-message mr-2"></i>
              ติดต่อเรา
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

