import { getBlogPosts } from '@/lib/catalog-repository';
import { BlogPost } from '@/types';
import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import SafeImage from '@/components/common/SafeImage';

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
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-color/10 via-yellow-400/10 to-primary-color/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-color to-yellow-400 rounded-3xl mb-8 shadow-xl">
              <i className="fa-solid fa-newspaper text-white text-4xl"></i>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-dark-color thai-text leading-tight">
              บทความ
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 thai-text leading-relaxed">
              คู่มือ เคล็ดลับ และความรู้เกี่ยวกับเครื่องมือช่าง
            </p>
            {blogPosts.length > 0 && (
              <div className="bg-white px-6 py-3 rounded-full shadow-lg border border-gray-100 inline-block">
                <span className="text-sm text-gray-600 thai-text">บทความทั้งหมด</span>
                <span className="text-lg font-black text-primary-color ml-2">{blogPosts.length}+</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {blogPosts.length > 0 ? (
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post: BlogPost) => (
                  <Link 
                    key={post.id} 
                    href={`/blog/${post.slug}`}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group border border-gray-100"
                  >
                    {post.thumbnail_url && (
                      <div className="aspect-video bg-gray-100 overflow-hidden">
                        <SafeImage
                          src={post.thumbnail_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          fallbackSrc="https://placehold.co/400x300/eee/ccc?text=บทความ"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      {post.published_at && (
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <i className="fa-solid fa-calendar mr-2 text-primary-color"></i>
                          <span className="thai-text">{formatDate(post.published_at)}</span>
                        </div>
                      )}
                      
                      <h2 className="text-xl font-black text-dark-color mb-3 thai-text group-hover:text-primary-color transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      
                      {post.excerpt && (
                        <p className="text-gray-600 mb-4 thai-text line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}
                      
                      <div className="flex items-center text-primary-color font-bold thai-text group-hover:gap-3 transition-all">
                        <span>อ่านต่อ</span>
                        <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                <i className="fa-solid fa-newspaper text-gray-400 text-3xl"></i>
              </div>
              <h3 className="text-2xl font-black text-gray-700 mb-3 thai-text">ยังไม่มีบทความ</h3>
              <p className="text-gray-500 mb-8 thai-text">เรากำลังรวบรวมบทความที่น่าสนใจให้คุณ</p>
              <Link
                href="/"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-color to-yellow-400 text-white rounded-xl hover:from-yellow-400 hover:to-primary-color transition-all shadow-lg hover:shadow-xl font-black thai-text"
              >
                <i className="fa-solid fa-home"></i>
                กลับหน้าแรก
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-color via-yellow-400 to-primary-color relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl mb-8">
              <i className="fa-solid fa-comments text-white text-4xl"></i>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white thai-text">ต้องการคำปรึกษาเพิ่มเติม?</h2>
            <p className="text-xl mb-10 text-white/90 thai-text">ติดต่อเราได้ตลอด 24 ชั่วโมง</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center bg-white text-primary-color px-10 py-4 rounded-xl font-black hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl text-lg thai-text"
              >
                <i className="fa-solid fa-phone mr-3"></i>
                โทรเลย
              </a>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm border-2 border-white text-white px-10 py-4 rounded-xl font-black hover:bg-white/30 transition-all text-lg thai-text"
              >
                <i className="fa-solid fa-message mr-3"></i>
                ติดต่อเรา
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
