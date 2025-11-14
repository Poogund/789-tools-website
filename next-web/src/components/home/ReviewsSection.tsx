export default function ReviewsSection() {
  // Legacy fallback reviews - 8 reviews for 4x2 grid
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
    },
    {
      id: "rev-005",
      image_url: "/review-05.png",
      caption: "เครื่องสภาพดี ราคา worth มาก"
    },
    {
      id: "rev-006",
      image_url: "/review-06.png",
      caption: "บริการประทับใจ แนะนำเลย"
    },
    {
      id: "rev-007",
      image_url: "/review-07.png",
      caption: "ส่งเร็ว ของดี ใช้ได้เลย"
    },
    {
      id: "rev-008",
      image_url: "/review-08.png",
      caption: "ทีมงานดูแลดีมาก ประทับใจ"
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
          gap: '16px',
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
                height: '120px', // 50% smaller than before
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
                padding: '12px 8px',
                margin: '0',
                fontSize: '0.8rem',
                color: '#2c2c2c',
                lineHeight: '1.3'
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
