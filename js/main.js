(function () {
  const cfg = typeof KATZEMIEL_CONFIG !== "undefined" ? KATZEMIEL_CONFIG : {};
  const waMsg = encodeURIComponent("Hola Katzemiel, quiero consultar por miel 🍯");
  const instagramUrl = cfg.instagram || "https://www.instagram.com/katzemieldemonte/";

  function applyConfig() {
    const locationsList = document.getElementById("locations-list");
    if (locationsList && cfg.locations) {
      locationsList.innerHTML = cfg.locations
        .map((loc) => {
          const waHref = loc.phone
            ? `https://wa.me/${loc.phone}?text=${waMsg}`
            : null;
          return `
            <li class="location-card${loc.whatsapp ? "" : " location-soon"}">
              <div class="location-city">
                <strong>${loc.city}</strong>
                <span>${loc.region}</span>
              </div>
              ${
                waHref
                  ? `<a href="${waHref}" class="btn btn-small" target="_blank" rel="noopener noreferrer">WhatsApp ${loc.phoneDisplay} (ejemplo)</a>`
                  : `<span class="location-badge">${loc.phoneDisplay}</span>`
              }
            </li>`;
        })
        .join("");
    }

    const addressEl = document.getElementById("address-display");
    if (addressEl && cfg.address) addressEl.textContent = cfg.address;

    const originEl = document.getElementById("origin-display");
    if (originEl && cfg.origin) originEl.textContent = cfg.origin;
  }

  function initNav() {
    const header = document.querySelector(".site-header");
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav");

    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 20);
    });

    toggle?.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav?.classList.toggle("open", !open);
    });

    nav?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle?.setAttribute("aria-expanded", "false");
        nav?.classList.remove("open");
      });
    });
  }

  function initReveal() {
    const els = document.querySelectorAll(
      ".reveal-target, .about-copy, .about-images, .product-card, .story-item, .timeline li, .benefits-copy, .benefits-list, .quality-block, .location-card, .gallery-item, .contact-info"
    );
    els.forEach((el) => el.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    els.forEach((el) => observer.observe(el));
  }

  function initForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const nombre = data.get("nombre");
      const email = data.get("email");
      const mensaje = data.get("mensaje");
      window.open(instagramUrl, "_blank");
    });
  }

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  applyConfig();
  initNav();
  initReveal();
  initForm();
})();
