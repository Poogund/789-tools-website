# Supabase Seed Data

This folder contains SQL seed scripts for populating the 789 Tools Web Platform database with initial data.

## Files

- `001-minimal-seed-data.sql` - Minimal seed data for all core tables:
  - **4 categories** - รถตัดคอนกรีต, เครื่องขัดมัน, เครื่องตบดิน, อุปกรณ์ทั่วไป
  - **6 products** - รถตัดคอนกรีต 2 รุ่น, เครื่องขัดมัน 2 รุ่น, เครื่องตบดิน 2 รุ่น
  - **8 product images** - รูปภาพสินค้าพร้อม sort_order
  - **3 hero slides** - สำหรับ homepage slideshow
  - **2 blog posts** - บทความเกี่ยวกับการใช้เครื่องมือ
  - **3 customer reviews** - รีวิวลูกค้าพร้อม rating
  - **5 FAQ items** - คำถามที่พบบ่อย

## Data Structure

### Categories
- หมวดหมู่หลักตามประเภทเครื่องมือ
- มี sort_order สำหรับการจัดเรียง
- ทุกหมวดหมู่ active

### Products
- ครบทั้งขายและเช่า (price, sale_price, rent_price)
- มี featured และ promotion flags
- specs เก็บเป็น JSONB ตาม Blueprint
- ใช้ UUID ที่กำหนดเองสำหรับความสอดคล้องกับ images

### Product Images
- แต่ละสินค้ามี 1-2 รูป
- มี alt_text สำหรับ accessibility
- sort_order สำหรับการจัดเรียง

### Hero Slides
- 3 slides สำหรับ homepage
- มี call-to-action buttons
- sort_order สำหรับการจัดเรียง

### Blog Posts
- 2 บทความ starter เกี่ยวกับเครื่องมือ
- Published status พร้อม published_at
- Content เป็น HTML สำหรับ rendering

### Reviews
- 3 รีวิวตัวอย่างจากลูกค้า
- Rating 4-5 ดาว
- มีรูปภาพ (placeholder paths)

### FAQ Items
- 5 คำถามที่พบบ่อย
- ครอบคลุมการเช่า, การส่ง, การรับประกัน, เอกสาร, บริการช่าง
- sort_order สำหรับการจัดเรียง

## How to Use

1. **In Supabase Dashboard:**
   - Go to SQL Editor
   - Copy and paste the contents of `001-minimal-seed-data.sql`
   - Run the script

2. **Via Supabase CLI:**
   ```bash
   supabase db reset  # Reset to clean state
   supabase db seed   # Run seed files
   ```

3. **Manual Execution:**
   - Run table creation first (`001-create-core-tables.sql`)
   - Then run seed data (`001-minimal-seed-data.sql`)

## Notes

- All data uses Thai language appropriate for the target market
- Image paths are placeholders - replace with actual uploaded images
- UUIDs are manually defined for consistency between related tables
- Data is minimal but sufficient for UI development and testing
- Includes verification query at the end to confirm successful insertion
