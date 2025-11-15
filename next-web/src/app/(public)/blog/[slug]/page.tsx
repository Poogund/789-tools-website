import { getBlogPostBySlug } from '@/lib/catalog-repository';
import { BlogPost } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'ไม่พบบทความ - 789 TOOLS',
    };
  }

  return {
    title: `${post.title} - 789 TOOLS`,
    description: post.excerpt || post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      images: post.thumbnail_url ? [post.thumbnail_url] : [],
      type: 'article',
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
    },
  };
}

function generateBlogPostingJsonLd(post: BlogPost) {
  const baseUrl = siteConfig.url;
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || post.content.substring(0, 200),
    "image": post.thumbnail_url ? `${baseUrl}${post.thumbnail_url}` : undefined,
    "datePublished": post.published_at,
    "dateModified": post.updated_at,
    "author": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`
    }
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const post: BlogPost | null = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const jsonLd = generateBlogPostingJsonLd(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-light-gray-bg">
        {/* Breadcrumb */}
        <section className="bg-white border-b border-gray-200 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-600 hover:text-primary-color transition-colors">
                หน้าแรก
              </Link>
              <i className="fa-solid fa-chevron-right text-gray-400 text-xs"></i>
              <Link href="/blog" className="text-gray-600 hover:text-primary-color transition-colors thai-text">
                บทความ
              </Link>
              <i className="fa-solid fa-chevron-right text-gray-400 text-xs"></i>
              <span className="text-dark-color font-medium thai-text line-clamp-1">{post.title}</span>
            </nav>
          </div>
        </section>

        {/* Blog Content */}
        <article className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Header */}
            <header className="mb-8">
              {/* Date */}
              {post.published_at && (
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <i className="fa-solid fa-calendar mr-2"></i>
                  <span>{formatDate(post.published_at)}</span>
                </div>
              )}
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-dark-color mb-6 thai-text">
                {post.title}
              </h1>
              
              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-gray-600 mb-6 thai-text">
                  {post.excerpt}
                </p>
              )}
              
              {/* Thumbnail */}
              {post.thumbnail_url && (
                <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={post.thumbnail_url}
                    alt={post.title}
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/800x400/eee/ccc?text=บทความ';
                    }}
                  />
                </div>
              )}
            </header>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none blog-content thai-text"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                color: '#334155',
                lineHeight: '1.8',
              }}
            />

            {/* Footer Actions */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center text-primary-color hover:text-yellow-500 transition-colors font-medium thai-text"
                >
                  <i className="fa-solid fa-arrow-left mr-2"></i>
                  กลับไปยังบทความทั้งหมด
                </Link>
                
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 thai-text">แชร์:</span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${siteConfig.url}/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-facebook-color text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                    aria-label="แชร์บน Facebook"
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a
                    href={`https://line.me/R/msg/text/?${encodeURIComponent(`${post.title} ${siteConfig.url}/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-line-color text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                    aria-label="แชร์บน LINE"
                  >
                    <i className="fa-brands fa-line"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>

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
    </>
  );
}

