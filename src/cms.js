const fallbackEventImageUrl = new URL("../mockup-assets/event-affisch.png", import.meta.url).href;
const fallbackRoomImageUrl = new URL("../mockup-assets/lokalen-fran-scenen.jpg", import.meta.url).href;

const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID?.trim();
const DATASET = import.meta.env.VITE_SANITY_DATASET?.trim() || "production";
const API_VERSION = import.meta.env.VITE_SANITY_API_VERSION?.trim() || "2026-06-30";

const isCmsConfigured = Boolean(PROJECT_ID && PROJECT_ID !== "your-project-id");

const formatDate = (value) => {
  if (!value) return "";
  return new Intl.DateTimeFormat("sv-SE", {day: "numeric", month: "short"}).format(new Date(value));
};

const formatTime = (value) => {
  if (!value) return "";
  return new Intl.DateTimeFormat("sv-SE", {hour: "2-digit", minute: "2-digit"}).format(new Date(value));
};

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const safeUrl = (value) => {
  if (!value) return "";
  try {
    const url = new URL(value, window.location.href);
    return ["http:", "https:", "mailto:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
};

const imageUrl = (image, fallback = fallbackEventImageUrl) => image?.asset?.url || fallback;
const nextEventPath = "#/evenemang/nasta";

const slugify = (value = "") =>
  String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const eventDomId = (event) => `event-${slugify(event.slug || event._id || event.title || "kommande")}`;

const eventTimestamp = (event) => {
  const time = Date.parse(event?.startDateTime || "");
  return Number.isFinite(time) ? time : Number.POSITIVE_INFINITY;
};

const upcomingEvents = (events = []) => {
  const now = Date.now();
  return [...events]
    .filter((event) => {
      const displayUntil = Date.parse(event.endDateTime || event.startDateTime || "");
      return !Number.isFinite(displayUntil) || displayUntil >= now;
    })
    .sort((a, b) => eventTimestamp(a) - eventTimestamp(b));
};

const toPlainText = (blocks) => {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .flatMap((block) => block.children || [])
    .map((child) => child.text || "")
    .join(" ")
    .trim();
};

async function fetchSanityContent() {
  if (!isCmsConfigured) return null;

  const now = new Date().toISOString();
  const query = `{
    "settings": *[_type == "siteSettings"][0]{
      siteTitle,
      noticeBar,
      tagline,
      heroTitle,
      heroText,
      heroImage{asset->{url}, alt},
      address,
      contactEmail,
      seoDescription
    },
    "events": *[
      _type == "event" &&
      isPublished == true &&
      coalesce(endDateTime, startDateTime) >= "${now}"
    ] | order(startDateTime asc) {
      _id,
      title,
      "slug": slug.current,
      summary,
      description,
      startDateTime,
      endDateTime,
      price,
      location,
      category,
      featured,
      ctaLabel,
      ctaUrl,
      image{asset->{url}, alt}
    }
  }`;

  const endpoint = `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`;
  const response = await fetch(endpoint, {headers: {Accept: "application/json"}});
  if (!response.ok) {
    throw new Error(`Sanity read failed: ${response.status}`);
  }

  const payload = await response.json();
  return payload.result;
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element && value) element.textContent = value;
}

function applySettings(settings) {
  if (!settings) return;

  setText(".notice-bar", settings.noticeBar);
  setText(".hero-copy .eyebrow", settings.tagline);
  setText("#hero-title", settings.heroTitle);
  setText(".hero-lede", settings.heroText);

  if (settings.heroImage?.asset?.url) {
    const heroImage = document.querySelector(".hero-fallback");
    if (heroImage) {
      heroImage.src = settings.heroImage.asset.url;
      heroImage.alt = settings.heroImage.alt || "";
    }
  }

  const address = settings.address;
  if (address?.street) {
    setText(".address-card strong", address.street);
    setText(".address-card p", [address.postalCode, address.city].filter(Boolean).join(" "));
    document.querySelectorAll(".meta").forEach((meta) => {
      if (meta.querySelector("b")?.textContent?.toLowerCase() === "plats") {
        meta.querySelector("span").textContent = address.street;
      }
    });

    const mapFrame = document.querySelector(".map-frame iframe");
    if (mapFrame) {
      const mapAddress = [address.street, address.postalCode, address.city].filter(Boolean).join(", ");
      mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(mapAddress)}&output=embed`;
      mapFrame.title = `Google Maps: ${mapAddress}`;
    }
  }

  if (settings.seoDescription) {
    document.querySelector('meta[name="description"]')?.setAttribute("content", settings.seoDescription);
  }
}

function eventLabel(event) {
  const date = formatDate(event.startDateTime);
  const time = formatTime(event.startDateTime);
  return [date, time && `kl ${time}`].filter(Boolean).join(" ");
}

function renderEventCard(event, index = 0) {
  const date = formatDate(event.startDateTime);
  const time = formatTime(event.startDateTime);
  const image = imageUrl(event.image);
  const alt = event.image?.alt || event.title || "Evenemangsbild";
  const url = safeUrl(event.ctaUrl);
  const ctaLabel = event.ctaLabel || "L\u00e4s mer";
  const description = event.summary || toPlainText(event.description);
  const category = event.category || "biljetter";
  const target = url.startsWith(window.location.origin) || url.startsWith("mailto:") ? "" : ' target="_blank" rel="noreferrer"';
  const isNext = index === 0;
  const id = isNext ? "next-event" : eventDomId(event);

  return `
    <article class="event-card reveal is-visible${isNext ? " is-next-event" : ""}" id="${escapeHtml(id)}" data-category="${escapeHtml(category)}">
      <div class="event-image" data-parallax-frame>
        <img src="${escapeHtml(image)}" alt="${escapeHtml(alt)}" />
      </div>
      <div class="event-body">
        <p class="micro">${isNext ? "N\u00e4sta p\u00e5 scen" : "Kommande"}</p>
        <h3>${escapeHtml(event.title)}</h3>
        <p>${escapeHtml(description)}</p>
        <div class="chips">
          ${date ? `<span>${escapeHtml(date)}</span>` : ""}
          ${time ? `<span>${escapeHtml(time)}</span>` : ""}
          <span>${escapeHtml(ctaLabel)}</span>
        </div>
      </div>
      ${url ? `<a class="button primary" href="${escapeHtml(url)}"${target}>${escapeHtml(ctaLabel)}</a>` : ""}
    </article>
  `;
}

function renderEvents(events = []) {
  const eventList = document.querySelector(".event-list");
  const sortedEvents = upcomingEvents(events);
  if (!eventList || !sortedEvents.length) return;

  eventList.innerHTML = sortedEvents.map(renderEventCard).join("");
  updateFeaturedEvent(sortedEvents);
  scrollToNextEventIfRequested();
}

function updateFeaturedEvent(events) {
  const nextEvent = upcomingEvents(events)[0];
  if (!nextEvent) return;

  const label = eventLabel(nextEvent);
  const description = nextEvent.summary || toPlainText(nextEvent.description);
  setText(".stage-label strong", `${nextEvent.title}${label ? ` ${label}` : ""}`);
  setText(".home-feature .feature-panel h2", nextEvent.title);

  const featureText = document.querySelector(".home-feature .feature-panel > p:not(.eyebrow)");
  if (featureText && description) {
    featureText.textContent = description;
  }

  document.querySelectorAll("[data-next-event-link]").forEach((link) => {
    link.setAttribute("href", nextEventPath);
    link.setAttribute("aria-label", `G\u00e5 till ${nextEvent.title} i evenemangslistan`);
  });

  const primaryHomeLink = document.querySelector(".home-feature .button.primary");
  if (primaryHomeLink) primaryHomeLink.textContent = "Till evenemanget";

  const poster = document.querySelector(".poster-stack img");
  if (poster) {
    poster.src = imageUrl(nextEvent.image, fallbackRoomImageUrl);
    poster.alt = nextEvent.image?.alt || nextEvent.title;
  }

  const metaValues = [
    ["Tid", label || "Datum kommer snart"],
    ["Plats", nextEvent.location || "Askersundsv\u00e4gen 32"],
    ["Pris", nextEvent.price || "Se evenemangsinfo"],
  ];

  document.querySelectorAll(".home-feature .meta").forEach((meta, index) => {
    const value = metaValues[index];
    if (!value) return;
    const [labelText, text] = value;
    meta.querySelector("b").textContent = labelText;
    meta.querySelector("span").textContent = text;
  });
}

function scrollToNextEventIfRequested() {
  const targetRequested = window.location.hash.replace(/^#\/?/, "") === "evenemang/nasta";
  if (!targetRequested) return;
  requestAnimationFrame(() => {
    document.getElementById("next-event")?.scrollIntoView({behavior: "smooth", block: "start"});
  });
}

export async function setupCmsContent() {
  try {
    const content = await fetchSanityContent();
    if (!content) return;
    applySettings(content.settings);
    renderEvents(content.events || []);
    document.documentElement.dataset.cms = "sanity";
  } catch (error) {
    console.warn("CMS content unavailable, using static fallback.", error);
  }
}
