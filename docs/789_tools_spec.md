# SPEC.md – 789 TOOLS WEB PLATFORM (NEXT.JS + SUPABASE)

> **Goal:** ระบุสเปกเชิงฟีเจอร์ที่ "ทดสอบได้" (testable) สำหรับเว็บ 789 Tools เวอร์ชัน E-commerce + Leads + Blog + Admin ตาม Blueprint V2.1  
> **Audience:** Windsurf / AI Agents / Dev / QA  
> **Source of Truth:** 789 Tools – Full Production Blueprint V2.1 (E-commerce + Customer Auth)

---

## 0. Scope & Release Phases

### 0.1 In-scope (MVP Mockup – Phase 1)

- Public site: Home, Products, Product Detail, Category, Services (ซ่อม/เช่า), Rental Terms, Reviews, FAQ, Blog (list), About, Contact
- E-commerce (พื้นฐาน):
  - F06 – Cart (guest + basic auth sync)
  - F07 – Checkout (วิธีโอนเงิน + อัปโหลดสลิป)
  - สร้าง Orders (บันทึกใน DB)
- Auth ลูกค้า: F05 (Email + Social Login เบื้องต้น)
- Account + Order History (F08 เบื้องต้น – ดูรายการได้)
- Admin: Product, Categories, Hero, Blog, FAQ, Reviews, Leads, Orders basic
- GA4 + event พื้นฐาน (view product, add to cart, begin checkout, complete checkout)

### 0.2 Out-of-scope (Phase ถัดไป)

- การจ่ายบัตรเครดิต Omise โหมด production เต็มรูปแบบ (F07-B ลึก)
- ฟีเจอร์ customer profile ขั้นสูง (ที่อยู่หลายชุด, เปลี่ยนอีเมล ฯลฯ)
- ระบบจัดการคลังสินค้าแบบละเอียด (multi-warehouse)
- ระบบจัดการจัดส่ง + tracking number automation

---

## 1. ID System

- **Public Page Specs:** `P0`–`P16`
- **Admin Specs:** `A`, `A0`, `B1`–`B13`
- **Feature-level (E-com/Auth):** `F05`–`F08`
- **API Specs:** `API-*`

ทุก Spec ต้องมี **Acceptance Criteria** ชัดเจน และสามารถทดสอบด้วย manual หรือ automated test ได้

---

## 2. Public Site Specs

### P0 – Home Page

**Requirement:**
- แสดง Hero Slider, หมวดสินค้า, สินค้าแนะนำ/โปร, Services highlight, Reviews, FAQ สั้น ๆ, CTA ไป LINE/โทร/Messenger

**Acceptance Criteria:**
1. เมื่อผู้ใช้เปิด `/`:
   - ระบบดึง hero slides ที่ `is_active = true` จาก DB และแสดงอย่างน้อย 1 สไลด์
   - สไลด์หมุนวนอัตโนมัติ และผู้ใช้สามารถกดเปลี่ยนสไลด์เองได้
2. ส่วน Categories แสดงอย่างน้อย 1 หมวดที่มีสินค้าจริงในระบบ
3. ส่วน Featured/Promotion ดึงสินค้าที่ `is_featured = true` หรือ `is_promotion = true` หรือมี `sale_price` > 0
4. Reviews แสดงรีวิวล่าสุด (พร้อมรูปหน้างาน ถ้ามี) ไม่ต่ำกว่า 1 รายการ ถ้ามีใน DB
5. FAQ section แสดงคำถาม-คำตอบสั้น ๆ ไม่ต่ำกว่า 3 รายการ (ถ้ามีใน DB)
6. CTA Buttons:
   - ปุ่ม "แอดไลน์" เปิดลิงก์ LINE OA ในแท็บใหม่
   - ปุ่ม "โทร" ใช้ `tel:` ถูกต้อง
   - ปุ่ม Messenger เปิดลิงก์แชทที่กำหนดใน config
7. SEO:
   - มี `<title>` และ `<meta name="description">` ตามค่าใน config
   - มี `Organization`/`LocalBusiness` JSON-LD อย่างน้อย 1 ชุด

---

### P1 – Products Listing

**Requirement:**
- แสดงสินค้าทั้งหมดที่ `is_active` พร้อม filter ตามหมวดหมู่

**Acceptance Criteria:**
1. `/products` ต้องแสดงสินค้าจาก `products` table ที่ไม่ถูก mark ว่า archived/hidden
2. แต่ละการ์ดสินค้าแสดง: รูปหลัก, ชื่อ, ราคา (และราคาโปร ถ้ามี), ป้าย promotion/featured (ถ้ามี)
3. ผู้ใช้สามารถ filter ตาม `category` ได้ (เช่น dropdown หรือ side filter)
4. ถ้าหมวดที่เลือกไม่มีสินค้า แสดงข้อความ empty state และปุ่มกลับไปดูสินค้าทั้งหมด
5. การคลิกที่สินค้าใด ๆ จะนำไปสู่ `/products/[slug]` ที่ถูกต้อง

---

### P2 – Product Detail

**Requirement:**
- แสดงรายละเอียดสินค้าครบ พร้อมปุ่ม add-to-cart, CTA เช่า, CTA ติดต่อ และ section หน้างานจริง

**Acceptance Criteria:**
1. เมื่อเปิด `/products/[slug]`:
   - ระบบใช้ `slug` ค้นหา product จาก DB ถ้าไม่พบ แสดงหน้า 404 เฉพาะสินค้า
   - ถ้าพบ แสดง:
     - ชื่อสินค้า
     - breadcrumb (Home > Category > Product)
     - gallery รูปจาก `product_images` (อย่างน้อย 1 รูป ถ้ามี)
     - ราคา `price` หรือ `price` + `sale_price` (แสดงราคาเดิมขีดฆ่า)
     - ถ้ามี `rent_price` ให้แสดงข้อความประมาณ "เช่าเริ่มต้นที่ ... ฿"
     - สเปกในรูปแบบตารางหรือ list จาก `specs`
2. Section "ผลงานหน้างานจริง":
   - ถ้ามี `product_work_media` แสดงภาพ/วิดีโอใน layout แยก
   - ถ้าไม่มี ให้แสดงข้อความ empty state (ไม่ทิ้งพื้นที่โล่ง ๆ)
3. ปุ่มการกระทำ:
   - "เพิ่มลงรถเข็น" ทำงานร่วมกับ Spec F06 (cart) และต้องเพิ่มสินค้าลง cart state
   - ปุ่ม "ขอเช่า" ลิงก์ไปยัง LINE หรือหน้า services/เช่า (ตาม config)
   - ปุ่ม LINE, โทร ทำงานเหมือนใน P0
4. SEO/Structured Data:
   - ใช้ `generateMetadata()` สร้าง dynamic `<title>` และ `<meta>` จาก name/description
   - มี JSON-LD `Product` ที่ map ข้อมูลจาก DB (ชื่อ, ราคา, มีของ/ไม่มี, รูป, brand)
   - มี JSON-LD `BreadcrumbList`

---

### P3 – Category Page

**Requirement:**
- แสดงสินค้าทั้งหมดในหมวดนั้น ๆ พร้อมข้อมูลหมวด

**Acceptance Criteria:**
1. `/categories/[slug]` ใช้ `slug` หา category จาก DB
2. ถ้าไม่พบ category → แสดง 404 เฉพาะหมวด
3. ถ้าพบ → แสดง:
   - ชื่อหมวด + description
   - สินค้าทั้งหมดที่ `category_id` ตรง + ยัง active
4. ถ้าไม่มีสินค้าในหมวด → ขึ้นข้อความ empty state + CTA ให้ไปดูสินค้าทั้งหมด

---

### P4 – Service – ซ่อม & P5 – Service – ให้เช่า

**Requirement:**
- ให้ข้อมูลบริการ, ประเภทเครื่องที่รับ, Flow การซ่อม/เช่า, CTA ติดต่อ

**Acceptance Criteria (ใช้ร่วมกัน):**
1. หน้า `/services/repair` แสดง:
   - ลิสต์ประเภทเครื่องที่รับซ่อม (มาจาก config หรือจาก DB)
   - ขั้นตอนการซ่อม (อย่างน้อย 4–5 ขั้นตอน)
   - ข้อความเรื่องการรับประกันหลังซ่อม
   - CTA LINE/โทรชัดเจน
2. หน้า `/services/rental` แสดง:
   - ลิสต์รายการเครื่องที่แนะนำให้เช่า (จาก DB หรือ curated list)
   - ข้อความอธิบายว่าเหมาะกับงานแบบไหน
   - สรุปขั้นตอนการเช่า (ติดต่อ, มัดจำ, รับ-คืน)
   - CTA ขอเช่าผ่าน LINE/ฟอร์ม lead

---

### P6 – Rental Terms

**Requirement:**
- อธิบายเงื่อนไขการเช่าอย่างละเอียดในหน้าเดียว

**Acceptance Criteria:**
1. `/rental-terms` ต้องมีหัวข้ออย่างน้อย:
   - มัดจำ
   - ความเสียหาย
   - การนับวันเช่า
   - การคืนช้า
   - การขนส่ง/รับของ
2. เนื้อหาแต่ละหัวข้อสามารถแก้ได้ผ่าน Admin (เช่นใช้ CMS field)

---

### P7 – Reviews

**Requirement:**
- รวมรีวิวลูกค้า เน้นรูปหน้างาน + ข้อความสั้น

**Acceptance Criteria:**
1. `/reviews` แสดงรายการจาก `reviews` table ตามลำดับเวลาหรือ curated
2. แต่ละรีวิว:
   - ชื่อ หรือชื่อย่อ (ถ้ากำหนด)
   - ข้อความสั้น (ไม่บังคับยาว)
   - รูปหน้างาน (ถ้ามี image_url)
3. ถ้าไม่มีรีวิว → แสดงข้อความชัดเจนว่ากำลังรวบรวมรีวิว

---

### P8 – FAQ

**Requirement:**
- รวมคำถาม–คำตอบที่ลูกค้าถามบ่อย ทั้งเรื่องราคา, การส่ง, เช่า, การรับประกัน, อะไหล่

**Acceptance Criteria:**
1. `/faq` ดึงข้อมูลจาก `faq_items` table
2. แสดงในรูปแบบ accordion หรือ list ที่กดดูคำตอบได้
3. มี JSON-LD `FAQPage` ครอบคลุมอย่างน้อย 3 Q&A

---

### P9 – Promotion

**Requirement:**
- แสดงสินค้าที่กำลังมีโปรโมชั่น

**Acceptance Criteria:**
1. `/promotions` แสดงสินค้าที่มี:
   - `sale_price` > 0 หรือ
   - `is_promotion = true`
2. การ์ดสินค้า promo แสดงราคาเดิม + ราคาโปร
3. ถ้าไม่มีสินค้าโปร → แสดง empty state + CTA ไปดูสินค้าทั้งหมด

---

### P10 – Blog List & P11 – Blog Detail

**Requirement:**
- Blog สำหรับ SEO: วิธีเลือกเครื่อง, การดูแล, เคสงานจริง

**Acceptance Criteria:**
1. `/blog`:
   - แสดงรายการโพสต์จาก `blog_posts` ที่ `status = published`
   - เรียงตาม `published_at` ล่าสุดก่อน
2. `/blog/[slug]`:
   - ใช้ `slug` หา post จาก DB
   - ถ้าไม่พบ → แสดง 404 เฉพาะ blog
   - ถ้าพบ → แสดง title, วันที่, content, thumbnail (ถ้ามี)
3. Structured Data:
   - ใช้ JSON-LD `BlogPosting` สำหรับหน้า detail
4. บทความแต่ละชิ้นถูกสร้าง/แก้ไขได้จาก Admin (B8)

---

### P12 – About & P13 – Contact

**Acceptance Criteria:**
- About: แสดงข้อมูลแบรนด์, ภาพร้าน/ทีม, จุดเด่น (USP)
- Contact: แสดงข้อมูลติดต่อ (ที่อยู่, เบอร์, LINE, Facebook) + ฟอร์มติดต่อ (เชื่อม leads)

---

### P14 – Cart (F06)

**Requirement:**
- แสดงรายการสินค้าในรถเข็น, ปรับจำนวน, ดูราคารวม

**Acceptance Criteria:**
1. `/cart` แสดงสินค้าในรถเข็นปัจจุบัน:
   - ชื่อสินค้า, จำนวน, ราคา/ชิ้น, ราคารวมต่อรายการ
   - ราคารวมทั้งหมด (grand total)
2. ผู้ใช้สามารถ:
   - เพิ่ม/ลดจำนวน → total ต้องอัปเดตทันที
   - ลบสินค้ารายการใดก็ได้
3. Guest user:
   - cart ขึ้นอยู่กับข้อมูลใน localStorage
4. Logged-in user:
   - เมื่อโหลดหน้า cart ระบบต้อง sync กับ DB (`carts`, `cart_items`) ตาม Spec F06
5. ปุ่ม "ไปหน้า Checkout" ทำงานและพาไป `/checkout`

---

### P15 – Checkout (F07)

**Requirement:**
- ลูกค้ากรอกข้อมูล, เลือกวิธีชำระ (โอน/บัตร), ยืนยันคำสั่งซื้อ

**Acceptance Criteria:**
1. `/checkout` ต้องบังคับให้มีสินค้าใน cart ถ้า cart ว่างให้ redirect กลับ `/cart`
2. ฟอร์ม checkout ขั้นต่ำประกอบด้วย field:
   - ชื่อ
   - เบอร์โทร
   - อีเมล
   - ที่อยู่จัดส่ง (textarea)
   - วิธีการชำระ: โอนเงิน / บัตรเครดิต
3. เมื่อเลือก "โอนเงิน":
   - หลัง submit:
     - สร้าง `orders` + `order_items` ใน DB ด้วย `payment_method = transfer`, `payment_status = unpaid`, `status = pending`
     - พาผู้ใช้ไปหน้า upload slip (ส่วนหนึ่งของ flow หรือในหน้า orders detail)
4. เมื่อเลือก "บัตรเครดิต" (MVP = mock หรือ sandbox):
   - ระบบสร้าง request ไปยัง Omise (โหมด sandbox)
   - ต้องมีช่องทางรับ webhook ที่ `/api/webhooks/omise` ตาม Spec API
5. ทุกการสร้าง order สำเร็จต้อง redirect ไป `/order-success` พร้อมเลขออเดอร์ใน URL หรือ query

---

### P16 – Order Confirmation

**Acceptance Criteria:**
1. `/order-success` แสดงข้อความยืนยันสำเร็จ
2. แสดงเลขคำสั่งซื้อ และสรุปยอดคำสั่งซื้อแบบสั้น ๆ
3. มี CTA กลับไปหน้า Home หรือไปหน้า Account/Orders (ถ้าล็อกอิน)

---

### F05 – Customer Auth (Login/Register/Account)

**Requirement:**
- ลูกค้าสามารถสมัครสมาชิก/ล็อกอินด้วย Email หรือ Google/Facebook ผ่าน Supabase Auth

**Acceptance Criteria:**
1. หน้า `/login` ให้ลูกค้า:
   - ล็อกอินด้วยอีเมล/รหัสผ่าน (Supabase)
   - คลิกปุ่ม "Login with Google" และ "Login with Facebook" ที่เรียก Supabase social auth flow
2. หน้า `/register` ให้ลูกค้าสมัครด้วยอีเมล/รหัสผ่าน
3. ถ้าล็อกอินสำเร็จ:
   - ระบบ redirect ไป `/account` หรือกลับไปหน้าที่มา
   - สร้าง/อัปเดต record ใน `customers` table โดย map `auth_user_id`
4. พื้นที่ `/account/*` ต้องบังคับ login (redirect ไป `/login` ถ้าไม่ล็อกอิน)

---

### F06 – Shopping Cart (Sync)

**Requirement:**
- ตะกร้าเชื่อมกับ DB เมื่อผู้ใช้ล็อกอิน

**Acceptance Criteria:**
1. Guest user:
   - เพิ่มสินค้าลง cart → ข้อมูลเก็บใน localStorage
2. เมื่อ guest ล็อกอิน:
   - ระบบ merge cart ใน localStorage เข้ากับ cart ใน DB (ถ้ามีอยู่ก่อน)
3. Logged-in user:
   - การเปลี่ยนแปลง cart (เพิ่ม/ลบ/ปรับจำนวน) จะ sync ไปยัง table `carts` และ `cart_items` ผ่าน `/api/cart`
4. ถ้า user ล็อกเอาท์:
   - ยังเก็บ cart guest ไว้ใน localStorage ได้ (ไม่บังคับ clear)

---

### F07 – Checkout (Transfer + Card via Omise)

**Requirement:**
- รองรับทั้งโอนเงิน (upload slip) และบัตรเครดิต (Omise)

**Acceptance Criteria (ระดับ Spec, ไม่รวม integration ลึก):**
1. ทางเลือก "โอนเงิน":
   - ต้องมีคำอธิบายวิธีโอน + เลขบัญชี (มาจาก config/admin settings)
   - เมื่อทำ order แล้วลูกค้าสามารถ upload slip ได้อย่างน้อย 1 รูป และระบบบันทึก path ใน `transfer_slip_url`
2. ทางเลือก "บัตรเครดิต":
   - ต้องเรียกใช้ Omise API ใน sandbox mode สำหรับ MVP
   - เมื่อ Omise เรียก webhook มายัง `/api/webhooks/omise`:
     - ระบบอ่าน charge status
     - อัปเดต `payment_status` ใน `orders` เป็น `paid` หรือ `failed`

---

### F08 – Customer Order History

**Acceptance Criteria:**
1. เมื่อ user ล็อกอินและเข้า `/account/orders`:
   - แสดงรายการ order ทั้งหมดที่ `customer_id` ตรงกับลูกค้า
   - แสดง: เลขออเดอร์, วันที่, ยอดรวม, payment_status, status
2. คลิกออเดอร์หนึ่ง → ไป `/account/orders/[id]`:
   - แสดงรายการสินค้าใน order, ราคา, วิธีชำระ, payment_status, status ปัจจุบัน
3. ถ้า user ไม่มี order → แสดง empty state ให้ไปเลือกซื้อสินค้า

---

## 3. Admin Specs (ย่อ ระดับ Feature)

> รายละเอียด field ตาม Data Model ใน Blueprint V2.1

- **A0 – Admin Layout:** มี sidebar menu ครบ: Dashboard, Products, Categories, Hero, Work Media, Services, Reviews, FAQ, Blog, Leads, Orders, Settings
- **A – Dashboard:** สรุป leads ล่าสุด, orders ล่าสุด, สินค้าที่ถูกดูบ่อย (optional ใน Phase 1)
- **B1 – Product CRUD:** เพิ่ม/แก้/ซ่อนสินค้า, อัปโหลดรูป, ตั้งราคา/ราคาโปร/ราคาเช่า (ตามสิทธิ์ role)
- **B2 – Category CRUD:** เพิ่ม/แก้ชื่อหมวด, slug, description
- **B3 – Hero Slider CRUD:** เพิ่ม/แก้/ลบสไลด์, เปิด/ปิด, ลำดับแสดงผล
- **B4 – Work Media CRUD:** ผูกภาพ/วิดีโอกับสินค้าแต่ละตัว
- **B5 – Services Pages CRUD:** แก้เนื้อหาหน้า services (ซ่อม/เช่า)
- **B6 – Review Management:** เพิ่ม/แก้/เปิดปิดรีวิว
- **B7 – FAQ CRUD:** เพิ่ม/แก้คำถาม–คำตอบ
- **B8 – Blog CRUD:** เขียน/แก้บทความ, ตั้งสถานะ draft/published
- **B9 – Leads Management:** ดู leads, เปลี่ยนสถานะ (new/in_progress/won/lost)
- **B10 – Promotions:** ตั้ง flag promotion หรือ sale_price ให้สินค้า
- **B12 – Orders Management:** ดู order, ดู slip, อัปเดต status และ payment_status
- **B13 – Settings:** ตั้งค่าพื้นฐาน เช่น LINE ID, เบอร์โทร, ข้อมูลบัญชีธนาคารสำหรับโอน

ทุกหน้า Admin ต้อง:
- บังคับ login ด้วย admin role
- ซ่อนเมนูบางส่วนจาก staff ตามสิทธิ์ (เช่น staff แก้ราคาไม่ได้)

---

## 4. Non-functional Requirements (NFR)

- **Performance:**
  - หน้า Public หลัก (Home, Products, Product Detail) ต้องโหลดได้ภายใน ~1–2 วินาทีบนเครือข่ายปกติ และผ่านเกณฑ์ Core Web Vitals ในระดับใช้งานจริง
- **Security:**
  - ป้องกันการเข้าถึง `/admin` โดยไม่มี role
  - ป้องกัน spam บนฟอร์ม lead ด้วย honeypot หรือเทคนิคง่าย ๆ
- **SEO:**
  - มี sitemap.xml และ robots.txt ถูกต้อง
  - มี metadata และ JSON-LD ตามที่ระบุใน Blueprint
- **Testability:**
  - ทุกฟีเจอร์หลัก (add to cart, checkout, lead form) ต้องออกแบบ UI ให้รองรับ E2E test (มี data-testid หรือ selector ที่เสถียร)

---

## 5. Traceability

- Blueprint V2.1 → SECTION: UX, System, Data, E-commerce → map ตรงมาที่ Spec IDs (P0–P16, F05–F08, B1–B13)
- Spec นี้จะใช้เป็นฐานให้ PLAN.md ระบุ details implementation และ TASKS.md แตกงานย่อยต่อไป

