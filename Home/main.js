document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".menu-icon");
  const mobileMenu = document.getElementById("mobileMenu");
  const themeToggles = document.querySelectorAll(".theme-toggle");

  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle("active");
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      mobileMenu.classList.remove("active");
    }
  });

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
document.addEventListener("DOMContentLoaded", function () {
  const clientsSection = document.querySelector(".clients-section");

  if (!clientsSection) return;
  let clientTrack = clientsSection.querySelector(".client-track");

  if (!clientTrack) {
    clientTrack = document.createElement("div");
    clientTrack.className = "client-track";

    const logos = Array.from(clientsSection.querySelectorAll(".client-logo"));

    if (logos.length > 0) {
      logos.forEach((logo) => {
        clientTrack.appendChild(logo);
      });
    } else {
      clientTrack.innerHTML = clientsSection.innerHTML;
      clientsSection.innerHTML = "";
    }

    clientsSection.appendChild(clientTrack);
  }

  const originalContent = clientTrack.innerHTML;
  clientTrack.innerHTML = originalContent + originalContent;

  let position = 0;
  const speed = 0.5;

  function animate() {
    position -= speed;

    const resetPoint = -clientTrack.scrollWidth / 2;

    if (position <= resetPoint) {
      position = 0;
    }

    clientTrack.style.transform = `translateX(${position}px)`;

    requestAnimationFrame(animate);
  }

  animate();
});
document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.querySelector(".stats-section");
  if (!statsSection) return;

  const counters = statsSection.querySelectorAll(".stat-number");

  counters.forEach((el) => {
    el.dataset.target = el.textContent.trim();
    el.textContent = "0";
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      if (!entries[0].isIntersecting) return;

      counters.forEach((counter) => animateCounter(counter));

      obs.disconnect();
    },
    { threshold: 0.4 }
  );

  observer.observe(statsSection);

  function animateCounter(el) {
    const target = +el.dataset.target;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));

    const update = () => {
      const current = +el.textContent.replace(/,/g, "");
      if (current < target) {
        el.textContent = Math.min(current + step, target).toLocaleString();
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString();
      }
    };
    update();
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("hero-title");
  const words = ["web designer", "web developer", "Photograph"];
  let w = 0,
    i = 0,
    del = false;

  const tick = () => {
    el.textContent = words[w].slice(0, i);
    if (!del && i === words[w].length) {
      setTimeout(() => {
        del = true;
        tick();
      }, 1200);
      return;
    }
    if (del && i === 0) {
      del = false;
      w = (w + 1) % words.length;
    }
    i += del ? -1 : 1;
    setTimeout(tick, del ? 40 : 100);
  };
  tick();
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
