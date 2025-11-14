export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>ติดต่อเราวันนี้</h2>
          <p>พร้อมให้คำปรึกษาและบริการคุณด้วยทีมงานมืออาชีพ</p>
          <div className="cta-buttons">
            <a 
              href="https://line.me/ti/p/~@789tools" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary line-btn"
            >
              <i className="fa-brands fa-line"></i>
              แอดไลน์
            </a>
            <a href="tel:0657898285" className="btn btn-secondary phone-btn">
              <i className="fa-solid fa-phone"></i>
              โทร: 065-789-8285
            </a>
            <a 
              href="https://m.me/789tools" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-outline messenger-btn"
            >
              <i className="fa-brands fa-facebook-messenger"></i>
              Messenger
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
