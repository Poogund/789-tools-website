import { createServerSupabaseClient } from './supabase/server';
import { Product, ProductImage, Category, HeroSlide, FAQItem } from '@/types';

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
    if ((error as any).code === 'PGRST205') return [];
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
    if ((error as any).code === 'PGRST205') return [];
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
    if ((error as any).code === 'PGRST205') return [];
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
      // Table not found (e.g. local dev without migrations) -> fallback to no slides
      return [];
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
