// assets/js/modules/review-loader.js

async function loadReviews() {
  const gridContainer = document.querySelector(".reviews-grid");
  if (!gridContainer) return;

  try {
    const response = await fetch("data/reviews.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const reviews = await response.json();

    const cardsHtml = reviews
      .map(
        (review) => `
            <div class="review-card">
                <div class="review-image-wrapper">
                    <img src="${review.image_url}" alt="Customer review image" loading="lazy">
                </div>
                <p>${review.caption}</p>
            </div>
        `
      )
      .join("");

    gridContainer.innerHTML = cardsHtml;
  } catch (error) {
    console.error("Could not fetch or load reviews:", error);
    gridContainer.innerHTML = "<p>ขออภัย ไม่สามารถโหลดรีวิวได้ในขณะนี้</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadReviews);
