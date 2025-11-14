export default function ReviewsSection() {
  // Static reviews data based on legacy structure
  const reviews = [
    {
      id: 1,
      name: "คุณสมชาย ใจดี",
      content: "บริการดีมาก สินค้าคุณภาพ ขนส่งรวดเร็ว",
      image_url: "/review-01.png"
    },
    {
      id: 2,
      name: "คุณมานี รักการก่อสร้าง",
      content: "เครื่องมือดี ราคาถูก แนะนำเลยครับ",
      image_url: "/review-02.png"
    },
    {
      id: 3,
      name: "คุณวีระ ช่างมืออาชีพ",
      content: "ใช้บริการเช่ามาหลายครั้งแล้ว พอใจมาก",
      image_url: "/review-03.png"
    }
  ];

  return (
    <section className="reviews-section">
      <div className="container">
        <h2>รีวิวจากลูกค้าทั่วประเทศ</h2>
        <p>ขอบคุณลูกค้าทุกท่านที่ไว้วางใจ 789 Tools</p>
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-image">
                {review.image_url ? (
                  <img src={review.image_url} alt={`รีวิวจาก ${review.name}`} />
                ) : (
                  <div className="review-placeholder">
                    <i className="fa-solid fa-user"></i>
                  </div>
                )}
              </div>
              <div className="review-content">
                <h4>{review.name}</h4>
                <p>{review.content}</p>
                <div className="review-rating">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="reviews-footer">
          <a href="/reviews" className="btn btn-secondary">ดูรีวิวเพิ่มเติม</a>
        </div>
      </div>
    </section>
  );
}
