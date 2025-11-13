// assets/js/modules/faq-loader.js

async function loadFaq() {
  const accordionContainer = document.querySelector(".faq-accordion");
  if (!accordionContainer) return;

  try {
    const response = await fetch("data/faq.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const faqs = await response.json();

    const faqHtml = faqs
      .map(
        (faq) => `
            <div class="faq-item">
                <div class="faq-question">
                    <span>${faq.question}</span>
                    <div class="faq-icon"></div>
                </div>
                <div class="faq-answer">
                    <p>${faq.answer}</p>
                </div>
            </div>
        `
      )
      .join("");

    accordionContainer.innerHTML = faqHtml;

    // After inserting HTML, add event listeners
    const questions = accordionContainer.querySelectorAll(".faq-question");
    questions.forEach((question) => {
      question.addEventListener("click", () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle("active");
      });
    });
  } catch (error) {
    console.error("Could not fetch or load FAQ data:", error);
    accordionContainer.innerHTML =
      "<p>ขออภัย ไม่สามารถโหลดคำถามที่พบบ่อยได้</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadFaq);
