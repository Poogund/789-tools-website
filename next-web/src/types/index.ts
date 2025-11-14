// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  sale_price?: number;
  original_price?: number;
  rent_price?: number;
  type: 'product' | 'service';
  category_id: string;
  is_featured: boolean;
  is_promotion: boolean;
  is_active: boolean;
  image_url?: string;
  specs?: Record<string, any>;
  features?: string[];
  specifications?: Record<string, any>;
  included_items?: string[];
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text?: string;
  sort_order: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Cart Types
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  salePrice?: number;
  quantity: number;
  imageUrl?: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

// Order Types
export interface Order {
  id: string;
  customer_id?: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_address: string;
  payment_method: 'transfer' | 'card';
  payment_status: 'unpaid' | 'paid' | 'failed';
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  total_amount: number;
  transfer_slip_url?: string;
  omise_charge_id?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

// Content Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  thumbnail_url?: string;
  status: 'draft' | 'published';
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  name: string;
  content: string;
  image_url?: string;
  rating?: number;
  is_active: boolean;
  created_at: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
}

export interface HeroSlide {
  id: string;
  headline: string;
  subheadline?: string;
  button_text?: string;
  button_url?: string;
  image_url?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Lead Types
export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  service_type?: string;
  status: 'new' | 'in_progress' | 'won' | 'lost';
  created_at: string;
  updated_at: string;
}
