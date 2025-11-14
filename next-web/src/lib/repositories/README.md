# Repository Layer

This directory contains repository functions that abstract database operations for the 789 Tools Web Platform.

## Catalog Repository (`../catalog-repository.ts`)

The catalog repository provides server-side functions for accessing product and content data from Supabase.

### Core Functions

#### Products
- `getProducts()` - Get all active products, ordered by creation date
- `getProductBySlug(slug)` - Get a single product by its URL slug
- `getProductImages(productId)` - Get all images for a specific product
- `getProductsWithImages()` - Get products with their images (optimized for catalog pages)
- `getProductsByCategory(categorySlug)` - Get products filtered by category
- `getFeaturedProducts()` - Get products marked as featured
- `getPromotionProducts()` - Get products with active promotions

#### Categories
- `getCategories()` - Get all active categories, ordered by sort_order
- `getCategoryBySlug(slug)` - Get a single category by its URL slug

#### Content
- `getHeroSlides()` - Get active hero slides for homepage, ordered by sort_order
- `getFaqItems()` - Get active FAQ items, ordered by sort_order

### Usage Examples

```typescript
import { getProducts, getFeaturedProducts, getHeroSlides } from '@/lib/repositories';

// In Server Components
async function ProductCatalog() {
  const products = await getProducts();
  const featuredProducts = await getFeaturedProducts();
  
  return (
    <div>
      {products.map(product => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}

// In Route Handlers
export async function GET() {
  const heroSlides = await getHeroSlides();
  return Response.json(heroSlides);
}
```

### Features

- **Type Safety**: All functions return typed results based on the database schema
- **Error Handling**: Consistent error handling with proper exception throwing
- **Active Filtering**: Automatically filters for active/visible records
- **Performance**: Optimized queries with proper ordering and joins
- **Server-Side Only**: Uses server Supabase client for secure database access

### Database Schema

The repository functions work with the following tables:
- `products` - Main product catalog
- `product_images` - Product image gallery
- `categories` - Product categories
- `hero_slides` - Homepage hero slider
- `faq_items` - FAQ items

All functions respect the `is_active` flag and appropriate sort orders as defined in the database schema.
