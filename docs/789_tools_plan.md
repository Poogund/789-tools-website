# PLAN.md – 789 TOOLS WEB PLATFORM (NEXT.JS + SUPABASE)

> **Goal:** แปลง Blueprint V2.1 + SPEC.md ให้เป็นแผน Implementation เชิงเทคนิคที่ Windsurf/Dev ใช้เขียนโค้ดได้ทันที  
> **Covers:** Tech stack, architecture, patterns, library choices, API contracts (high level), state management, testing, deployment, phase plan.

---

## 1. Tech Stack & Versions (Target)

- **Framework:** Next.js (App Router) – v14+ (app directory)
- **Language:** TypeScript – strict mode
- **UI:** React 18, TailwindCSS
- **Forms:** `react-hook-form` + `zod` (schema validation)
- **State (client side):**
  - Lightweight: React Context + hooks
  - Cart: dedicated `useCartStore` (Zustand) หรือ Context (เลือก 1 ตามข้อ 3.4)
- **Data Fetching:**
  - Primary: Server Components + `fetch`/Supabase server client
  - Client: `@tanstack/react-query` (optional สำหรับ admin table ที่ interactive มาก)
- **Backend/API:** Next.js Route Handlers (`app/api/*`)
- **Database/Auth/Storage:** Supabase (Postgres + Auth + Storage)
- **Payments:** Omise (sandbox first) via server-side API route
- **Analytics:** Google Analytics 4
- **Testing:**
  - Unit/Integration: Vitest (หรือ Jest)
  - E2E: Playwright
  - Lint/Format: ESLint + Prettier

---

## 2. Project Structure (High-level)

อิงตาม Blueprint V2.1 (Route structure) + เพิ่มโครง support:

```txt
/789-tools-nextjs
│
├── /app                 # Next.js app router
│   ├── /(public)        # Public-facing pages
│   ├── /(auth)          # Customer auth pages
│   ├── /(admin)/admin   # Admin area
│   ├── /api             # Route handlers (API)
│   └── layout.tsx       # Root layout
│
├── /components          # Reusable UI components
├── /features            # Grouped by domain (catalog, cart, checkout, auth, admin, etc.)
├── /lib                 # supabase client, utils, config loaders
├── /types               # Shared TS types
├── /config              # SEO, site config, constants
└── /tests               # E2E + integration tests structure
```

### 2.1 Domain-based `features/` structure (recommended)

```txt
/features
  /catalog        # product listing/detail/category hooks + components
  /cart           # cart store, helpers, components
  /checkout       # checkout flows, forms
  /auth           # customer auth hooks + components
  /admin          # shared admin components (tables, layout, forms)
  /blog           # blog list/detail helpers
  /seo            # SEO/JSON-LD helpers
  /leads          # lead form + admin list
  /orders         # order detail, mapping, status badges
```

---

## 3. Frontend Architecture & Patterns

### 3.1 App Router Conventions

- ใช้ **Server Components เป็น default** สำหรับทุกหน้า public/admin ที่สามารถ SSR/ISR ได้
- ใช้ Client Components เมื่อมี:
  - interactive form
  - local state (cart, filters, pagination client-side)
  - direct Supabase client-side auth (customer login)

### 3.2 Layout

- `app/layout.tsx`:
  - ติด global styles, font, GA4 script
- `app/(public)/layout.tsx`:
  - Navbar (โลโก้, เมนูหลัก, icon cart, LINE/โทร)
  - Footer
- `app/(admin)/admin/layout.tsx`:
  - Admin sidebar + header + content area
- `app/(auth)/layout.tsx`:
  - Auth-specific layout (centered card)

### 3.3 Styling & Design System

- ใช้ Tailwind เป็นหลัก
- สร้าง design tokens ผ่าน Tailwind config:
  - `colors.brand.primary` (โทนน้ำเงิน)
  - `colors.brand.accent` (เหลือง)
  - `colors.brand.dark` (ดำ/คอนกรีต)
- สร้าง components พื้นฐานใน `/components/ui` เช่น:
  - `Button`, `Input`, `Select`, `Textarea`, `Card`, `Badge`, `Modal`

### 3.4 Cart State Pattern

- **Guest cart:** เก็บใน localStorage + Zustand store
- **Auth cart:**
  - ใน client: ใช้ Zustand store เหมือนกัน
  - Sync กับ Supabase ผ่าน `/api/cart` เมื่อ:
    - user login
    - cart update (debounced)
- มี helper `syncCartOnLogin(userId)` เรียกหลัง login สำเร็จ

### 3.5 Legacy Frontend Reuse

- โค้ด HTML + CSS เดิมจะถูกเก็บไว้ในโฟลเดอร์ `/legacy`
- หน้าทุกหน้าบน Next.js ให้ใช้ดีไซน์, layout, สี, spacing จาก `/legacy` เป็น reference หลัก
- เวลา implement TASK แต่ละตัว:
  - ให้เปิดดูไฟล์ใน `/legacy` ก่อน
  - copy/แปลง markup + class เดิมมาเป็น React component
  - ปรับเฉพาะส่วนที่จำเป็นเพื่อให้ตรง SPEC (เช่น ใส่ dynamic data, ปุ่ม add-to-cart)


---

## 4. Data Layer & Supabase Integration

### 4.1 Supabase Client Setup

- `lib/supabase/server.ts` – สร้าง Supabase client สำหรับ server components/API (ใช้ service role key จาก env)
- `lib/supabase/client.ts` – client-side Supabase สำหรับ auth/real-time (ใช้ anon key)
- ใช้ wrapper functions ต่อ domain เช่น:
  - `catalogRepository.ts` – `getProducts`, `getProductBySlug`, `getCategories`
  - `ordersRepository.ts` – `createOrder`, `getOrderForCustomer`

### 4.2 Caching & Revalidation

- Public pagesใช้ ISR:
  - Products list, Product detail, Blog list/detail → `revalidate: 60` (1 นาที) หรือตาม config
- Checkout, Cart, Account → `cache: 'no-store'`

### 4.3 Error Handling

- Repository functions ต้อง throw error ที่เข้าใจได้ + handle ใน UI โดยมี friendly messages
- 404 แยกตาม domain (product not found, blog not found ฯลฯ)

---

## 5. Auth & Security Plan

### 5.1 Customer Auth (F05)

- ใช้ Supabase Auth กับ providers:
  - Email/password
  - Google, Facebook
- Flow:
  - หน้า `/login` / `/register` เรียก Supabase client-side
  - เมื่อ login สำเร็จ:
    - สร้าง/อัปเดต `customers` record ผูกกับ `auth_user_id`
    - เรียก `syncCartOnLogin`

### 5.2 Admin Auth

- ใช้ Supabase Auth แยก project/role หรือใช้ tenant เดียวแต่ผูก role ผ่าน `admin_users` table
- `middleware.ts`:
  - ตรวจ path `/admin`
  - redirect ไปหน้า admin login (หรือปิดสาธารณะ) ถ้าไม่มี role admin

### 5.3 Route Protection

- `/(admin)` ทุกหน้า → server-side check role ตาม `admin_users`
- `/account/*` → check customer auth (Supabase session)

---

## 6. E-commerce Implementation Plan

### 6.1 Cart (F06)

- **Data types:**
  - `CartItem`: `{ productId, name, price, quantity, imageUrl }`
- **Guest:**
  - Zustand store + persist middleware (localStorage key `789tools_cart`)
- **Auth sync logic:**
  - เมื่อ login:
    - ดึง cart จาก DB (ถ้ามี)
    - merge กับ guest cart → เขียนกลับทั้ง localStorage + DB
  - เมื่อ cart เปลี่ยน (auth):
    - debounce แล้วเรียก `/api/cart` บันทึก `carts` + `cart_items`

### 6.2 Checkout (F07)

- Form ใช้ `react-hook-form` + `zod` schema
- Steps (MVP): single-page checkout
- On submit:
  1. validate form
  2. call `/api/orders` (server route)
  3. สร้าง `orders` + `order_items`
  4. ถ้า payment method = transfer:
     - return order id → redirect `/order-success?orderId=...`
  5. ถ้า payment method = card:
     - สร้าง Omise charge (sandbox) แล้ว redirect ตาม flow (ต่อยอดใน Phase 3)

### 6.3 Payments – Omise (Design)

- ปัจจุบัน Plan ให้ integrate sandbox ก่อน:
  - `/api/orders` หรือ route แยก `/api/payments/omise` สร้าง charge ด้วย Omise secret key จาก env
  - Omise webhook call → `/api/webhooks/omise`
- Webhook handler responsibilities:
  - ตรวจ signature
  - หา order จาก `omise_charge_id`
  - update `payment_status` เป็น `paid` หรือ `failed`

### 6.4 Order History (F08)

- `/account/orders` → server component ดึงจาก `orders` โดย `customer_id`
- `/account/orders/[id]` → แสดง order detail + items
- ใช้ status badge component (สีตามสถานะ)

---

## 7. Admin Implementation Plan

### 7.1 Shared Admin Layout (A0)

- Sidebar เมนู:
  - Dashboard, Products, Categories, Hero, Work Media, Services, Reviews, FAQ, Blog, Leads, Orders, Settings
- ใช้ layout เดียว render children ผ่าน slot

### 7.2 Data Grid Pattern

- ใช้ table component เดียว (sortable, paginated) ใน `/features/admin/table`
- CRUD หน้า admin ส่วนใหญ่ใช้ pattern:
  - list view + modal/form สำหรับ create/edit
  - delete ใช้ confirm dialog

### 7.3 Forms

- ทุกฟอร์ม admin ใช้ `react-hook-form` + `zod`
- image upload ผ่าน Supabase Storage:
  - helper `uploadImage(file, bucket)`
  - store URL ใน DB

### 7.4 Specific Modules

- **Products (B1):**
  - Form: name, slug (auto from name + override), price, sale_price, rent_price, type, category, flags, specs (JSON editor หรือ textarea)
  - Image upload: multiple
- **Hero (B3):**
  - Table + form: headline, subheadline, buttons, image, is_active, sort_order
- **Work Media (B4):**
  - ผูกกับ product ผ่าน dropdown + upload image/video
- **Orders (B12):**
  - read-only view + actions เปลี่ยน status/payment_status

---

## 8. SEO & Analytics Plan

### 8.1 Metadata & JSON-LD

- สร้าง `config/seo.ts`:
  - default title, description
  - per-page overrides
- ใช้ `generateMetadata()` สำหรับ routes dynamic (P2, P3, P10, P11)
- JSON-LD helper ใน `/features/seo`:
  - ฟังก์ชันสร้าง schema `Product`, `FAQPage`, `BlogPosting`, `BreadcrumbList`

### 8.2 Sitemap & robots

- `/app/sitemap.ts` – generate sitemap จาก DB (products, categories, blog, static routes)
- `/public/robots.txt` – block `/admin`, `/api`, paths ที่ไม่ต้องการ index

### 8.3 GA4 Events

- Wrapper `trackEvent(name, params)` ใน client
- ใส่ events:
  - view_product
  - add_to_cart
  - begin_checkout
  - complete_checkout
  - submit_lead

---

## 9. Testing Plan

### 9.1 Unit/Integration

- Target modules:
  - cart calculation helpers
  - order creation logic (mapping cart → order_items)
  - Omise webhook handler (mock payload)

### 9.2 E2E (Playwright)

- Scenarios:
  - Visit Home → go to product detail → add to cart → checkout (transfer) → see order success
  - Submit lead form → verify in admin (optional, via DB check)
  - Admin login → update hero slide → verify change on Home

### 9.3 CI Baseline (optional)

- Run lint + typecheck + unit tests on every push

---

## 10. Deployment & Environments

- **Envs:**
  - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (server only)
  - `OMISE_PUBLIC_KEY`, `OMISE_SECRET_KEY`
  - `GA4_MEASUREMENT_ID`
- **Hosting:** Vercel (preview branches + production)
- **Supabase:** project shared dev/prod or separate instances (แนะนำแยก prod)

---

## 11. Phase Mapping (Plan ↔ Spec)

- Phase 1 – MVP Mockup:
  - Implement P0–P3, P4–P8, P10–P13, P14–P16, F05–F06 (basic), B1–B4, B8–B9, B13
- Phase 2 – Hardening & SEO:
  - P9, compare curated, SEO/JSON-LD, testing suite, perf tune
- Phase 3 – Deep E-commerce:
  - F07 full Omise, F08 polish, orders admin UX, customer account UX

แผนนี้จะถูกใช้เป็นฐานสำหรับ **TASKS.md** ในขั้นตอนถัดไป โดยแต่ละ task จะอิง Spec ID + Plan section ที่เกี่ยวข้องเพื่อให้ AI ลงมือทำได้เป็นขั้นเป็นตอน.

