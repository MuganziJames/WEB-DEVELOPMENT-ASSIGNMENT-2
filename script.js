document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".menu-icon");
  const mobileMenu = document.getElementById("mobileMenu");
  const themeToggles = document.querySelectorAll(".theme-toggle");

  // 1) Hamburger opens/closes the mobile menu
  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle("active");
  });

  // 2) If you resize out of mobile view, always close it
  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      mobileMenu.classList.remove("active");
    }
  });

  // 3) Theme (moon/sun) toggle
  themeToggles.forEach((toggle) =>
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      document.body.classList.toggle("dark-mode");
      toggle.classList.toggle("fa-moon");
      toggle.classList.toggle("fa-sun");
    })
  );

  // 4) Click anywhere else to close the menu
  document.addEventListener("click", (e) => {
    if (
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(e.target) &&
      !menuIcon.contains(e.target)
    ) {
      mobileMenu.classList.remove("active");
    }
  });
});

(() => {
  const KEY = "ui-theme";
  const body = document.body;
  const btn = document.querySelector(".theme-toggle");

  const apply = (mode) => {
    body.classList.toggle("dark", mode === "dark");
    btn.classList.toggle("fa-sun", mode === "dark");
    btn.classList.toggle("fa-moon", mode !== "dark");
  };

  // 1. initial
  const saved = localStorage.getItem(KEY) || "light";
  apply(saved);

  // 2. toggle on click
  btn?.addEventListener("click", () => {
    const next = body.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem(KEY, next);
    apply(next);
  });
})();
