# TASKS.md – 789 TOOLS WEB PLATFORM

> **Goal:** แตกงานเป็น task ย่อยระดับทำได้ภายใน ≤ 1 วัน/งาน สำหรับ Windsurf/Dev  
> **Source of Truth:** Blueprint V2.1, SPEC.md, PLAN.md  
> **Convention:**
> - `TASK-XXX` – running ID
> - Phase: P1 (MVP Mockup), P2 (Hardening/SEO), P3 (Deep E-com)
> - ใช้ Spec IDs: P0–P16, F05–F08, B1–B13, API-*

Each task includes: ID, Title, Goal, DoD, Spec Mapping, Dependencies, Estimate, Owner.

---

## Legend

- **Spec:** อ้างอิง SPEC.md (เช่น P2, F06, B1)
- **Plan:** อ้างส่วนใน PLAN.md (เช่น §3 Frontend, §6 E-commerce)
- **Phase:** P1 / P2 / P3

---

## Phase 1 – Foundation & MVP Mockup (Core Web + Basic E-commerce)

### Setup & Infrastructure

#### TASK-001 – Bootstrap Next.js Project
- **Goal:** สร้างโปรเจกต์ Next.js + Tailwind พร้อมโครงโฟลเดอร์พื้นฐาน
- **DoD:**
  - โปรเจกต์ Next.js (App Router) รันได้ใน dev mode
  - ติดตั้ง Tailwind และใช้งานได้ในตัวอย่าง component
  - โครง `/app`, `/components`, `/features`, `/lib`, `/config` ถูกสร้างตาม PLAN.md §2
- **Spec:** (n/a foundation)
- **Plan:** §1, §2
- **Dependencies:** ไม่มี
- **Estimate:** 0.5 วัน
- **Owner:** TBC

#### TASK-002 – Setup Supabase & Env Wiring
- **Goal:** เชื่อม Next.js กับ Supabase (server/client) พร้อม env variables
- **DoD:**
  - โปรเจกต์ Supabase ถูกสร้าง (dev)
  - ไฟล์ `lib/supabase/server.ts` และ `lib/supabase/client.ts` ใช้งานได้
  - env keys ทั้งหมดอ่านได้จาก `.env.local` (ไม่ commit)
- **Spec:** รองรับทุกฟีเจอร์ DB/Auth
- **Plan:** §4.1, §10
- **Dependencies:** TASK-001
- **Estimate:** 0.5–1 วัน
- **Owner:** TBC

#### TASK-003 – GA4 + Basic Analytics Wiring
- **Goal:** ติด GA4 script และเตรียม helper สำหรับ event tracking
- **DoD:**
  - GA4 measurement ID อ่านจาก env
  - มี component หรือ snippet global ที่ยิง pageview
  - helper `trackEvent(name, params)` สร้างแล้วใช้ได้ใน client components
- **Spec:** SEO/Tracking section
- **Plan:** §8.3
- **Dependencies:** TASK-001
- **Estimate:** 0.5 วัน
- **Owner:** TBC

---

### Data Model & Repositories (Minimal for Phase 1)

#### TASK-010 – Create Core Tables in Supabase (Catalog + Content)
- **Goal:** สร้างตารางพื้นฐานที่ Phase 1 ต้องใช้ (products, product_images, categories, blog_posts, reviews, faq_items, hero_slides)
- **DoD:**
  - โครง table ตรงตาม Blueprint §8.1 ชุดหลัก
  - มี migration script/SQL export เก็บไว้ใน repo (/supabase or /db)
- **Spec:** P0–P3, P7–P11
- **Plan:** §4.2, §8.1
- **Dependencies:** TASK-002
- **Estimate:** 1 วัน
- **Owner:** TBC

#### TASK-011 – Create E-commerce Tables (Phase 1 subset)
- **Goal:** สร้างตาราง leads, customers, carts, cart_items, orders, order_items สำหรับ Phase 1
- **DoD:**
  - โครง table ตาม Blueprint §8.2
  - foreign key/indices หลักถูกตั้งค่าขั้นต่ำ
- **Spec:** F05–F08, P14–P16
- **Plan:** §6, §8.2
- **Dependencies:** TASK-010
- **Estimate:** 1 วัน
- **Owner:** TBC

#### TASK-012 – Implement Catalog Repository
- **Goal:** รวมฟังก์ชันดึงข้อมูลสินค้า/หมวดหมู่ในไฟล์เดียว (server-side)
- **DoD:**
  - `getProducts`, `getProductBySlug`, `getCategories`, `getHeroSlides`, `getFaqItems` พร้อม type
  - จัดการกรณีไม่พบสินค้า/หมวด (throw หรือ null)
- **Spec:** P0–P3, P6–P9
- **Plan:** §4.2
- **Dependencies:** TASK-010
- **Estimate:** 0.5–1 วัน
- **Owner:** TBC

---

### Public Site – Core Pages

#### TASK-020 – Implement Public Layout (Header/Footer)
- **Goal:** สร้าง layout หลักของ `(public)` พร้อมเมนู, โลโก้, cart icon, CTA ติดต่อ
- **DoD:**
  - `app/(public)/layout.tsx` ใช้งานจริง
  - Navbar มีลิงก์ไป Home, Products, Services, Blog, Contact
  - ปุ่ม LINE, โทร, cart icon แสดงในทุกหน้า public
- **Spec:** P0–P16 (shared)
- **Plan:** §3.2, §3.3
- **Dependencies:** TASK-001, TASK-012
- **Estimate:** 1 วัน
- **Owner:** TBC

#### TASK-021 – Home Page (P0)
- **Goal:** สร้างหน้า Home ตาม Spec P0
- **DoD:**
  - `/` แสดง Hero slider, categories, featured products, reviews, FAQ สั้น, CTA
  - ดึงข้อมูลจาก repository (ไม่ hard-code)
  - Basic responsive ทำงานได้บน mobile/desktop
- **Spec:** P0
- **Plan:** §3, §8.1
- **Dependencies:** TASK-012, TASK-020
- **Estimate:** 1 วัน
- **Owner:** TBC

#### TASK-022 – Products Listing Page (P1)
- **Goal:** แสดงสินค้าทั้งหมดพร้อม filter หมวดหมู่
- **DoD:**
  - `/products` ดึงสินค้าจริงจาก DB
  - filter ตาม category ทำงานถูกต้อง
  - สินค้าแต่ละชิ้นลิงก์ไป `/products/[slug]`
- **Spec:** P1
- **Plan:** §3, §4.2
- **Dependencies:** TASK-012
- **Estimate:** 1 วัน
- **Owner:** TBC

#### TASK-023 – Product Detail Page (P2)
- **Goal:** สร้างหน้า Product Detail พร้อมปุ่ม add-to-cart
- **DoD:**
  - `/products/[slug]` แสดงข้อมูลตาม Spec P2
  - ปุ่ม "เพิ่มลงรถเข็น" เรียก cart store (dummy/guest) สำเร็จ
  - มี section หน้างานจริง (ใช้ placeholder ถ้ายังไม่มี data)
- **Spec:** P2, F06 (บางส่วน)
- **Plan:** §3, §6.1
- **Dependencies:** TASK-012, TASK-030
- **Estimate:** 1–1.5 วัน
- **Owner:** TBC

#### TASK-024 – Category Page (P3)
- **Goal:** แสดงสินค้าตามหมวด
- **DoD:**
  - `/categories/[slug]` ใช้งานได้ตาม Spec P3
- **Spec:** P3
- **Plan:** §3, §4.2
- **Dependencies:** TASK-012
- **Estimate:** 0.5–1 วัน
- **Owner:** TBC

#### TASK-025 – Services & Rental Terms Pages (P4–P6)
- **Goal:** สร้างหน้า `/services/repair`, `/services/rental`, `/rental-terms`
- **DoD:**
  - แต่ละหน้าแสดงเนื้อหาตาม Spec P4–P6
  - เนื้อหา editable ผ่าน admin (B5/B13) หรือ config file (Phase 1 เลือกอย่างใดอย่างหนึ่ง)
- **Spec:** P4, P5, P6
- **Plan:** §3, §7.4
- **Dependencies:** TASK-001
- **Estimate:** 1 วัน
- **Owner:** TBC

#### TASK-026 – Reviews & FAQ Pages (P7–P8)
- **Goal:** สร้าง `/reviews` และ `/faq`
- **DoD:**
  - ดึงรีวิวจาก DB แสดงรูป+ข้อความสั้น
  - FAQ แสดงแบบ accordion และมี JSON-LD `FAQPage`
- **Spec:** P7, P8
- **Plan:** §3, §8.1
- **Dependencies:** TASK-010, TASK-012
- **Estimate:** 1 วัน
- **Owner:** TBC

#### TASK-027 – Blog List & Detail (P10–P11)
- **Goal:** สร้าง `/blog` และ `/blog/[slug]`
- **DoD:**
  - ดึง content จาก `blog_posts`
  - ใช้ metadata/JSON-LD `BlogPosting` ในหน้า detail
- **Spec:** P10, P11
- **Plan:** §3, §8.1
- **Dependencies:** TASK-010
- **Estimate:** 1 วัน
- **Owner:** TBC

#### TASK-028 – About & Contact Pages (P12–P13)
- **Goal:** About/Contact ทำงานครบ พร้อมฟอร์ม lead
- **DoD:**
  - About แสดงข้อมูลร้าน/ทีม/USP
  - Contact แสดงข้อมูลติดต่อ + ฟอร์มที่ POST ไป `/api/leads`
- **Spec:** P12, P13, API-L1
- **Plan:** §3, §8.3
- **Dependencies:** TASK-010, TASK-040
- **Estimate:** 1 วัน
- **Owner:** TBC

---

### Cart, Checkout, Orders (E-commerce core)

#### TASK-030 – Implement Cart Store (F06, Client-side)
- **Goal:** สร้าง Zustand cart store + localStorage persistence
- **DoD:**
  - ฟังก์ชัน: `addItem`, `removeItem`, `updateQuantity`, `clear`
  - persist ใน localStorage ภายใต้ key เดียว
  - ใช้งานได้จาก Product Detail และหน้าตะกร้า
- **Spec:** F06 (guest cart)
- **Plan:** §3.4, §6.1
- **Dependencies:** TASK-001
- **Estimate:** 1 วัน
- **Owner:** TBC

#### TASK-031 – Cart Page (P14)
- **Goal:** สร้าง `/cart` ที่แสดง state จาก cart store
- **DoD:**
  - แสดงรายการสินค้า, ราคา, total ตาม Spec P14
  - ปุ่มลบ/เปลี่ยนจำนวนทำงานครบ
  - ปุ่ม "ไปหน้า Checkout" ทำงาน
- **Spec:** P14, F06
- **Plan:** §6.1
- **Dependencies:** TASK-030
- **Estimate:** 0.5–1 วัน
- **Owner:** TBC

#### TASK-032 – Checkout API (create orders) – API-E2
- **Goal:** สร้าง `/api/orders` สำหรับสร้าง orders + order_items
- **DoD:**
  - รับ payload จาก checkout (customer info + cart items)
  - เขียนข้อมูลลง `orders` + `order_items`
  - คืน order id ให้ frontend
- **Spec:** P15, F07, API-E2
- **Plan:** §6.2
- **Dependencies:** TASK-011
- **Estimate:** 1 วัน
- **Owner:** TBC

#### TASK-033 – Checkout Page (P15, Transfer only)
- **Goal:** สร้าง `/checkout` เวอร์ชันโอนเงิน (ยังไม่ต้อง Omise)
- **DoD:**
  - ฟอร์มตาม Spec P15 (ชื่อ, เบอร์, email, address, payment method)
  - ถ้าเลือกโอน → call `/api/orders`, redirect ไป `/order-success`
  - ถ้า cart ว่าง → redirect กลับ `/cart`
- **Spec:** P15, F07-A
- **Plan:** §6.2
- **Dependencies:** TASK-030, TASK-032
- **Estimate:** 1–1.5 วัน
- **Owner:** TBC

#### TASK-034 – Order Success Page (P16)
- **Goal:** แสดงสรุปคำสั่งซื้อหลัง checkout
- **DoD:**
  - `/order-success` แสดงเลข order + summary สั้น ๆ
  - ถ้าขาด `orderId` → redirect ไป Home
- **Spec:** P16
- **Plan:** §6.2
- **Dependencies:** TASK-032, TASK-033
- **Estimate:** 0.5 วัน
- **Owner:** TBC

---

### Auth & Account (Customer)

#### TASK-040 – Customer Auth Integration (F05)
- **Goal:** เชื่อม Supabase Auth เข้ากับหน้า `/login`, `/register`
- **DoD:**
  - หน้า login/register ใช้งานได้ตาม Spec F05
  - Social login (Google, Facebook) ทำงานใน sandbox/dev mode
  - เมื่อ login สำเร็จ สร้าง/อัปเดต record ใน `customers`
- **Spec:** F05
- **Plan:** §5.1
- **Dependencies:** TASK-002
- **Estimate:** 1–1.5 วัน
- **Owner:** TBC

#### TASK-041 – Protect `/account` Routes
- **Goal:** บังคับ login ก่อนเข้า `/account/*`
- **DoD:**
  - ถ้าไม่ login → redirect ไป `/login`
  - ถ้า login แล้ว → เข้าถึง `/account` และ future `/account/orders` ได้
- **Spec:** F05/F08 (guard part)
- **Plan:** §5.3
- **Dependencies:** TASK-040
- **Estimate:** 0.5 วัน
- **Owner:** TBC

#### TASK-042 – Account Overview Page (F05)
- **Goal:** สร้าง `/account` overview
- **DoD:**
  - แสดงข้อมูล account เบื้องต้น (ชื่อ, email)
  - มีลิงก์ไป Orders
- **Spec:** F05
- **Plan:** §6.4
- **Dependencies:** TASK-040
- **Estimate:** 0.5 วัน
- **Owner:** TBC

#### TASK-043 – Order History Page (F08 basic)
- **Goal:** สร้าง `/account/orders` (list) + `/account/orders/[id]` (detail)
- **DoD:**
  - list แสดง order ของลูกค้าคนปัจจุบันเท่านั้น
  - detail แสดงรายการสินค้า/ยอดรวม/สถานะ
- **Spec:** F08
- **Plan:** §6.4
- **Dependencies:** TASK-032, TASK-040, TASK-041
- **Estimate:** 1–1.5 วัน
- **Owner:** TBC

---

### Admin – Basic Modules

#### TASK-050 – Admin Layout & Auth Guard (A0)
- **Goal:** สร้าง `/admin` layout + ป้องกัน access ด้วย admin role
- **DoD:**
  - `/(admin)/admin/layout.tsx` พร้อม sidebar
  - middleware เช็ค role admin ก่อนเข้า `/admin/*`
- **Spec:** A0
- **Plan:** §5.2, §7.1
- **Dependencies:** TASK-002, TASK-011
- **Estimate:** 1–1.5 วัน
- **Owner:** TBC

#### TASK-051 – Admin Product CRUD (B1)
- **Goal:** หลังบ้านจัดการสินค้าได้
- **DoD:**
  - `/admin/products` แสดงตารางสินค้า
  - สามารถเพิ่ม/แก้/ซ่อนสินค้า
  - อัปโหลดรูปได้ และเก็บ URL ใน DB
- **Spec:** B1, products tables
- **Plan:** §7.4
- **Dependencies:** TASK-050, TASK-010
- **Estimate:** 1.5–2 วัน
- **Owner:** TBC

#### TASK-052 – Admin Categories (B2)
- **Goal:** CRUD หมวดสินค้า
- **DoD:**
  - `/admin/categories` เพิ่ม/แก้/ลบหมวดได้
- **Spec:** B2
- **Plan:** §7.4
- **Dependencies:** TASK-050, TASK-010
- **Estimate:** 0.5–1 วัน
- **Owner:** TBC

#### TASK-053 – Admin Hero Slides (B3)
- **Goal:** จัดการ Hero slider
- **DoD:**
  - `/admin/hero` เพิ่ม/แก้/ลบ/เปิดปิดสไลด์ได้
  - ลำดับสไลด์มี sort_order ทำงาน
- **Spec:** B3
- **Plan:** §7.4
- **Dependencies:** TASK-050, TASK-010
- **Estimate:** 1 วัน
- **Owner:** TBC

#### TASK-054 – Admin Blog CRUD (B8)
- **Goal:** จัดการบทความ blog
- **DoD:**
  - `/admin/blog` สร้าง/แก้บทความ, set draft/published
- **Spec:** B8
- **Plan:** §7.4
- **Dependencies:** TASK-050, TASK-010
- **Estimate:** 1–1.5 วัน
- **Owner:** TBC

#### TASK-055 – Admin FAQ CRUD (B7)
- **Goal:** จัดการ FAQ
- **DoD:**
  - `/admin/faq` เพิ่ม/แก้/ลบคำถาม–คำตอบได้
- **Spec:** B7
- **Plan:** §7.4
- **Dependencies:** TASK-050, TASK-010
- **Estimate:** 0.5–1 วัน
- **Owner:** TBC

#### TASK-056 – Admin Reviews & Leads (B6, B9)
- **Goal:** หน้าจัดการรีวิว + leads
- **DoD:**
  - `/admin/reviews` เพิ่ม/แก้/เปิดปิดรีวิว
  - `/admin/leads` แสดง leads จาก DB + เปลี่ยน status ได้
- **Spec:** B6, B9
- **Plan:** §7.4
- **Dependencies:** TASK-050, TASK-010, TASK-011
- **Estimate:** 1–1.5 วัน
- **Owner:** TBC

#### TASK-057 – Admin Orders Management (B12)
- **Goal:** หน้าดู/อัปเดตคำสั่งซื้อหลังบ้าน
- **DoD:**
  - `/admin/orders` แสดง list + filter ได้ตาม status
  - ดูรายละเอียด order + เปลี่ยน status/payment_status
- **Spec:** B12
- **Plan:** §7.4
- **Dependencies:** TASK-032, TASK-050
- **Estimate:** 1–1.5 วัน
- **Owner:** TBC

#### TASK-058 – Admin Settings Basic (B13)
- **Goal:** ตั้งค่าข้อมูลพื้นฐาน เช่น LINE, เบอร์โทร, ธนาคาร
- **DoD:**
  - `/admin/settings` แก้ config พื้นฐานได้ (เก็บใน table settings หรือ config JSON)
- **Spec:** B13
- **Plan:** §7.4
- **Dependencies:** TASK-050
- **Estimate:** 0.5–1 วัน
- **Owner:** TBC

---

## Phase 2 – Hardening, SEO, Structured Data, Compare

(เฉพาะหัวข้อสำคัญ – ปรับได้ตอนเริ่ม Phase 2)

#### TASK-101 – Implement Promotion Page Logic (P9)
#### TASK-102 – Implement Compare (curated) Page
#### TASK-103 – Add Full JSON-LD Coverage (Product, FAQ, BlogPosting, Breadcrumb)
#### TASK-104 – Implement sitemap.ts & robots.txt
#### TASK-105 – Add Playwright E2E for Core Flows

---

## Phase 3 – Deep E-commerce & Omise

#### TASK-201 – Implement Omise Payment Flow (sandbox)
#### TASK-202 – Implement Omise Webhook Handler `/api/webhooks/omise`
#### TASK-203 – Polish Account/Orders UX (filters, pagination)

---

## Notes

- ทุก TASK สามารถแตกย่อยเพิ่มได้หาก AI/ทีมเห็นว่างานเกิน 1 วัน
- ลำดับการทำที่แนะนำ: เริ่มจาก Setup → Data → Public Pages → Cart/Checkout → Auth → Admin
- TASKS.md นี้เป็น living document: สามารถอัปเดต/เพิ่ม TASK-XXX ใหม่เมื่อ Blueprint/SPEC/PLAN เปลี่ยนแปลง.

