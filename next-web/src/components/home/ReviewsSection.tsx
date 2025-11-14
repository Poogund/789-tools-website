export default function ReviewsSection() {
  // Legacy fallback reviews
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
        <div className="reviews-grid">
          {fallbackReviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-image-wrapper">
                <img src={review.image_url} alt="Customer review image" loading="lazy" />
              </div>
              <p>{review.caption}</p>
            </div>
          ))}
        </div>
        <div className="reviews-footer">
          <a href="#" className="btn btn-secondary">ดูรีวิวเพิ่มเติม</a>
        </div>
      </div>
    </section>
  );
}
