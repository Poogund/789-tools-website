'use client';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleButtonMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'translateY(-3px)';
    e.currentTarget.style.boxShadow = '0 6px 20px rgba(253, 216, 53, 0.5)';
  };

  const handleButtonMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 15px rgba(253, 216, 53, 0.4)';
  };

  return (
    <footer className="site-footer" style={{
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%)',
      color: '#ffffff',
      fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
      position: 'relative'
    }}>
      {/* Top decoration line */}
      <div style={{
        height: '4px',
        background: 'linear-gradient(90deg, var(--primary-color), #ffd54f, var(--primary-color))',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
      }}></div>
      
      <div className="footer-main" style={{ padding: '80px 0 60px' }}>
        <div className="container">
          <div className="footer-grid" style={{
            display: 'grid',
            gridTemplateColumns: '2.2fr 1.3fr 1.3fr 1.3fr',
            gap: '40px',
            alignItems: 'start'
          }}>
            {/* Company Info */}
            <div className="footer-column">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                <img 
                  src="/logo.png" 
                  alt="789 Tools Logo" 
                  style={{
                    width: '60px',
                    height: '60px',
                    marginRight: '16px',
                    objectFit: 'contain',
                    flexShrink: 0
                  }}
                />
                <h3 style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                  fontWeight: '800',
                  color: '#ffffff',
                  margin: '0',
                  lineHeight: '1.2'
                }}>TOOLS</h3>
              </div>
              <p style={{
                lineHeight: '1.6',
                marginBottom: '28px',
                color: '#b0b0b0',
                fontSize: '0.9rem',
                textAlign: 'left'
              }}>ศูนย์รวมเครื่องมือช่างก่อสร้างครบวงจร ขาย-เช่า รถตัดคอนกรีต เครื่องขัดมัน เครื่องตบดิน พร้อมบริการซ่อมโดยช่างผู้เชี่ยวชาญ</p>
              
              {/* Social Media */}
              <div style={{ marginBottom: '28px' }}>
                <h5 style={{
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>ติดตามเรา</h5>
                <div className="social-links" style={{ display: 'flex', gap: '12px' }}>
                  <a href="https://facebook.com/789tools" target="_blank" rel="noopener noreferrer" className="social-link facebook" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '42px',
                    height: '42px',
                    backgroundColor: '#1877f2',
                    color: '#ffffff',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    fontSize: '1rem'
                  }}>
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="https://line.me/ti/p/~@789tools" target="_blank" rel="noopener noreferrer" className="social-link line" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '42px',
                    height: '42px',
                    backgroundColor: '#06c755',
                    color: '#ffffff',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    fontSize: '1rem'
                  }}>
                    <i className="fa-brands fa-line"></i>
                  </a>
                  <a href="https://m.me/789tools" target="_blank" rel="noopener noreferrer" className="social-link messenger" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '42px',
                    height: '42px',
                    backgroundColor: '#0084ff',
                    color: '#ffffff',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    fontSize: '1rem'
                  }}>
                    <i className="fa-brands fa-facebook-messenger"></i>
                  </a>
                </div>
              </div>

              {/* Newsletter */}
              <div style={{
                background: 'rgba(253, 216, 53, 0.08)',
                padding: '18px',
                borderRadius: '12px',
                border: '1px solid rgba(253, 216, 53, 0.15)'
              }}>
                <h5 style={{
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: 'var(--primary-color)',
                  marginBottom: '10px'
                }}>รับข่าวสารพิเศษ</h5>
                <p style={{
                  fontSize: '0.8rem',
                  color: '#b0b0b0',
                  marginBottom: '14px',
                  lineHeight: '1.4'
                }}>สมัครรับข่าวสารส่วนลดและโปรโมชั่น</p>
                <div style={{
                  display: 'flex',
                  gap: '10px'
                }}>
                  <input 
                    type="email" 
                    placeholder="อีเมลของคุณ"
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#ffffff',
                      fontSize: '0.85rem'
                    }}
                  />
                  <button style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    background: 'var(--primary-color)',
                    color: 'var(--dark-color)',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}>สมัคร</button>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="footer-column">
              <h4 style={{
                fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '22px',
                display: 'flex',
                alignItems: 'center',
                lineHeight: '1.3'
              }}>
                <i className="fa-solid fa-link" style={{
                  marginRight: '10px',
                  color: 'var(--primary-color)',
                  fontSize: '0.85rem'
                }}></i>
                เมนูลัด
              </h4>
              <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                <li style={{ marginBottom: '14px' }}><a href="/" style={{
                  color: '#b0b0b0',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.9rem'
                }}>
                  <i className="fa-solid fa-chevron-right" style={{
                    marginRight: '10px',
                    fontSize: '0.65rem',
                    color: 'var(--primary-color)',
                    transition: 'transform 0.3s ease'
                  }}></i>
                  หน้าแรก
                </a></li>
                <li style={{ marginBottom: '14px' }}><a href="/products" style={{
                  color: '#b0b0b0',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.9rem'
                }}>
                  <i className="fa-solid fa-chevron-right" style={{
                    marginRight: '10px',
                    fontSize: '0.65rem',
                    color: 'var(--primary-color)',
                    transition: 'transform 0.3s ease'
                  }}></i>
                  สินค้าทั้งหมด
                </a></li>
                <li style={{ marginBottom: '14px' }}><a href="/promotions" style={{
                  color: '#b0b0b0',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.9rem'
                }}>
                  <i className="fa-solid fa-chevron-right" style={{
                    marginRight: '10px',
                    fontSize: '0.65rem',
                    color: 'var(--primary-color)',
                    transition: 'transform 0.3s ease'
                  }}></i>
                  สินค้าโปรโมชั่น
                </a></li>
                <li style={{ marginBottom: '14px' }}><a href="/reviews" style={{
                  color: '#b0b0b0',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.9rem'
                }}>
                  <i className="fa-solid fa-chevron-right" style={{
                    marginRight: '10px',
                    fontSize: '0.65rem',
                    color: 'var(--primary-color)',
                    transition: 'transform 0.3s ease'
                  }}></i>
                  รีวิวจากลูกค้า
                </a></li>
                <li style={{ marginBottom: '14px' }}><a href="/faq" style={{
                  color: '#b0b0b0',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.9rem'
                }}>
                  <i className="fa-solid fa-chevron-right" style={{
                    marginRight: '10px',
                    fontSize: '0.65rem',
                    color: 'var(--primary-color)',
                    transition: 'transform 0.3s ease'
                  }}></i>
                  คำถามที่พบบ่อย
                </a></li>
                <li style={{ marginBottom: '14px' }}><a href="/contact" style={{
                  color: '#b0b0b0',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.9rem'
                }}>
                  <i className="fa-solid fa-chevron-right" style={{
                    marginRight: '10px',
                    fontSize: '0.65rem',
                    color: 'var(--primary-color)',
                    transition: 'transform 0.3s ease'
                  }}></i>
                  ติดต่อเรา
                </a></li>
              </ul>
            </div>
            
            {/* Categories */}
            <div className="footer-column">
              <h4 style={{
                fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '22px',
                display: 'flex',
                alignItems: 'center',
                lineHeight: '1.3'
              }}>
                <i className="fa-solid fa-tools" style={{
                  marginRight: '10px',
                  color: 'var(--primary-color)',
                  fontSize: '0.85rem'
                }}></i>
                หมวดหมู่
              </h4>
              <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                <li style={{ marginBottom: '14px' }}><a href="/products?category=concrete-cutter" style={{
                  color: '#b0b0b0',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.9rem'
                }}>
                  <i className="fa-solid fa-chevron-right" style={{
                    marginRight: '10px',
                    fontSize: '0.65rem',
                    color: 'var(--primary-color)',
                    transition: 'transform 0.3s ease'
                  }}></i>
                  รถตัดคอนกรีต
                </a></li>
                <li style={{ marginBottom: '14px' }}><a href="/products?category=floor-grinder" style={{
                  color: '#b0b0b0',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.9rem'
                }}>
                  <i className="fa-solid fa-chevron-right" style={{
                    marginRight: '10px',
                    fontSize: '0.65rem',
                    color: 'var(--primary-color)',
                    transition: 'transform 0.3s ease'
                  }}></i>
                  เครื่องขัดมันพื้นปูน
                </a></li>
                <li style={{ marginBottom: '14px' }}><a href="/products?category=compactor" style={{
                  color: '#b0b0b0',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.9rem'
                }}>
                  <i className="fa-solid fa-chevron-right" style={{
                    marginRight: '10px',
                    fontSize: '0.65rem',
                    color: 'var(--primary-color)',
                    transition: 'transform 0.3s ease'
                  }}></i>
                  เครื่องตบดิน
                </a></li>
                <li style={{ marginBottom: '14px' }}><a href="/products?category=generator" style={{
                  color: '#b0b0b0',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.9rem'
                }}>
                  <i className="fa-solid fa-chevron-right" style={{
                    marginRight: '10px',
                    fontSize: '0.65rem',
                    color: 'var(--primary-color)',
                    transition: 'transform 0.3s ease'
                  }}></i>
                  เครื่องปั่นไฟ
                </a></li>
                <li style={{ marginBottom: '14px' }}><a href="/products?category=mixer" style={{
                  color: '#b0b0b0',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.9rem'
                }}>
                  <i className="fa-solid fa-chevron-right" style={{
                    marginRight: '10px',
                    fontSize: '0.65rem',
                    color: 'var(--primary-color)',
                    transition: 'transform 0.3s ease'
                  }}></i>
                  โม่ผสมปูน
                </a></li>
                <li style={{ marginBottom: '14px' }}><a href="/products?category=vacuum" style={{
                  color: '#b0b0b0',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.9rem'
                }}>
                  <i className="fa-solid fa-chevron-right" style={{
                    marginRight: '10px',
                    fontSize: '0.65rem',
                    color: 'var(--primary-color)',
                    transition: 'transform 0.3s ease'
                  }}></i>
                  เครื่องดูดฝุ่น
                </a></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div className="footer-column">
              <h4 style={{
                fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '22px',
                display: 'flex',
                alignItems: 'center',
                lineHeight: '1.3'
              }}>
                <i className="fa-solid fa-phone-volume" style={{
                  marginRight: '10px',
                  color: 'var(--primary-color)',
                  fontSize: '0.85rem'
                }}></i>
                ติดต่อเรา
              </h4>
              <div className="contact-info">
                <div className="contact-item" style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '14px',
                  padding: '14px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    backgroundColor: 'rgba(253, 216, 53, 0.15)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '14px',
                    flexShrink: 0
                  }}>
                    <i className="fa-solid fa-phone" style={{ color: 'var(--primary-color)', fontSize: '0.9rem' }}></i>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#b0b0b0', marginBottom: '3px' }}>โทรศัพท์</div>
                    <a href="tel:0657898285" style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '0.95rem'
                    }}>065-789-8285</a>
                  </div>
                </div>
                
                <div className="contact-item" style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '14px',
                  padding: '14px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    backgroundColor: 'rgba(6, 199, 85, 0.15)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '14px',
                    flexShrink: 0
                  }}>
                    <i className="fa-solid fa-line" style={{ color: '#06c755', fontSize: '0.9rem' }}></i>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#b0b0b0', marginBottom: '3px' }}>LINE Official</div>
                    <a href="https://line.me/ti/p/~@789tools" target="_blank" rel="noopener noreferrer" style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '0.95rem'
                    }}>@789tools</a>
                  </div>
                </div>

                {/* Business Hours */}
                <div style={{
                  padding: '14px',
                  background: 'rgba(253, 216, 53, 0.08)',
                  borderRadius: '10px',
                  border: '1px solid rgba(253, 216, 53, 0.15)',
                  marginBottom: '14px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px'
                  }}>
                    <i className="fa-solid fa-clock" style={{
                      color: 'var(--primary-color)',
                      marginRight: '10px',
                      fontSize: '0.9rem'
                    }}></i>
                    <span style={{
                      color: 'var(--primary-color)',
                      fontWeight: '600',
                      fontSize: '0.85rem'
                    }}>เวลาทำการ</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#b0b0b0', lineHeight: '1.4' }}>
                    <div style={{ marginBottom: '4px' }}>จันทร์ - เสาร์: 08:00 - 18:00 น.</div>
                    <div>อาทิตย์: 09:00 - 17:00 น.</div>
                  </div>
                </div>

                {/* Location */}
                <div className="contact-item" style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '14px',
                  padding: '14px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    backgroundColor: 'rgba(253, 216, 53, 0.15)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '14px',
                    flexShrink: 0
                  }}>
                    <i className="fa-solid fa-location-dot" style={{ color: 'var(--primary-color)', fontSize: '0.9rem' }}></i>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#b0b0b0', marginBottom: '3px' }}>ที่อยู่</div>
                    <span style={{ color: '#ffffff', lineHeight: '1.4', fontSize: '0.85rem' }}>7/307 ถ.เสมาฟ้าคราม ต.คูคต อ.ลำลูกกา ปทุมธานี 12130</span>
                  </div>
                </div>

                {/* Additional Services */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px'
                  }}>
                    <i className="fa-solid fa-star" style={{
                      color: 'var(--primary-color)',
                      marginRight: '10px',
                      fontSize: '0.9rem'
                    }}></i>
                    <span style={{
                      color: 'var(--primary-color)',
                      fontWeight: '600',
                      fontSize: '0.85rem'
                    }}>บริการของเรา</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#b0b0b0', lineHeight: '1.4' }}>
                    <div style={{ marginBottom: '4px' }}>✓ บริการจัดส่งทั่วประเทศ</div>
                    <div style={{ marginBottom: '4px' }}>✓ รับประกันสินค้า 1 ปี</div>
                    <div style={{ marginBottom: '4px' }}>✓ มีบริการหลังการขาย</div>
                    <div>✓ รับซ่อมเครื่องมือทุกยี่ห้อ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="footer-bottom" style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        padding: '24px 0',
        borderTop: '1px solid rgba(253, 216, 53, 0.2)'
      }}>
        <div className="container">
          <div className="footer-bottom-content" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '30px',
                height: '30px',
                backgroundColor: 'var(--primary-color)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '0.8rem',
                color: 'var(--dark-color)'
              }}>789</div>
              <p style={{ margin: '0', color: '#b0b0b0' }}>&copy; 2025 789 Tools. All Rights Reserved.</p>
            </div>
            <div className="footer-links" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <a href="#" style={{
                color: '#b0b0b0',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontSize: '0.9rem'
              }}>นโยบายความเป็นส่วนตัว</a>
              <span style={{ color: '#666', fontSize: '0.8rem' }}>•</span>
              <a href="#" style={{
                color: '#b0b0b0',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontSize: '0.9rem'
              }}>ข้อกำหนดการใช้งาน</a>
              <span style={{ color: '#666', fontSize: '0.8rem' }}>•</span>
              <a href="#" style={{
                color: '#b0b0b0',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontSize: '0.9rem'
              }}>แผนผังเว็บไซต์</a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        onClick={scrollToTop}
        onMouseOver={handleButtonMouseOver}
        onMouseOut={handleButtonMouseOut}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '50px',
          height: '50px',
          backgroundColor: 'var(--primary-color)',
          color: 'var(--dark-color)',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          fontWeight: '700',
          boxShadow: '0 4px 15px rgba(253, 216, 53, 0.4)',
          transition: 'all 0.3s ease',
          zIndex: 1000
        }}
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </footer>
  );
}
