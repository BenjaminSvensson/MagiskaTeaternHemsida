import * as THREE from "three";

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
  const frames = [...document.querySelectorAll("[data-parallax-frame]")];
  if (!frames.length || prefersReducedMotion) return;

  const update = () => {
    const viewport = window.innerHeight || 1;
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
  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".event-card");

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      filters.forEach((item) => item.classList.remove("active"));
      filter.classList.add("active");

      const selected = filter.dataset.filter;
      cards.forEach((card) => {
        const categories = card.dataset.category?.split(" ") ?? [];
        card.classList.toggle("is-hidden", selected !== "alla" && !categories.includes(selected));
      });
    });
  });
}

function setupFormsAndActions() {
  document.querySelectorAll("button.event-action").forEach((button) => {
    button.addEventListener("click", () => {
      showToast(`${button.dataset.action}: kopplas till det riktiga flödet i nästa steg.`);
    });
  });

  document.querySelector("[data-contact-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = form.querySelector(".form-status");
    const data = new FormData(form);
    const type = data.get("type");
    status.textContent = `Tack! Förfrågan om ${String(type).toLowerCase()} är redo att skickas vidare.`;
    showToast("Förfrågan sparad i prototypen.");
    form.reset();
  });
}

function createRoundedTexture(url, width = 1024, height = 680) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      const radius = 72;

      context.beginPath();
      context.moveTo(radius, 0);
      context.arcTo(width, 0, width, height, radius);
      context.arcTo(width, height, 0, height, radius);
      context.arcTo(0, height, 0, 0, radius);
      context.arcTo(0, 0, width, 0, radius);
      context.closePath();
      context.clip();

      const imageRatio = image.width / image.height;
      const canvasRatio = width / height;
      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (imageRatio > canvasRatio) {
        drawWidth = height * imageRatio;
        offsetX = (width - drawWidth) / 2;
      } else {
        drawHeight = width / imageRatio;
        offsetY = (height - drawHeight) / 2;
      }

      context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(239, 228, 255, 0.32)");
      gradient.addColorStop(0.52, "rgba(255, 253, 247, 0)");
      gradient.addColorStop(1, "rgba(56, 16, 77, 0.32)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
      resolve(texture);
    };
    image.onerror = reject;
    image.src = url;
  });
}

async function setupHeroScene() {
  const canvas = document.getElementById("hero-canvas");
  const stage = document.querySelector(".hero-stage");
  if (!canvas || !stage) return;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    preserveDrawingBuffer: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 7.8);

  const group = new THREE.Group();
  scene.add(group);

  const mainTexture = await createRoundedTexture("/mockup-assets/teaterniregn.jpg", 1200, 820);
  const roomTexture = await createRoundedTexture("/mockup-assets/lokalen-fran-scenen.jpg", 760, 520);
  const propTexture = await createRoundedTexture("/mockup-assets/rekvisita.jpg", 760, 520);

  const main = new THREE.Mesh(
    new THREE.PlaneGeometry(6.6, 4.5, 16, 16),
    new THREE.MeshBasicMaterial({ map: mainTexture, transparent: true }),
  );
  main.position.set(0.08, -0.05, 0);
  group.add(main);

  const room = new THREE.Mesh(
    new THREE.PlaneGeometry(2.05, 1.42),
    new THREE.MeshBasicMaterial({ map: roomTexture, transparent: true }),
  );
  room.position.set(-2.18, -1.55, 0.72);
  room.rotation.z = -0.045;
  group.add(room);

  const props = new THREE.Mesh(
    new THREE.PlaneGeometry(1.62, 1.12),
    new THREE.MeshBasicMaterial({ map: propTexture, transparent: true }),
  );
  props.position.set(2.42, 1.22, 0.86);
  props.rotation.z = 0.075;
  group.add(props);

  const sparkleGeometry = new THREE.BufferGeometry();
  const sparkleCount = 54;
  const positions = new Float32Array(sparkleCount * 3);
  for (let i = 0; i < sparkleCount; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 7.3;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 4.8;
    positions[i * 3 + 2] = 0.95 + Math.random() * 0.9;
  }
  sparkleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const sparkles = new THREE.Points(
    sparkleGeometry,
    new THREE.PointsMaterial({
      color: 0xffd36b,
      size: 0.045,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
    }),
  );
  group.add(sparkles);

  const purpleGlow = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.82, 0.018, 128, 8),
    new THREE.MeshBasicMaterial({
      color: 0xa66cff,
      transparent: true,
      opacity: 0.42,
    }),
  );
  purpleGlow.position.set(2.42, -1.45, 1.12);
  purpleGlow.rotation.set(0.9, 0.3, 0.2);
  group.add(purpleGlow);

  const pointer = { x: 0, y: 0 };
  stage.addEventListener("pointermove", (event) => {
    const rect = stage.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    document.querySelector(".hero")?.style.setProperty("--mx", `${pointer.x * 22}px`);
    document.querySelector(".hero")?.style.setProperty("--my", `${pointer.y * 18}px`);
  });

  stage.addEventListener("pointerleave", () => {
    pointer.x = 0;
    pointer.y = 0;
    document.querySelector(".hero")?.style.setProperty("--mx", "0px");
    document.querySelector(".hero")?.style.setProperty("--my", "0px");
  });

  const resize = () => {
    const { width, height } = stage.getBoundingClientRect();
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener("resize", resize);

  const clock = new THREE.Clock();
  const render = () => {
    const time = clock.getElapsedTime();
    group.rotation.y += (pointer.x * 0.08 - group.rotation.y) * 0.045;
    group.rotation.x += (pointer.y * -0.055 - group.rotation.x) * 0.045;

    room.position.y = -1.55 + Math.sin(time * 0.9) * 0.035;
    props.position.y = 1.22 + Math.cos(time * 0.75) * 0.04;
    purpleGlow.rotation.x += 0.004;
    purpleGlow.rotation.z -= 0.003;
    sparkles.rotation.z = Math.sin(time * 0.18) * 0.04;
    sparkles.material.opacity = 0.58 + Math.sin(time * 1.8) * 0.16;

    renderer.render(scene, camera);
    window.__heroCanvasFrames = (window.__heroCanvasFrames || 0) + 1;
    if (!prefersReducedMotion) {
      requestAnimationFrame(render);
    }
  };
  render();
}

setupHeader();
setupReveals();
setupTiltCards();
setupParallaxFrames();
setupFilters();
setupFormsAndActions();
setupHeroScene().catch(() => {
  document.querySelector(".hero-stage")?.classList.add("is-fallback");
});
