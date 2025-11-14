import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1: Brand Info */}
            <div className="space-y-4">
              <img
                src="/logo.png"
                alt="789 Tools Logo"
                className="h-12 w-auto"
              />
              <h4 className="text-white font-bold text-lg">ศูนย์รวมเครื่องมือช่างก่อสร้างครบวงจร</h4>
              <p className="text-sm leading-relaxed">
                ที่อยู่ : 7/307 ถ.เสมาฟ้าคราม ต.คูคต อ.ลำลูกกา, ปทุมธานี
              </p>
              <p className="text-sm">
                เบอร์โทร : <a href="tel:0657898285" className="text-yellow-400 hover:text-yellow-300">065-789-8285</a>
              </p>
              <p className="text-sm">
                Email : <a href="mailto:789Tools@gmail.com" className="text-yellow-400 hover:text-yellow-300">789Tools@gmail.com</a>
              </p>
            </div>

            {/* Column 2: Help Center */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-lg">ศูนย์ช่วยเหลือ</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">บริการหลังการขาย</a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">วิธีสั่งซื้อสินค้า</a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">วิธีการชำระเงิน</a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">การบริการจัดส่งสินค้า</a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">เงื่อนไขการเปลี่ยน-คืนสินค้า</a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">นโยบายความเป็นส่วนตัว</a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">คำถามที่พบบ่อย</a>
                </li>
              </ul>
            </div>

            {/* Column 3: Popular Categories */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-lg">หมวดหมู่สินค้ายอดนิยม</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">เครื่องตัดถนน</a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">เครื่องขัดมันพื้นปูน</a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">เครื่องตบดิน</a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">เครื่องปั่นไฟ</a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">โม่ผสมปูน</a>
                </li>
              </ul>
            </div>

            {/* Column 4: Menu & Social */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-lg">เมนูทางลัด</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:text-yellow-400 transition-colors">หน้าแรก</Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-yellow-400 transition-colors">เกี่ยวกับเรา</Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-yellow-400 transition-colors">สินค้าทั้งหมด</Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-yellow-400 transition-colors">บริการให้เช่า</Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-yellow-400 transition-colors">ติดต่อเรา</Link>
                </li>
              </ul>
              
              <div className="space-y-4">
                <h4 className="text-white font-bold text-lg">ติดตามเราได้ที่</h4>
                <div className="flex space-x-3">
                  <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors" aria-label="Facebook">
                    <i className="fab fa-facebook-f text-sm"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors" aria-label="Line">
                    <i className="fab fa-line text-lg"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors" aria-label="TikTok">
                    <i className="fab fa-tiktok text-sm"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors" aria-label="Email">
                    <i className="fas fa-envelope text-sm"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Footer (Copyright Bar) */}
      <div className="bg-black py-6 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; 2025 789 Tools. All Rights Reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-yellow-400 transition-colors">นโยบายความเป็นส่วนตัว</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">ข้อกำหนดการใช้งาน</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
