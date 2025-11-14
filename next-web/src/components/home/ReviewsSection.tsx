export default function ReviewsSection() {
  // Legacy fallback reviews - 4 reviews for 4x1 grid
  const fallbackReviews = [
    {
      id: "rev-001",
      image_url: "/review-01.png",
      caption: "บริการไว ส่งถึงหน้างานจริง เครื่องพร้อมใช้งาน"
    },
    {
      id: "rev-002",
      image_url: "/review-02.png",
      caption: "ประทับใจสุดๆเป็นกันเองมาก"
    },
    {
      id: "rev-003",
      image_url: "/review-03.png",
      caption: "ทีมงานให้คำแนะนำดีมาก"
    },
    {
      id: "rev-004",
      image_url: "/review-04.png",
      caption: "มั่นใจในบริการส่งจริง ได้รับของไวมาก"
    }
  ];

  return (
    <section className="reviews-section">
      <div className="container">
        <h2>รีวิวจากลูกค้าทั่วประเทศ</h2>
        <p>ขอบคุณลูกค้าทุกท่านที่ไว้วางใจ 789 Tools</p>
        <div className="reviews-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {fallbackReviews.map((review) => (
            <div key={review.id} className="review-card" style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              textAlign: 'center'
            }}>
              <div className="review-image-wrapper" style={{
                position: 'relative',
                width: '100%',
                height: '280px', // Much larger cards like in the image
                overflow: 'hidden'
              }}>
                <img 
                  src={review.image_url} 
                  alt="Customer review image" 
                  loading="lazy" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    aspectRatio: '4/3' // Portrait aspect ratio like legacy
                  }}
                />
              </div>
              <p style={{
                padding: '20px 16px',
                margin: '0',
                fontSize: '1rem',
                color: '#2c2c2c',
                lineHeight: '1.5',
                fontWeight: '500'
              }}>{review.caption}</p>
            </div>
          ))}
        </div>
        <div className="reviews-footer" style={{ textAlign: 'center' }}>
          <a href="/reviews" className="btn btn-secondary" style={{
            display: 'inline-block',
            padding: '12px 24px',
            textDecoration: 'none',
            backgroundColor: '#f5f5f5',
            color: '#2c2c2c',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '0.9rem',
            transition: 'background-color 0.3s ease'
          }}>ดูรีวิวเพิ่มเติม</a>
        </div>
      </div>
    </section>
  );
}
