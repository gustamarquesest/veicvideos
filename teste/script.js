const featuredVideos = [
  { id: "rsau38g08H0", p: "youtube", o: "vertical", tag: "Anúncio de Patrocínio", title: "Betim Futebol" },
  { id: "cPl8z5m_nwY", p: "youtube", o: "horizontal", tag: "Case de Sucesso", title: "Cineart" },
  { id: "t3HKRTObtrU", p: "youtube", o: "vertical", tag: "Backstage + Case de Sucesso", title: "Cineart · Meet Tecnologia" },
  { id: "P8hNnOzTfTo", p: "youtube", o: "horizontal", tag: "Apresentação de Serviços", title: "UNE Internet" },
  { id: "t2jOdfkf1n0", p: "youtube", o: "vertical", tag: "Campanha de Marketing", title: "Betim Vs Cruzeiro" },
  { id: "CgfEWgE_8Aw", p: "youtube", o: "horizontal", tag: "Case de Sucesso", title: "Biologistica · Meet Tecnologia" },
  { id: "jeY8AvM-iUY", p: "youtube", o: "vertical", tag: "Treinamento NR", title: "Registro da ação" },
  { id: "AVlMyYiXCCk", p: "youtube", o: "horizontal", tag: "Case de Sucesso", title: "Grupo Avante · Meet Tecnologia" },
  { id: "zpbKSZBjGB8", p: "youtube", o: "vertical", tag: "Campanha", title: "Conselho da Massa" },
  { id: "1195816891", p: "vimeo", o: "vertical", tag: "Registro do Festival", title: "Mangalarga Marchador" },
  { id: "1194588209", p: "vimeo", o: "vertical", tag: "Sorteio Páscoa", title: "Confiber · Cacau Show" },
  { id: "MI6pCyYpMlc", p: "youtube", o: "vertical", tag: "Anúncio de Promoção", title: "Confiber · Cacau Show" },
];

const allVideos = [
  { id: "oDRUYh7xOBs", p: "youtube", o: "vertical", tag: "Apresentação de Benefícios", title: "Benefícios Fibraxx" },
  { id: "fAzmIuYKra0", p: "youtube", o: "horizontal", tag: "Case de Sucesso", title: "Grupo AVG · Meet Tecnologia" },
  { id: "NxeCva_bdxU", p: "youtube", o: "vertical", tag: "Registro do Festival", title: "Mangalarga marchador" },
  { id: "t3HKRTObtrU", p: "youtube", o: "vertical", tag: "Backstage + Case de Sucesso", title: "Cineart · Meet Tecnologia" },
  { id: "aC_lpOFyDJE", p: "youtube", o: "vertical", tag: "Apresentação de Produto", title: "Deezer · Confiber" },
  { id: "BgJzvmtNZP4", p: "youtube", o: "horizontal", tag: "Festival", title: "Circuito Cultural Barreiro" },
  { id: "t2jOdfkf1n0", p: "youtube", o: "vertical", tag: "Ação de Campanha", title: "Betim Vs Cruzeiro" },
  { id: "hX0tfTg9-Vw", p: "youtube", o: "vertical", tag: "Backstage + Case de Sucesso", title: "Biologistica · Meet Tecnologia" },
  { id: "9jIKnhQFhbg", p: "youtube", o: "vertical", tag: "Apresentação de Benefícios", title: "Fibraxx" },
  { id: "cPl8z5m_nwY", p: "youtube", o: "horizontal", tag: "Case de Sucesso", title: "Cineart · Meet Tecnologia" },
  { id: "BRhNBATj9Z0", p: "youtube", o: "vertical", tag: "Conteúdo Institucional", title: "Palestra no Colégio Santo Agostinho · Meet Tecnologia" },
  { id: "SIpWQ_e89oo", p: "youtube", o: "vertical", tag: "Anúncio", title: "Dia dos Namorados" },
  { id: "P8hNnOzTfTo", p: "youtube", o: "horizontal", tag: "Apresentação de Serviços", title: "UNE Internet" },
  { id: "1196950750", p: "vimeo", o: "vertical", tag: "Conteúdo Institucional", title: "Endomarketing Dia das Mulheres" },
  { id: "1pbQqkS5EyU", p: "youtube", o: "vertical", tag: "Apresentação de Produto", title: "Disney + · Confiber" },
  { id: "AVlMyYiXCCk", p: "youtube", o: "horizontal", tag: "Case de Sucesso", title: "Grupo Avante · Meet Tecnologia" },
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
  { id: "3jOBzTjl9Lc", p: "youtube", o: "vertical", tag: "Convite Festival", title: "Maikin" },
  { id: "-h53nPnf3JQ", p: "youtube", o: "vertical", tag: "Apresentação de Serviços", title: "Acesso Assistido" },
  { id: "4F6CzKbNvZc", p: "youtube", o: "vertical", tag: "Convite Festival", title: "Euocêeozé" },
  { id: "A9WNZacvW50", p: "youtube", o: "vertical", tag: "Convite Festival", title: "Grupo Guararás" },
  { id: "Qun6ERFAS4I", p: "youtube", o: "vertical", tag: "Convite Festival", title: "UNUN2" },
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
    videos: ["Anúncios em vídeo", "Conteúdo para Instagram", "Reels e Shorts", "Vídeos educativos", "Teasers de impacto"],
    where: "Meta Ads · Google Ads · Instagram · YouTube · LinkedIn",
    examples: ["rsau38g08H0", "zpbKSZBjGB8", "MI6pCyYpMlc"],
  },
  {
    stage: "Apresentação",
    kicker: "Explicar quem é a empresa",
    desc: "Vídeos para apresentar a empresa, produtos, serviços e diferenciais com clareza.",
    videos: ["Vídeo institucional", "Apresentação da empresa", "Produtos e serviços", "Demonstrações", "Landing Page com vídeo"],
    where: "Site · Landing Page · WhatsApp · Apresentações comerciais · YouTube",
    examples: ["P8hNnOzTfTo", "aC_lpOFyDJE", "oDRUYh7xOBs"],
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
    where: "Intranet · WhatsApp corporativo · Reuniões internas · TV corporativa",
    examples: ["jeY8AvM-iUY", "1196950750", "BRhNBATj9Z0"],
  },
];

const recommendations = [
  {
    title: "Anúncios e geração de demanda",
    desc: "Vídeos para aumentar o alcance da marca, atrair novas pessoas e gerar oportunidades comerciais de forma consistente.",
    pills: ["Anúncios Meta Ads", "Anúncios Google Ads", "Campanhas promocionais", "Lançamentos", "Teasers de impacto"],
    examples: ["rsau38g08H0", "Q-Gt_kSUTEE", "zpbKSZBjGB8"],
  },
  {
    title: "Apresentação e presença digital",
    desc: "Vídeos para apresentar produtos, serviços e diferenciais de forma clara, profissional e acessível.",
    pills: ["Landing Page com vídeo", "Vídeo institucional", "Produtos e serviços", "Demonstrações", "Vídeos para WhatsApp"],
    examples: ["P8hNnOzTfTo", "oDRUYh7xOBs", "aC_lpOFyDJE"],
  },
  {
    title: "Autoridade e conteúdo",
    desc: "Vídeos para gerar descoberta, educar audiência e ampliar presença no ambiente digital.",
    pills: ["Instagram", "YouTube", "LinkedIn", "Conteúdo educativo", "Mini cursos"],
    examples: ["JzY1JbbS7x4", "G4q5jUkg8VE", "4J12L2Xlvh8"],
  },
  {
    title: "Vendas e conversão",
    desc: "Vídeos para gerar confiança, reduzir objeções e facilitar a tomada de decisão.",
    pills: ["Cases de sucesso", "Depoimentos", "VSL", "Vídeos comerciais", "Convites para demo"],
    examples: ["cPl8z5m_nwY", "CgfEWgE_8Aw", "fAzmIuYKra0"],
  },
  {
    title: "Experiência e fidelização",
    desc: "Vídeos para melhorar a experiência do cliente, aumentar satisfação e fortalecer relacionamento após a compra.",
    pills: ["Boas-vindas", "Onboarding", "Tutoriais", "FAQ em vídeo", "Upsell"],
    examples: ["PodfSqi6ru8", "1196948372", "XbhVd3a0sEI"],
  },
  {
    title: "Comunicação interna",
    desc: "Vídeos para fortalecer cultura, acelerar integração e melhorar a comunicação entre equipes.",
    pills: ["Integração", "Treinamentos", "Cultura", "Procedimentos", "Endomarketing"],
    examples: ["jeY8AvM-iUY", "1196950750", "BRhNBATj9Z0"],
  },
  {
    title: "Eventos e ações corporativas",
    desc: "Vídeos para registrar, divulgar e ampliar o impacto de eventos, campanhas e ações estratégicas.",
    pills: ["Eventos", "Feiras", "Convenções", "Aftermovies", "Lançamentos"],
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
const faqList = document.querySelector("#faqList");
const faqToggle = document.querySelector("#faqToggle");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector("#modalTitle");
const modalVideoWrap = document.querySelector("#modalVideoWrap");
const modalClose = document.querySelector(".modal-close");
const modalBackdrop = document.querySelector(".modal-backdrop");

let portfolioSlideIndex = 0;
let portfolioTimer = null;
let faqExpanded = false;
let featuredOffset = 0;
let featuredHalfWidth = 0;
let featuredDragging = false;
let featuredLastX = 0;
let featuredRaf = null;
let featuredMoved = false;
let suppressFeaturedClick = false;
let featuredDirection = 1;
let featuredSpeedBoost = 1;
let featuredBoostTimer = null;

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

function thumbUrl(video) {
  if (video.p === "vimeo") return "";
  return `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
}

function findVideo(id) {
  return [...featuredVideos, ...allVideos].find((video) => video.id === id) || allVideos[0];
}

function videoButton(video, className = "video-card-media") {
  const image = thumbUrl(video);
  const fallback = `<div class="vimeo-fallback"><span>${video.p === "vimeo" ? "Vimeo" : "Vídeo"}</span></div>`;
  return `
    <button class="${className} js-open-video" type="button" data-id="${video.id}" data-platform="${video.p}" data-orientation="${video.o}" data-title="${video.tag} · ${video.title}">
      ${image ? `<img src="${image}" alt="Frame do vídeo ${video.title}" loading="lazy">` : fallback}
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
    featuredHalfWidth = featuredRail.scrollWidth / 2;
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
    featuredOffset = normalizeFeaturedOffset(featuredOffset + (.55 * featuredSpeedBoost * featuredDirection));
    featuredRail.style.transform = `translateX(${-featuredOffset}px)`;
  }
  featuredRaf = requestAnimationFrame(animateFeatured);
}

function boostFeatured(direction) {
  featuredDirection = direction;
  featuredSpeedBoost = 2;
  window.clearTimeout(featuredBoostTimer);
  featuredBoostTimer = window.setTimeout(() => {
    featuredSpeedBoost = 1;
  }, 1600);
}

function setupFeaturedDrag() {
  featuredRail.addEventListener("pointerdown", (event) => {
    featuredDragging = true;
    featuredMoved = false;
    featuredLastX = event.clientX;
    featuredMarquee.classList.add("dragging");
    featuredRail.setPointerCapture(event.pointerId);
  });

  featuredRail.addEventListener("pointermove", (event) => {
    if (!featuredDragging || !featuredHalfWidth) return;
    const delta = event.clientX - featuredLastX;
    if (Math.abs(delta) > 2) featuredMoved = true;
    featuredLastX = event.clientX;
    featuredOffset = normalizeFeaturedOffset(featuredOffset - (delta * 1.35));
    featuredRail.style.transform = `translateX(${-featuredOffset}px)`;
  });

  function endDrag(event) {
    if (!featuredDragging) return;
    featuredDragging = false;
    featuredMarquee.classList.remove("dragging");
    if (featuredMoved) {
      suppressFeaturedClick = true;
      window.setTimeout(() => { suppressFeaturedClick = false; }, 120);
    }
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
        <div class="portfolio-slide" data-slide="${index}">
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
        ${thumbUrl(video) ? `<img src="${thumbUrl(video)}" alt="Frame do vídeo ${video.title}" loading="lazy">` : `<div class="vimeo-fallback"><span>Vimeo</span></div>`}
        <span class="play-dot"></span>
        <small>${video.tag}<br>${video.title}</small>
      </button>
    `;
  }).join("");
}

function renderMomentVisual(target, item, index) {
  const icons = ["◎", "▣", "⌖", "◇", "♙", "✚"];
  target.innerHTML = `
    <div class="moment-visual" data-stage="${item.stage}">
      <div class="moment-visual-line"></div>
      <div class="moment-visual-card primary">
        <span class="moment-visual-icon">${icons[index] || "▶"}</span>
      </div>
      <div class="moment-visual-card secondary">
        <span class="moment-visual-icon">${String(index + 1).padStart(2, "0")}</span>
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
}

function renderRecommendation(index) {
  const item = recommendations[index];
  document.querySelector("#recTitle").textContent = item.title;
  document.querySelector("#recDesc").textContent = item.desc;
  renderPills(document.querySelector("#recPills"), item.pills);
  renderExampleList(document.querySelector("#recExamples"), item.examples);
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
  const cards = document.querySelectorAll(".type-grid article");
  if (!("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .22 });

  cards.forEach((card, index) => {
    card.style.transitionDelay = `${Math.min(index * 80, 420)}ms`;
    observer.observe(card);
  });
}

function setupMomentMobileWheel() {
  const tabsWrap = document.querySelector(".moment-tabs");
  const tabs = [...document.querySelectorAll(".moment-tab")];
  let scrollTimer = null;

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
      tabs.forEach((tab) => tab.classList.remove("active"));
      best.classList.add("active");
      renderMoment(Number(best.dataset.moment));
    }
  }

  tabsWrap.addEventListener("scroll", () => {
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(selectCenteredTab, 90);
  }, { passive: true });
}

function openVideo({ id, platform, orientation, title, sound = false }) {
  const isVimeo = platform === "vimeo";
  const muteParam = sound ? "mute=0" : "mute=0";
  const src = isVimeo
    ? `https://player.vimeo.com/video/${id}?autoplay=1`
    : `https://www.youtube.com/embed/${id}?autoplay=1&${muteParam}&rel=0`;

  modalTitle.textContent = title || "Vídeo Veic";
  modalVideoWrap.className = `modal-video-wrap ${orientation === "horizontal" ? "horizontal" : "vertical"}`;
  modalVideoWrap.innerHTML = `<iframe src="${src}" title="${title || "Vídeo Veic"}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
}

function closeVideo() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  modalVideoWrap.innerHTML = "";
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
    });
    return;
  }

  const videoTrigger = event.target.closest(".js-open-video");
  if (videoTrigger) {
    if (suppressFeaturedClick && videoTrigger.closest(".featured-marquee")) {
      event.preventDefault();
      return;
    }
    openVideo({
      id: videoTrigger.dataset.id,
      platform: videoTrigger.dataset.platform,
      orientation: videoTrigger.dataset.orientation,
      title: videoTrigger.dataset.title,
    });
    return;
  }

  const portfolioDot = event.target.closest(".portfolio-dot");
  if (portfolioDot) {
    goToPortfolioSlide(Number(portfolioDot.dataset.slide));
    startPortfolioCarousel();
  }
});

featuredLeft.addEventListener("click", () => boostFeatured(-1));
featuredRight.addEventListener("click", () => boostFeatured(1));

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
    document.querySelectorAll(".moment-tab").forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    renderMoment(Number(tab.dataset.moment));
    if (window.matchMedia("(max-width: 759px)").matches) {
      tab.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  });
});

document.querySelectorAll(".need").forEach((need) => {
  need.addEventListener("click", () => {
    document.querySelectorAll(".need").forEach((item) => item.classList.remove("active"));
    need.classList.add("active");
    renderRecommendation(Number(need.dataset.need));
    if (window.matchMedia("(max-width: 759px)").matches) {
      document.querySelector(".recommendation").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
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
startPortfolioCarousel();
renderMoment(0);
renderRecommendation(0);
renderFaq();
setupRevealAnimations();
setupMomentMobileWheel();
