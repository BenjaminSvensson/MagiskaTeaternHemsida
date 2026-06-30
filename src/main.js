import {setupCmsContent} from "./cms.js";

const historyHotelUrl = new URL("../mockup-assets/historik-hotellet.jpg", import.meta.url).href;
const historyFireUrl = new URL("../mockup-assets/historik-brand.jpg", import.meta.url).href;
const historyCinemaUrl = new URL("../mockup-assets/historik-biografen.jpg", import.meta.url).href;
const historyRenovationUrl = new URL("../mockup-assets/historik-renovering.jpg", import.meta.url).href;

const imageCycles = {
  history: [
    {src: historyHotelUrl, alt: "Vretstorps hotell innan branden"},
    {src: historyFireUrl, alt: "Hotellet brann ner 1923"},
    {src: historyCinemaUrl, alt: "Tidningsurklipp fr\u00e5n Vretstorps biografteater"},
    {src: historyRenovationUrl, alt: "Renovering av Magiska Teatern"},
  ],
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const toast = document.querySelector("[data-toast]");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

function setupHeader() {
  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 18);
  update();
  window.addEventListener("scroll", update, { passive: true });

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navMenu.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navMenu?.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuToggle?.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    }
  });
}

function setupRouter() {
  const pages = [...document.querySelectorAll("[data-page]")];
  const routeLinks = [...document.querySelectorAll("[data-route-link]")];
  const routeTitles = {
    hem: "Magiska Teatern | D\u00e4r dr\u00f6mmar blir v\u00e4rklighet",
    evenemang: "Evenemang & kurser | Magiska Teatern",
    huset: "Huset | Magiska Teatern",
    hyra: "Hyr & event | Magiska Teatern",
    engagera: "Engagera dig | Magiska Teatern",
    hitta: "Hitta hit | Magiska Teatern",
  };

  const getRouteParts = () => {
    const [route = "", target = ""] = window.location.hash.replace(/^#\/?/, "").split("/");
    return {route, target};
  };

  const normalizeRoute = (raw = getRouteParts().route) => {
    if (raw === "kontakt" || raw === "grupper" || raw === "evenemang") return "evenemang";
    if (raw === "hyr") return "hyra";
    if (!raw) return "hem";
    return pages.some((page) => page.dataset.page === raw) ? raw : "hem";
  };

  const renderRoute = () => {
    const {route: rawRoute, target} = getRouteParts();
    const route = normalizeRoute(rawRoute);
    const targetId = rawRoute === "kontakt" ? "kontakt" : route === "evenemang" && target === "nasta" ? "next-event" : null;
    pages.forEach((page) => {
      const isActive = page.dataset.page === route;
      page.classList.toggle("is-active", isActive);
      page.toggleAttribute("hidden", !isActive);
    });
    routeLinks.forEach((link) => {
      const isActive = link.dataset.routeLink === route;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
    document.title = routeTitles[route] || routeTitles.hem;
    requestAnimationFrame(() => {
      const target = targetId ? document.getElementById(targetId) : null;
      if (target) {
        if (targetId === "next-event") {
          document.querySelectorAll(".filter").forEach((filter) => filter.classList.toggle("active", filter.dataset.filter === "alla"));
          document.querySelectorAll(".event-card").forEach((card) => card.classList.remove("is-hidden"));
        }
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  };

  window.addEventListener("hashchange", renderRoute);
  renderRoute();
}

function setupReveals() {
  const revealItems = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 5, 4) * 65}ms`;
    observer.observe(item);
  });
}

function setupTiltCards() {
  if (prefersReducedMotion) return;

  document.querySelectorAll("[data-tilt-card]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tilt-x", `${x * 5.5}deg`);
      card.style.setProperty("--tilt-y", `${y * -5.5}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
}

function setupParallaxFrames() {
  if (prefersReducedMotion) return;

  const update = () => {
    const viewport = window.innerHeight || 1;
    const frames = [...document.querySelectorAll("[data-parallax-frame]")];
    frames.forEach((frame) => {
      const image = frame.querySelector("img");
      if (!image) return;
      const rect = frame.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      const shift = Math.max(-1, Math.min(1, progress)) * -13;
      image.style.setProperty("--parallax-y", `${shift - 6}%`);
    });
  };

  update();
  window.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
  window.addEventListener("resize", update);
}

function setupFilters() {
  document.querySelectorAll(".events").forEach((section) => {
    const filters = section.querySelectorAll(".filter");

    filters.forEach((filter) => {
      filter.addEventListener("click", () => {
        const cards = section.querySelectorAll(".event-card");
        filters.forEach((item) => item.classList.remove("active"));
        filter.classList.add("active");

        const selected = filter.dataset.filter;
        cards.forEach((card) => {
          const categories = card.dataset.category?.split(" ") ?? [];
          card.classList.toggle("is-hidden", selected !== "alla" && !categories.includes(selected));
        });
      });
    });
  });
}

function setupFormsAndActions() {
  document.querySelectorAll("button.event-action").forEach((button) => {
    button.addEventListener("click", () => {
      showToast(`${button.dataset.action}: kopplas till det riktiga fl\u00f6det i n\u00e4sta steg.`);
    });
  });

  document.querySelectorAll("[data-contact-form]").forEach((contactForm) => {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const status = form.querySelector(".form-status");
      const data = new FormData(form);
      const type = String(data.get("type") || "Kontakt").trim();
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const message = String(data.get("message") || "").trim();
      const recipient = form.dataset.contactEmail || "emma@magiskateatern.se";
      const subject = `Magiska Teatern: ${type}`;
      const body = [
        `Arende: ${type}`,
        `Namn: ${name}`,
        `E-post: ${email}`,
        "",
        message || "Meddelande:",
      ].join("\n");
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = `Din f\u00f6rfr\u00e5gan om ${type.toLowerCase()} har flyttats till ditt mejlprogram.`;
      showToast("Mejlf\u00f6rslag \u00f6ppnat.");
      form.reset();
    });
  });
}

function setupImageCycles() {
  document.querySelectorAll("[data-image-cycle]").forEach((frame) => {
    const images = imageCycles[frame.dataset.imageCycle] || [];
    const image = frame.querySelector("img");
    if (!image || images.length < 2) return;

    images.forEach(({src}) => {
      const preload = new Image();
      preload.src = src;
    });

    let index = 0;
    const swapImage = () => {
      index = (index + 1) % images.length;
      frame.classList.add("is-swapping");
      window.setTimeout(() => {
        image.src = images[index].src;
        image.alt = images[index].alt;
        frame.classList.remove("is-swapping");
      }, 220);
    };

    if (!prefersReducedMotion) {
      window.setInterval(swapImage, 4800);
    }
  });
}

setupHeader();
setupReveals();
setupTiltCards();
setupParallaxFrames();
setupImageCycles();
setupFilters();
setupFormsAndActions();
setupCmsContent();
setupRouter();
