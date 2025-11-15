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

-- Insert categories (P0: Catalog Browse) - 8 categories matching Home page
INSERT INTO categories (id, name, slug, description, image_url, sort_order, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'เครื่องจักรงานคอนกรีต', 'concrete-machinery', 'รถตัดคอนกรีต เครื่องขัดคอนกรีต', '/category-concrete-cutter.jpg', 1, true),
('550e8400-e29b-41d4-a716-446655440002', 'เครื่องขัดมันพื้นปูน', 'power-trowels', 'เครื่องขัดมัน ใบขัดมัน ถาดขัดมัน', '/category-power-trowel.jpg', 2, true),
('550e8400-e29b-41d4-a716-446655440003', 'ใบและถาดขัดมัน', 'blades-pans', 'ใบเจียร ใบตัด ถาดขัดมัน', '/category-blades-pans.jpg', 3, true),
('550e8400-e29b-41d4-a716-446655440004', 'เครื่องปาดปูน', 'screeds', 'เครื่องปาดปูน อุปกรณ์ปาดปูน', '/category-screed.jpg', 4, true),
('550e8400-e29b-41d4-a716-446655440005', 'เครื่องตบดิน', 'compactors', 'เครื่องตบดิน แผ่นตบดิน', '/category-compactor.jpg', 5, true),
('550e8400-e29b-41d4-a716-446655440006', 'เครื่องผสมและผลิต', 'concrete-mixers', 'โม่ผสมปูน เครื่องผสมคอนกรีต', '/category-concrete-mixer.jpg', 6, true),
('550e8400-e29b-41d4-a716-446655440007', 'เครื่องปั่นไฟ', 'power-generators', 'เครื่องปั่นไฟ จ่ายไฟ สำรองไฟ', '/category-power-generator.jpg', 7, true),
('550e8400-e29b-41d4-a716-446655440008', 'เครื่องดูดฝุ่นอุตสาหกรรม', 'industrial-vacuums', 'เครื่องดูดฝุ่น อุปกรณ์ทำความสะอาด', '/category-industrial-vacuum.jpg', 8, true);

-- Insert products (P0: Catalog Browse, P1: Product Detail)
-- Featured Products (สินค้าแนะนำ) - 6 products
INSERT INTO products (id, name, slug, description, price, sale_price, rent_price, type, category_id, is_featured, is_promotion, is_active, image_url, specs) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'รถตัดพื้นคอนกรีต', 'concrete-floor-cutter', 'รถตัดพื้นคอนกรีตคุณภาพสูง ใช้งานง่าย ทนทาน เหมาะสำหรับงานตัดคอนกรีตทุกขนาด', 21900.00, NULL, 800.00, 'product', '550e8400-e29b-41d4-a716-446655440001', true, false, true, 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Concrete%20Floor%20Cutter.png', '{"power": "5 HP", "blade_size": "14 inch", "depth": "5 inch", "weight": "85 kg", "brand": "Makita"}'::jsonb),
('660e8400-e29b-41d4-a716-446655440002', 'แมงปอขัดหน้าปูน', 'concrete-power-trowel', 'แมงปอขัดหน้าปูน เครื่องขัดมันพื้นปูน ใช้งานง่าย ประสิทธิภาพสูง', 17900.00, NULL, 700.00, 'product', '550e8400-e29b-41d4-a716-446655440002', true, false, true, 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Concrete%20Power%20Trowel.png', '{"power": "380V", "disk_size": "36 inch", "speed": "1450 RPM", "weight": "120 kg", "brand": "Bosch"}'::jsonb),
('660e8400-e29b-41d4-a716-446655440003', 'เครื่องตบดิน', 'plate-compactor', 'เครื่องตบดินระบบสะเทือน เหมาะสำหรับงานอัดดินและปูหิน ให้ความแน่นสูง', 18000.00, NULL, 900.00, 'product', '550e8400-e29b-41d4-a716-446655440005', true, false, true, 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Plate%20Compactor.png', '{"power": "6.5 HP", "plate_size": "50x60 cm", "frequency": "4200 RPM", "weight": "95 kg", "brand": "Wacker"}'::jsonb),
('660e8400-e29b-41d4-a716-446655440004', 'เครื่องขัดมันพื้นปูน', 'floor-grinder', 'เครื่องขัดมันพื้นปูน ใช้งานง่าย ประสิทธิภาพสูง เหมาะสำหรับงานขัดพื้นทุกขนาด', 15900.00, NULL, 600.00, 'product', '550e8400-e29b-41d4-a716-446655440002', true, false, true, 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Concrete%20Power%20Trowel.png', '{"power": "220V", "disk_size": "10 inch", "speed": "1400 RPM", "weight": "85 kg", "brand": "Dewalt"}'::jsonb),
('660e8400-e29b-41d4-a716-446655440005', 'โม่ผสมปูน', 'cement-mortar-mixer', 'โม่ผสมปูนฉาบ เครื่องผสมคอนกรีต ขนาดใหญ่ กำลังผสมสูง', 12900.00, NULL, 500.00, 'product', '550e8400-e29b-41d4-a716-446655440006', true, false, true, 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Cement%20Mortar%20Mixer.png', '{"capacity": "200L", "power": "3 HP", "weight": "150 kg", "brand": "Honda"}'::jsonb),
('660e8400-e29b-41d4-a716-446655440006', 'เครื่องปั่นไฟ', 'portable-generator', 'เครื่องปั่นไฟพกพา คุณภาพสูง ประหยัดน้ำมัน เหมาะสำหรับงานก่อสร้าง', 9900.00, NULL, 400.00, 'product', '550e8400-e29b-41d4-a716-446655440007', true, false, true, 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Portable%20Generator.png', '{"power": "3.5 kW", "fuel": "Gasoline", "weight": "45 kg", "brand": "Honda"}'::jsonb);

-- Promotion Products (สินค้าโปรโมชั่น) - 6 products with sale_price
INSERT INTO products (id, name, slug, description, price, sale_price, rent_price, type, category_id, is_featured, is_promotion, is_active, image_url, specs) VALUES
('660e8400-e29b-41d4-a716-446655440007', 'รถตัดพื้นคอนกรีต', 'concrete-floor-cutter-promo', 'รถตัดพื้นคอนกรีตคุณภาพสูง ราคาพิเศษ', 25900.00, 21900.00, 800.00, 'product', '550e8400-e29b-41d4-a716-446655440001', false, true, true, 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Concrete%20Floor%20Cutter.png', '{"power": "5 HP", "blade_size": "14 inch", "depth": "5 inch", "weight": "85 kg", "brand": "Makita"}'::jsonb),
('660e8400-e29b-41d4-a716-446655440008', 'แมงปอขัดหน้าปูน', 'concrete-power-trowel-promo', 'แมงปอขัดหน้าปูน ราคาพิเศษ', 23000.00, 17900.00, 700.00, 'product', '550e8400-e29b-41d4-a716-446655440002', false, true, true, 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Concrete%20Power%20Trowel.png', '{"power": "380V", "disk_size": "36 inch", "speed": "1450 RPM", "weight": "120 kg", "brand": "Bosch"}'::jsonb),
('660e8400-e29b-41d4-a716-446655440009', 'เครื่องตบดิน', 'plate-compactor-promo', 'เครื่องตบดินระบบสะเทือน ราคาพิเศษ', 22900.00, 18000.00, 900.00, 'product', '550e8400-e29b-41d4-a716-446655440005', false, true, true, 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Plate%20Compactor.png', '{"power": "6.5 HP", "plate_size": "50x60 cm", "frequency": "4200 RPM", "weight": "95 kg", "brand": "Wacker"}'::jsonb),
('660e8400-e29b-41d4-a716-446655440010', 'โม่ผสมปูน', 'cement-mortar-mixer-promo', 'โม่ผสมปูนฉาบ ราคาพิเศษ', 16900.00, 12900.00, 500.00, 'product', '550e8400-e29b-41d4-a716-446655440006', false, true, true, 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Cement%20Mortar%20Mixer.png', '{"capacity": "200L", "power": "3 HP", "weight": "150 kg", "brand": "Honda"}'::jsonb),
('660e8400-e29b-41d4-a716-446655440011', 'เครื่องปั่นไฟ', 'portable-generator-promo', 'เครื่องปั่นไฟพกพา ราคาพิเศษ', 13900.00, 9900.00, 400.00, 'product', '550e8400-e29b-41d4-a716-446655440007', false, true, true, 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Portable%20Generator.png', '{"power": "3.5 kW", "fuel": "Gasoline", "weight": "45 kg", "brand": "Honda"}'::jsonb),
('660e8400-e29b-41d4-a716-446655440012', 'เครื่องดูดฝุ่นอุตสาหกรรม', 'industrial-vacuum-promo', 'เครื่องดูดฝุ่นอุตสาหกรรม ราคาพิเศษ', 11500.00, 8200.00, 350.00, 'product', '550e8400-e29b-41d4-a716-446655440008', false, true, true, 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Industrial%20Wet%20&%20Dry%20Vacuum%20Cleaner.png', '{"power": "2200W", "capacity": "30L", "weight": "12 kg", "brand": "Bosch"}'::jsonb);

-- Insert product images (P1: Product Detail) - using Supabase Storage URLs
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order) VALUES
('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Concrete%20Floor%20Cutter.png', 'รถตัดพื้นคอนกรีต', 1),
('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Concrete%20Power%20Trowel.png', 'แมงปอขัดหน้าปูน', 1),
('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440003', 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Plate%20Compactor.png', 'เครื่องตบดิน', 1),
('770e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440004', 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Concrete%20Power%20Trowel.png', 'เครื่องขัดมันพื้นปูน', 1),
('770e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440005', 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Cement%20Mortar%20Mixer.png', 'โม่ผสมปูน', 1),
('770e8400-e29b-41d4-a716-446655440006', '660e8400-e29b-41d4-a716-446655440006', 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Portable%20Generator.png', 'เครื่องปั่นไฟ', 1),
('770e8400-e29b-41d4-a716-446655440007', '660e8400-e29b-41d4-a716-446655440007', 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Concrete%20Floor%20Cutter.png', 'รถตัดพื้นคอนกรีต (โปรโมชั่น)', 1),
('770e8400-e29b-41d4-a716-446655440008', '660e8400-e29b-41d4-a716-446655440008', 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Concrete%20Power%20Trowel.png', 'แมงปอขัดหน้าปูน (โปรโมชั่น)', 1),
('770e8400-e29b-41d4-a716-446655440009', '660e8400-e29b-41d4-a716-446655440009', 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Plate%20Compactor.png', 'เครื่องตบดิน (โปรโมชั่น)', 1),
('770e8400-e29b-41d4-a716-446655440010', '660e8400-e29b-41d4-a716-446655440010', 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Cement%20Mortar%20Mixer.png', 'โม่ผสมปูน (โปรโมชั่น)', 1),
('770e8400-e29b-41d4-a716-446655440011', '660e8400-e29b-41d4-a716-446655440011', 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Portable%20Generator.png', 'เครื่องปั่นไฟ (โปรโมชั่น)', 1),
('770e8400-e29b-41d4-a716-446655440012', '660e8400-e29b-41d4-a716-446655440012', 'https://ycbjjrmxconqkhtmpxls.supabase.co/storage/v1/object/public/public_images/products/Industrial%20Wet%20&%20Dry%20Vacuum%20Cleaner.png', 'เครื่องดูดฝุ่นอุตสาหกรรม (โปรโมชั่น)', 1);

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
