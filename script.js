const SITE_ASSET_VERSION = "20260619-youtube-poster";

const AnalyticsManager = (() => {
  let initialized = false;

  function normalizeText(value = "") {
    return String(value).replace(/\s+/g, " ").trim();
  }

  function getElementText(element) {
    if (!element) return "";
    const imageAlt = element.querySelector?.("img[alt]")?.getAttribute("alt");
    return normalizeText(
      element.getAttribute?.("data-analytics-label")
      || element.getAttribute?.("aria-label")
      || element.getAttribute?.("title")
      || element.getAttribute?.("data-title")
      || element.value
      || element.textContent
      || imageAlt
      || element.id
      || element.className
      || "Clique"
    );
  }

  function getSectionName(element) {
    const section = element?.closest?.("[data-section]");
    if (section?.dataset.section) return normalizeText(section.dataset.section);

    const fallbackSection = element?.closest?.("section, header, footer, main");
    const heading = fallbackSection?.querySelector?.("h1, h2, h3, .eyebrow");
    return normalizeText(heading?.textContent || fallbackSection?.id || "Global");
  }

  function getDestinationUrl(element) {
    const href = element?.closest?.("a[href]")?.getAttribute("href") || element?.getAttribute?.("href") || "";
    if (!href) return "";
    try {
      return new URL(href, window.location.href).href;
    } catch (error) {
      return href;
    }
  }

  function classifyEvent(element, destinationUrl = "") {
    const rawHref = element?.closest?.("a[href]")?.getAttribute("href") || "";
    const url = destinationUrl.toLowerCase();
    const text = getElementText(element).toLowerCase();

    if (element?.closest?.(".js-open-video") || element?.dataset?.platform) return "play_video";
    if (element?.closest?.(".need")) return "diagnostic_select";
    if (element?.closest?.(".moment-tab, .moment-dot")) return "journey_stage_select";
    if (element?.closest?.(".portfolio-arrow, .featured-arrow, .portfolio-dot")) return "carousel_navigation";
    if (element?.closest?.("#faqToggle")) return "faq_expand";
    if (url.includes("wa.me") || url.includes("whatsapp") || text.includes("whatsapp")) return "click_whatsapp";
    if (url.includes("instagram.com") || text.includes("instagram")) return "click_instagram";
    if (rawHref.startsWith("tel:")) return "click_phone";
    if (rawHref.startsWith("mailto:")) return "click_email";
    if (rawHref === "#portfolio" || url.endsWith("/#portfolio")) return "open_portfolio";
    if (rawHref.startsWith("#") || element?.closest?.(".site-nav")) return "click_navigation";
    return "click_cta";
  }

  function buildPayload(eventName, element, extra = {}) {
    const destinationUrl = extra.destination_url || extra.link_url || getDestinationUrl(element);
    const sectionName = extra.section_name || extra.section || getSectionName(element);
    const buttonText = extra.button_text || getElementText(element);
    const eventLabel = normalizeText(extra.event_label || `${sectionName} | ${buttonText || eventName}`);
    return {
      ...extra,
      event: eventName,
      event_name: eventName,
      section: sectionName,
      section_name: sectionName,
      button_text: buttonText,
      event_label: eventLabel,
      link_url: destinationUrl,
      destination_url: destinationUrl,
      page_path: window.location.pathname || "/",
      page_location: window.location.href,
      action_type: extra.action_type || eventName,
      video_id: extra.video_id || "",
      video_platform: extra.video_platform || "",
      video_orientation: extra.video_orientation || "",
      form_id: extra.form_id || "",
      form_name: extra.form_name || "",
    };
  }

  function dispatch(eventName, element, extra = {}) {
    window.dataLayer = window.dataLayer || [];
    const payload = buildPayload(eventName, element, extra);
    window.dataLayer.push(payload);

    if (typeof window.gtag === "function") {
      const { event, ...gaParams } = payload;
      window.gtag("event", eventName, gaParams);
    }

    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", eventName, payload);
    }

    return payload;
  }

  function handleClick(event) {
    const target = event.target.closest?.("a[href], button, [role='button'], summary");
    if (!target || target.closest(".js-open-video")) return;
    const destinationUrl = getDestinationUrl(target);
    dispatch(classifyEvent(target, destinationUrl), target, {
      link_url: destinationUrl,
      destination_url: destinationUrl,
    });
  }

  function handleSubmit(event) {
    const formName = event.target.getAttribute("name") || "";
    dispatch("form_submit", event.target, {
      form_id: event.target.id || "",
      form_name: formName,
      button_text: formName || event.target.id || "Formulário enviado",
      destination_url: event.target.getAttribute("action") || window.location.href,
    });
  }

  function init() {
    if (initialized) return;
    initialized = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "analytics_manager_ready",
      event_name: "analytics_manager_ready",
      section: "Sistema",
      section_name: "Sistema",
      button_text: "AnalyticsManager pronto",
      event_label: "Sistema | AnalyticsManager pronto",
      link_url: "",
      destination_url: "",
      page_path: window.location.pathname || "/",
      page_location: window.location.href,
      action_type: "analytics_manager_ready",
      video_id: "",
      video_platform: "",
      video_orientation: "",
      form_id: "",
      form_name: "",
    });
    document.addEventListener("click", handleClick, true);
    document.addEventListener("submit", handleSubmit, true);
  }

  return {
    init,
    track: dispatch,
    trackVideoOpen(element, video = {}) {
      return dispatch("play_video", element, {
        button_text: video.title || getElementText(element),
        video_id: video.id || element?.dataset?.id || "",
        video_platform: video.platform || element?.dataset?.platform || "",
        video_orientation: video.orientation || element?.dataset?.orientation || "",
        destination_url: video.platform === "vimeo"
          ? `https://vimeo.com/${video.id || ""}`
          : `https://www.youtube.com/watch?v=${video.id || ""}`,
        action_type: "play_video",
      });
    },
  };
})();

window.AnalyticsManager = AnalyticsManager;

const fixedYoutubeThumbs = {
  AVlMyYiXCCk: "https://i.ytimg.com/vi/AVlMyYiXCCk/maxresdefault.jpg",
};

const manualThumbs = {
  gdJzWobbouw: "assets/thumbs/thumb-01-gdJzWobbouw.png.jpeg",
  t2jOdfkf1n0: "assets/thumbs/thumb-02-t2jOdfkf1n0.png.jpeg",
  1196950750: "assets/thumbs/thumb-03-1196950750.png.jpeg",
  1195816891: "assets/thumbs/thumb-17-1196948372.png.jpeg",
  1194588209: "assets/thumbs/thumb-05-1194588209.png.jpeg",
  rsau38g08H0: "assets/thumbs/thumb-06-rsau38g08H0.png.jpeg",
  cPl8z5m_nwY: "assets/thumbs/thumb-07-cPl8z5m_nwY.png.jpeg",
  t3HKRTObtrU: "assets/thumbs/thumb-08-t3HKRTObtrU.png.jpeg",
  CgfEWgE_8Aw: "assets/thumbs/thumb-10-CgfEWgE_8Aw.png.jpeg",
  "3lea5v3Jhmg": "assets/thumbs/thumb-11-3lea5v3Jhmg.png.jpeg",
  CO2o8s_k3D4: "assets/thumbs/thumb-12-CO2o8s_k3D4.png.jpeg",
  zBBKTTKwJBQ: "assets/thumbs/thumb-13-zBBKTTKwJBQ.png.jpeg",
  KXf_GURp9lE: "assets/thumbs/thumb-14-KXf_GURp9lE.png.jpeg",
  eHGZho9cy_w: "assets/thumbs/thumb-15-eHGZho9cy_w.png.jpeg",
  1196948372: "assets/thumbs/thumb-16-1196948372.png.jpeg",
};

const featuredVideos = [
  { id: "rsau38g08H0", p: "youtube", o: "vertical", tag: "Anúncio de Patrocínio", title: "Betim Futebol" },
  { id: "cPl8z5m_nwY", p: "youtube", o: "horizontal", tag: "Case de Sucesso", title: "Cineart" },
  { id: "t3HKRTObtrU", p: "youtube", o: "vertical", tag: "Backstage + Case de Sucesso", title: "Cineart · Meet Tecnologia" },
  { id: "AVlMyYiXCCk", p: "youtube", o: "horizontal", tag: "Case de Sucesso", title: "Grupo Avante · Meet Tecnologia" },
  { id: "t2jOdfkf1n0", p: "youtube", o: "vertical", tag: "Campanha de Marketing", title: "Betim Vs Cruzeiro" },
  { id: "CgfEWgE_8Aw", p: "youtube", o: "horizontal", tag: "Case de Sucesso", title: "Biologistica · Meet Tecnologia" },
  { id: "jeY8AvM-iUY", p: "youtube", o: "vertical", tag: "Treinamento NR", title: "Registro da ação" },
  { id: "zpbKSZBjGB8", p: "youtube", o: "vertical", tag: "Campanha", title: "Conselho da Massa" },
  { id: "1195816891", p: "vimeo", o: "vertical", tag: "Registro do Festival", title: "Mangalarga Marchador" },
  { id: "1194588209", p: "vimeo", o: "vertical", tag: "Divulgação Dia dos Namorados", title: "Marcos Catarina canta Vander Lee" },
  { id: "MI6pCyYpMlc", p: "youtube", o: "vertical", tag: "Anúncio de Promoção", title: "Confiber · Cacau Show" },
];

const allVideos = [
  { id: "oDRUYh7xOBs", p: "youtube", o: "vertical", tag: "Apresentação de Benefícios", title: "Benefícios Fibraxx" },
  { id: "fAzmIuYKra0", p: "youtube", o: "horizontal", tag: "Case de Sucesso", title: "Grupo AVG · Meet Tecnologia" },
  { id: "NxeCva_bdxU", p: "youtube", o: "vertical", tag: "Apresentação de Produto", title: "Plano Copa do Mundo" },
  { id: "t3HKRTObtrU", p: "youtube", o: "vertical", tag: "Backstage + Case de Sucesso", title: "Cineart · Meet Tecnologia" },
  { id: "aC_lpOFyDJE", p: "youtube", o: "vertical", tag: "Apresentação de Produto", title: "Deezer · Confiber" },
  { id: "BgJzvmtNZP4", p: "youtube", o: "horizontal", tag: "Festival", title: "Circuito Cultural Barreiro" },
  { id: "t2jOdfkf1n0", p: "youtube", o: "vertical", tag: "Ação de Campanha", title: "Betim Vs Cruzeiro" },
  { id: "hX0tfTg9-Vw", p: "youtube", o: "vertical", tag: "Backstage + Case de Sucesso", title: "Biologistica · Meet Tecnologia" },
  { id: "9jIKnhQFhbg", p: "youtube", o: "vertical", tag: "Apresentação de Benefícios", title: "Fibraxx" },
  { id: "cPl8z5m_nwY", p: "youtube", o: "horizontal", tag: "Case de Sucesso", title: "Cineart · Meet Tecnologia" },
  { id: "BRhNBATj9Z0", p: "youtube", o: "vertical", tag: "Conteúdo Institucional", title: "Palestra no Colégio Santo Agostinho · Meet Tecnologia" },
  { id: "SIpWQ_e89oo", p: "youtube", o: "vertical", tag: "Anúncio", title: "Dia dos Namorados" },
  { id: "AVlMyYiXCCk", p: "youtube", o: "horizontal", tag: "Case de Sucesso", title: "Grupo Avante · Meet Tecnologia" },
  { id: "1196950750", p: "vimeo", o: "vertical", tag: "Conteúdo Institucional", title: "Endomarketing Dia das Mulheres" },
  { id: "1pbQqkS5EyU", p: "youtube", o: "vertical", tag: "Apresentação de Produto", title: "Disney + · Confiber" },
  { id: "EzVojjz2TwU", p: "youtube", o: "vertical", tag: "Anúncio", title: "Brumanus no Carnaval" },
  { id: "CgfEWgE_8Aw", p: "youtube", o: "horizontal", tag: "Case de Sucesso", title: "Biologistica · Meet Tecnologia" },
  { id: "gdJzWobbouw", p: "youtube", o: "vertical", tag: "Teaser", title: "Brumanus no Carnaval" },
  { id: "4uQWPJ84uNk", p: "youtube", o: "vertical", tag: "Anúncio", title: "Brumanus no Sabor das Brumas" },
  { id: "gjDVDluYpII", p: "youtube", o: "vertical", tag: "Apresentação de Produto", title: "Chopp APA Brumanus" },
  { id: "PodfSqi6ru8", p: "youtube", o: "vertical", tag: "Conteúdo Institucional", title: "Suporte Técnico" },
  { id: "26-R6P5IGpA", p: "youtube", o: "vertical", tag: "Apresentação de Produto", title: "Disney + · Confiber" },
  { id: "4Hn9ngjpB6w", p: "youtube", o: "vertical", tag: "Anúncio de Promoção", title: "Session Ipa no preço da Pilsen" },
  { id: "XbhVd3a0sEI", p: "youtube", o: "vertical", tag: "Conteúdo", title: "Área de Cobertura" },
  { id: "0qOjey-rtsI", p: "youtube", o: "vertical", tag: "Anúncio", title: "Link Dedicado" },
  { id: "7GOJkl2N4kI", p: "youtube", o: "vertical", tag: "Apresentação de Produto", title: "Premiere · Confiber" },
  { id: "Q-Gt_kSUTEE", p: "youtube", o: "vertical", tag: "Anúncio de Patrocínio", title: "Betim Futebol · Meet Tecnologia" },
  { id: "3lea5v3Jhmg", p: "youtube", o: "vertical", tag: "Anúncio", title: "Black Friday" },
  { id: "HU5pbfJ5aJk", p: "youtube", o: "vertical", tag: "Backstage + Case de Sucesso", title: "Grupo Avante · Meet Tecnologia" },
  { id: "18b-G4JqoV0", p: "youtube", o: "vertical", tag: "Apresentação de Produto", title: "HBO Max · Confiber" },
  { id: "j1H5zRoC-qk", p: "youtube", o: "vertical", tag: "Apresentação de Produto", title: "Disaster Recovery" },
  { id: "nXqTs0U-fPU", p: "youtube", o: "vertical", tag: "Apresentação de Produto", title: "Streamings Confiber" },
  { id: "JzY1JbbS7x4", p: "youtube", o: "vertical", tag: "Conteúdo Educativo", title: "Sua Empresa usa Nuvem?" },
  { id: "CO2o8s_k3D4", p: "youtube", o: "vertical", tag: "Anúncio de Parceria", title: "Confiber · Restaurante Nosso Quintal" },
  { id: "G4q5jUkg8VE", p: "youtube", o: "vertical", tag: "Conteúdo Educativo", title: "Qual Tipo de Cloud Usar?" },
  { id: "y368nZZESHs", p: "youtube", o: "vertical", tag: "Anúncio de Parceria", title: "Confiber · Panificadora Palmeiras" },
  { id: "4J12L2Xlvh8", p: "youtube", o: "vertical", tag: "Conteúdo Educativo", title: "O que significa Cloud?" },
  { id: "MI6pCyYpMlc", p: "youtube", o: "vertical", tag: "Anúncio de Promoção", title: "Confiber · Cacau Show" },
  { id: "utxuE5nihsA", p: "youtube", o: "vertical", tag: "Conteúdo Educativo", title: "Segurança Digital" },
  { id: "QhdlzY4eoos", p: "youtube", o: "vertical", tag: "Anúncio em Motion", title: "Copa do Mundo" },
  { id: "ELgs8RaBxm8", p: "youtube", o: "vertical", tag: "Apresentação de Produto", title: "Casa Inteligente" },
  { id: "C3Atq_Dytb0", p: "youtube", o: "vertical", tag: "Anúncio de Promoção", title: "Mês das Mães" },
  { id: "EgfQkzmAc5M", p: "youtube", o: "vertical", tag: "Anúncio", title: "Segurança Residencial" },
  { id: "D0D6BRfgWcI", p: "youtube", o: "vertical", tag: "Conteúdo Educativo", title: "Mamãe Gorila Vs Parentalidade" },
  { id: "9eZazmXiRJo", p: "youtube", o: "vertical", tag: "Apresentação de Produto", title: "Automação Residencial" },
  { id: "zBBKTTKwJBQ", p: "youtube", o: "vertical", tag: "Anúncio de Parceria", title: "Fibraxx · Big Stars Circus" },
  { id: "KXf_GURp9lE", p: "youtube", o: "vertical", tag: "Apresentação de Produto", title: "Câmera Veicular" },
  { id: "Ncg0eyN_OcM", p: "youtube", o: "vertical", tag: "Convite Festival", title: "Nath Sthael" },
  { id: "0xETMgu7rqQ", p: "youtube", o: "vertical", tag: "Apresentação de Serviços", title: "Rastreamento de Veículo" },
  { id: "3jOBzTjl9Lc", p: "youtube", o: "vertical", tag: "Convite Festival", title: "Maikin B$" },
  { id: "-h53nPnf3JQ", p: "youtube", o: "vertical", tag: "Apresentação de Serviços", title: "Acesso Assistido" },
  { id: "4F6CzKbNvZc", p: "youtube", o: "vertical", tag: "Convite Festival", title: "Euocêeozé" },
  { id: "A9WNZacvW50", p: "youtube", o: "vertical", tag: "Convite Festival", title: "Grupo Guararás" },
  { id: "Qun6ERFAS4I", p: "youtube", o: "vertical", tag: "Convite Festival", title: "UBUN2" },
  { id: "2xP77y-P4A8", p: "youtube", o: "vertical", tag: "Convite Festival", title: "Encerramento com 14 Bis" },
  { id: "zpbKSZBjGB8", p: "youtube", o: "vertical", tag: "Campanha", title: "Conselho da Massa" },
  { id: "eHGZho9cy_w", p: "youtube", o: "vertical", tag: "Anúncio", title: "Black Friday" },
  { id: "1195816891", p: "vimeo", o: "vertical", tag: "Registro do Festival", title: "Mangalarga Marchador" },
  { id: "1196948372", p: "vimeo", o: "vertical", tag: "Conteúdo Institucional", title: "Cuidado no Período de Chuvas" },
];

const moments = [
  {
    stage: "Descoberta",
    kicker: "Aparecer para quem ainda não conhece",
    desc: "O vídeo precisa chamar atenção, despertar curiosidade e gerar o primeiro interesse.",
    videos: ["Anúncios em vídeo", "Conteúdo para engajar", "Conteúdo para gerar desejo", "Conteúdo para Instagram", "Reels", "Teasers de impacto", "Vídeos educativos"],
    where: "Meta Ads · Google Ads · Instagram · YouTube · LinkedIn",
    examples: ["rsau38g08H0", "zpbKSZBjGB8", "MI6pCyYpMlc"],
  },
  {
    stage: "Apresentação",
    kicker: "Explicar quem é a empresa",
    desc: "Vídeos para apresentar a empresa, produtos, serviços e diferenciais com clareza.",
    videos: ["Vídeo institucional", "Apresentação da empresa", "Produtos e serviços", "Demonstrações", "Landing Page com vídeo"],
    where: "Site · Landing Page · WhatsApp · Apresentações comerciais · YouTube",
    examples: ["AVlMyYiXCCk", "aC_lpOFyDJE", "oDRUYh7xOBs"],
  },
  {
    stage: "Consideração",
    kicker: "Gerar confiança e reduzir objeções",
    desc: "Cases, depoimentos e conteúdo de valor ajudam o cliente a confiar antes de decidir.",
    videos: ["Cases de sucesso", "Depoimentos", "Conteúdo educativo", "Autoridade", "Resultados alcançados"],
    where: "Site · Instagram · YouTube · LinkedIn · Landing Page · E-mail",
    examples: ["cPl8z5m_nwY", "CgfEWgE_8Aw", "fAzmIuYKra0"],
  },
  {
    stage: "Conversão",
    kicker: "Facilitar a decisão de compra",
    desc: "Vídeos comerciais objetivos, propostas em vídeo e VSLs ajudam a eliminar a última resistência.",
    videos: ["VSL", "Vídeos comerciais", "Convite para demo", "Ofertas especiais", "Recuperação de leads"],
    where: "WhatsApp · E-mail · Landing Page · Apresentações comerciais",
    examples: ["SIpWQ_e89oo", "3lea5v3Jhmg", "Q-Gt_kSUTEE"],
  },
  {
    stage: "Fidelização",
    kicker: "Encantar depois da compra",
    desc: "Boas-vindas, tutoriais e conteúdos de relacionamento aumentam satisfação, recompra e indicações.",
    videos: ["Boas-vindas", "Onboarding", "Tutoriais", "FAQ em vídeo", "Upsell e Cross-sell"],
    where: "WhatsApp · E-mail · Área de membros · App · Site",
    examples: ["PodfSqi6ru8", "1196948372", "XbhVd3a0sEI"],
  },
  {
    stage: "Cultura Interna",
    kicker: "Comunicar para equipes",
    desc: "Vídeos internos economizam tempo, padronizam processos e transmitem cultura de forma escalável.",
    videos: ["Integração", "Treinamentos", "Comunicados internos", "Procedimentos", "Endomarketing"],
    where: "Intranet · WhatsApp corporativo · Reuniões internas",
    examples: ["jeY8AvM-iUY", "1196950750", "BRhNBATj9Z0"],
  },
];

const recommendations = [
  {
    title: "Anúncios e geração de demanda",
    desc: "Vídeos para atrair pessoas certas e gerar oportunidades comerciais.",
    pills: ["Anúncios Google Ads", "Anúncios Meta Ads", "Campanhas promocionais", "Demonstrações", "Landing Page com vídeo", "Lançamentos", "Produtos e serviços", "Teasers de impacto", "Vídeo institucional", "Vídeos para WhatsApp"],
    examples: ["rsau38g08H0", "Q-Gt_kSUTEE", "zpbKSZBjGB8"],
  },
  {
    title: "Apresentação e presença digital",
    desc: "Vídeos para explicar quem é a empresa e facilitar o primeiro contato.",
    pills: ["Apresentação da Equipe", "Apresentação do Negócio", "Bastidores / cultura", "Demonstrações", "Diferenciais", "Landing Page com vídeo", "Missão, visão, valores", "Produtos e serviços", "Soluções", "Vídeo institucional", "Vídeos para WhatsApp"],
    examples: ["AVlMyYiXCCk", "oDRUYh7xOBs", "aC_lpOFyDJE"],
  },
  {
    title: "Autoridade e conteúdo",
    desc: "Vídeos para sustentar posicionamento e construir confiança.",
    pills: ["Cases de Sucesso", "Conteúdo educativo", "Conteúdo informativo", "Conteúdo para Instagram", "Conteúdo para LinkedIn", "Conteúdo para YouTube", "Conteúdos Institucionais", "Cursos", "Mini cursos"],
    examples: ["JzY1JbbS7x4", "G4q5jUkg8VE", "4J12L2Xlvh8"],
  },
  {
    title: "Vendas e conversão",
    desc: "Vídeos para reduzir objeções e facilitar a decisão de compra.",
    pills: ["Condição Especial / Desconto", "Convite para agendamento", "Convites para demo", "Oferta personalizada", "Resultados alcançados", "Vídeos comerciais", "Vídeos Comparativos", "VSL"],
    examples: ["cPl8z5m_nwY", "CgfEWgE_8Aw", "fAzmIuYKra0"],
  },
  {
    title: "Experiência e fidelização",
    desc: "Vídeos para manter clientes próximos e aumentar recorrência.",
    pills: ["Atualizações e Novidades", "Boas-vindas", "Clube de benefícios", "Comunidade / Grupo VIP", "Conteúdo exclusivo", "Cross-sell", "Cursos e mini cursos", "FAQ em vídeo", "Onboarding", "Programas de fidelidade", "Tutoriais", "Upsell"],
    examples: ["PodfSqi6ru8", "1196948372", "XbhVd3a0sEI"],
  },
  {
    title: "Comunicação interna",
    desc: "Vídeos para alinhar equipes, processos e cultura interna.",
    pills: ["Apresentação da empresa", "Boas práticas", "Capacitação e treinamento", "Comunicados", "Cultura", "Cultura, propósito e valores", "Cursos e certificações", "Endomarketing", "Eventos internos", "História da empresa", "Integração", "Mudanças e engajamento", "Políticas internas", "Procedimentos", "Procedimentos e processos", "Resultados", "Treinamento técnico", "Tutoriais", "Vídeos de boas-vindas"],
    examples: ["jeY8AvM-iUY", "1196950750", "BRhNBATj9Z0"],
  },
  {
    title: "Eventos, feiras e ações de campanhas",
    desc: "Vídeos para transformar ações presenciais em ativos de comunicação.",
    pills: ["Ativação de Marca", "Campanhas", "Convenções", "Eventos", "Feiras", "Lançamentos", "Palestras"],
    examples: ["NxeCva_bdxU", "1195816891", "BgJzvmtNZP4"],
  },
];

const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const featuredRail = document.querySelector("#featuredRail");
const featuredMarquee = document.querySelector(".featured-marquee");
const featuredLeft = document.querySelector("#featuredLeft");
const featuredRight = document.querySelector("#featuredRight");
const portfolioCarousel = document.querySelector("#portfolioCarousel");
const portfolioDots = document.querySelector("#portfolioDots");
const portfolioPrev = document.querySelector("#portfolioPrev");
const portfolioNext = document.querySelector("#portfolioNext");
const momentDots = document.querySelector("#momentDots");
const faqList = document.querySelector("#faqList");
const faqToggle = document.querySelector("#faqToggle");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector("#modalTitle");
const modalVideoWrap = document.querySelector("#modalVideoWrap");
const modalDirectLink = document.querySelector("#modalDirectLink");
const modalClose = document.querySelector(".modal-close");
const modalBackdrop = document.querySelector(".modal-backdrop");

let portfolioSlideIndex = 0;
let portfolioTimer = null;
let faqExpanded = false;
let featuredOffset = 0;
let featuredHalfWidth = 0;
let featuredDragging = false;
let featuredLastX = 0;
let featuredStartX = 0;
let featuredStartY = 0;
let featuredLastTime = 0;
let featuredInertia = 0;
let featuredPointerTarget = null;
let featuredRaf = null;
let featuredMoved = false;
let suppressFeaturedClick = false;
let featuredDirection = 1;
let featuredSpeedBoost = 1;
let portfolioDragging = false;
let portfolioDragStartX = 0;
let portfolioDragStartY = 0;
let portfolioDragLastX = 0;
let portfolioDragLastY = 0;
let portfolioPointerId = null;
let portfolioPointerTarget = null;
let suppressPortfolioClick = false;
let mobileDiagnosticCloseTimer = null;
let youtubeApiPromise = null;
let activeYoutubePlayer = null;
const featuredBaseSpeed = 1.375;
const tapMoveLimit = 10;

const faqItems = [
  {
    q: "Quanto custa um vídeo?",
    a: "Cada projeto é orçado individualmente conforme os objetivos do negócio, a complexidade da produção e os resultados esperados. Antes de propor uma solução, buscamos entender o momento da empresa e quais vídeos geram mais impacto para sua comunicação.",
  },
  {
    q: "Quais problemas os vídeos podem ajudar a resolver no meu negócio?",
    a: "Os vídeos podem fortalecer presença digital, apresentar a empresa de forma profissional, explicar produtos e serviços, facilitar o trabalho comercial, gerar confiança, produzir conteúdo para Instagram, YouTube e LinkedIn, integrar colaboradores, reduzir dúvidas recorrentes e melhorar a experiência do cliente.",
  },
  {
    q: "Quais tipos de vídeo a Veic Vídeos produz?",
    a: "Produzimos vídeos institucionais, apresentação de produtos e serviços, conteúdo para redes sociais, cases de sucesso, vídeos comerciais, VSL, anúncios, treinamentos, integração de colaboradores, tutoriais, onboarding, vídeos para experiência do cliente, eventos, feiras e ações corporativas.",
  },
  {
    q: "O que significa estruturar a comunicação através do vídeo?",
    a: "Significa identificar quais vídeos fazem sentido para o momento atual da empresa e para cada etapa da jornada do cliente ou da comunicação interna. Nem toda empresa precisa dos mesmos vídeos; por isso buscamos entender a realidade do negócio antes de definir prioridades.",
  },
  {
    q: "Minha empresa precisa produzir todos esses vídeos?",
    a: "Não. Cada empresa possui um nível diferente de maturidade e necessidades diferentes de comunicação. Algumas precisam começar apresentando produtos e serviços, outras precisam gerar demanda, fortalecer vendas, treinar equipes ou melhorar a experiência do cliente.",
  },
  {
    q: "Vocês também criam Landing Pages?",
    a: "Sim. Além da produção dos vídeos, também desenvolvemos landing pages de apresentação para empresas que desejam fortalecer presença digital, ser encontradas no Google e apresentar produtos e serviços de forma mais profissional. A entrega principal continua sendo audiovisual.",
  },
  {
    q: "Minha empresa ainda não produz vídeos. Por onde começar?",
    a: "Na maioria dos casos, recomendamos começar pelos vídeos que ajudam a apresentar a empresa, seus produtos, serviços e diferenciais. Muitas empresas ainda dependem de explicações repetitivas, catálogos ou PDFs; nesses casos, uma landing page com vídeos de apresentação pode ser um bom primeiro passo.",
  },
  {
    q: "Como funciona o processo de trabalho?",
    a: "Nosso processo acontece em cinco etapas: Diagnóstico, Mapeamento, Priorização, Produção com Direção e Evolução. Assim, cada vídeo nasce com uma função clara dentro da comunicação do negócio.",
  },
  {
    q: "Preciso ter experiência em frente às câmeras?",
    a: "Não. Orientamos clientes e equipes durante toda a gravação para que consigam transmitir sua mensagem com naturalidade e segurança, mesmo sem experiência anterior.",
  },
  {
    q: "Vocês atendem fora de Belo Horizonte?",
    a: "Sim. Atendemos Belo Horizonte, região metropolitana, outras cidades de Minas Gerais e projetos em todo o Brasil mediante agendamento prévio.",
  },
  {
    q: "Em quanto tempo os vídeos ficam prontos?",
    a: "O prazo varia conforme o tipo de projeto, quantidade de vídeos e complexidade da produção. Após o diagnóstico inicial, apresentamos um cronograma claro com etapas de gravação, edição e entrega.",
  },
];

function versionedUrl(url) {
  if (!url) return "";
  return `${url}${url.includes("?") ? "&" : "?"}v=${SITE_ASSET_VERSION}`;
}

function manualThumbUrl(video) {
  return manualThumbs[video.id] || "";
}

function autoThumbUrl(video) {
  if (video.p === "vimeo") return `https://vumbnail.com/${video.id}_large.jpg`;
  if (fixedYoutubeThumbs[video.id]) return fixedYoutubeThumbs[video.id];
  return `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`;
}

function thumbUrl(video) {
  return versionedUrl(manualThumbUrl(video) || autoThumbUrl(video));
}

function thumbSrcset(video) {
  if (manualThumbUrl(video)) return "";
  if (fixedYoutubeThumbs[video.id]) return "";
  if (video.p === "vimeo") {
    return `${versionedUrl(`https://vumbnail.com/${video.id}_large.jpg`)} 640w, ${versionedUrl(`https://vumbnail.com/${video.id}.jpg`)} 640w`;
  }
  return `${versionedUrl(`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`)} 1280w, ${versionedUrl(`https://i.ytimg.com/vi/${video.id}/sddefault.jpg`)} 640w, ${versionedUrl(`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`)} 480w`;
}

function thumbFallbackUrl(video) {
  if (video.p === "vimeo") return versionedUrl(`https://vumbnail.com/${video.id}.jpg`);
  return versionedUrl(`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`);
}

function thumbImage(video, alt) {
  const srcset = thumbSrcset(video);
  return `<img src="${thumbUrl(video)}"${srcset ? ` srcset="${srcset}"` : ""} sizes="(max-width: 759px) 86vw, 640px" alt="${alt}" loading="lazy" decoding="async" draggable="false" onerror="this.onerror=null;this.removeAttribute('srcset');this.src='${thumbFallbackUrl(video)}';">`;
}

function findVideo(id) {
  return [...featuredVideos, ...allVideos].find((video) => video.id === id) || allVideos[0];
}

function videoButton(video, className = "video-card-media") {
  const fallback = `<div class="vimeo-fallback"><span>${video.p === "vimeo" ? "Vimeo" : "Vídeo"}</span></div>`;
  return `
    <button class="${className} js-open-video" type="button" data-id="${video.id}" data-platform="${video.p}" data-orientation="${video.o}" data-title="${video.tag} · ${video.title}">
      ${thumbUrl(video) ? thumbImage(video, `Frame do vídeo ${video.title}`) : fallback}
      <span class="play-dot"></span>
    </button>
  `;
}

function card(video, extraClass = "") {
  return `
    <article class="video-card ${video.o === "horizontal" ? "horizontal" : ""} ${extraClass}">
      ${videoButton(video)}
      <div>
        <span class="video-card-tag">${video.tag}</span>
        <h3 class="video-card-title">${video.title}</h3>
      </div>
    </article>
  `;
}

function renderFeatured() {
  const doubled = [...featuredVideos, ...featuredVideos];
  featuredRail.innerHTML = doubled.map((video) => card(video)).join("");
  requestAnimationFrame(() => {
    const cards = [...featuredRail.children].slice(0, featuredVideos.length);
    const styles = window.getComputedStyle(featuredRail);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");
    featuredHalfWidth = cards.reduce((total, card) => total + card.getBoundingClientRect().width, 0) + (gap * featuredVideos.length);
    featuredOffset = normalizeFeaturedOffset(featuredOffset);
    featuredRail.style.transform = `translateX(${-featuredOffset}px)`;
  });
}

function normalizeFeaturedOffset(value) {
  if (!featuredHalfWidth) return 0;
  let normalized = value % featuredHalfWidth;
  if (normalized < 0) normalized += featuredHalfWidth;
  return normalized;
}

function animateFeatured() {
  if (!featuredDragging && featuredHalfWidth > 0) {
    featuredOffset = normalizeFeaturedOffset(featuredOffset + (featuredBaseSpeed * featuredSpeedBoost * featuredDirection) + featuredInertia);
    featuredInertia *= .94;
    if (Math.abs(featuredInertia) < .08) featuredInertia = 0;
    featuredRail.style.transform = `translateX(${-featuredOffset}px)`;
  }
  featuredRaf = requestAnimationFrame(animateFeatured);
}

function startFeaturedBoost(direction) {
  featuredDirection = direction;
  featuredSpeedBoost = 2;
}

function stopFeaturedBoost() {
  featuredDirection = 1;
  featuredSpeedBoost = 1;
}

function setupFeaturedDrag() {
  featuredRail.addEventListener("contextmenu", (event) => event.preventDefault());
  featuredRail.addEventListener("dragstart", (event) => event.preventDefault(), { capture: true });

  featuredRail.addEventListener("pointerdown", (event) => {
    featuredDragging = true;
    featuredMoved = false;
    featuredPointerTarget = event.target;
    featuredStartX = event.clientX;
    featuredStartY = event.clientY;
    featuredLastX = event.clientX;
    featuredLastTime = performance.now();
    featuredInertia = 0;
    featuredMarquee.classList.add("dragging");
    featuredRail.setPointerCapture(event.pointerId);
  });

  featuredRail.addEventListener("pointermove", (event) => {
    if (!featuredDragging || !featuredHalfWidth) return;
    const now = performance.now();
    const delta = event.clientX - featuredLastX;
    const totalX = event.clientX - featuredStartX;
    const totalY = event.clientY - featuredStartY;
    if (Math.abs(totalX) > tapMoveLimit || Math.abs(totalY) > tapMoveLimit) featuredMoved = true;
    featuredLastX = event.clientX;
    const deltaOffset = -(delta * 2.15);
    const elapsed = Math.max(now - featuredLastTime, 8);
    featuredLastTime = now;
    featuredInertia = Math.max(-52, Math.min(52, deltaOffset * (16 / elapsed)));
    featuredOffset = normalizeFeaturedOffset(featuredOffset + deltaOffset);
    featuredRail.style.transform = `translateX(${-featuredOffset}px)`;
  });

  function endDrag(event) {
    if (!featuredDragging) return;
    if (event.type === "pointercancel" || event.type === "pointerleave") {
      featuredMoved = true;
    }
    featuredDragging = false;
    featuredMarquee.classList.remove("dragging");
    if (featuredMoved) {
      suppressFeaturedClick = true;
      window.setTimeout(() => { suppressFeaturedClick = false; }, 120);
    } else {
      const trigger = featuredPointerTarget?.closest?.(".js-open-video");
      if (trigger) {
        suppressFeaturedClick = true;
        openVideo({
          id: trigger.dataset.id,
          platform: trigger.dataset.platform,
          orientation: trigger.dataset.orientation,
          title: trigger.dataset.title,
          sound: true,
          sourceElement: trigger,
        });
        window.setTimeout(() => { suppressFeaturedClick = false; }, 180);
      }
    }
    featuredPointerTarget = null;
    if (event.pointerId !== undefined) {
      try { featuredRail.releasePointerCapture(event.pointerId); } catch (error) {}
    }
  }

  featuredRail.addEventListener("pointerup", endDrag);
  featuredRail.addEventListener("pointercancel", endDrag);
  featuredRail.addEventListener("pointerleave", endDrag);
}

function makePortfolioBlocks() {
  const horizontal = allVideos.filter((video) => video.o === "horizontal");
  const vertical = allVideos.filter((video) => video.o !== "horizontal");
  const blocks = [];

  while (horizontal.length && vertical.length >= 3) {
    blocks.push([horizontal.shift(), vertical.shift(), vertical.shift(), vertical.shift()]);
  }

  const remaining = [...vertical, ...horizontal];
  for (let i = 0; i < remaining.length; i += 4) {
    blocks.push(remaining.slice(i, i + 4));
  }

  return blocks;
}

function renderPortfolio() {
  const blocks = makePortfolioBlocks();
  portfolioCarousel.innerHTML = `
    <div class="portfolio-track" style="transform: translateX(-${portfolioSlideIndex * 100}%);">
      ${blocks.map((block, index) => `
    <div class="portfolio-slide ${block.some((video) => video.o === "horizontal") ? "has-horizontal" : ""}" data-slide="${index}">
          ${block.map((video) => `
            <article class="work-card ${video.o === "horizontal" ? "horizontal" : ""}">
              ${videoButton(video)}
              <div>
                <span class="video-card-tag">${video.tag}</span>
                <h3 class="video-card-title">${video.title}</h3>
              </div>
            </article>
          `).join("")}
        </div>
      `).join("")}
    </div>
  `;

  portfolioDots.innerHTML = blocks.map((_, index) => `
    <button class="portfolio-dot ${index === portfolioSlideIndex ? "active" : ""}" type="button" data-slide="${index}" aria-label="Ver bloco ${index + 1} do portfólio"></button>
  `).join("");
}

function goToPortfolioSlide(index) {
  const total = makePortfolioBlocks().length;
  portfolioSlideIndex = (index + total) % total;
  const track = document.querySelector(".portfolio-track");
  if (track) {
    track.style.transform = `translateX(-${portfolioSlideIndex * 100}%)`;
  }
  portfolioDots.querySelectorAll(".portfolio-dot").forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === portfolioSlideIndex);
  });
}

function startPortfolioCarousel() {
  window.clearInterval(portfolioTimer);
  portfolioTimer = window.setInterval(() => {
    goToPortfolioSlide(portfolioSlideIndex + 1);
  }, 3000);
}

function renderPills(target, pills) {
  target.innerHTML = pills.map((pill) => `<span>${pill}</span>`).join("");
}

function renderExampleList(target, ids) {
  target.innerHTML = ids.map((id) => {
    const video = findVideo(id);
    return `
      <button class="example-video ${video.o === "horizontal" ? "horizontal" : ""} js-open-video" type="button" data-id="${video.id}" data-platform="${video.p}" data-orientation="${video.o}" data-title="${video.tag} · ${video.title}">
        ${thumbUrl(video) ? thumbImage(video, `Frame do vídeo ${video.title}`) : `<div class="vimeo-fallback"><span>Vimeo</span></div>`}
        <span class="play-dot"></span>
        <small>${video.tag}<br>${video.title}</small>
      </button>
    `;
  }).join("");
}

function diagnosticVisualHtml(title, index = 0) {
  return "";
}

function renderMomentVisual(target, item, index) {
  const icons = [
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.8-6 9.5-6 9.5 6 9.5 6-3.8 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="3"/></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16M9 9v11"/></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-5.4 7-12a7 7 0 0 0-14 0c0 6.6 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4"/></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 13 13 20 4 11V4h7l9 9Z"/><circle cx="8.5" cy="8.5" r="1.4"/></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-8 0v2"/><circle cx="12" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M12 11v6M9 14h6"/></svg>',
  ];
  target.innerHTML = `
    <div class="moment-visual" data-stage="${item.stage}">
      <div class="moment-visual-card primary">
        <span class="moment-visual-icon">${icons[index] || icons[0]}</span>
      </div>
      <div class="moment-visual-card secondary">
        <span class="moment-visual-icon">${icons[index] || icons[0]}</span>
      </div>
      <p class="moment-visual-copy">${item.kicker}</p>
    </div>
  `;
}

function renderMoment(index) {
  const item = moments[index];
  document.querySelector("#momentKicker").textContent = item.kicker;
  document.querySelector("#momentTitle").textContent = item.stage;
  document.querySelector("#momentDesc").textContent = item.desc;
  document.querySelector("#momentWhere").textContent = item.where;
  renderPills(document.querySelector("#momentPills"), item.videos);
  renderMomentVisual(document.querySelector("#momentExamples"), item, index);
  renderMomentDots(index);
}

function setMoment(index, shouldScroll = false) {
  const normalized = (index + moments.length) % moments.length;
  const tab = document.querySelector(`.moment-tab[data-moment="${normalized}"]`);
  document.querySelectorAll(".moment-tab").forEach((item) => item.classList.remove("active"));
  tab?.classList.add("active");
  renderMoment(normalized);
  if (shouldScroll && window.matchMedia("(max-width: 759px)").matches) {
    tab?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }
}

function renderMomentDots(activeIndex) {
  if (!momentDots) return;
  momentDots.innerHTML = moments.map((moment, index) => `
    <button class="moment-dot ${index === activeIndex ? "active" : ""}" type="button" data-moment="${index}" aria-label="Ver etapa ${moment.stage}"></button>
  `).join("");
}

function renderRecommendation(index) {
  const item = recommendations[index];
  document.querySelector("#recTitle").textContent = item.title;
  document.querySelector("#recDesc").textContent = item.desc;
  renderPills(document.querySelector("#recPills"), item.pills);
  document.querySelector("#recExamples").innerHTML = diagnosticVisualHtml(item.title, index);
}

function mobileRecommendationHtml(index) {
  const item = recommendations[index];
  return `
    <div class="mobile-recommendation">
      <div class="recommendation">
        <p class="panel-kicker">Vídeos indicados</p>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <div class="recommendation-body">
          <div>
            <span class="mini-label">Formatos</span>
            <div class="pill-list">${item.pills.map((pill) => `<span>${pill}</span>`).join("")}</div>
          </div>
          <div class="rec-examples">${diagnosticVisualHtml(item.title, index)}</div>
        </div>
        <button class="mobile-recommendation-close" type="button">Recolher ↑</button>
      </div>
    </div>
  `;
}

function closeMobileRecommendation({ animate = false, restore = false } = {}) {
  window.clearTimeout(mobileDiagnosticCloseTimer);
  const panels = [...document.querySelectorAll(".mobile-recommendation")];
  const activeButtons = [...document.querySelectorAll(".need.active")];

  function finish() {
    panels.forEach((panel) => panel.remove());
    activeButtons.forEach((item) => item.classList.remove("active"));
  }

  if (animate && panels.length) {
    panels.forEach((panel) => panel.classList.add("closing"));
    mobileDiagnosticCloseTimer = window.setTimeout(finish, 320);
    return;
  }

  finish();
}

function renderFaq() {
  faqList.classList.toggle("show-all", faqExpanded);
  faqList.innerHTML = faqItems.map((item) => `
    <details>
      <summary>${item.q}</summary>
      <p>${item.a}</p>
    </details>
  `).join("");
  faqToggle.textContent = faqExpanded ? "Ver menos perguntas" : "Ver mais perguntas";
}

function setupRevealAnimations() {
  const typeCards = document.querySelectorAll(".type-grid article");
  const processCards = document.querySelectorAll(".process-rail article");
  const cards = [...typeCards, ...processCards];
  if (!("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("revealed"));
    return;
  }

  function reveal(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }

  const observer = new IntersectionObserver(reveal, { threshold: .22 });
  const processObserver = new IntersectionObserver(reveal, {
    threshold: .04,
    rootMargin: "0px 0px -8% 0px",
  });

  typeCards.forEach((card, index) => {
    card.style.transitionDelay = `${Math.min(index * 70, 364)}ms`;
    observer.observe(card);
  });

  processCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 137}ms`;
    processObserver.observe(card);
  });
}

function setupMomentMobileWheel() {
  const tabsWrap = document.querySelector(".moment-tabs");
  const tabs = [...document.querySelectorAll(".moment-tab")];
  const panel = document.querySelector(".moment-panel");
  const panelTrack = document.querySelector("#momentPanelTrack");
  let ticking = false;
  let panelDragStartX = 0;
  let panelDragStartY = 0;
  let panelDragLastX = 0;
  let panelDragLastTime = 0;
  let panelDragStartScroll = 0;
  let panelDragging = false;
  let panelVelocity = 0;
  let panelInertiaRaf = null;
  let momentPanelDirection = 1;

  function animatePanelSwitch(direction) {
    if (!window.matchMedia("(max-width: 759px)").matches) return;
    momentPanelDirection = direction || momentPanelDirection;
    panel.classList.add("switching");
    panelTrack.style.opacity = ".86";
    requestAnimationFrame(() => {
      panelTrack.style.transition = "opacity .18s ease";
      panelTrack.style.opacity = "1";
      window.setTimeout(() => panel.classList.remove("switching"), 260);
    });
  }

  function selectCenteredTab() {
    if (!window.matchMedia("(max-width: 759px)").matches) return;
    const wrapRect = tabsWrap.getBoundingClientRect();
    const center = wrapRect.left + wrapRect.width / 2;
    let best = tabs[0];
    let bestDistance = Infinity;

    tabs.forEach((tab) => {
      const rect = tab.getBoundingClientRect();
      const tabCenter = rect.left + rect.width / 2;
      const distance = Math.abs(tabCenter - center);
      if (distance < bestDistance) {
        best = tab;
        bestDistance = distance;
      }
    });

    if (!best.classList.contains("active")) {
      const current = Number(document.querySelector(".moment-tab.active")?.dataset.moment || 0);
      const next = Number(best.dataset.moment);
      momentPanelDirection = next > current ? 1 : -1;
      setMoment(Number(best.dataset.moment));
      animatePanelSwitch(momentPanelDirection);
    }
  }

  tabsWrap.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      selectCenteredTab();
      ticking = false;
    });
  }, { passive: true });

  panel.addEventListener("pointerdown", (event) => {
    if (!window.matchMedia("(max-width: 759px)").matches) return;
    window.cancelAnimationFrame(panelInertiaRaf);
    panelDragStartX = event.clientX;
    panelDragStartY = event.clientY;
    panelDragLastX = event.clientX;
    panelDragLastTime = performance.now();
    panelDragStartScroll = tabsWrap.scrollLeft;
    panelDragging = false;
    panelVelocity = 0;
    panel.classList.add("dragging");
    tabsWrap.classList.add("dragging");
    panel.style.transform = "translateX(0)";
    try { panel.setPointerCapture(event.pointerId); } catch (error) {}
  });

  panel.addEventListener("pointermove", (event) => {
    if (!window.matchMedia("(max-width: 759px)").matches) return;
    const previousX = panelDragLastX;
    panelDragLastX = event.clientX;
    const deltaX = panelDragLastX - panelDragStartX;
    const deltaY = event.clientY - panelDragStartY;
    if (!panelDragging && Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY)) {
      panelDragging = true;
    }
    if (!panelDragging) return;
    event.preventDefault();
    const activeIndex = Number(document.querySelector(".moment-tab.active")?.dataset.moment || 0);
    const atStartLimit = activeIndex === 0 && deltaX > 0;
    const atEndLimit = activeIndex === moments.length - 1 && deltaX < 0;
    tabsWrap.scrollLeft = panelDragStartScroll - deltaX;
    panel.style.transform = atStartLimit || atEndLimit
      ? `translateX(${Math.max(-18, Math.min(18, deltaX * .12))}px)`
      : "translateX(0)";
    const scrollDelta = -(event.clientX - previousX);
    const now = performance.now();
    const elapsed = Math.max(now - panelDragLastTime, 8);
    panelVelocity = Math.max(-44, Math.min(44, scrollDelta * (16 / elapsed)));
    panelDragLastTime = now;
    selectCenteredTab();
  });

  function endPanelDrag(event) {
    if (!window.matchMedia("(max-width: 759px)").matches) return;
    function settle() {
      panel.style.transform = "translateX(0)";
      panel.classList.remove("dragging");
      tabsWrap.classList.remove("dragging");
    }

    function animateInertia() {
      tabsWrap.scrollLeft += panelVelocity;
      panelVelocity *= .94;
      selectCenteredTab();
      if (Math.abs(panelVelocity) > .35) {
        panelInertiaRaf = requestAnimationFrame(animateInertia);
      } else {
        settle();
      }
    }

    let settlingWithInertia = false;
    if (panelDragging) {
      if (Math.abs(panelVelocity) > .8) {
        settlingWithInertia = true;
        animateInertia();
      } else {
        settle();
      }
    }
    panelDragging = false;
    if (!settlingWithInertia) {
      panel.style.transform = "translateX(0)";
      panel.classList.remove("dragging");
      tabsWrap.classList.remove("dragging");
    }
    if (event.pointerId !== undefined) {
      try { panel.releasePointerCapture(event.pointerId); } catch (error) {}
    }
  }

  panel.addEventListener("pointerup", endPanelDrag);
  panel.addEventListener("pointercancel", endPanelDrag);
}

function setupPortfolioDrag() {
  const dragThreshold = 38;

  function startPortfolioDrag(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    portfolioDragging = true;
    portfolioDragStartX = event.clientX;
    portfolioDragStartY = event.clientY;
    portfolioDragLastX = event.clientX;
    portfolioDragLastY = event.clientY;
    portfolioPointerId = event.pointerId;
    portfolioPointerTarget = event.target;
    portfolioCarousel.classList.add("dragging");
    window.clearInterval(portfolioTimer);
    try { portfolioCarousel.setPointerCapture(event.pointerId); } catch (error) {}
  }

  portfolioCarousel.addEventListener("pointerdown", startPortfolioDrag, { capture: true });

  portfolioCarousel.addEventListener("pointermove", (event) => {
    if (!portfolioDragging) return;
    portfolioDragLastX = event.clientX;
    portfolioDragLastY = event.clientY;
    const deltaX = portfolioDragLastX - portfolioDragStartX;
    const deltaY = portfolioDragLastY - portfolioDragStartY;
    if (Math.abs(deltaX) > 4 && Math.abs(deltaX) > Math.abs(deltaY)) {
      event.preventDefault();
    }
  });

  function endPortfolioDrag(event) {
    if (!portfolioDragging) return;
    const wasCanceled = event?.type === "pointercancel" || event?.type === "pointerleave";
    const delta = portfolioDragLastX - portfolioDragStartX;
    const verticalDelta = portfolioDragLastY - portfolioDragStartY;
    const moved = wasCanceled || Math.abs(delta) > tapMoveLimit || Math.abs(verticalDelta) > tapMoveLimit;
    portfolioDragging = false;
    portfolioCarousel.classList.remove("dragging");

    if (Math.abs(delta) > dragThreshold) {
      const steps = Math.max(1, Math.min(3, Math.round(Math.abs(delta) / 120)));
      goToPortfolioSlide(portfolioSlideIndex + (delta < 0 ? steps : -steps));
      suppressPortfolioClick = true;
      window.setTimeout(() => { suppressPortfolioClick = false; }, 140);
    } else if (!moved) {
      const trigger = portfolioPointerTarget?.closest?.(".js-open-video");
      if (trigger) {
        suppressPortfolioClick = true;
        openVideo({
          id: trigger.dataset.id,
          platform: trigger.dataset.platform,
          orientation: trigger.dataset.orientation,
          title: trigger.dataset.title,
          sound: true,
          sourceElement: trigger,
        });
        window.setTimeout(() => { suppressPortfolioClick = false; }, 180);
      }
    }
    portfolioPointerTarget = null;

    if (portfolioPointerId !== null) {
      try { portfolioCarousel.releasePointerCapture(portfolioPointerId); } catch (error) {}
      portfolioPointerId = null;
    }

    startPortfolioCarousel();
  }

  portfolioCarousel.addEventListener("pointerup", endPortfolioDrag);
  portfolioCarousel.addEventListener("pointercancel", endPortfolioDrag);
  portfolioCarousel.addEventListener("pointerleave", endPortfolioDrag);
  portfolioCarousel.addEventListener("dragstart", (event) => event.preventDefault(), { capture: true });
  portfolioCarousel.addEventListener("contextmenu", (event) => event.preventDefault());
}

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve();
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise((resolve) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousReady === "function") previousReady();
      resolve();
    };

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  });

  return youtubeApiPromise;
}

loadYouTubeApi();

function openVideo({ id, platform, orientation, title, sound = false, sourceElement = null, track = true }) {
  const isVimeo = platform === "vimeo";
  const directUrl = isVimeo ? `https://vimeo.com/${id}` : `https://www.youtube.com/watch?v=${id}`;
  if (track && window.AnalyticsManager) {
    window.AnalyticsManager.trackVideoOpen(sourceElement, { id, platform, orientation, title });
  }
  modalTitle.textContent = title || "Vídeo Veic";
  if (modalDirectLink) {
    modalDirectLink.href = directUrl;
    modalDirectLink.textContent = isVimeo ? "Abrir direto no Vimeo" : "Abrir direto no YouTube";
    modalDirectLink.classList.add("is-visible");
  }
  modalVideoWrap.className = `modal-video-wrap ${orientation === "horizontal" ? "horizontal" : "vertical"}`;
  modalVideoWrap.innerHTML = "";
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  if (isVimeo) {
    const src = `https://player.vimeo.com/video/${id}?autoplay=1&badge=0&autopause=0&muted=0#t=0s`;
    modalVideoWrap.innerHTML = `<iframe src="${src}" title="${title || "Vídeo Veic"}" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen></iframe>`;
    return;
  }

  modalVideoWrap.innerHTML = `<div id="modalYoutubePlayer"></div>`;
  loadYouTubeApi().then(() => {
    if (!modal.classList.contains("is-open")) return;
    if (activeYoutubePlayer?.destroy) activeYoutubePlayer.destroy();
    activeYoutubePlayer = new YT.Player("modalYoutubePlayer", {
      videoId: id,
      playerVars: {
        autoplay: 1,
        controls: 1,
        playsinline: 1,
        rel: 0,
        modestbranding: 1,
        origin: window.location.origin,
      },
      events: {
        onReady(event) {
          try {
            event.target.unMute();
            event.target.setVolume(100);
            event.target.playVideo();
            window.setTimeout(() => {
              try {
                event.target.unMute();
                event.target.playVideo();
              } catch (error) {}
            }, 220);
          } catch (error) {}
        },
      },
    });
  });
}

function closeVideo() {
  if (activeYoutubePlayer?.destroy) {
    try { activeYoutubePlayer.destroy(); } catch (error) {}
    activeYoutubePlayer = null;
  }
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  modalVideoWrap.innerHTML = "";
  if (modalDirectLink) {
    modalDirectLink.classList.remove("is-visible");
    modalDirectLink.removeAttribute("href");
  }
}

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

document.addEventListener("click", (event) => {
  const heroPlayer = event.target.closest(".hero-player");
  if (heroPlayer) {
    openVideo({
      id: "nrzURq_4LPk",
      platform: "youtube",
      orientation: "vertical",
      title: "Qual é o diferencial",
      sound: true,
      sourceElement: heroPlayer,
    });
    return;
  }

  const videoTrigger = event.target.closest(".js-open-video");
  if (videoTrigger) {
    if (suppressFeaturedClick && videoTrigger.closest(".featured-marquee")) {
      event.preventDefault();
      return;
    }
    if (suppressPortfolioClick && videoTrigger.closest(".portfolio-carousel")) {
      event.preventDefault();
      return;
    }
    openVideo({
      id: videoTrigger.dataset.id,
      platform: videoTrigger.dataset.platform,
      orientation: videoTrigger.dataset.orientation,
      title: videoTrigger.dataset.title,
      sound: true,
      sourceElement: videoTrigger,
    });
    return;
  }

  const portfolioDot = event.target.closest(".portfolio-dot");
  if (portfolioDot) {
    goToPortfolioSlide(Number(portfolioDot.dataset.slide));
    startPortfolioCarousel();
  }
});

function bindFeaturedArrow(button, direction) {
  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    startFeaturedBoost(direction);
    button.setPointerCapture(event.pointerId);
  });
  button.addEventListener("pointerup", stopFeaturedBoost);
  button.addEventListener("pointercancel", stopFeaturedBoost);
  button.addEventListener("pointerleave", stopFeaturedBoost);
}

bindFeaturedArrow(featuredLeft, -1);
bindFeaturedArrow(featuredRight, 1);

portfolioPrev.addEventListener("click", () => {
  goToPortfolioSlide(portfolioSlideIndex - 1);
  startPortfolioCarousel();
});

portfolioNext.addEventListener("click", () => {
  goToPortfolioSlide(portfolioSlideIndex + 1);
  startPortfolioCarousel();
});

document.querySelectorAll(".moment-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    setMoment(Number(tab.dataset.moment), true);
  });
});

momentDots?.addEventListener("click", (event) => {
  const dot = event.target.closest(".moment-dot");
  if (!dot) return;
  setMoment(Number(dot.dataset.moment), true);
});

document.querySelectorAll(".need").forEach((need) => {
  need.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 759px)").matches) {
      const isAlreadyOpen = need.classList.contains("active") && need.nextElementSibling?.classList.contains("mobile-recommendation");
      if (isAlreadyOpen) {
        closeMobileRecommendation({ animate: true });
        return;
      }

      closeMobileRecommendation();
      need.classList.add("active");
      need.insertAdjacentHTML("afterend", mobileRecommendationHtml(Number(need.dataset.need)));
      requestAnimationFrame(() => {
        need.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }
    document.querySelectorAll(".need").forEach((item) => item.classList.remove("active"));
    need.classList.add("active");
    renderRecommendation(Number(need.dataset.need));
  });
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".mobile-recommendation-close")) {
    closeMobileRecommendation({ animate: true });
  }
});

faqToggle.addEventListener("click", () => {
  faqExpanded = !faqExpanded;
  renderFaq();
});

modalClose.addEventListener("click", closeVideo);
modalBackdrop.addEventListener("click", closeVideo);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeVideo();
});

renderFeatured();
setupFeaturedDrag();
animateFeatured();
renderPortfolio();
setupPortfolioDrag();
startPortfolioCarousel();
renderMoment(0);
renderRecommendation(0);
if (window.matchMedia("(min-width: 760px)").matches) {
  document.querySelector('.need[data-need="0"]')?.classList.add("active");
}
renderFaq();
setupRevealAnimations();
setupMomentMobileWheel();
AnalyticsManager.init();
