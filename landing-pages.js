const VEIC_WHATSAPP_NUMBER = "5531983335876";
const LANDING_PAGE_SERVICE = "landing_pages_sites";

const whatsappLinks = document.querySelectorAll(".js-lp-whatsapp");
const trackedLinks = document.querySelectorAll("[data-lp-cta]");
const revealItems = document.querySelectorAll(".lp-reveal");

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
  const message = link.dataset.whatsappMessage || "Olá, Veic Vídeos! Tenho interesse em uma landing page ou site profissional para minha empresa.";
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
