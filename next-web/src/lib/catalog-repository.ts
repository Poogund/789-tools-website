import { createServerSupabaseClient } from './supabase/server';
import { Product, ProductImage, Category, HeroSlide, FAQItem, BlogPost } from '@/types';

// Products
export async function getProducts(): Promise<Product[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    // PGRST205 = table not found in schema cache (e.g. local DB not fully set up yet)
    if ((error as any).code === 'PGRST205') return [];
    throw error;
  }
  return data || [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    if ((error as any).code === 'PGRST116') return null; // Not found
    if ((error as any).code === 'PGRST205') return null; // Table missing in local dev
    throw error;
  }
  return data;
}

export async function getProductImages(productId: string): Promise<ProductImage[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('product_images')
    .select('*')
    .eq('product_id', productId)
    .order('sort_order', { ascending: true });

  if (error) {
    if ((error as any).code === 'PGRST205') return [];
    throw error;
  }
  return data || [];
}

// Get products with images (for catalog pages)
export async function getProductsWithImages(): Promise<(Product & { images: ProductImage[] })[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (*)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    if ((error as any).code === 'PGRST205') return [];
    throw error;
  }
  return data || [];
}

// Get products by category
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories!inner (slug)
    `)
    .eq('is_active', true)
    .eq('categories.slug', categorySlug)
    .order('created_at', { ascending: false });

  if (error) {
    if ((error as any).code === 'PGRST205') return [];
    throw error;
  }
  return data || [];
}

// Get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false });

  if (error) {
    if ((error as any).code === 'PGRST205') {
      // Fallback featured products for local development
      return [
        {
          id: '1',
          name: 'รถตัดพื้นคอนกรีต',
          slug: 'concrete-cutter',
          description: 'เครื่องตัดคอนกรีตคุณภาพสูง ใช้งานง่าย ทนทาน',
          price: 45000,
          original_price: 55000,
          rent_price: 1500,
          image_url: '/รถตัดพื้นคอนกรีต.png',
          category_id: '1',
          type: 'product' as const,
          is_featured: true,
          is_promotion: false,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'เครื่องตบดิน',
          slug: 'compactor',
          description: 'เครื่องตบดินระบบไฮดรอลิค กำลังสูง',
          price: 35000,
          original_price: 42000,
          rent_price: 1200,
          image_url: '/เครื่องตบดิน.png',
          category_id: '2',
          type: 'product' as const,
          is_featured: true,
          is_promotion: false,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '3',
          name: 'โม่ผสมปูนฉาบ',
          slug: 'concrete-mixer',
          description: 'โม่ผสมคอนกรีตขนาดใหญ่ กำลังผสิตสูง',
          price: 28000,
          original_price: 35000,
          rent_price: 800,
          image_url: '/โม่ผสมปูนฉาบ.png',
          category_id: '3',
          type: 'product' as const,
          is_featured: true,
          is_promotion: false,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '4',
          name: 'เครื่องปั่นไฟ',
          slug: 'generator',
          description: 'เครื่องปั่นไฟดีเซล คุณภาพสูง ประหยัดน้ำมัน',
          price: 25000,
          original_price: 30000,
          rent_price: 1000,
          image_url: '/เครื่องปั่นไฟ.png',
          category_id: '4',
          type: 'product' as const,
          is_featured: true,
          is_promotion: false,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    }
    throw error;
  }
  return data || [];
}

// Get promotion products
export async function getPromotionProducts(): Promise<Product[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('is_promotion', true)
    .order('created_at', { ascending: false });

  if (error) {
    if ((error as any).code === 'PGRST205') {
      // Fallback promotion products for local development
      return [
        {
          id: '5',
          name: 'แมงปอขัดหน้าปูน',
          slug: 'power-trowel',
          description: 'แมงปอขัดพื้นปูน ขนาดใหญ่ ผิวเรียบเนียน',
          price: 18000,
          original_price: 25000,
          rent_price: 600,
          image_url: '/แมงปอขัดหน้าปูน.png',
          category_id: '5',
          type: 'product' as const,
          is_featured: false,
          is_promotion: true,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '6',
          name: 'เครื่องดูดฝุ่น',
          slug: 'industrial-vacuum',
          description: 'เครื่องดูดฝุ่นอุตสาหกรรม กำลังดูดสูง',
          price: 15000,
          original_price: 20000,
          rent_price: 500,
          image_url: '/เครื่องดูดฝุ่น.png',
          category_id: '6',
          type: 'product' as const,
          is_featured: false,
          is_promotion: true,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '7',
          name: 'เครื่องตัดถนน',
          slug: 'road-cutter',
          description: 'เครื่องตัดถนนคอนกรีต ความลึกปรับได้',
          price: 22000,
          original_price: 28000,
          rent_price: 700,
          image_url: '/category-concrete-cutter.jpg',
          category_id: '7',
          type: 'product' as const,
          is_featured: false,
          is_promotion: true,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '8',
          name: 'เครื่องขัดมันพื้นปูน',
          slug: 'floor-grinder',
          description: 'เครื่องขัดพื้นปูน ให้ผิวเรียบเนียน',
          price: 32000,
          original_price: 40000,
          rent_price: 900,
          image_url: '/category-blades-pans.jpg',
          category_id: '8',
          type: 'product' as const,
          is_featured: false,
          is_promotion: true,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    }
    throw error;
  }
  return data || [];
}

// Categories
export async function getCategories(): Promise<Category[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    if ((error as any).code === 'PGRST205') {
      // Fallback categories for local development
      return [
        {
          id: '1',
          name: 'เครื่องตัดคอนกรีต',
          slug: 'concrete-cutter',
          description: 'เครื่องตัดคอนกรีตและถนนคุณภาพสูง',
          image_url: '/category-concrete-cutter.jpg',
          sort_order: 1,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'เครื่องตบดิน',
          slug: 'compactor',
          description: 'เครื่องตบดินระบบไฮดรอลิคทุกขนาด',
          image_url: '/category-compactor.jpg',
          sort_order: 2,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '3',
          name: 'เครื่องผสมคอนกรีต',
          slug: 'concrete-mixer',
          description: 'โม่ผสมคอนกรีตและปูนฉาบ',
          image_url: '/category-concrete-mixer.jpg',
          sort_order: 3,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '4',
          name: 'เครื่องปั่นไฟ',
          slug: 'generator',
          description: 'เครื่องปั่นไฟดีเซลและเบนซิน',
          image_url: '/category-power-generator.jpg',
          sort_order: 4,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '5',
          name: 'เครื่องขัดพื้น',
          slug: 'floor-grinder',
          description: 'แมงปอและเครื่องขัดพื้นปูน',
          image_url: '/category-power-trowel.jpg',
          sort_order: 5,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '6',
          name: 'เครื่องดูดฝุ่น',
          slug: 'industrial-vacuum',
          description: 'เครื่องดูดฝุ่นอุตสาหกรรม',
          image_url: '/category-industrial-vacuum.jpg',
          sort_order: 6,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    }
    throw error;
  }
  return data || [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    if ((error as any).code === 'PGRST116') return null;
    if ((error as any).code === 'PGRST205') return null;
    throw error;
  }
  return data;
}

// Hero Slides
export async function getHeroSlides(): Promise<HeroSlide[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('hero_slides')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    if ((error as any).code === 'PGRST205') {
      // Table not found (e.g. local dev without migrations) -> fallback to default slides
      return [
        {
          id: '1',
          headline: 'ศูนย์รวมเครื่องมือช่างก่อสร้าง',
          subheadline: 'ขาย-เช่า ครบวงจร พร้อมบริการซ่อม',
          image_url: '/hero-background.jpg',
          button_text: 'ดูสินค้าทั้งหมด',
          button_url: '/products',
          sort_order: 1,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          headline: 'เครื่องตัดคอนกรีตคุณภาพสูง',
          subheadline: 'รับประกันคุณภาพ ส่งเร็วทั่วประเทศ',
          image_url: '/รถตัดพื้นคอนกรีต.png',
          button_text: 'ติดต่อเรา',
          button_url: '/contact',
          sort_order: 2,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    }
    throw error;
  }
  return data || [];
}

// FAQ Items
export async function getFaqItems(): Promise<FAQItem[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('faq_items')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    if ((error as any).code === 'PGRST205') return [];
    throw error;
  }
  return data || [];
}

// Blog Posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    if ((error as any).code === 'PGRST205') {
      // Fallback blog posts for local development
      return [
        {
          id: '1',
          title: 'วิธีเลือกเครื่องตัดคอนกรีตที่เหมาะสม',
          slug: 'how-to-choose-concrete-cutter',
          content: '<p>เครื่องตัดคอนกรีตเป็นอุปกรณ์สำคัญในงานก่อสร้าง...</p>',
          excerpt: 'คู่มือการเลือกเครื่องตัดคอนกรีตที่เหมาะกับงานของคุณ',
          thumbnail_url: '/blog/concrete-cutter.jpg',
          status: 'published' as const,
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'การดูแลรักษาเครื่องตบดินให้ใช้งานได้นาน',
          slug: 'maintain-compactor',
          content: '<p>การดูแลรักษาเครื่องตบดินอย่างถูกต้องจะช่วยยืดอายุการใช้งาน...</p>',
          excerpt: 'เคล็ดลับการดูแลรักษาเครื่องตบดินให้มีประสิทธิภาพสูงสุด',
          thumbnail_url: '/blog/compactor.jpg',
          status: 'published' as const,
          published_at: new Date(Date.now() - 86400000).toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    }
    throw error;
  }
  return data || [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    if ((error as any).code === 'PGRST116') return null; // Not found
    if ((error as any).code === 'PGRST205') return null; // Table missing in local dev
    throw error;
  }
  return data;
}
