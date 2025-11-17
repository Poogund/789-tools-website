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

### TASK-050 – Admin Layout Shell & Navigation

- **Category:** Admin / Layout
- **Route หลัก:** `/admin`
- **เป้าหมาย:**  
  สร้างโครงหน้า Admin หลัก (Layout Shell) ที่มี Sidebar + Topbar + Content Area เพื่อใช้เป็นฐานให้ทุกหน้าหลังบ้าน

#### รายละเอียด

- ใช้โครงสร้างแยก `(admin)` เช่น  
  - `src/app/(admin)/layout.tsx` → Layout หลัก  
  - `src/app/(admin)/page.tsx` → Dashboard Overview (TASK-051)
- Layout แบ่ง 3 ส่วนหลัก:
  1. **Sidebar (ซ้าย)**  
     - โลโก้ / ชื่อระบบ: `789 TOOLS Admin`  
     - เมนูหลัก:
       - Dashboard → `/admin`
       - Orders → `/admin/orders`
       - Products → `/admin/products`
       - Customers → `/admin/customers`
       - Content → `/admin/content/home`
     - แสดงเมนู active ชัดเจน (เช่น สีพื้นหลัง / สีตัวอักษร)
  2. **Topbar**  
     - แสดงชื่อหน้าปัจจุบัน (เช่น "Dashboard", "Orders")  
     - ช่อง Search (ยังไม่ต้องเชื่อมจริงใน MVP ได้)  
     - ไอคอน Notification (placeholder)  
     - Avatar + ชื่อผู้ใช้: เช่น "Admin"
  3. **Content Area**  
     - ความกว้างแบบอ่านง่าย (เช่น max-width ~ 1280px)  
     - มี padding รอบ ๆ (เช่น `px-6 py-6`)  
     - พื้นหลังนอก card เป็นเทาอ่อน (`#F5F5F7`)  
     - Card สีขาว มุมโค้ง + เงาเบา ๆ

- Responsive:
  - Desktop: Sidebar กว้าง ~ 240–260px แสดงตลอด
  - Mobile: Sidebar หุบได้ (แสดงผ่านปุ่ม hamburger)

#### DoD (Definition of Done)

- เข้า `/admin` แล้วเห็น:
  - Sidebar + Topbar + Content Area ทำงานครบ
- คลิกเมนูใน Sidebar แล้ว:
  - เปลี่ยนเส้นทางไปยัง route ที่ถูกต้อง (แม้บางหน้าใน TASK ต่อไปจะยังเป็น placeholder ได้)
- Layout แสดงผลได้ทั้งบนหน้าจอใหญ่และเล็ก (Sidebar สามารถหุบ/แสดงได้ใน mobile)


---

### TASK-051 – Admin Dashboard Overview (KPI + Chart)

- **Category:** Admin / Dashboard
- **Route:** `/admin`
- **เป้าหมาย:**  
  แสดงภาพรวมสถานะร้านค้าปัจจุบันในรูปแบบ KPI การ์ด + กราฟยอดขาย + ตารางคำสั่งซื้อล่าสุด

#### รายละเอียด

- ส่วนบน: Summary Cards 4 ใบ แสดงข้อมูลเชิงตัวเลข:
  1. ยอดขายวันนี้ (Today Revenue)
  2. ยอดขาย 7 วันล่าสุด (Last 7 days)
  3. จำนวนคำสั่งซื้อวันนี้
  4. จำนวนออเดอร์ที่ต้องจัดการ (เช่น status = `pending` หรือ `processing`)

- ส่วนกลาง: กราฟยอดขาย (Daily Revenue Chart)
  - ประเภท: Line chart หรือ Bar chart
  - แกน X: วันที่ (ช่วง 7 หรือ 30 วันล่าสุด)
  - แกน Y: ยอดขาย (THB)
  - ถ้ายังไม่มีข้อมูลจริง สามารถใช้ mock data ชั้น UI ก่อนได้ แต่ต้องออกแบบให้พร้อมต่อเชื่อมจริง

- ส่วนล่าง: ตาราง “Latest Orders”
  - แสดง 5–10 คำสั่งซื้อล่าสุด
  - คอลัมน์:
    - Order ID (เช่น `#ORD-xxxx`)
    - Customer name
    - Total
    - Status
    - Created At
    - Action: ปุ่ม "View" → ลิงก์ไป `/admin/orders/[id]` (TASK-053)

- Mood & Tone:
  - ใช้ card สีขาว มุมโค้ง + เงาบาง
  - ใช้สีแบรนด์: น้ำเงิน `#000AFF`, เหลือง `#E3B935`, เทา/ดำสำหรับตัวอักษร

#### DoD

- หน้า `/admin` แสดง:
  - KPI Cards 4 ใบ
  - กราฟยอดขาย (mock หรือจริง)
  - ตาราง Latest Orders
- ถ้ายังไม่มีคำสั่งซื้อ:
  - แสดง empty state ที่ดูดี (เช่น ไอคอน + ข้อความ “ยังไม่มีคำสั่งซื้อ”)
- ปุ่ม "View" ในแต่ละแถวพาไป `/admin/orders/[id]` ถูกต้อง (ถ้า route ยังไม่พร้อม แสดง placeholder ได้ใน Task นี้ แต่ path ต้องถูก)


---

### TASK-052 – Admin Orders List + Filters

- **Category:** Admin / Orders
- **Route:** `/admin/orders`
- **เป้าหมาย:**  
  แสดงรายการคำสั่งซื้อทั้งหมดในระบบ พร้อมความสามารถในการค้นหาและกรองตามสถานะ

#### รายละเอียด

- ตารางคำสั่งซื้อ:
  - แสดงข้อมูลจากตาราง `orders`
  - คอลัมน์ (อย่างน้อย):
    - Order ID (แสดงสั้น เช่น `#ORD-xxxxx`)
    - Created At (วันที่สั่งซื้อ)
    - Customer name
    - Total (ยอดรวม)
    - Order Status (`pending`, `confirmed`, `processing`, `shipped`, `completed`, `cancelled`)
    - Payment Status (`unpaid`, `paid`, `failed`)
    - Action: ปุ่ม "ดูรายละเอียด" → `/admin/orders/[id]`

- Filters / Search:
  - Dropdown เลือก Order Status
  - Dropdown เลือก Payment Status
  - Search input (ค้นด้วย Order ID หรือชื่อลูกค้า)
  - ปุ่ม Reset Filters

- UX:
  - เรียงลำดับเริ่มต้นตาม `created_at` (ล่าสุดอยู่บนสุด)
  - ตาราง scroll ได้ในหน้าจอเล็ก

#### DoD

- `/admin/orders` ดึงข้อมูลจาก `orders` จริง (ไม่ใช่ mock)
- สามารถ:
  - กรองตาม Order Status ได้
  - กรองตาม Payment Status ได้
  - ค้นหาด้วยคำหลัก (Order ID / ชื่อ) แล้วตารางแสดงผลที่ตรงเงื่อนไข
- ปุ่ม "ดูรายละเอียด" ในแต่ละแถวพาไป `/admin/orders/[id]` ถูกต้อง


---

### TASK-053 – Admin Order Detail + Status Update

- **Category:** Admin / Orders
- **Route:** `/admin/orders/[id]`
- **เป้าหมาย:**  
  ให้แอดมินสามารถดูรายละเอียดคำสั่งซื้อครบถ้วน และเปลี่ยนสถานะคำสั่งซื้อ/การชำระเงินได้

#### รายละเอียด

- ข้อมูลหัวข้อ (Order Summary):
  - Order ID
  - วันที่สั่ง (`created_at`)
  - วิธีชำระ (`payment_method`)
  - สถานะคำสั่งซื้อ (`order_status`)
  - สถานะการชำระ (`payment_status`)

- ข้อมูลลูกค้า:
  - ชื่อ
  - อีเมล
  - เบอร์โทร
  - ที่อยู่จัดส่ง

- รายการสินค้า (Order Items):
  - อ่านจาก `order_items` โดย `order_id`
  - แสดงตาราง:
    - ชื่อสินค้า
    - จำนวน
    - ราคาต่อหน่วย
    - ราคารวมของรายการ (quantity * unit_price)

- สรุปยอด:
  - Subtotal
  - Shipping cost
  - Grand total

- ฟังก์ชันอัปเดตสถานะ:
  - UI สำหรับแก้ไขสถานะคำสั่งซื้อ (`order_status`)  
    - เช่น Dropdown หรือชุดปุ่ม: `pending` → `confirmed` → `processing` → `shipped` → `completed` / `cancelled`
  - (ถ้าต้องการ) UI สำหรับแก้ไข `payment_status` (`unpaid`, `paid`, `failed`)
  - ปุ่ม "Update" เพื่อบันทึกการเปลี่ยนแปลง
  - เมื่อกด update:
    - เขียนค่าใหม่ลง `orders`
    - แสดง Toast/แจ้งเตือน `อัปเดตสำเร็จ` หรือ `เกิดข้อผิดพลาด`

#### DoD

- เปิด `/admin/orders/[id]` ด้วย `id` ที่ถูกต้อง:
  - เห็นข้อมูลหัวข้อ, ลูกค้า, รายการสินค้า, สรุปยอด ครบ
- เปลี่ยน `order_status` แล้ว:
  - ค่าใน DB ถูกอัปเดต
  - กลับมาที่หน้าเดิมและเห็นสถานะใหม่
- ถ้า `id` ไม่ถูกต้องหรือไม่มีคำสั่งซื้อ:
  - แสดง 404 หรือหน้าข้อความ “ไม่พบคำสั่งซื้อ”


---

### TASK-054 – Admin Products List + Quick Toggle

- **Category:** Admin / Products
- **Route:** `/admin/products`
- **เป้าหมาย:**  
  ให้แอดมินดูรายการสินค้าในร้านทั้งหมด และเปิด/ปิดการแสดงผลสินค้าได้อย่างรวดเร็ว

#### รายละเอียด

- ตารางสินค้า:
  - ข้อมูลจากตาราง `products`
  - คอลัมน์:
    - (ถ้ามี) รูป thumb เล็ก ๆ ของสินค้า
    - ชื่อสินค้า
    - หมวดหมู่
    - ราคา / ราคาโปรโมชัน (`price`, `sale_price`)
    - สถานะการแสดงผล (`is_active`)
    - Action: ปุ่ม "แก้ไข" → `/admin/products/[id]`

- Filters / Search:
  - Search box ค้นตามชื่อสินค้า
  - Dropdown filter ตามหมวดหมู่ (ถ้ามีตาราง `categories`)
  - Filter ตามสถานะ active/inactive

- Quick Toggle:
  - มี switch หรือ checkbox บนตารางสำหรับเปิด/ปิด `is_active`
  - เมื่อ toggle:
    - อัปเดตค่าที่ DB ทันที
    - UI สะท้อนสถานะใหม่ทันที (optimistic update ได้)

#### DoD

- `/admin/products` แสดงสินค้าจาก DB จริง
- ค้นหา + filter แล้วตารางแสดงผลตามเงื่อนไข
- การ toggle `is_active`:
  - อัปเดตฟิลด์ใน DB สำเร็จ
  - ถ้า error มีข้อความแจ้งเตือนที่เข้าใจง่าย
- ปุ่ม "แก้ไข" พาไป `/admin/products/[id]` ถูกต้อง


---

### TASK-055 – Admin Product Detail + Basic Edit

- **Category:** Admin / Products
- **Route:** `/admin/products/[id]`
- **เป้าหมาย:**  
  ให้แอดมินแก้ไขข้อมูลพื้นฐานของสินค้าได้จากหน้าเดียว

#### รายละเอียด

- ฟอร์มแก้ไขข้อมูลสินค้า:
  - ชื่อสินค้า (`name`)
  - Slug (`slug`)
  - คำอธิบาย (`description`)
  - ราคา (`price`)
  - ราคาโปรโมชัน (`sale_price`) (optional)
  - ประเภท (`type`: `product` | `service`)
  - หมวดหมู่ (`category_id` → เลือกจาก dropdown)
  - สถานะ (`is_active`: เปิด/ปิดการแสดงผล)

- UX:
  - เลย์เอาต์แบบ 2 คอลัมน์ (ถ้าจอใหญ่):  
    - ซ้าย: ข้อมูลชื่อ/คำอธิบาย  
    - ขวา: ราคา/สถานะ/หมวดหมู่
  - ปุ่ม “บันทึกการเปลี่ยนแปลง” ด้านล่างหรือด้านบนขวา

- Validation:
  - `name`, `price`, `category_id` ต้องไม่ว่าง
  - `price`, `sale_price` ต้องเป็นตัวเลข
  - แสดง error message ข้างฟิลด์ที่ผิด

#### DoD

- โหลด `/admin/products/[id]` แล้วแบบฟอร์ม prefill ด้วยข้อมูลจริงจาก DB
- แก้ไขค่าแล้วกดบันทึก:
  - เขียนข้อมูลใหม่ลง DB
  - มีข้อความแจ้ง “บันทึกสำเร็จ”
- ถ้า `id` สินค้าไม่ถูกต้อง:
  - แสดง 404 หรือ “ไม่พบสินค้า”


---

### TASK-056 – Admin Customers List

- **Category:** Admin / Customers
- **Route:** `/admin/customers`
- **เป้าหมาย:**  
  ให้แอดมินดูรายชื่อลูกค้าและภาพรวมการสั่งซื้อของแต่ละคน

#### รายละเอียด

- ตารางลูกค้า:
  - ใช้ข้อมูลจากตาราง `customers`
  - ใช้การ aggregate จาก `orders` เพื่อหาจำนวนครั้งและยอดใช้จ่ายรวม
  - คอลัมน์:
    - ชื่อลูกค้า
    - อีเมล
    - เบอร์โทร
    - จำนวนคำสั่งซื้อทั้งหมด (count orders)
    - ยอดใช้จ่ายรวม (sum `orders.total`)
    - (optional) วันที่สั่งครั้งล่าสุด

- Filters / Search:
  - ค้นหาตามชื่อ / อีเมล / เบอร์โทร
  - เรียงลำดับตาม:
    - จำนวนคำสั่งซื้อ
    - ยอดใช้จ่ายรวม
    - วันที่คำสั่งซื้อล่าสุด

#### DoD

- `/admin/customers` แสดงข้อมูลลูกค้าจริงจาก DB
- ตัวเลขจำนวน order และยอดรวม ถูกต้อง (เทียบกับ DB ได้)
- Search และ sort ทำงานตามที่ระบุ
- Empty state เมื่อยังไม่มีลูกค้าในระบบ


---

### TASK-057 – Admin Homepage Content (Hero / Banners)

- **Category:** Admin / Content
- **Route:** `/admin/content/home`
- **เป้าหมาย:**  
  ให้แอดมินสามารถจัดการ Hero Slides / Banner ของหน้าแรกได้จากหลังบ้าน

#### รายละเอียด

- แสดงรายการ Hero Slides จากตาราง เช่น `hero_slides` (หรือชื่อใกล้เคียง)
  - ฟิลด์:
    - headline
    - subheadline
    - button_text
    - button_url
    - image_url (ถ้ามี)
    - sort_order
    - is_active

- UI:
  - List / Table ของ slides แต่ละตัว
  - Toggle ปิด/เปิด `is_active`
  - ช่องกรอก/แก้ไขข้อมูล text (headline, subheadline, ฯลฯ)
  - ปุ่ม "เพิ่ม Slide ใหม่"
  - ความสามารถในการเปลี่ยนลำดับ (sort_order) เช่น:
    - ปุ่มเลื่อนขึ้น/ลง
    - หรือ input ลำดับตัวเลข

- การเชื่อมกับหน้า Public:
  - หน้า `/` (Home) ต้องอ่านข้อมูลจาก table นี้
  - แสดงเฉพาะ `is_active = true` ตาม `sort_order`

#### DoD

- `/admin/content/home` แสดงรายการ Hero Slides ได้
- สามารถ:
  - แก้ไขข้อความ/URL แล้วบันทึกลง DB
  - เปิด/ปิด slide ผ่าน toggle
  - ปรับลำดับการแสดงผล
- หน้า Home (`/`) แสดงผลตามข้อมูลจริงจาก table นี้


---

### TASK-058 – Admin Access Control & Protect /admin

- **Category:** Admin / Security
- **Route:** ทุก route ที่ขึ้นต้นด้วย `/admin`
- **เป้าหมาย:**  
  จำกัดการเข้าถึงส่วน Admin ให้เฉพาะผู้ใช้ที่มีสิทธิ์เป็น admin เท่านั้น

#### รายละเอียด

- Schema:
  - เพิ่มฟิลด์ `role` ให้กับผู้ใช้ เช่น:
    - ในตาราง `profiles` หรือ `customers` หรือ `users` (ตามโครงปัจจุบัน)
    - ค่า role เช่น: `admin`, `staff`, `customer`
  - กำหนดว่าผู้ใช้ admin ต้องมี `role = 'admin'`

- Logic การป้องกัน:
  - ใช้ middleware หรือ guard ฝั่ง server:
    - ถ้าไม่พบ session (ไม่ล็อกอิน):
      - redirect ไป `/login?redirect=/admin`
    - ถ้าล็อกอินแล้วแต่ `role !== 'admin'`:
      - แสดงหน้า 403 (Forbidden) หรือ redirect ไปหน้า `/`
  - ใช้ logic เดียวกันกับทุก route ที่ขึ้นต้นด้วย `/admin`

- UI เมื่อสิทธิ์ไม่พอ:
  - แสดงข้อความ:
    - เช่น “คุณไม่มีสิทธิ์เข้าถึงหน้าจัดการระบบ (Admin)”

#### DoD

- ทดสอบด้วย user ปกติ (role = customer):
  - เข้า `/admin` หรือ `/admin/...` → ต้องเข้าไม่ได้ (403 หรือ redirect)
- ทดสอบด้วย user admin (role = admin):
  - เข้า `/admin` และทุก route ในชุด admin ได้ปกติ
- การตรวจสิทธิ์ทำงานทั้งบน `/admin`, `/admin/orders`, `/admin/products`, ฯลฯ

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

