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
    },
    {
      icon: 'fa-phone',
      title: 'โทรศัพท์',
      content: siteConfig.phone,
      link: `tel:${siteConfig.phone}`,
    },
    {
      icon: 'fa-envelope',
      title: 'อีเมล',
      content: '789Tools@gmail.com',
      link: 'mailto:789Tools@gmail.com',
    },
    {
      icon: 'fa-brands fa-line',
      title: 'LINE',
      content: '@789Tools',
      link: siteConfig.links.line,
    },
    {
      icon: 'fa-brands fa-facebook-messenger',
      title: 'Messenger',
      content: '789 Tools',
      link: siteConfig.links.messenger,
    },
  ];

  return (
    <main className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-background"></div>
        <div className="container mx-auto px-4">
          <div className="contact-hero-content">
            <div className="contact-hero-badge">
              <i className="fa-solid fa-envelope-open"></i>
            </div>
            <h1 className="contact-hero-title">
              ติดต่อ <span className="contact-hero-highlight">เรา</span>
            </h1>
            <p className="contact-hero-description">
              หากคุณมีคำถามเกี่ยวกับสินค้า บริการเช่าหรือซ่อมเครื่องมือ หรือต้องการใบเสนอราคา
              เราพร้อมให้คำปรึกษาและบริการคุณด้วยทีมงานมืออาชีพ
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="contact-methods">
        <div className="container mx-auto px-4">
          <div className="section-header">
            <div className="section-badge">CONTACT METHODS</div>
            <h2 className="section-title">ช่องทางติดต่อ</h2>
            <p className="section-subtitle">
              เลือกช่องทางที่สะดวกสำหรับคุณ เราพร้อมให้บริการทุกวัน
            </p>
          </div>
          <div className="methods-grid">
            {contactMethods.map((method, idx) => {
              const Component = method.link ? 'a' : 'div';
              const props = method.link ? { href: method.link, target: method.link.startsWith('http') ? '_blank' : undefined, rel: method.link.startsWith('http') ? 'noopener noreferrer' : undefined } : {};
              return (
                <Component
                  key={idx}
                  {...props}
                  className={`method-card ${method.link ? 'method-card-link' : ''}`}
                >
                  <div className="method-icon">
                    <i className={`fa-solid ${method.icon}`}></i>
                  </div>
                  <h3 className="method-title">{method.title}</h3>
                  <p className="method-content">{method.content}</p>
                </Component>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form & Map Section */}
      <section className="contact-form-map">
        <div className="container mx-auto px-4">
          <div className="form-map-grid">
            {/* Contact Form */}
            <div className="form-container">
              <div className="form-card">
                <div className="form-header">
                  <div className="section-badge">SEND MESSAGE</div>
                  <h2 className="section-title">ส่งข้อความหาเรา</h2>
                  <p className="section-subtitle">
                    กรอกแบบฟอร์มด้านล่าง เราจะติดต่อกลับโดยเร็วที่สุด
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      <i className="fa-solid fa-user"></i>
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
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      <i className="fa-solid fa-envelope"></i>
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
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      <i className="fa-solid fa-phone"></i>
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
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      <i className="fa-solid fa-message"></i>
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
                      className="form-textarea"
                    ></textarea>
                  </div>

                  <button type="submit" className="form-submit-btn">
                    <i className="fa-solid fa-paper-plane"></i>
                    ส่งข้อความ
                  </button>
                </form>
              </div>
            </div>

            {/* Map */}
            <div className="map-container">
              <div className="map-card">
                <div className="map-header">
                  <div className="section-badge">LOCATION</div>
                  <h2 className="section-title">แผนที่ร้าน</h2>
                  <p className="section-subtitle">
                    เยี่ยมชมร้านของเราได้ที่ 7/307 ถ.เสมาฟ้าคราม ต.คูคต อ.ลำลูกกา, จังหวัดปทุมธานี
                  </p>
                </div>
                <div className="map-wrapper">
                  <iframe
                    title="แผนที่ร้าน 789 Tools"
                    src="https://maps.google.com/maps?q=7%2F307%20ถ.%E0%B9%80%E0%B8%AA%E0%B8%A1%E0%B8%B2%E0%B8%9F%E0%B9%89%E0%B8%B2%E0%B8%84%E0%B8%A3%E0%B8%B2%E0%B8%A1%20ต.%E0%B8%84%E0%B8%B9%E0%B8%84%E0%B8%95%20อ.%E0%B8%A5%E0%B8%B3%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%B2%20จ.%E0%B8%9B%E0%B8%97%E0%B8%B8%E0%B8%A1%E0%B8%98%E0%B8%B2%E0%B8%99%E0%B8%B5&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="map-iframe"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="contact-cta">
        <div className="container mx-auto px-4">
          <div className="cta-content">
            <div className="cta-icon">
              <i className="fa-solid fa-phone"></i>
            </div>
            <h2 className="cta-title">ต้องการความช่วยเหลือด่วน?</h2>
            <p className="cta-description">
              โทรหาเราได้เลย เราพร้อมให้บริการทุกวัน
            </p>
            <div className="cta-buttons">
              <a href={`tel:${siteConfig.phone}`} className="cta-btn primary">
                <i className="fa-solid fa-phone"></i>
                {siteConfig.phone}
              </a>
              <a href={siteConfig.links.line} target="_blank" rel="noopener noreferrer" className="cta-btn secondary">
                <i className="fa-brands fa-line"></i>
                แอด LINE
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
