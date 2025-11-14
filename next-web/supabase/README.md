# Supabase Database Migrations

This folder contains SQL migration scripts for the 789 Tools Web Platform database.

## Files

- `001-create-core-tables.sql` - Creates core tables for Phase 1 MVP:
  - `categories` - Product categories
  - `products` - Main products table
  - `product_images` - Product image gallery
  - `hero_slides` - Homepage hero slider
  - `blog_posts` - Blog articles
  - `reviews` - Customer reviews
  - `faq_items` - FAQ items

## How to Use

1. **In Supabase Dashboard:**
   - Go to SQL Editor
   - Copy and paste the contents of the migration file
   - Run the script

2. **Via Supabase CLI (if installed):**
   ```bash
   supabase db push
   ```

3. **Manual Execution:**
   - Connect to your Supabase project
   - Execute the SQL script directly

## Table Relationships

- `products.category_id` → `categories.id`
- `product_images.product_id` → `products.id` (CASCADE delete)

## Notes

- All tables use UUID primary keys
- All tables have `created_at` timestamps
- Tables with content have `updated_at` timestamps with automatic triggers
- Appropriate indexes are created for performance
- Foreign key constraints ensure data integrity
