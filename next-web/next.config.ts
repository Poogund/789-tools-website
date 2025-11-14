import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ตั้งค่า Turbopack ว่างๆ ตามที่ Next แนะนำ เพื่อลด warning เรื่อง root
  turbopack: {},
};

export default nextConfig;