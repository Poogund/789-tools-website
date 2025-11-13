# 789 TOOLS – FULL PRODUCTION BLUEPRINT V2.1 (E-COMMERCE + CUSTOMER AUTH)

> **Format:** Markdown (.md)  
> **Purpose:** Optimized for Windsurf / AI Agents to implement full Next.js + Supabase + E-commerce.  
> **Scope:** Business, UX, System, Data, Admin, SEO, E-commerce, Testing, Security, Operations.

---

# 1. Vision & Business Goals

## 1.1 Vision
สร้างเว็บไซต์ระบบเต็มรูปแบบสำหรับร้าน **789 Tools** (ขาย–เช่า–ซ่อม) พร้อม **E-commerce + Leads + Blog SEO** และระบบหลังบ้านที่ทีมร้านใช้งานได้จริง รองรับการเติบโตในอนาคต

## 1.2 Business Goals
- เพิ่มยอดขายและยอดเช่าผ่านเว็บ (Cart + Checkout + Leads)
- ดัน Conversion ไปที่ LINE / โทร / Messenger พร้อม tracking
- สร้างภาพลักษณ์มืออาชีพ น่าเชื่อถือ ผ่าน Product + หน้างานจริง + รีวิว
- ลดเวลาจัดการข้อมูลผ่าน Admin (สินค้า, บทความ, รีวิว, Hero, Leads, Orders)
- วางสถาปัตยกรรมรองรับ **E-commerce เต็มรูปแบบ** (Order / Customer Account / Payment)

---

# 2. User Personas (Summary)

- **ผู้รับเหมากลาง–ใหญ่** – สนใจความทน, การรับประกัน, บริการหลังการขาย
- **ช่างอิสระ / ผู้รับเหมารายย่อย** – มองหาราคาคุ้มค่า, เช่าเครื่อง, ขอคำปรึกษา
- **โรงงาน / โกดัง / ร้านวัสดุก่อสร้าง** – เน้นบริการซ่อม + เช่า + ซื้อเครื่องคุณภาพ

---

# 3. Core Customer Journey

1. เจอร้านผ่าน Facebook / ปากต่อปาก / SEO
2. เข้าหน้า Home → ดูหมวดสินค้า / Promotion / Services
3. เข้า Product Detail → ดูราคา, สเปก, รูป/วิดีโอหน้างานจริง, รีวิว
4. ตัดสินใจ:
   - กดเพิ่มสินค้าลงตะกร้า → Login/Guest → Checkout → สร้างออเดอร์ (โอนเงิน / บัตรเครดิต)
   - หรือกด LINE / โทร / Messenger / ฟอร์มเช่า/ซ่อม
5. ลูกค้า (ที่สมัครสมาชิก) ดูประวัติการสั่งซื้อในหน้า Account
6. ข้อมูลลูกค้าและออเดอร์เข้า Admin → ทีมร้านดำเนินการต่อ

---

# 4. Feature Index (หลัก ๆ)

> **หมายเหตุ:** Mapping ID เฉพาะฟีเจอร์ E-commerce ที่ผู้ใช้ระบุ

- **F05 – Customer Auth**  
  ลูกค้าทั่วไปสมัครสมาชิก / ล็อกอินด้วย Email หรือ Google/Facebook ผ่าน Supabase Auth

- **F06 – Shopping Cart**  
  ลูกค้ากด "เพิ่มลงรถเข็น" ได้; ถ้าล็อกอินจะซิงค์ตะกร้ากับฐานข้อมูล

- **F07 – Checkout & Payments**  
  ลูกค้าสั่งซื้อได้ 2 วิธี:
  - (A) โอนเงิน → ระบบบันทึก Order (สถานะ `pending`) และให้ลูกค้าอัปโหลดสลิป
  - (B) บัตรเครดิต → เชื่อม Omise API เพื่อตัดเงินจริง → อัปเดตสถานะการชำระเงิน

- **F08 – Customer Order History**  
  ลูกค้าดูประวัติการสั่งซื้อ + สถานะ (เช่น `pending`, `processing`, `shipping`, `completed`) ในหน้า Account ของตัวเอง

---

# 5. UX & Page Blueprint

## 5.1 Public Pages (ลูกค้าทั่วไป)

- Home
- Products (listing + filter)
- Product Detail
- Category Page
- Services – ซ่อม
- Services – ให้เช่า
- Rental Terms (เงื่อนไขการเช่า)
- Reviews
- FAQ
- Promotion
- Blog + Blog Detail
- About
- Contact
- Cart
- Checkout
- Order Confirmation (Thank you page)
- **Account – Overview (F05/F08)**
- **Account – Orders History (F08)**

## 5.2 Auth Pages (ลูกค้าปลายทาง)

- Login (Email, Google, Facebook)
- Register (Email)
- Forgot Password (ถ้าเปิดใช้)

## 5.3 Home Page

- Hero Slider (หลายสไลด์, บริหารจาก Admin)
- Categories
- Featured / Promotion products
- Services highlight (ขาย–เช่า–ซ่อม)
- Why choose us (USP)
- Reviews (รูปหน้างานจริง)
- FAQ สั้น ๆ
- CTA: LINE / โทร / Messenger

## 5.4 Product Detail

- ชื่อสินค้า + breadcrumb
- Gallery รูป + รูปหน้างานจริง (section แยก)
- ราคา / ราคาโปร / ราคาเช่า
- ปุ่ม: เพิ่มลงตะกร้า, ขอเช่า, LINE, โทร
- สเปกละเอียด (ตาราง)
- สินค้าที่เกี่ยวข้อง
- Structured Data: `Product`, `BreadcrumbList`

## 5.5 E-commerce Flow

- Cart page – รายการสินค้า, ปรับจำนวน, ดูราคารวม
- Checkout – ข้อมูลติดต่อ + ที่อยู่ + วิธีการชำระ (โอน/บัตรเครดิต)
- Upload สลิป (ถ้าเลือกโอนเงิน)
- Redirect ไป Payment Page (Omise) ถ้าเลือกบัตรเครดิต
- Order Confirmation – แสดงเลขออเดอร์ + สรุปรายการ + สถานะเริ่มต้น

## 5.6 Account & Order History (F05/F08)

- หน้า Account แสดง:
  - ข้อมูลโปรไฟล์เบื้องต้น (ชื่อ, อีเมล, เบอร์โทร)
  - เมนู: Orders, Profile
- หน้า Orders History แสดง:
  - รายชื่อออเดอร์ (วันที่, ยอดรวม, สถานะ)
  - ลิงก์เข้า Order Detail: รายการสินค้า, วิธีชำระ, สถานะการชำระ, สถานะการจัดส่ง

---

# 6. Repository & Routes Structure (Next.js App Router)

```txt
/789-tools-nextjs
│
├── /app
│   ├── /(public)
│   │   ├── /page.tsx                     # (Spec P0) Home
│   │   ├── /products
│   │   │   └── page.tsx                  # (Spec P1) Products Listing
│   │   ├── /products/[slug]
│   │   │   └── page.tsx                  # (Spec P2) Product Detail
│   │   ├── /categories/[slug]
│   │   │   └── page.tsx                  # (Spec P3) Category Page
│   │   ├── /services/repair
│   │   │   └── page.tsx                  # (Spec P4) Service – ซ่อม
│   │   ├── /services/rental
│   │   │   └── page.tsx                  # (Spec P5) Service – ให้เช่า
│   │   ├── /rental-terms
│   │   │   └── page.tsx                  # (Spec P6) เงื่อนไขการเช่า
│   │   ├── /reviews
│   │   │   └── page.tsx                  # (Spec P7) Reviews
│   │   ├── /faq
│   │   │   └── page.tsx                  # (Spec P8) FAQ
│   │   ├── /promotions
│   │   │   └── page.tsx                  # (Spec P9) Promotion
│   │   ├── /blog
│   │   │   └── page.tsx                  # (Spec P10) Blog List
│   │   ├── /blog/[slug]
│   │   │   └── page.tsx                  # (Spec P11) Blog Detail
│   │   ├── /about
│   │   │   └── page.tsx                  # (Spec P12) About
│   │   ├── /contact
│   │   │   └── page.tsx                  # (Spec P13) Contact
│   │   ├── /cart
│   │   │   └── page.tsx                  # (Spec P14, F06) Cart
│   │   ├── /checkout
│   │   │   └── page.tsx                  # (Spec P15, F07) Checkout
│   │   ├── /order-success
│   │   │   └── page.tsx                  # (Spec P16) Order Confirmation
│   │   ├── /account
│   │   │   └── page.tsx                  # (Spec F05) Account Overview
│   │   ├── /account/orders
│   │   │   └── page.tsx                  # (Spec F08) Orders History
│   │   ├── /account/orders/[id]
│   │   │   └── page.tsx                  # (Spec F08-1) Order Detail
│   │   └── layout.tsx                    # Public Layout
│   │
│   ├── /(auth)
│   │   ├── /login
│   │   │   └── page.tsx                  # (Spec F05-1) Customer Login
│   │   ├── /register
│   │   │   └── page.tsx                  # (Spec F05-2) Customer Register
│   │   ├── /forgot-password
│   │   │   └── page.tsx                  # (Optional) Reset Password
│   │   └── layout.tsx                    # Auth Layout
│   │
│   ├── /(admin)/admin
│   │   ├── /dashboard
│   │   │   └── page.tsx                  # (Spec A) Dashboard Overview
│   │   ├── /products
│   │   │   └── page.tsx                  # (Spec B1) Product CRUD
│   │   ├── /categories
│   │   │   └── page.tsx                  # (Spec B2) Category CRUD
│   │   ├── /hero
│   │   │   └── page.tsx                  # (Spec B3) Hero Slider CRUD
│   │   ├── /work-media
│   │   │   └── page.tsx                  # (Spec B4) หน้างานจริง CRUD
│   │   ├── /services
│   │   │   └── page.tsx                  # (Spec B5) Service Pages CRUD
│   │   ├── /reviews
│   │   │   └── page.tsx                  # (Spec B6) Review Management
│   │   ├── /faq
│   │   │   └── page.tsx                  # (Spec B7) FAQ CRUD
│   │   ├── /blog
│   │   │   └── page.tsx                  # (Spec B8) Blog CRUD
│   │   ├── /leads
│   │   │   └── page.tsx                  # (Spec B9) Leads Management
│   │   ├── /promotions
│   │   │   └── page.tsx                  # (Spec B10) Promotion CRUD
│   │   ├── /orders
│   │   │   └── page.tsx                  # (Spec B12) Orders Management
│   │   ├── /settings
│   │   │   └── page.tsx                  # (Spec B13) Basic Settings
│   │   └── layout.tsx                    # (Spec A0) Admin Layout + Sidebar
│   │
│   ├── /api
│   │   ├── /products
│   │   │   ├── route.ts                  # (API P1) list/create products
│   │   │   └── [id]/route.ts             # (API P2) get/update product
│   │   ├── /categories
│   │   │   └── route.ts                  # (API C1) list categories
│   │   ├── /leads
│   │   │   └── route.ts                  # (API L1) create lead
│   │   ├── /blog
│   │   │   └── route.ts                  # (API B1) list/create posts
│   │   ├── /hero
│   │   │   └── route.ts                  # (API H1) hero slides
│   │   ├── /cart
│   │   │   └── route.ts                  # (API E1) sync cart (auth user)
│   │   ├── /orders
│   │   │   └── route.ts                  # (API E2) create order
│   │   ├── /auth/callback                # (Supabase social auth redirect)
│   │   └── /webhooks/omise               # (API E3) handle Omise webhook
│   │
│   └── layout.tsx                        # Root layout
│
├── /components                            # Shared UI components
├── /lib                                   # supabase client, helpers
├── /types                                 # TS types
└── /config                                # SEO, site config, constants
```

---

# 7. System Architecture

- **Frontend:** Next.js App Router + React + TailwindCSS
- **Backend:** Next.js Route Handlers (API)
- **Database/Auth/Storage:** Supabase (Postgres, Auth, Storage)
- **Hosting:** Vercel
- **Auth:**
  - Admin: email/password (Supabase Auth)
  - **Customer:** Supabase Auth + Social Login (Google/Facebook) – in-scope สำหรับ E-commerce
- **E-commerce:**
  - Guest cart (local storage)
  - Authenticated cart (Supabase table) + sync
  - Checkout → สร้าง order + order_items
  - Payment:
    - Bank transfer (upload slip)
    - Credit card via Omise API + webhook

---

# 8. Data Model (Core Tables)

## 8.1 Catalog & Content

- `products`
- `product_images`
- `product_work_media` (รูป/วิดีโอหน้างานจริง)
- `categories`
- `blog_posts`
- `reviews`
- `faq_items`
- `hero_slides`

## 8.2 Leads & E-commerce

- `leads`
  - id, name, phone, inquiry_type (buy/rent/repair), product_ref, channel, status, created_at

- `customers`
  - id
  - auth_user_id (Supabase uid)
  - name
  - email
  - phone
  - created_at

- `carts`
  - id
  - customer_id (nullable; null = guest)
  - session_id
  - updated_at

- `cart_items`
  - id
  - cart_id
  - product_id
  - quantity
  - unit_price_snapshot

- `orders`
  - id
  - customer_id (nullable)
  - name
  - phone
  - email
  - address_text
  - total_amount
  - payment_method (transfer/card)
  - payment_status (unpaid/paid/failed)
  - status (pending/processing/shipping/completed/cancelled)
  - transfer_slip_url (nullable)
  - omise_charge_id (nullable)
  - created_at

- `order_items`
  - id
  - order_id
  - product_id
  - quantity
  - unit_price_snapshot

## 8.3 Admin & Auth

- `admin_users`
  - id, email, role (owner | staff)

Permissions:
- owner: full access
- staff: จำกัดสิทธิ์ (แก้คอนเทนต์/สินค้าได้บางส่วน, ไม่ลบ, ไม่แก้ราคา ถ้าไม่อนุญาต)

---

# 9. API Blueprint (High-level)

- **Products:** list/filter, get detail, manage via admin
- **Categories:** list categories
- **Leads:** create lead from public forms, list/manage in admin
- **Blog:** list posts, get detail, CRUD via admin
- **Hero:** list active slides, CRUD via admin
- **Cart (E1):**
  - guest: state ใน client (localStorage)
  - auth: sync cart กับ `carts`/`cart_items` ผ่าน /api/cart
- **Orders (E2):**
  - POST /api/orders – สร้าง `orders` + `order_items`
- **Payments:**
  - Transfer: แนบข้อมูล slip URL ลงใน order
  - Omise:
    - สร้าง charge จากฝั่ง frontend/backend → ได้ `omise_charge_id`
    - Webhook `/api/webhooks/omise` → อัปเดต `payment_status` ของ order
- **Auth:**
  - ใช้ Supabase client ฝั่ง frontend จัดการ login/register/social login

---

# 10. Admin Dashboard

- Dashboard overview (ยอด lead, สินค้าที่คนดูเยอะ, orders ล่าสุด)
- Product Manager (CRUD + อัปโหลดรูป, ตั้งโปร, ตั้งราคาเช่า)
- Category Manager
- Hero Slider Manager
- Work Media Manager (หน้างานจริงต่อสินค้า)
- Services Pages Manager
- Reviews Manager
- FAQ Manager
- Blog Manager
- Leads Manager (status flow)
- Orders Manager:
  - ดูรายการ order
  - ดู slip โอนเงิน
  - ดูผลชำระผ่านบัตร (จาก Omise)
  - เปลี่ยนสถานะ order / payment_status
- Basic Settings (เช่น ข้อมูลติดต่อร้าน)

---

# 11. SEO & Structured Data

## 11.1 Technical SEO

- Next.js metadata API + `generateMetadata()` สำหรับ dynamic pages (products, blog)
- Static metadata config ใน `/config/seo.ts`
- Sitemap.xml (รวม: products, categories, blog, services, static pages)
- robots.txt (block /admin, /api, draft pages)

## 11.2 Structured Data (JSON-LD)

- `Organization` / `LocalBusiness` – หน้า Home/Contact
- `Product` + `BreadcrumbList` – หน้า Product Detail
- `FAQPage` – หน้า FAQ
- `BlogPosting` – หน้า Blog Detail

## 11.3 Tracking

- ติดตั้ง GA4 (ต้องสร้าง property ใหม่)
- Event tracking: click LINE, click tel, click Messenger, submit lead, view product, add to cart, begin checkout, complete checkout

---

# 12. Testing Strategy

- **Unit Tests:**
  - ฟังก์ชันคำนวณราคา/cart/total
  - Logic แปลงข้อมูลจาก DB → UI
- **Integration/API Tests:**
  - products API, leads API, orders API, Omise webhook handler
- **E2E Tests:**
  - flow: เข้าเว็บ → ดู product → add to cart → checkout → สร้าง order (transfer)
  - flow: เข้าเว็บ → add to cart → checkout (mock Omise) → order paid
  - flow: ส่งฟอร์ม lead
- **Performance:**
  - ตรวจด้วย Lighthouse / Web Vitals (เป้า: โหลด < ~1s บนโครงหลัก, Core Web Vitals ผ่านเกณฑ์พื้นฐาน)

---

# 13. Security & Observability

- แยก public/admin route ด้วย middleware (เช็ค admin role)
- ป้องกัน spam form (honeypot/ง่าย ๆ + rate limit API บางตัว)
- Log error ฝั่ง server (เตรียม hook ต่อ Sentry/อื่น ๆ)
- Backup DB ระดับอย่างน้อย monthly (ผ่าน Supabase tools หรือ manual)

---

# 14. Operation & Handoff

- Training 1 session สำหรับ Admin (สอนเพิ่มสินค้า, บริหารหน้า, ดู leads/orders)
- ทำคู่มือให้ลูกค้า (Notion/PDF)
- เสนอแพ็กเกจดูแลรายเดือน: แก้บั๊ก, ปรับคอนเทนต์, ตรวจสุขภาพเว็บ

---

# 15. Roadmap

## Phase 1 – MVP Mockup (80–90%)

- Next.js + Supabase โครงหลัก
- Public pages: Home, Products, Product Detail, Category, Services, Rental Terms, Reviews, FAQ, Blog (list), About, Contact
- Admin Basic: Product, Categories, Hero, Blog, FAQ, Reviews, Leads
- Cart (guest + basic auth sync), Checkout สร้าง order (transfer + upload slip) + Order Confirmation
- GA4 ติดตั้ง + event พื้นฐาน (view product, add to cart, begin checkout, complete checkout)

## Phase 2 – Hardening & SEO

- Promotion page, Compare (curated)
- เพิ่มหน้างานจริงต่อสินค้า
- Structured Data ครบทุกหน้าเป้าหมาย
- E2E tests + perf tuning

## Phase 3 – E-commerce Deepening

- Customer Auth UX polishing (Account pages ครบ)
- Orders history + Order detail UX
- Payment gateway (Omise) live mode + webhook monitoring

---

# 16. Ready for SPEC / PLAN / TASKS

Blueprint V2.1 นี้พร้อมสำหรับแตกเป็น:

- **SPEC.md** – อธิบาย requirement เชิงฟีเจอร์ + acceptance criteria ต่อ Spec ID/Fxx (เช่น P0, P1, B1, F05, F06, …)
- **PLAN.md** – ลงรายละเอียด implementation (stack, library, component, hook, API contract, Omise integration)
- **TASKS.md** – แตกงานย่อยตามโครง repo + Spec IDs ให้ AI (Windsurf) ลงมือ implement ทีละส่วนได้ชัดเจน.

