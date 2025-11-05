// assets/js/modules/layout.js

// This function initializes the mobile menu functionality (hamburger menu)
const initializeMobileMenu = () => {
  const hamburger = document.querySelector(".hamburger-menu");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  if (!hamburger || !navLinks) return;

  // Enhance accessibility attributes
  if (!navLinks.id) navLinks.id = "primary-navigation";
  hamburger.setAttribute("aria-controls", navLinks.id);
  hamburger.setAttribute("aria-expanded", "false");

  const closeMenu = () => {
    navLinks.classList.remove("active");
    body.classList.remove("menu-open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
  };

  const openMenu = () => {
    navLinks.classList.add("active");
    body.classList.add("menu-open");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.innerHTML = '<i class="fa-solid fa-times"></i>';
  };

  const toggleMenu = () => {
    if (navLinks.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  hamburger.addEventListener("click", toggleMenu);

  // Close menu when a link is clicked
  navLinks.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.closest("a")) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Ensure menu resets on resize to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      navLinks.classList.remove("active");
      body.classList.remove("menu-open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
};

// This function fetches an HTML file and injects it into a target element
const loadComponent = (url, targetId) => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.innerHTML = data;

        // If we just loaded the header, initialize the mobile menu
        if (targetId === "header-placeholder") {
          initializeMobileMenu();
        }
      } else {
        console.error(`Error: Target element '${targetId}' not found.`);
      }
    })
    .catch((error) => console.error(`Error loading ${url}:`, error));
};

// Load Header and Footer into their placeholders
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("components/header.html", "header-placeholder");
  // loadComponent('components/footer.html', 'footer-placeholder'); // We will use this later
});
