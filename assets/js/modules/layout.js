// assets/js/modules/layout.js

// This function fetches an HTML file and injects it into a target element
const loadComponent = (url, targetId) => {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(targetId).innerHTML = data;
    })
    .catch((error) => console.error(`Error loading ${url}:`, error));
};

// Load Header and Footer into their placeholders
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("components/header.html", "header-placeholder");
  // loadComponent('components/footer.html', 'footer-placeholder'); // We will use this later
});
