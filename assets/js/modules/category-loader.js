// assets/js/modules/category-loader.js

async function loadCategories() {
  const gridContainer = document.querySelector(".category-grid");
  // If the container doesn't exist on the page, stop the function
  if (!gridContainer) return;

  try {
    const response = await fetch("data/products.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const categories = await response.json();

    // Generate all card HTML at once
    const cardsHtml = categories
      .map(
        (category) => `
            <a href="#" class="category-card">
                <img src="${category.image_url}" alt="${category.name}" loading="lazy">
                <div class="card-name-overlay">
                    <h3>${category.name}</h3>
                </div>
            </a>
        `
      )
      .join("");

    // Inject the generated HTML into the grid
    gridContainer.innerHTML = cardsHtml;
  } catch (error) {
    console.error("Could not fetch or load categories:", error);
    gridContainer.innerHTML =
      "<p>ขออภัย ไม่สามารถโหลดหมวดหมู่สินค้าได้ในขณะนี้</p>";
  }
}

// Run the function when the page content is loaded
document.addEventListener("DOMContentLoaded", loadCategories);
