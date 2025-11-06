// assets/js/modules/featured-product-loader.js

async function loadFeaturedProducts() {
  const gridContainer = document.querySelector(".product-grid-fixed");
  if (!gridContainer) return;

  try {
    const response = await fetch("data/featured-products.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const products = await response.json();

    const cardsHtml = products
      .map(
        (product) => `
            <div class="product-card">
                <div class="discount-badge">${product.discount_percentage}</div>
                <div class="product-image-container">
                    <img src="${product.image_path}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-pricing">
                        <span class="current-price">฿ ${product.price}</span>
                        <span class="original-price">฿ ${product.original_price}</span>
                    </div>
                    <a href="#" class="btn btn-secondary">ดูรายละเอียด</a>
                </div>
            </div>
        `
      )
      .join("");

    gridContainer.innerHTML = cardsHtml;
  } catch (error) {
    console.error("Could not fetch or load featured products:", error);
    gridContainer.innerHTML =
      "<p>ขออภัย ไม่สามารถโหลดสินค้าแนะนำได้ในขณะนี้</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadFeaturedProducts);
