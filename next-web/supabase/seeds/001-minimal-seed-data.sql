-- 001-minimal-seed-data.sql
-- Minimal seed data for 789 Tools Web Platform
-- Follows schema from TASK-010 (001-create-core-tables.sql)
-- Only uses fields defined in SPEC.md and Blueprint

-- Clear existing data (for clean seeding)
DELETE FROM product_images;
DELETE FROM products;
DELETE FROM categories;
DELETE FROM hero_slides;
DELETE FROM faq_items;
DELETE FROM blog_posts;
DELETE FROM reviews;

-- Insert categories (P0: Catalog Browse)
INSERT INTO categories (id, name, slug, description, sort_order, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'รถตัดคอนกรีต', 'concrete-cutters', 'รถตัดคอนกรีต ขนาดต่างๆ สำหรับงานก่อสร้าง', 1, true),
('550e8400-e29b-41d4-a716-446655440002', 'เครื่องขัดมัน', 'floor-grinders', 'เครื่องขัดพื้นคอนกรีต ขัดมันให้เรียบเนียน', 2, true),
('550e8400-e29b-41d4-a716-446655440003', 'เครื่องตบดิน', 'compactors', 'เครื่องตบดิน สำหรับปั้นพื้นและอัดแน่น', 3, true),
('550e8400-e29b-41d4-a716-446655440004', 'อุปกรณ์ทั่วไป', 'general-tools', 'อุปกรณ์ก่อสร้างทั่วไปอื่นๆ', 4, true);

-- Insert products (P0: Catalog Browse, P1: Product Detail)
INSERT INTO products (id, name, slug, description, price, sale_price, rent_price, type, category_id, is_featured, is_promotion, is_active, specs) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'รถตัดคอนกรีต 5 แรง', 'concrete-cutter-5hp', 'รถตัดคอนกรีต 5 แรงม้า เหมาะสำหรับงานตัดคอนกรีตขนาดกลาง พร้อมใบมีดคุณภาพสูง', 15000.00, 13500.00, 800.00, 'product', '550e8400-e29b-41d4-a716-446655440001', true, true, true, '{"power": "5 HP", "blade_size": "14 inch", "depth": "5 inch", "weight": "85 kg", "brand": "Makita"}'::jsonb),
('660e8400-e29b-41d4-a716-446655440002', 'เครื่องขัดมัน 380V', 'floor-grinder-380v', 'เครื่องขัดพื้นคอนกรีต 380V ขัดได้ทั้งมันและขัดหยาบ เหมาะสำหรับงานขัดพื้นขนาดใหญ่', 25000.00, NULL, 1200.00, 'product', '550e8400-e29b-41d4-a716-446655440002', true, false, true, '{"power": "380V", "disk_size": "12 inch", "speed": "1450 RPM", "weight": "120 kg", "brand": "Bosch"}'::jsonb),
('660e8400-e29b-41d4-a716-446655440003', 'เครื่องตบดินระบบสะเทือน', 'vibrating-plate-compactor', 'เครื่องตบดินระบบสะเทือน เหมาะสำหรับงานอัดดินและปูหิน ให้ความแน่นสูง', 18000.00, NULL, 900.00, 'product', '550e8400-e29b-41d4-a716-446655440003', false, false, true, '{"power": "6.5 HP", "plate_size": "50x60 cm", "frequency": "4200 RPM", "weight": "95 kg", "brand": "Wacker"}'::jsonb),
('660e8400-e29b-41d4-a716-446655440004', 'รถตัดคอนกรีต 8 แรง', 'concrete-cutter-8hp', 'รถตัดคอนกรีต 8 แรงม้า สำหรับงานหนักและคอนกรีตหนา', 22000.00, 20000.00, 1200.00, 'product', '550e8400-e29b-41d4-a716-446655440001', true, true, true, '{"power": "8 HP", "blade_size": "16 inch", "depth": "6 inch", "weight": "110 kg", "brand": "Hilti"}'::jsonb),
('660e8400-e29b-41d4-a716-446655440005', 'เครื่องขัดมัน 220V', 'floor-grinder-220v', 'เครื่องขัดพื้น 220V เหมาะสำหรับงานขนาดเล็กถึงกลาง', 18000.00, 16000.00, 800.00, 'product', '550e8400-e29b-41d4-a716-446655440002', false, true, true, '{"power": "220V", "disk_size": "10 inch", "speed": "1400 RPM", "weight": "85 kg", "brand": "Dewalt"}'::jsonb),
('660e8400-e29b-41d4-a716-446655440006', 'เครื่องตบดินมือ', 'hand-compactor', 'เครื่องตบดินมือ สำหรับงานที่มีพื้นที่จำกัด', 3500.00, NULL, 200.00, 'product', '550e8400-e29b-41d4-a716-446655440003', false, false, true, '{"power": "Manual", "plate_size": "30x30 cm", "weight": "15 kg", "material": "Cast Iron"}'::jsonb);

-- Insert product images (P1: Product Detail)
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order) VALUES
('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '/images/products/concrete-cutter-5hp-1.jpg', 'รถตัดคอนกรีต 5 แรง มุมหน้า', 1),
('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001', '/images/products/concrete-cutter-5hp-2.jpg', 'รถตัดคอนกรีต 5 แรง มุมข้าง', 2),
('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440002', '/images/products/floor-grinder-380v-1.jpg', 'เครื่องขัดมัน 380V มุมหน้า', 1),
('770e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440002', '/images/products/floor-grinder-380v-2.jpg', 'เครื่องขัดมัน 380V มุมข้าง', 2),
('770e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440003', '/images/products/vibrating-plate-1.jpg', 'เครื่องตบดินระบบสะเทือน มุมหน้า', 1),
('770e8400-e29b-41d4-a716-446655440006', '660e8400-e29b-41d4-a716-446655440004', '/images/products/concrete-cutter-8hp-1.jpg', 'รถตัดคอนกรีต 8 แรง มุมหน้า', 1),
('770e8400-e29b-41d4-a716-446655440007', '660e8400-e29b-41d4-a716-446655440005', '/images/products/floor-grinder-220v-1.jpg', 'เครื่องขัดมัน 220V มุมหน้า', 1),
('770e8400-e29b-41d4-a716-446655440008', '660e8400-e29b-41d4-a716-446655440006', '/images/products/hand-compactor-1.jpg', 'เครื่องตบดินมือ', 1);

-- Insert hero slides (P0: Homepage)
INSERT INTO hero_slides (id, headline, subheadline, button_text, button_url, image_url, is_active, sort_order) VALUES
('880e8400-e29b-41d4-a716-446655440001', 'ศูนย์รวมเครื่องมือช่างก่อสร้าง', 'ขาย-เช่า ครบ จบที่เดียว รถตัดคอนกรีต เครื่องขัดมัน เครื่องตบดิน', 'ดูสินค้าทั้งหมด', '/products', '/images/hero/slide-1.jpg', true, 1),
('880e8400-e29b-41d4-a716-446655440002', 'บริการซ่อมเครื่องมือ', 'มีช่างผู้เชี่ยวชาญดูแล รับประกันคุณภาพ พร้อมบริการเก็บเงินปลายทาง', 'ติดต่อเรา', '/contact', '/images/hero/slide-2.jpg', true, 2),
('880e8400-e29b-41d4-a716-446655440003', 'โปรแกรมใหม่! เช่ารายเดือน', 'เช่าเครื่องมือรายเดือนราคาพิเศษ เหมาะสำหรับโปรเจกต์ยาวๆ', 'ดูโปรแกรม', '/rental', '/images/hero/slide-3.jpg', true, 3);

-- Insert blog posts (P9: Blog)
INSERT INTO blog_posts (id, title, slug, content, excerpt, status, published_at) VALUES
('990e8400-e29b-41d4-a716-446655440001', 'วิธีเลือกรถตัดคอนกรีตที่เหมาะกับงาน', 'how-to-choose-concrete-cutter', '<h2>การเลือกรถตัดคอนกรีตที่เหมาะสม</h2><p>การเลือกรถตัดคอนกรีตที่เหมาะสมกับงานเป็นสิ่งสำคัญที่จะช่วยให้งานของคุณมีประสิทธิภาพและปลอดภัยมากขึ้น</p><h3>ปัจจัยที่ควรพิจารณา:</h3><ul><li><strong>ขนาดเครื่อง:</strong> เลือกตามขนาดงานและพื้นที่ทำงาน</li><li><strong>กำลังเครื่อง:</strong> 5-8 แรงม้าสำหรับงานทั่วไป</li><li><strong>ขนาดใบมีด:</strong> 14-16 นิ้วสำหรับคอนกรีตทั่วไป</li><li><strong>ความลึกตัด:</strong> 5-6 นิ้วสำหรับงานมาตรฐาน</li></ul><p>789 TOOLS มีรถตัดคอนกรีตหลากหลายรุ่นให้เลือกตามความเหมาะสมของงานคุณ</p>', 'คู่มือเลือกรถตัดคอนกรีตตามขนาดงานและความแข็งของพื้นผิว พร้อมเคล็ดลับการใช้งาน', 'published', NOW()),
('990e8400-e29b-41d4-a716-446655440002', 'เทคนิคการขัดพื้นคอนกรีตให้เรียบเนียน', 'concrete-grinding-techniques', '<h2>การขัดพื้นคอนกรีตให้ได้ผลลัพธ์ดีที่สุด</h2><p>การขัดพื้นคอนกรีตต้องใช้เทคนิคที่ถูกต้องและอุปกรณ์ที่เหมาะสม</p><h3>ขั้นตอนการขัดพื้น:</h3><ol><li><strong>เตรียมพื้นผิว:</strong> ทำความสะอาดและตรวจสอบสภาพพื้น</li><li><strong>เลือกใบขัด:</strong> ใช้ใบขัดหยาบสำหรับการขัดครั้งแรก</li><li><strong>ตั้งค่าเครื่อง:</strong> ปรับความเร็วและแรงดันตามความเหมาะสม</li><li><strong>ขัดเป็นช่วง:</strong> ขัดทีละพื้นที่เล็กๆ และเคลื่อนที่สม่ำเสมอ</li></ol><p>ติดต่อ 789 TOOLS สำหรับเครื่องขัดคุณภาพและคำแนะนำจากผู้เชี่ยวชาญ</p>', 'เคล็ดลับการขัดพื้นคอนกรีตให้ได้ผลลัพธ์เรียบเนียน พร้อมขั้นตอนและเทคนิค', 'published', NOW());

-- Insert reviews (P8: Reviews)
INSERT INTO reviews (id, name, content, image_url, rating, is_active) VALUES
('aa0e8400-e29b-41d4-a716-446655440001', 'คุณสมชาย ใจดี', 'บริการดีมาก รถตัดคอนกรีตสภาพดี ใช้งานได้จริง พนักงานสุภาพ แนะนำเลยครับ จะใช้บริการอีกแน่นอน', '/images/reviews/review-1.jpg', 5, true),
('aa0e8400-e29b-41d4-a716-446655440002', 'บริษัท ก่อสร้างไทย จำกัด', 'เช่าเครื่องขัดมันมาใช้ 3 วัน สภาพดี ราคาเป็นธรรม ส่งตรงเวลา จะใช้บริการอีกแน่นอนครับ', '/images/reviews/review-2.jpg', 4, true),
('aa0e8400-e29b-41d4-a716-446655440003', 'คุณมานี รักษาดี', 'ซื้อเครื่องตบดินไป 1 เครื่อง คุณภาพดีเกินคาด มีประกัน ใช้งานได้ดี ราคาไม่แพง', '/images/reviews/review-3.jpg', 5, true);

-- Insert FAQ items (P10: FAQ)
INSERT INTO faq_items (id, question, answer, sort_order, is_active) VALUES
('bb0e8400-e29b-41d4-a716-446655440001', 'สามารถเช่าเครื่องได้กี่วัน?', 'สามารถเช่าได้ตั้งแต่ 1 วันขึ้นไป มีราคาพิเศษสำหรับการเช่าระยะยาว (7 วันขึ้นไป) และโปรแกรมเช่ารายเดือนสำหรับโปรเจกต์ใหญ่', 1, true),
('bb0e8400-e29b-41d4-a716-446655440002', 'มีบริการส่งเครื่องหรือไม่?', 'มีบริการส่งเครื่องในเขตกรุงเทพและปริมณฑล คิดค่าบริการตามระยะทาง สำหรับจังหวัดอื่นสามารถจัดส่งได้โดยขนส่งเอกชน', 2, true),
('bb0e8400-e29b-41d4-a716-446655440003', 'รับประกันเครื่องสินค้าหรือไม่?', 'รับประกันสินค้าทุกชิ้น 6 เดือน สำหรับงานซ่อมรับประกัน 30 วัน มีอะไหล่และบริการหลังการขายครบครัน', 3, true),
('bb0e8400-e29b-41d4-a716-446655440004', 'ต้องมีเอกสารอะไรบ้างในการเช่า?', 'ต้องมีบัตรประชาชนและสำเนาบ้าน พร้อมมัดจำเครื่องตามราคาที่กำหนด สำหรับนิติบุคคลต้องมีหนังสือรับรองบริษัท', 4, true),
('bb0e8400-e29b-41d4-a716-446655440005', 'มีบริการช่างประจำเครื่องหรือไม่?', 'มีบริการช่างควบคุมและให้คำแนะนำการใช้งานสำหรับเครื่องขนาดใหญ่ คิดค่าบริการพิเศษตามระยะเวลา', 5, true);

-- Verify seed data insertion
SELECT 'categories' as table_name, COUNT(*) as count FROM categories
UNION ALL
SELECT 'products', COUNT(*) FROM products
UNION ALL
SELECT 'product_images', COUNT(*) FROM product_images
UNION ALL
SELECT 'hero_slides', COUNT(*) FROM hero_slides
UNION ALL
SELECT 'blog_posts', COUNT(*) FROM blog_posts
UNION ALL
SELECT 'reviews', COUNT(*) FROM reviews
UNION ALL
SELECT 'faq_items', COUNT(*) FROM faq_items;
