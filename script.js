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
