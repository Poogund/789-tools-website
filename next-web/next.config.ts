import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ตั้งค่า Turbopack ว่างๆ ตามที่ Next แนะนำ เพื่อลด warning เรื่อง root
  turbopack: {},
  // ปิด source maps ใน production เพื่อแก้ปัญหา source map errors
  productionBrowserSourceMaps: false,
  // อนุญาตให้โหลดรูปจาก Supabase storage
  images: {
    domains: ['ycbjjrmxconqkhtmpxls.supabase.co'],
  },
};

export default nextConfig;