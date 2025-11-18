import { MetadataRoute } from 'next';
import { supabaseBrowserClient } from '@/lib/supabase/client';

// Base URL for the site
const baseUrl = 'https://789-tools.com';

// Static pages that should always be included
const staticPages = [
  { url: '', priority: 1.0, changeFreq: 'daily' },
  { url: '/products', priority: 0.9, changeFreq: 'daily' },
  { url: '/categories', priority: 0.8, changeFreq: 'weekly' },
  { url: '/services/repair', priority: 0.7, changeFreq: 'monthly' },
  { url: '/services/rental', priority: 0.7, changeFreq: 'monthly' },
  { url: '/rental-terms', priority: 0.6, changeFreq: 'monthly' },
  { url: '/reviews', priority: 0.6, changeFreq: 'weekly' },
  { url: '/faq', priority: 0.6, changeFreq: 'weekly' },
  { url: '/blog', priority: 0.8, changeFreq: 'daily' },
  { url: '/promotions', priority: 0.7, changeFreq: 'daily' },
  { url: '/about', priority: 0.5, changeFreq: 'monthly' },
  { url: '/contact', priority: 0.5, changeFreq: 'monthly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Initialize Supabase client
    const supabase = supabaseBrowserClient;

    // Fetch all active products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('slug, updated_at')
      .eq('is_active', true);

    if (productsError) {
      console.error('Error fetching products for sitemap:', productsError);
    }

    // Fetch all active categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('slug, updated_at')
      .eq('is_active', true);

    if (categoriesError) {
      console.error('Error fetching categories for sitemap:', categoriesError);
    }

    // Fetch all published blog posts
    const { data: blogPosts, error: blogError } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at')
      .eq('status', 'published');

    if (blogError) {
      console.error('Error fetching blog posts for sitemap:', blogError);
    }

    // Build sitemap entries
    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Add static pages
    staticPages.forEach((page) => {
      sitemapEntries.push({
        url: `${baseUrl}${page.url}`,
        lastModified: new Date(),
        changeFrequency: page.changeFreq as any,
        priority: page.priority,
      });
    });

    // Add product pages
    if (products && products.length > 0) {
      products.forEach((product) => {
        sitemapEntries.push({
          url: `${baseUrl}/products/${product.slug}`,
          lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      });
    }

    // Add category pages
    if (categories && categories.length > 0) {
      categories.forEach((category) => {
        sitemapEntries.push({
          url: `${baseUrl}/categories/${category.slug}`,
          lastModified: category.updated_at ? new Date(category.updated_at) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      });
    }

    // Add blog post pages
    if (blogPosts && blogPosts.length > 0) {
      blogPosts.forEach((post) => {
        sitemapEntries.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: post.updated_at ? new Date(post.updated_at) : new Date(post.published_at),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });
    }

    return sitemapEntries;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Fallback to static pages only if there's an error
    return staticPages.map((page) => ({
      url: `${baseUrl}${page.url}`,
      lastModified: new Date(),
      changeFrequency: page.changeFreq as any,
      priority: page.priority,
    }));
  }
}
