# CONSTITUTION.md – 789 TOOLS WEB PLATFORM

> **Purpose:** ระบุวิสัยทัศน์ กฎเหล็ก มาตรฐานวิศวกรรม และระเบียบการทำงานที่เป็น “Single Source of Truth” สำหรับ Windsurf/Dev/AI ทุกตัวที่เข้ามาร่วมพัฒนาโปรเจกต์นี้

---

# 1. Vision

สร้างระบบเว็บไซต์ 789 Tools ที่

- โหลดไว (≤1–2s), SEO พร้อมขึ้นอันดับ, UX ง่าย ใช้งานได้จริงสำหรับลูกค้าก่อสร้าง
- มีระบบหลังบ้านครบ (สินค้า / เช่า / ซ่อม / บล็อก / FAQ / รีวิว / โปร / Leads / Orders)
- รองรับการขายจริง: รถเข็น → Checkout → สั่งซื้อ → ชำระเงิน → ดูประวัติคำสั่งซื้อ
- พัฒนาแบบ **Spec-Driven Development (SDD)**: ทุกโค้ดต้องมีต้นทางใน SPEC.md / PLAN.md / TASKS.md
- รักษาความสม่ำเสมอของ codebase และสามารถสเกลได้โดยไม่พังในอนาคต

---

# 2. Non‑Negotiables (กฎเหล็ก)

1. **Spec ก่อนโค้ด** – ห้ามเขียนโค้ดโดยไม่มี SPEC + PLAN + TASK ต้นทาง
2. **Single Source of Truth** – เอกสาร: CONSTITUTION, SPEC, PLAN, TASKS คือความจริงสูงสุด
3. **Zero Ambiguity** – ถ้าไม่ชัดเจน ต้องขอ /speckit.clarify
4. **ห้าม vibe-coding** – ทุกโค้ดต้องสืบกลับถึง Spec ID
5. **Minimal Viable Stack** – ห้ามเพิ่ม library โดยไม่ผ่านการอนุมัติใน DECISIONS.md
6. **Performance Budget** – Public pages FCP < 1.5s, LCP < 2.5s บนเครือข่ายปกติ
7. **Accessibility Budget** – รองรับ keyboard navigation และ aria-label ใน UI สำคัญ
8. **Security Budget** – ป้องกัน admin routes, ต้อง validate input ทุกครั้ง
9. **Deployment Stability** – ต้องผ่าน checklist testing ก่อน release ทุกครั้ง
10. Frontend Design Reuse – การออกแบบหน้าเว็บ (layout, colors, spacing) ต้องยึดจากเว็บเก่าที่อยู่ในโฟลเดอร์ /legacy เป็นหลัก ห้าม redesign ใหม่ทั้งหมด นอกจากจะระบุไว้ใน SPEC/PLAN ให้ทำ


---

# 3. Coding Standards

### 3.1 Language & Framework

- Next.js (App Router) + TypeScript strict mode
- Server Components default / Client Components เฉพาะที่จำเป็น

### 3.2 Naming

- Components: `PascalCase`
- Hooks: `useXxx`
- DB Models / Types: `CamelCase`
- API routes: kebab-case
- File structureตาม PLAN.md §2

### 3.3 State Management

- Zustand สำหรับ cart
- React-hook-form + zod สำหรับ forms
- React-query ใช้เฉพาะ admin ที่ interactive มาก

### 3.4 Error Handling

- throw errors ใน repository
- UI ต้องแสดงข้อความที่อ่านออก ไม่ใช่ error stack

### 3.5 Code Quality

- ESLint + Prettier mandatory
- ทุก feature ต้องผ่าน self-review checklist ใน implementation task

---

# 4. Documentation Standards

ทุกไฟล์ต้อง:

- มีหัวข้อ Summary
- มีลิงก์ mapping กลับไปยัง SPEC/PLAN
- มี versioning ใน CHANGELOG
- เขียนย่อ สั้น กระชับ เน้น testability

---

# 5. NFR Budgets (Performance / A11y / Security)

### Performance

- Home / Products / Product Detail โหลด ≤ 1–2s
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- ISR caching ใช้สำหรับ catalog

### Accessibility

- ทุกปุ่มต้องมี aria-label
- Navbar / modal รองรับ keyboard
- Contrast ตามมาตรฐาน WCAG AA

### Security

- `/admin/*` ต้องตรวจสิทธิ์ทุกครั้ง
- ทุก API ต้อง sanitize input + validate zod schema
- ห้าม expose service role key ไป client

---

# 6. Review & Release Rules

### 6.1 ก่อน Merge ต้องผ่าน

- Typecheck
- Lint
- Unit test ที่เกี่ยวข้อง
- Mapping SPEC/PLAN (ต้องมีใน PR description)

### 6.2 ก่อน Release Production ต้องมี

- e2e test (เพิ่มลงรถเข็น → checkout → success)
- ตรวจ Core Web Vitals ครบ
- ตรวจ SEO: Metadata, JSON-LD, Sitemap

---

# 7. Data Protection Rules

- เก็บข้อมูลลูกค้าเฉพาะที่จำเป็นสำหรับการสั่งซื้อ
- Hash รหัสผ่านผ่าน Supabase Auth
- ป้องกัน access database โดยตรงผ่าน RLS policies

---

# 8. Naming Conventions (Global)

### Code files

- Components: `/components/ui/Button.tsx`
- Domain modules: `/features/cart/useCartStore.ts`
- API routes: `/api/orders/route.ts`

### Database

- tables: snake\_case (e.g., `product_images`, `order_items`)
- primary keys: `id`
- foreign keys: `<table>_id`

---

# 9. Governance Documents

Library นี้ต้องอยู่ใน root repo:

- **CONSTITUTION.md** (ไฟล์นี้)
- **SPEC.md**
- **PLAN.md**
- **TASKS.md**
-

---

# 10. Rubric (ใช้ประเมินไฟล์ทุกชุด)

- 0 = ไม่ผ่าน ไม่มี traceability
- 1 = พอใช้ แต่ข้อมูลไม่ครบ
- 2 = ดี ครอบคลุม 70–90%
- 3 = ยอดเยี่ยม ครบถ้วน ตรวจสอบได้ 100%

---

# 11. Red-Team Review Guideline

**คำถามที่ต้องถามก่อน merge:**

- ถ้าโค้ดนี้พังใน production จะพังตรงไหน?
- ถ้า API นี้รับ payload แปลก ๆ จะเกิดอะไรขึ้น?
- ฟีเจอร์นี้ถูก test ผ่าน accept criteria หรือยัง?
- ถ้า role ผิดสิทธิ์เข้ามาจะโดน block ไหม?

---

# 12. Phase Check (ใช้เช็กคุณภาพ)

**Constitution alignment:** ต้องไม่มีข้อฝ่าฝืน
**Acceptance coverage:** ≥ 95% ของ Spec IDs ต้องถูกอ้างใน Plan/Tasks
**NFR Budgets:** ต้องผ่านทุกตัว (Perf/A11y/Sec)
**Traceability map:** SPEC → PLAN → TASKS ตรงครบ

---

> **Status:** Version 1.0 — Foundation complete
> **Next:** DECISIONS.md + RISKS.md + CHANGELOG.md + GLOSSARY.md

