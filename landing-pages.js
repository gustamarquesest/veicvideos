const VEIC_WHATSAPP_NUMBER = "5531983335876";
const LANDING_PAGE_SERVICE = "landing_pages_sites";

// Preencha os links quando os vídeos reais forem definidos.
const LANDING_VIDEO_LINKS = {
  principal: "",
  case01: "",
  case02: "",
  case03: "",
  case04: "",
  case05: "",
};

const whatsappLinks = document.querySelectorAll(".js-lp-whatsapp");
const trackedLinks = document.querySelectorAll("[data-lp-cta]");
const videoLinks = document.querySelectorAll(".js-lp-video-link");
const revealItems = document.querySelectorAll(".lp-reveal");
const hero = document.querySelector(".lpn-hero");

function buildWhatsAppUrl(message) {
  return `https://wa.me/${VEIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function pushLandingEvent(eventName, element) {
  window.dataLayer = window.dataLayer || [];
  const destinationUrl = element.href || "";

  window.dataLayer.push({
    event: eventName,
    page_path: window.location.pathname,
    button_text: element.textContent.trim(),
    section_name: element.dataset.sectionName || element.closest("[data-section]")?.dataset.section || "",
    destination_url: destinationUrl,
    service_interest: LANDING_PAGE_SERVICE,
  });
}

whatsappLinks.forEach((link) => {
  const message = link.dataset.whatsappMessage || "Olá, Veic Vídeos! Tenho interesse em criar uma landing page ou site com vídeo para minha empresa.";
  link.href = buildWhatsAppUrl(message);
});

trackedLinks.forEach((link) => {
  link.addEventListener("click", () => {
    pushLandingEvent("click_cta_landing_pages", link);

    if (link.classList.contains("js-lp-whatsapp")) {
      pushLandingEvent("lead_whatsapp_landing_pages", link);
    }
  });
});

videoLinks.forEach((link) => {
  const key = link.dataset.videoKey;
  const destination = LANDING_VIDEO_LINKS[key] || "";

  if (destination) {
    link.href = destination;
    link.target = "_blank";
    link.rel = "noopener";
    return;
  }

  link.setAttribute("aria-disabled", "true");
  link.addEventListener("click", (event) => event.preventDefault());
});

if (hero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    hero.style.setProperty("--pointer-x", x.toFixed(2));
    hero.style.setProperty("--pointer-y", y.toFixed(2));
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
