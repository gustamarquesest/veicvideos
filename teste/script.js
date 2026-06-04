const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");

navToggle.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const filters = document.querySelectorAll(".filter");
const workCards = document.querySelectorAll(".work-card");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");
    const value = filter.dataset.filter;

    workCards.forEach((card) => {
      const shouldShow = value === "all" || card.dataset.category === value;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const moments = {
  descoberta: {
    kicker: "Aparecer para quem ainda não conhece",
    title: "Descoberta",
    desc: "Vídeos curtos para chamar atenção, despertar curiosidade e gerar o primeiro interesse.",
    pills: ["Anúncios", "Reels", "Shorts", "Teasers", "Conteúdo educativo"],
    frame: "Placeholder · Reel / anúncio",
  },
  apresentacao: {
    kicker: "Explicar o que a empresa faz",
    title: "Apresentação",
    desc: "Vídeos para apresentar empresa, produto, serviço e diferenciais com clareza.",
    pills: ["Institucional", "Produto", "Serviço", "Landing page com vídeo", "WhatsApp"],
    frame: "Placeholder · Institucional",
  },
  conversao: {
    kicker: "Reduzir objeções e facilitar decisão",
    title: "Conversão",
    desc: "Produções para apoiar o comercial, gerar confiança e encurtar o caminho até a compra.",
    pills: ["Case de sucesso", "Depoimento", "VSL", "Demo", "Oferta"],
    frame: "Placeholder · Case / VSL",
  },
  cultura: {
    kicker: "Comunicar para equipes",
    title: "Cultura interna",
    desc: "Vídeos para integração, treinamento, processos, segurança e alinhamento interno.",
    pills: ["Treinamento", "Onboarding", "Procedimentos", "Endomarketing", "FAQ em vídeo"],
    frame: "Placeholder · Treinamento",
  },
};

const momentTabs = document.querySelectorAll(".moment-tab");
const momentKicker = document.querySelector("#moment-kicker");
const momentTitle = document.querySelector("#moment-title");
const momentDesc = document.querySelector("#moment-desc");
const momentPills = document.querySelector("#moment-pills");
const momentFrameLabel = document.querySelector("#moment-frame-label");

function renderPills(target, pills) {
  target.innerHTML = pills.map((pill) => `<span>${pill}</span>`).join("");
}

function setMoment(key) {
  const item = moments[key];
  momentKicker.textContent = item.kicker;
  momentTitle.textContent = item.title;
  momentDesc.textContent = item.desc;
  momentFrameLabel.textContent = item.frame;
  renderPills(momentPills, item.pills);
}

momentTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    momentTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    setMoment(tab.dataset.moment);
  });
});

setMoment("descoberta");

const recs = {
  demanda: {
    title: "Anúncios e geração de demanda",
    desc: "Produções para ampliar alcance, atrair novas pessoas e criar oportunidades comerciais com mais consistência.",
    pills: ["Meta Ads", "Google Ads", "Reels", "Campanhas", "Teasers"],
    frame: "Placeholder · Campanha",
  },
  presenca: {
    title: "Apresentação e presença digital",
    desc: "Vídeos para explicar quem é a empresa, o que faz e por que o cliente deve confiar.",
    pills: ["Institucional", "Produto", "Serviço", "Landing page com vídeo", "WhatsApp"],
    frame: "Placeholder · Apresentação",
  },
  autoridade: {
    title: "Conteúdo e autoridade",
    desc: "Vídeos para gerar reconhecimento, educar audiência e sustentar posicionamento com repertório.",
    pills: ["Conteúdo educativo", "LinkedIn", "YouTube", "Mini séries", "Bastidores"],
    frame: "Placeholder · Conteúdo",
  },
  vendas: {
    title: "Vendas e conversão",
    desc: "Vídeos para reduzir objeções, demonstrar valor e apoiar a decisão de compra.",
    pills: ["Cases", "Depoimentos", "VSL", "Demo", "Oferta"],
    frame: "Placeholder · Case de sucesso",
  },
  interno: {
    title: "Comunicação interna",
    desc: "Produções para alinhar equipes, explicar processos e fortalecer mensagens internas.",
    pills: ["Integração", "Treinamento", "Procedimentos", "Segurança", "Endomarketing"],
    frame: "Placeholder · Treinamento",
  },
  eventos: {
    title: "Eventos e ações corporativas",
    desc: "Vídeos para registrar, divulgar e transformar momentos presenciais em ativos de comunicação.",
    pills: ["Aftermovie", "Chamada", "Registro", "Backstage", "Pós-evento"],
    frame: "Placeholder · Evento",
  },
};

const needs = document.querySelectorAll(".need");
const recTitle = document.querySelector("#rec-title");
const recDesc = document.querySelector("#rec-desc");
const recPills = document.querySelector("#rec-pills");
const recFrameLabel = document.querySelector("#rec-frame-label");

function setRec(key) {
  const item = recs[key];
  recTitle.textContent = item.title;
  recDesc.textContent = item.desc;
  recFrameLabel.textContent = item.frame;
  renderPills(recPills, item.pills);
}

needs.forEach((need) => {
  need.addEventListener("click", () => {
    needs.forEach((item) => item.classList.remove("active"));
    need.classList.add("active");
    setRec(need.dataset.need);
  });
});

setRec("demanda");

const modal = document.querySelector(".modal");
const modalTitle = document.querySelector("#modal-title");
const modalClose = document.querySelector(".modal-close");
const modalBackdrop = document.querySelector(".modal-backdrop");
const videoTriggers = document.querySelectorAll("[data-video]");

function openModal(title) {
  modalTitle.textContent = title || "Vídeo placeholder";
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

videoTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => openModal(trigger.dataset.video));
});

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});
