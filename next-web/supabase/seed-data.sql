-- seed-data.sql
-- Sample data for testing the 789 Tools Web Platform
-- Run this after creating tables to populate with test data

-- Insert sample categories
INSERT INTO categories (name, slug, description, sort_order, is_active) VALUES
('รถตัดคอนกรีต', 'concrete-cutters', 'รถตัดคอนกรีต ขนาดต่างๆ สำหรับงานก่อสร้าง', 1, true),
('เครื่องขัดมัน', 'floor-grinders', 'เครื่องขัดพื้นคอนกรีต ขัดมันให้เรียบเนียน', 2, true),
('เครื่องตบดิน', 'compactors', 'เครื่องตบดิน สำหรับปั้นพื้นและอัดแน่น', 3, true),
('อุปกรณ์ทั่วไป', 'general-tools', 'อุปกรณ์ก่อสร้างทั่วไปอื่นๆ', 4, true);

-- Insert sample products
INSERT INTO products (name, slug, description, price, sale_price, rent_price, type, category_id, is_featured, is_promotion, is_active, specs) VALUES
(
    'รถตัดคอนกรีต 5 แรง',
    'concrete-cutter-5hp',
    'รถตัดคอนกรีต 5 แรงม้า เหมาะสำหรับงานตัดคอนกรีตขนาดกลาง',
    15000.00,
    13500.00,
    800.00,
    'product',
    (SELECT id FROM categories WHERE slug = 'concrete-cutters'),
    true,
    true,
    true,
    '{"power": "5 HP", "blade_size": "14 inch", "depth": "5 inch", "weight": "85 kg"}'::jsonb
),
(
    'เครื่องขัดมัน 380V',
    'floor-grinder-380v',
    'เครื่องขัดพื้นคอนกรีต 380V ขัดได้ทั้งมันและขัดหยาบ',
    25000.00,
    NULL,
    1200.00,
    'product',
    (SELECT id FROM categories WHERE slug = 'floor-grinders'),
    true,
    false,
    true,
    '{"power": "380V", "disk_size": "12 inch", "speed": "1450 RPM", "weight": "120 kg"}'::jsonb
),
(
    'เครื่องตบดินระบบสะเทือน',
    'vibrating-plate-compactor',
    'เครื่องตบดินระบบสะเทือน เหมาะสำหรับงานอัดดินและปูหิน',
    18000.00,
    NULL,
    900.00,
    'product',
    (SELECT id FROM categories WHERE slug = 'compactors'),
    false,
    false,
    true,
    '{"power": "6.5 HP", "plate_size": "50x60 cm", "frequency": "4200 RPM", "weight": "95 kg"}'::jsonb
);

-- Insert product images
INSERT INTO product_images (product_id, image_url, alt_text, sort_order) VALUES
(
    (SELECT id FROM products WHERE slug = 'concrete-cutter-5hp'),
    '/images/products/concrete-cutter-5hp-1.jpg',
    'รถตัดคอนกรีต 5 แรง มุมหน้า',
    1
),
(
    (SELECT id FROM products WHERE slug = 'concrete-cutter-5hp'),
    '/images/products/concrete-cutter-5hp-2.jpg',
    'รถตัดคอนกรีต 5 แรง มุมข้าง',
    2
),
(
    (SELECT id FROM products WHERE slug = 'floor-grinder-380v'),
    '/images/products/floor-grinder-380v-1.jpg',
    'เครื่องขัดมัน 380V มุมหน้า',
    1
);

-- Insert hero slides
INSERT INTO hero_slides (headline, subheadline, button_text, button_url, image_url, is_active, sort_order) VALUES
(
    'ศูนย์รวมเครื่องมือช่างก่อสร้าง',
    'ขาย-เช่า ครบ จบที่เดียว รถตัดคอนกรีต เครื่องขัดมัน เครื่องตบดิน',
    'ดูสินค้าทั้งหมด',
    '/products',
    '/images/hero/slide-1.jpg',
    true,
    1
),
(
    'บริการซ่อมเครื่องมือ',
    'มีช่างผู้เชี่ยวชาญดูแล รับประกันคุณภาพ',
    'ติดต่อเรา',
    '/contact',
    '/images/hero/slide-2.jpg',
    true,
    2
);

-- Insert blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, status, published_at) VALUES
(
    'วิธีเลือกรถตัดคอนกรีตที่เหมาะกับงาน',
    'how-to-choose-concrete-cutter',
    'การเลือกรถตัดคอนกรีตที่เหมาะสมกับงานเป็นสิ่งสำคัญ... (full content)',
    'คู่มือเลือกรถตัดคอนกรีตตามขนาดงานและความแข็งของพื้นผิว',
    'published',
    NOW()
),
(
    'เทคนิคการขัดพื้นคอนกรีตให้เรียบเนียน',
    'concrete-grinding-techniques',
    'การขัดพื้นคอนกรีตต้องใช้เทคนิคที่ถูกต้อง... (full content)',
    'เคล็ดลับการขัดพื้นคอนกรีตให้ได้ผลลัพธ์ดีที่สุด',
    'published',
    NOW()
);

-- Insert sample reviews
INSERT INTO reviews (name, content, image_url, rating, is_active) VALUES
(
    'คุณสมชาย',
    'บริการดีมาก รถตัดคอนกรีตสภาพดี ใช้งานได้จริง แนะนำเลยครับ',
    '/images/reviews/review-1.jpg',
    5,
    true
),
(
    'บริษัท ก่อสร้างไทย',
    'เช่าเครื่องขัดมันมาใช้ สภาพดี ราคาเป็นธรรม จะใช้บริการอีกแน่นอน',
    '/images/reviews/review-2.jpg',
    4,
    true
);

-- Insert FAQ items
INSERT INTO faq_items (question, answer, sort_order, is_active) VALUES
(
    'สามารถเช่าเครื่องได้กี่วัน?',
    'สามารถเช่าได้ตั้งแต่ 1 วันขึ้นไป มีราคาพิเศษสำหรับการเช่าระยะยาว (7 วันขึ้นไป)',
    1,
    true
),
(
    'มีบริการส่งเครื่องหรือไม่?',
    'มีบริการส่งเครื่องในเขตกรุงเทพและปริมณฑล คิดค่าบริการตามระยะทาง',
    2,
    true
),
(
    'รับประกันเครื่องสินค้าหรือไม่?',
    'รับประกันสินค้าทุกชิ้น 6 เดือน สำหรับงานซ่อมรับประกัน 30 วัน',
    3,
    true
),
(
    'ต้องมีเอกสารอะไรบ้างในการเช่า?',
    'ต้องมีบัตรประชาชนและสำเนาบ้าน พร้อมมัดจำเครื่องตามราคาที่กำหนด',
    4,
    true
);
