// assets/js/modules/product-detail-loader.js

// ⚔️ (ภารกิจข้อ 1) ⚔️: ฟังก์ชันสร้างดาวเรตติ้ง
function createStarRating(rating) {
  let starsHtml = "";
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<i class="fa-solid fa-star"></i>';
  }
  if (halfStar) {
    starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
  }
  for (let i = 0; i < emptyStars; i++) {
    starsHtml += '<i class="fa-regular fa-star"></i>';
  }
  return starsHtml;
}

// ⚔️ (ภารกิจข้อ 3) ⚔️: ฟังก์ชันสร้างเนื้อหาแท็บรายละเอียด
function createDescriptionContent(product) {
  // สร้าง HTML ของ bullet points
  const bulletsHtml = product.description_bullets
    .map((bullet) => `<li>${bullet}</li>`)
    .join("");

  // คืนค่า HTML ทั้งหมดของแท็บ
  return `
    <h3>${product.name}</h3>
    <p>${product.description_long}</p>
    <img src="${product.description_image}" alt="Product in action" class="tab-content-image" />
    <ul class="tab-description-bullets">
      ${bulletsHtml}
    </ul>
  `;
}

// ⚔️ (ภารกิจข้อ 5) ⚔️: ฟังก์ชันสร้างรายการรีวิว
function createReviewItem(review) {
  return `
    <div class="review-item">
      <div class="review-header">
        <span class="review-author">${review.author}</span>
        <div class="review-rating">${createStarRating(review.rating)}</div>
      </div>
      <p class="review-body">"${review.comment}"</p>
      <span class="review-date">ซื้อเมื่อ: ${review.date}</span>
    </div>
  `;
}

// ฟังก์ชันสำหรับสร้าง HTML ของตาราง Specs
function createSpecsTable(specs) {
  return specs
    .map(
      (spec, index) => `
    <tr class${index % 2 === 0 ? ' class="spec-row-alt"' : ""}>
      <td>${spec.name}</td>
      <td>${spec.value}</td>
    </tr>
  `
    )
    .join("");
}

// ฟังก์ชันสำหรับสร้าง HTML ของ Thumbnail
function createThumbnail(thumb, index, mainImageSrc) {
  const isActive = thumb === mainImageSrc;
  return `
    <img
      src="${thumb}"
      alt="มุมมองสินค้า ${index + 1}"
      class="thumbnail-item ${isActive ? "active" : ""}"
      data-src="${thumb}"
    />
  `;
}

// ฟังก์ชันสำหรับสร้าง HTML ของสินค้าที่เกี่ยวข้อง
function createRelatedProductCard(product) {
  if (!product) return ""; // ป้องกัน error ถ้าหา ID ไม่เจอ
  return `
    <div class="shopee-product-card">
      <a href="product-detail.html?id=${product.id}">
        <div class="card-image-container">
          <img src="${product.image}" alt="${product.name}" />
          ${
            product.sale_tag
              ? `<span class="card-sale-badge">${product.sale_tag}</span>`
              : ""
          }
        </div>
        <div class="card-info-container">
          <h3 class="card-title">${product.name}</h3>
          <div class="card-price">
            <span class="sale-price">฿${product.price}</span>
            ${
              product.original_price
                ? `<span class="original-price">฿${product.original_price}</span>`
                : ""
            }
          </div>
          <div class="card-review-sold">
             <!-- ⚔️ อัปเดตส่วนรีวิวการ์ดย่อ (ถ้ามี) ⚔️ -->
             ${
               product.rating && product.review_count
                 ? `<div class="star-rating">${createStarRating(
                     product.rating
                   )}</div>
                    <span class="items-sold">ขายแล้ว ${
                      product.review_count
                    } ชิ้น</span>`
                 : `<span class="items-sold">คลิกดูรายละเอียด</span>`
             }
          </div>
        </div>
      </a>
    </div>
  `;
}

// --- (เพิ่ม) ฟังก์ชันควบคุมแท็บ ---
function initializeTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabTarget = button.dataset.tab;

      // 1. อัปเดตปุ่ม
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // 2. อัปเดตเนื้อหา
      tabPanels.forEach((panel) => {
        if (panel.id === `tab-${tabTarget}`) {
          panel.classList.add("active");
        } else {
          panel.classList.remove("active");
        }
      });
    });
  });
}
// --- (สิ้นสุด) ฟังก์ชันควบคุมแท็บ ---

// ฟังก์ชันหลักในการโหลดข้อมูลสินค้า
async function loadProductDetails() {
  const mainElement = document.querySelector(".product-detail-page");
  if (!mainElement) return; // ถ้าไม่ใช่หน้าสินค้า ให้หยุดทำงาน

  try {
    // 1. อ่าน ID จาก URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
      mainElement.innerHTML =
        '<div class="container"><p style="color: red; font-size: 1.2rem; text-align: center; padding: 40px;">ไม่พบรหัสสินค้า (ID) ใน URL</p></div>';
      return;
    }

    // 2. โหลดฐานข้อมูลกลาง
    const response = await fetch("data/all-products-db.json");
    if (!response.ok)
      throw new Error("ไม่สามารถโหลดฐานข้อมูลสินค้า (all-products-db.json)");
    const allProducts = await response.json();

    // 3. ค้นหาสินค้าที่ตรงกับ ID
    const product = allProducts.find((p) => p.id === productId);

    if (!product) {
      mainElement.innerHTML =
        '<div class="container"><p style="color: red; font-size: 1.2rem; text-align: center; padding: 40px;">ไม่พบสินค้า ID: ' +
        productId +
        " ในฐานข้อมูล</p></div>";
      return;
    }

    // 4. อัปเดตข้อมูลในหน้า (ใช้ ID ที่เรากำหนดไว้ใน HTML)

    // ตั้งค่า Title ของหน้าเว็บ
    document.title = `${product.name} - 789 TOOLS`;

    // Breadcrumbs
    const breadcrumbName = document.querySelector(".breadcrumbs span");
    if (breadcrumbName) breadcrumbName.textContent = product.name;

    // Gallery
    const mainImage = document.getElementById("main-image");
    if (mainImage) mainImage.src = product.image;
    const thumbnailList = document.querySelector(".thumbnail-list");
    if (thumbnailList) {
      thumbnailList.innerHTML = product.thumbnails
        .map((thumb, index) => createThumbnail(thumb, index, product.image))
        .join("");
    }

    // Product Info
    document.getElementById("product-title").textContent = product.name;

    // ⚔️ (ภารกิจข้อ 1) ⚔️: อัปเดตดาวและรีวิว
    document.getElementById("product-rating-stars").innerHTML =
      createStarRating(product.rating);
    document.getElementById(
      "product-rating-value"
    ).textContent = `(${product.rating})`;
    document.getElementById(
      "reviews-link"
    ).textContent = `${product.review_count} รีวิว`;

    document.getElementById("price-sale").textContent = `฿${product.price}`;

    const priceOriginalEl = document.getElementById("price-original");
    const saleTagEl = document.getElementById("sale-tag");

    if (product.original_price) {
      priceOriginalEl.textContent = `฿${product.original_price}`;
      saleTagEl.textContent = product.sale_tag;
      priceOriginalEl.style.display = "inline";
      saleTagEl.style.display = "inline-block";
    } else {
      priceOriginalEl.style.display = "none";
      saleTagEl.style.display = "none";
    }

    document.getElementById(
      "product-status"
    ).innerHTML = `<i class="fa-solid fa-check-circle"></i> ${product.status}`;

    document.getElementById("product-features-list").innerHTML =
      product.features.map((feature) => `<li>${feature}</li>`).join("");

    // Tabs
    // ⚔️ (ภารกิจข้อ 3) ⚔️: อัปเดตแท็บรายละเอียด
    document.getElementById("tab-description").innerHTML =
      createDescriptionContent(product);

    // ⚔️ (ภารกิจข้อ 4) ⚔️: (ตรวจสอบแล้ว - โค้ดเดิมทำงานถูกต้อง)
    document.getElementById("specs-table-body").innerHTML = createSpecsTable(
      product.specs
    );
    document.getElementById("in-the-box-list").innerHTML = product.in_the_box
      .map((item) => `<li>${item}</li>`)
      .join("");

    // ⚔️ (ภารกิจข้อ 5) ⚔️: อัปเดตแท็บรีวิว
    document.getElementById(
      "reviews-tab"
    ).textContent = `รีวิว (${product.review_count})`;
    const reviewsListEl = document.getElementById("reviews-list");
    if (product.reviews && product.reviews.length > 0) {
      reviewsListEl.innerHTML = product.reviews.map(createReviewItem).join("");
    } else {
      reviewsListEl.innerHTML = "<p>ยังไม่มีรีวิวสำหรับสินค้านี้</p>";
    }

    // Related Products
    const relatedGrid = document.getElementById("related-products-grid");
    if (relatedGrid) {
      const relatedProductsHtml = product.related_ids
        .map((relatedId) => {
          const relatedProd = allProducts.find((p) => p.id === relatedId);
          return createRelatedProductCard(relatedProd);
        })
        .join("");
      relatedGrid.innerHTML = relatedProductsHtml;
    }

    // 5. เพิ่ม Event Listeners (หลังสร้าง HTML เสร็จ)
    const thumbnailItems = document.querySelectorAll(".thumbnail-item");
    thumbnailItems.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        if (mainImage) mainImage.src = thumb.dataset.src;
        thumbnailItems.forEach((item) => item.classList.remove("active"));
        thumb.classList.add("active");
      });
    });

    // ⚔️ (เพิ่ม) ⚔️: สั่งให้ระบบแท็บทำงาน
    initializeTabs();
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการโหลดข้อมูลสินค้า:", error);
    mainElement.innerHTML =
      '<div class="container"><p style="color: red; font-size: 1.2rem; text-align: center; padding: 40px;">เกิดข้อผิดพลาด: ' +
      error.message +
      "</p></div>";
  }
}

// สั่งให้แม่ทัพทำงานเมื่อเอกสารพร้อม
document.addEventListener("DOMContentLoaded", loadProductDetails);
