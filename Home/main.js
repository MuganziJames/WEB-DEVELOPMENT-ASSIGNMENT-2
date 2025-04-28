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
document.addEventListener("DOMContentLoaded", function () {
  // Get the clients section container
  const clientsSection = document.querySelector(".clients-section");

  if (!clientsSection) return; // Exit if section not found

  // Create a wrapper for the logos if it doesn't exist
  let clientTrack = clientsSection.querySelector(".client-track");

  if (!clientTrack) {
    clientTrack = document.createElement("div");
    clientTrack.className = "client-track";

    // Move all client logos to the wrapper
    const logos = Array.from(clientsSection.querySelectorAll(".client-logo"));

    if (logos.length > 0) {
      // If logos exist directly in the section, move them to the track
      logos.forEach((logo) => {
        clientTrack.appendChild(logo);
      });
    } else {
      // Otherwise use the existing content
      clientTrack.innerHTML = clientsSection.innerHTML;
      clientsSection.innerHTML = "";
    }

    // Add the track to the section
    clientsSection.appendChild(clientTrack);
  }

  // Clone the content for seamless scrolling
  const originalContent = clientTrack.innerHTML;
  clientTrack.innerHTML = originalContent + originalContent;

  // Animation variables
  let position = 0;
  const speed = 0.5;

  // Animation function
  function animate() {
    position -= speed;

    // Calculate the reset point based on the first half of content
    const resetPoint = -clientTrack.scrollWidth / 2;

    // Reset position when first set of logos moves out of view
    if (position <= resetPoint) {
      position = 0;
    }

    // Apply the position
    clientTrack.style.transform = `translateX(${position}px)`;

    // Continue animation
    requestAnimationFrame(animate);
  }

  // Start the animation
  animate();
});
document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.querySelector(".stats-section");
  if (!statsSection) return; // safety check

  const counters = statsSection.querySelectorAll(".stat-number");

  /* Store each final value and reset the text to 0 */
  counters.forEach((el) => {
    el.dataset.target = el.textContent.trim(); // remember the goal
    el.textContent = "0"; // start at zero
  });

  /* ---- IntersectionObserver: fire when section is ~40 % visible ---- */
  const observer = new IntersectionObserver(
    (entries, obs) => {
      if (!entries[0].isIntersecting) return;

      // Kick off all counters
      counters.forEach((counter) => animateCounter(counter));

      obs.disconnect(); // run only once
    },
    { threshold: 0.4 }
  );

  observer.observe(statsSection);

  /* ---- The animation itself ---- */
  function animateCounter(el) {
    const target = +el.dataset.target; // number we’re heading to
    const duration = 1500; // total time (ms)
    const step = Math.ceil(target / (duration / 16)); // 60 fps-ish

    const update = () => {
      const current = +el.textContent.replace(/,/g, "");
      if (current < target) {
        el.textContent = Math.min(current + step, target).toLocaleString();
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString(); // guarantee exact target
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
