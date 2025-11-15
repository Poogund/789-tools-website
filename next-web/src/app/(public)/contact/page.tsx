'use client';

import { useState } from 'react';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('ขอบคุณสำหรับข้อความของคุณ เราจะติดต่อกลับโดยเร็วที่สุด');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactMethods = [
    {
      icon: 'fa-map-marker-alt',
      title: 'ที่อยู่',
      content: '7/307 ถ.เสมาฟ้าคราม ต.คูคต อ.ลำลูกกา, จังหวัดปทุมธานี',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: 'fa-phone',
      title: 'โทรศัพท์',
      content: siteConfig.phone,
      link: `tel:${siteConfig.phone}`,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: 'fa-envelope',
      title: 'อีเมล',
      content: '789Tools@gmail.com',
      link: 'mailto:789Tools@gmail.com',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: 'fa-brands fa-line',
      title: 'LINE',
      content: '@789Tools',
      link: siteConfig.links.line,
      color: 'from-[#00C300] to-[#00B300]'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-color/5 via-yellow-400/5 to-primary-color/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-color to-yellow-400 rounded-3xl mb-8 shadow-xl">
              <i className="fa-solid fa-envelope-open text-white text-4xl"></i>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-dark-color thai-text leading-tight">
              ติดต่อเรา
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 thai-text leading-relaxed">
              หากคุณมีคำถามเกี่ยวกับสินค้า บริการเช่าหรือซ่อมเครื่องมือ หรือต้องการใบเสนอราคา
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, idx) => {
                const Component = method.link ? 'a' : 'div';
                const props = method.link ? { href: method.link } : {};
                return (
                  <Component
                    key={idx}
                    {...props}
                    className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 group ${method.link ? 'cursor-pointer' : ''}`}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <i className={`fa-solid ${method.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="text-xl font-black mb-3 text-dark-color thai-text">{method.title}</h3>
                    <p className={`text-gray-700 ${method.link ? 'group-hover:text-primary-color transition-colors' : ''} thai-text`}>
                      {method.content}
                    </p>
                  </Component>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Map & Form Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Map */}
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="aspect-video">
                    <iframe
                      title="แผนที่ร้าน 789 Tools"
                      src="https://maps.google.com/maps?q=7%2F307%20ถ.%E0%B9%80%E0%B8%AA%E0%B8%A1%E0%B8%B2%E0%B8%9F%E0%B9%89%E0%B8%B2%E0%B8%84%E0%B8%A3%E0%B8%B2%E0%B8%A1%20ต.%E0%B8%84%E0%B8%B9%E0%B8%84%E0%B8%95%20อ.%E0%B8%A5%E0%B8%B3%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%B2%20จ.%E0%B8%9B%E0%B8%97%E0%B8%B8%E0%B8%A1%E0%B8%98%E0%B8%B2%E0%B8%99%E0%B8%B5&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="order-1 lg:order-2">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
                  <div className="mb-8">
                    <div className="text-primary-color text-sm font-bold mb-4 thai-text tracking-wider">SEND MESSAGE</div>
                    <h2 className="text-3xl md:text-4xl font-black mb-4 text-dark-color thai-text">ส่งข้อความหาเรา</h2>
                    <p className="text-gray-600 thai-text">กรอกแบบฟอร์มด้านล่าง เราจะติดต่อกลับโดยเร็วที่สุด</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2 thai-text">
                        <i className="fa-solid fa-user text-primary-color mr-2"></i>
                        ชื่อ *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="ชื่อของคุณ"
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-color focus:border-primary-color transition-all thai-text text-lg"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 thai-text">
                        <i className="fa-solid fa-envelope text-primary-color mr-2"></i>
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="อีเมลของคุณ"
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-color focus:border-primary-color transition-all text-lg"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2 thai-text">
                        <i className="fa-solid fa-phone text-primary-color mr-2"></i>
                        เบอร์โทร *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="เบอร์ติดต่อ"
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-color focus:border-primary-color transition-all text-lg"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2 thai-text">
                        <i className="fa-solid fa-message text-primary-color mr-2"></i>
                        ข้อความ *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="ข้อความของคุณ"
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-color focus:border-primary-color transition-all resize-none thai-text text-lg"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary-color to-yellow-400 text-white px-10 py-5 rounded-xl font-bold hover:from-yellow-400 hover:to-primary-color transition-all shadow-xl hover:shadow-2xl text-lg thai-text"
                    >
                      <i className="fa-solid fa-paper-plane mr-3"></i>
                      ส่งข้อความ
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-color via-yellow-400 to-primary-color relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white thai-text">ต้องการความช่วยเหลือด่วน?</h2>
            <p className="text-xl mb-10 text-white/90 thai-text">โทรหาเราได้เลย เราพร้อมให้บริการ 24/7</p>
            <a 
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center bg-white text-primary-color px-12 py-5 rounded-xl font-black hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl text-xl thai-text"
            >
              <i className="fa-solid fa-phone mr-3"></i>
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
