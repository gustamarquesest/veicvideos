# Guia Completo — Site Veic Vídeos
## WordPress + Elementor + Cloudflare

---

## ARQUIVOS DESTE PACOTE

| Arquivo | O que é |
|---------|---------|
| `veic_videos_site.html` | Site principal completo (referência + use direto) |
| `lp_cervejarias.html` | Landing page — Cervejarias |
| `lp_bares.html` | Landing page — Bares |
| `lp_choperias.html` | Landing page — Choperias |
| `lp_gastronomia.html` | Landing page — Gastronomia |
| `lp_marca-pessoal.html` | Landing page — Marca Pessoal |
| `lp_reels.html` | Landing page — Reels e Shorts |
| `lp_institucional.html` | Landing page — Vídeo Institucional |
| `lp_produto.html` | Landing page — Vídeo de Produto |
| `lp_eventos.html` | Landing page — Cobertura de Eventos |
| `lp_case-de-sucesso.html` | Landing page — Case de Sucesso |
| `veic-videos-elementor-kit.json` | Kit de marca para importar no Elementor |
| `guia_wordpress_veic_videos.md` | Este guia |

---

## INFORMAÇÕES DO SITE

- **Domínio:** www.veicvideos.com
- **WhatsApp:** (31) 98333-5876 → https://wa.me/5531983335876
- **Instagram:** @veicvideos

---

## PARTE 1 — HOSPEDAGEM E WORDPRESS

### 1.1 Contratar hospedagem

Recomendações (compatíveis com Elementor e Cloudflare):

| Hospedagem | Custo/mês | Observação |
|------------|-----------|------------|
| Hostinger | ~R$10–20 | Melhor custo-benefício |
| Hostgator BR | ~R$15–30 | Bom suporte local |
| Locaweb | ~R$20–40 | Suporte nacional |

**Ao contratar, anote:** IP do servidor (usado na Cloudflare)

### 1.2 Instalar WordPress

1. Acesse o painel (cPanel) da hospedagem
2. Procure "WordPress" ou "Softaculous" → Instalar WordPress
3. Defina: URL, usuário admin, senha forte
4. Acesse: `www.veicvideos.com/wp-admin`

---

## PARTE 2 — CLOUDFLARE + DOMÍNIO

### 2.1 Fluxo completo

GoDaddy (registrou o domínio) → Cloudflare (DNS + CDN + segurança) → Hospedagem (WordPress)

### 2.2 Apontar GoDaddy para Cloudflare (feito uma vez)

1. Cloudflare → clique no domínio → **DNS → Overview**
2. Copie os 2 **Nameservers** (ex: `ada.ns.cloudflare.com`)
3. GoDaddy → Meus Domínios → Gerenciar DNS → **Nameservers → Personalizado**
4. Cole os nameservers → Salvar
5. Aguardar até 24h (geralmente 1-2h)

### 2.3 Apontar Cloudflare para a hospedagem

1. Na hospedagem: copie o **IP do servidor** (no painel/cPanel)
2. Cloudflare → **DNS → Records**
3. Edite o registro **A** com nome `@`:
   - Tipo: `A` | Nome: `@` | IPv4: IP da hospedagem | Proxy: **Nuvem laranja (ativo)**
4. Crie/edite `www`:
   - Tipo: `CNAME` | Nome: `www` | Destino: `@` | Proxy: **Nuvem laranja (ativo)**

> Verificar propagação: https://dnschecker.org

### 2.4 SSL na Cloudflare

1. Cloudflare → **SSL/TLS → Overview** → Modo: **Full**
2. **Edge Certificates:**
   - Always Use HTTPS: **Ativado**
   - Automatic HTTPS Rewrites: **Ativado**
   - Minimum TLS Version: TLS 1.2

> Com isso, HTTPS já funciona. **Não precisa** do plugin Really Simple SSL.

### 2.5 Otimizações Cloudflare (gratuitas)

**Speed → Optimization:**
- Auto Minify: marque **JS, CSS e HTML**
- Brotli: **Ativado**
- Rocket Loader: **Ativado** (melhora carregamento de scripts)

**Caching → Configuration:**
- Caching Level: **Standard**
- Browser Cache TTL: **4 horas**

**Security → Settings:**
- Security Level: **Medium**
- Bot Fight Mode: **Ativado** (gratuito, bloqueia bots)

**Network:**
- HTTP/3 (QUIC): **Ativado**
- 0-RTT Connection Resumption: **Ativado**

---

## PARTE 3 — PLUGINS ESSENCIAIS

### 3.1 Instalação

WordPress Admin → **Plugins → Adicionar Novo** → buscar → Instalar → Ativar

### 3.2 Lista completa

#### EDITOR VISUAL
| Plugin | Função | Custo |
|--------|--------|-------|
| **Elementor** | Editor visual drag-and-drop | Grátis |
| **Elementor Pro** | Popups, carrossel, header/footer personalizados | ~R$120/ano |
| **Hello Elementor** | Tema base leve (OBRIGATÓRIO com Elementor) | Grátis |

**Configuração do Hello Elementor:**
- Aparência → Temas → Instalar → Hello Elementor → Ativar

#### PERFORMANCE E CACHE
| Plugin | Função | Custo |
|--------|--------|-------|
| **LiteSpeed Cache** | Cache + minificação + CDN (melhor com Cloudflare) | Grátis |
| **Smush** | Compressão automática de imagens | Grátis |
| **Lazy Load by WP Rocket** | Imagens carregam só quando visíveis | Grátis |

**Configuração LiteSpeed Cache:**
1. LiteSpeed Cache → **Cache → Ativar Cache → Sim**
2. **Otimização → CSS → Minificar CSS: Sim**
3. **Otimização → JS → Minificar JS: Sim**
4. **Imagem → Comprimir Imagem: Sim**
5. Após qualquer atualização no site: **Gerenciar → Limpar Tudo**

**Limpar cache Cloudflare após atualizar o site:**
Cloudflare → Caching → Purge Cache → **Purge Everything**

#### SEO
| Plugin | Função | Custo |
|--------|--------|-------|
| **Rank Math SEO** | SEO completo (melhor que Yoast, gratuito) | Grátis |
| **Google Site Kit** | Analytics + Search Console direto no WP | Grátis |

**Configuração Rank Math:**
1. Instale e siga o assistente de configuração
2. Conecte ao Google Search Console quando solicitado
3. Para cada página, preencha: Foco de Keyphrase, Título SEO e Meta Descrição
4. **Configurações gerais:**
   - Título do Site: `Veic Vídeos — Produtora de Vídeos Estratégicos em BH`
   - Separador: `—`
5. **Sitemap:** Rank Math → Sitemap → Ativar → submeta em: https://search.google.com/search-console

**Configuração Google Site Kit:**
1. Instale → Conecte com sua conta Google
2. Conecte: Google Analytics 4 + Search Console
3. Dashboards de visitantes aparecem direto no WP admin

#### ANÁLISE E MONITORAMENTO
| Plugin | Função | Custo |
|--------|--------|-------|
| **MonsterInsights Lite** | Analytics simplificado no painel WP | Grátis |
| **Hotjar** (não é plugin) | Mapas de calor e gravação de sessões | Grátis até 35 sessões/dia |

**Hotjar (configuração):**
1. Crie conta em hotjar.com
2. Copie o código de rastreamento
3. No WP: Elementor → Kit do Site → Configurações do Site → CSS Personalizado → cole o código no `<head>`
4. Ou instale o plugin **Hotjar** (busque na loja)

#### SEGURANÇA E ANTIVÍRUS
| Plugin | Função | Custo |
|--------|--------|-------|
| **Wordfence Security** | Firewall, scanner de malware, login protection | Grátis |
| **WPS Hide Login** | Muda a URL do login (dificulta ataques) | Grátis |
| **Limit Login Attempts Reloaded** | Bloqueia tentativas de força bruta | Grátis |

**Configuração Wordfence:**
1. Wordfence → **Firewall → Modo: Enabled and Protecting**
2. **Scan → Iniciar Scan** (faça isso na primeira instalação)
3. **Login Security → Enable 2FA** (ative autenticação 2 fatores para o admin)
4. **Notificações:** configure email para receber alertas de ameaças

**Configuração WPS Hide Login:**
1. Instale → Configurações → WPS Hide Login
2. Mude o URL de login de `/wp-admin` para algo personalizado ex: `/entrada-veic`
3. **ANOTE esse endereço — você vai precisar para acessar o painel**

#### GERENCIAMENTO DE VÍDEOS (PORTFÓLIO)
| Plugin | Função | Custo |
|--------|--------|-------|
| **CPT UI** | Criar tipo de post "Vídeos" | Grátis |
| **Advanced Custom Fields (ACF)** | Campos: URL, orientação, tipo, nicho | Grátis |

**Configuração CPT UI:**
1. CPT UI → Adicionar/Editar Tipos de Post
2. Slug: `videos` | Nome: `Vídeos`
3. Suporte: Título, Imagem Destacada → Salvar

**Configuração ACF:**
1. ACF → Grupos de Campos → Adicionar Novo → "Dados do Vídeo"
2. Campos a criar:

| Campo | Tipo | Opções |
|-------|------|--------|
| URL do YouTube | Texto | Obrigatório |
| Orientação | Seleção | Vertical / Horizontal |
| Tipo de Vídeo | Seleção | Reels, Institucional, Produto, Evento, Marca Pessoal, Case |
| Nicho | Seleção | Cervejaria, Bar, Choperia, Gastronomia, Marca Pessoal |
| Cliente | Texto | Opcional |

3. Mostrar se: Post Type = Vídeos → Publicar

#### FORMULÁRIO E WHATSAPP
| Plugin | Função | Custo |
|--------|--------|-------|
| **WPForms Lite** | Formulário de contato | Grátis |
| **Click to Chat** | Botão WhatsApp flutuante | Grátis |

**Configuração Click to Chat:**
1. Instale → Configurações → Click to Chat
2. Número: `5531983335876`
3. Mensagem padrão: `Olá! Vim pelo site e quero saber mais sobre os serviços.`
4. Posição: Direita inferior | Cor: `#FFB600`

---

## PARTE 4 — IMPORTAR KIT DE MARCA

> Este passo configura todas as cores e fontes automaticamente.

1. WordPress Admin → **Elementor → Kit do Site**
2. Canto superior direito → **⋮ → Importar Kit**
3. Suba o arquivo `veic-videos-elementor-kit.json`
4. Marque todas as opções → **Importar**

**O kit configura:**
- Cores: Preto `#131210`, Creme `#FEFBF3`, Amarelo `#FFB600`
- Fontes: Impact (títulos), Inter (corpo), Alex Brush (accent)
- Botões, formulários, fundo do site
- CSS global com scrollbar amarela, stroke nas letras, classes utilitárias

---

## PARTE 5 — ESTRUTURA DE PÁGINAS

### 5.1 Criar páginas

WordPress → Páginas → Adicionar Nova:

| Página | URL final |
|--------|-----------|
| Início (Home) | veicvideos.com |
| Cervejarias | veicvideos.com/cervejarias |
| Bares | veicvideos.com/bares |
| Choperias | veicvideos.com/choperias |
| Gastronomia | veicvideos.com/gastronomia |
| Marca Pessoal | veicvideos.com/marca-pessoal |
| Reels | veicvideos.com/reels |
| Institucional | veicvideos.com/institucional |
| Produto | veicvideos.com/produto |
| Eventos | veicvideos.com/eventos |
| Case de Sucesso | veicvideos.com/case-de-sucesso |

### 5.2 Definir página inicial

Configurações → Leitura → **Uma página estática** → Selecione "Início"

### 5.3 Configurar URLs amigáveis

Configurações → **Links Permanentes → Nome do post** → Salvar

---

## PARTE 6 — COMO ADICIONAR VÍDEOS

### 6.1 Adicionar vídeo novo (30 segundos)

1. WordPress → **Vídeos → Adicionar Novo**
2. Título do vídeo
3. Thumbnail: Ferramenta recomendada para capturar frame: **Kapwing.com** (gratuito)
4. Preencha os campos ACF:
   - URL do YouTube (ID ou URL completa)
   - Orientação: Vertical ou Horizontal
   - Tipo, Nicho, Cliente
5. Publicar → aparece automaticamente no portfólio

### 6.2 Remover vídeo

WordPress → Vídeos → Lixeira

### 6.3 Pegar o ID do YouTube

- URL curta: `https://youtu.be/XXXXXXXXXXX` → ID = `XXXXXXXXXXX`
- URL longa: `https://www.youtube.com/watch?v=XXXXXXXXXXX` → ID após `v=`
- Shorts: `https://youtube.com/shorts/XXXXXXXXXXX` → ID após `/shorts/`

---

## PARTE 7 — VÍDEOS COM PROBLEMAS

### 7.1 Vídeos bloqueados por direitos autorais no YouTube

**Melhor solução gratuita: Vimeo**

1. Crie conta em **vimeo.com** (plano gratuito)
2. Faça upload do vídeo
3. Privacidade: **"Only people with the private link"** ou **"Hide from Vimeo"**
4. Copie o link de embed
5. No site, use o embed do Vimeo no lugar do YouTube
6. No widget de vídeo do Elementor, cole a URL do Vimeo — ele detecta automaticamente

**Os vídeos bloqueados que você mencionou:**
Esses vídeos precisam ser subidos no Vimeo. O YouTube bloqueou por detecção de música/áudio com direitos autorais mesmo em vídeos não listados.

### 7.2 Vídeos verticais longos (+3 minutos)

Esses vídeos existem normalmente no YouTube (não como Shorts), mas você quer exibi-los em formato 9:16 no site.

**Solução:** No Elementor, ao inserir o widget de vídeo, configure:
- Proporção personalizada: **9:16**
- O player do YouTube se adapta e o vídeo aparece em formato vertical

**No portfólio:** Marque a orientação como "Vertical" no campo ACF — o site já aplica `aspect-ratio: 9/16` automaticamente para esse tipo.

**Links dos seus vídeos verticais longos:**
- https://youtu.be/IyW8TcNd8SI
- https://youtu.be/Urj3M9vlg54
- https://youtu.be/jeY8AvM-iUY

---

## PARTE 8 — FOTOS DE BACKSTAGE

### Onde hospedar as fotos?

**Resposta direta: Suba direto no WordPress (Biblioteca de Mídia).**

Com Cloudflare na frente, as imagens ficam em cache CDN automaticamente — performance excelente sem nenhum serviço externo.

**Antes de fazer upload, comprima as fotos:**
1. Acesse **squoosh.app** (gratuito, online, sem instalar nada)
2. Arraste a foto
3. Selecione WebP, qualidade 80%
4. Objetivo: **menos de 200KB por foto**
5. Faça download e suba no WordPress

O plugin **Smush** também comprime automaticamente após o upload.

---

## PARTE 9 — LANDING PAGES

### 9.1 Como publicar cada landing page no WordPress

Você tem dois caminhos:

**Opção A — Usar os arquivos HTML diretamente:**

Para cada arquivo LP (ex: `lp_cervejarias.html`):
1. WordPress → Páginas → Adicionar Nova
2. Título: `Cervejarias`
3. URL/Slug: `cervejarias`
4. Mude o editor para **Elementor**
5. No Elementor, adicione um widget **HTML** e cole o conteúdo do arquivo `.html`
6. Ou use o plugin **WP Coder** para inserir HTML/CSS/JS completo

**Opção B — Reconstruir com Elementor (recomendada para edição fácil):**

Use o arquivo HTML como referência visual e construa no Elementor. Cada LP tem:
- Hero com título, subtítulo e CTAs
- Grid de vídeos com player modal
- Seção "O que entregamos" com bullets
- Seção de projetos e tipos
- CTA final com WhatsApp

### 9.2 URLs configuradas

As landing pages são acessadas por:

| Nicho | URL |
|-------|-----|
| Cervejarias | veicvideos.com/cervejarias |
| Bares | veicvideos.com/bares |
| Choperias | veicvideos.com/choperias |
| Gastronomia | veicvideos.com/gastronomia |
| Marca Pessoal | veicvideos.com/marca-pessoal |
| Reels e Shorts | veicvideos.com/reels |
| Vídeo Institucional | veicvideos.com/institucional |
| Vídeo de Produto | veicvideos.com/produto |
| Cobertura de Eventos | veicvideos.com/eventos |
| Case de Sucesso | veicvideos.com/case-de-sucesso |

---

## PARTE 10 — RESPONSIVO

### O que já está configurado no site:

**Breakpoints usados:**
- Desktop: acima de 1100px (layout 2 colunas)
- Tablet: 768px–1100px (layout adaptado)
- Mobile: abaixo de 768px (layout coluna única)
- Mobile pequeno: abaixo de 480px (botões empilhados)

**O que muda no mobile:**
- Hero: exibe apenas o texto (mosaic de vídeos some — economiza dados)
- Navegação: hamburger menu
- Grids: viram coluna única
- Fontes: reduzem proporcionalmente com `clamp()`
- Vídeos verticais no portfólio: mantêm proporção 9:16

### Configurar responsivo no Elementor:

1. Elementor → **Configurações → Avançado → Breakpoints**
2. Defina:
   - Mobile: 767px
   - Tablet: 1024px
3. Para cada seção, clique no ícone de dispositivo (celular/tablet) para ajustar padding e tamanhos
4. **Teste:** Use o modo de visualização responsiva do Elementor (ícone de celular no rodapé do editor)

### Teste de responsividade:

- Google: https://search.google.com/test/mobile-friendly
- PageSpeed: https://pagespeed.web.dev (busque nota acima de 80 no mobile)

---

## PARTE 11 — SEO AVANÇADO COM RANK MATH

### 11.1 Configuração inicial

1. Rank Math → Assistente de Configuração → siga os passos
2. Conecte Google Search Console
3. Ative: Rich Snippets, Local SEO, Video SEO

### 11.2 Para cada página/LP, preencha:

- **Focus Keyword:** ex: `vídeos para cervejarias bh`
- **SEO Title:** ex: `Vídeos Estratégicos para Cervejarias em BH | Veic Vídeos`
- **Meta Description:** ex: `Produzimos vídeos que posicionam sua cervejaria no digital. Reels, institucionais e conteúdo que gera resultado. Orçamento sem compromisso.`

### 11.3 Keywords por LP

| LP | Keyword foco |
|----|-------------|
| Cervejarias | vídeos para cervejaria belo horizonte |
| Bares | produção de vídeo para bar bh |
| Institucional | vídeo institucional empresa bh |
| Reels | produção de reels para empresa |
| Case de Sucesso | vídeo depoimento cliente empresa |

### 11.4 Enviar sitemap ao Google

1. Rank Math → Sitemap → URL do sitemap: `veicvideos.com/sitemap_index.xml`
2. Acesse https://search.google.com/search-console
3. Adicione o domínio → Sitemaps → cole a URL acima → Enviar

---

## PARTE 12 — ANÁLISE COM GOOGLE ANALYTICS 4

### 12.1 Criar conta GA4

1. Acesse: https://analytics.google.com
2. Criar conta → Criar propriedade → Web
3. URL: `www.veicvideos.com`
4. Copie o **ID de Medição** (formato: `G-XXXXXXXXXX`)

### 12.2 Conectar ao WordPress

**Via Google Site Kit (recomendado):**
1. Instale o plugin **Google Site Kit**
2. Siga o assistente de configuração
3. Conecte Analytics + Search Console de uma vez

**Via Rank Math:**
1. Rank Math → Geral → Analytics
2. Cole o ID de Medição do GA4
3. Salvar

### 12.3 Eventos importantes para rastrear

O GA4 rastreia automaticamente cliques em links. Configure eventos personalizados para:
- Clique no botão WhatsApp
- Clique em "Solicitar Orçamento"
- Abertura de vídeo no modal

---

## PARTE 13 — CHECKLIST COMPLETO

### Antes de publicar:
- [ ] Hospedagem contratada e WordPress instalado
- [ ] GoDaddy nameservers apontando para Cloudflare
- [ ] Cloudflare registro A com IP da hospedagem (nuvem laranja ativa)
- [ ] SSL modo "Full" + Always Use HTTPS ativados
- [ ] Otimizações Cloudflare configuradas (minify, Brotli, HTTP/3)
- [ ] Tema Hello Elementor ativado
- [ ] Elementor (grátis) instalado
- [ ] Kit `veic-videos-elementor-kit.json` importado
- [ ] Logo `LOGO-PRINCIPAL-Amarelo-Branco.png` subido
- [ ] LiteSpeed Cache configurado
- [ ] Wordfence instalado e scan inicial feito
- [ ] WPS Hide Login configurado (anote a nova URL!)
- [ ] Rank Math configurado + sitemap enviado ao Google
- [ ] Google Analytics 4 conectado
- [ ] Google Site Kit instalado e conectado
- [ ] CPT UI + ACF instalados → tipo "Vídeos" criado
- [ ] Pelo menos 5 vídeos cadastrados no portfólio
- [ ] Todas as landing pages publicadas com slugs corretos
- [ ] Click to Chat configurado com número (31) 98333-5876
- [ ] Teste de responsividade: mobile-friendly test
- [ ] PageSpeed acima de 75 no mobile
- [ ] Limpar cache: LiteSpeed + Cloudflare

### Após publicar (primeiros 30 dias):
- [ ] Verificar no Google Search Console se o site está indexado
- [ ] Criar posts de blog (melhora SEO — escreva sobre cada nicho)
- [ ] Adicionar fotos de backstage na galeria
- [ ] Conectar Instagram ao site (plugin: Smash Balloon Instagram Feed)
- [ ] Verificar relatórios do GA4 semanalmente

---

## RESUMO DE TODOS OS PLUGINS

| Plugin | Categoria | Custo |
|--------|-----------|-------|
| Elementor | Editor visual | Grátis |
| Elementor Pro | Editor avançado | ~R$120/ano |
| Hello Elementor | Tema base | Grátis |
| LiteSpeed Cache | Performance | Grátis |
| Smush | Imagens | Grátis |
| Lazy Load by WP Rocket | Performance | Grátis |
| Rank Math SEO | SEO | Grátis |
| Google Site Kit | Analytics | Grátis |
| MonsterInsights Lite | Analytics | Grátis |
| Wordfence Security | Segurança | Grátis |
| WPS Hide Login | Segurança | Grátis |
| Limit Login Attempts | Segurança | Grátis |
| CPT UI | Portfólio | Grátis |
| Advanced Custom Fields | Portfólio | Grátis |
| WPForms Lite | Formulário | Grátis |
| Click to Chat | WhatsApp | Grátis |
| WP Coder | HTML customizado | Grátis |
| Smash Balloon Instagram | Feed Instagram | Grátis |

**Total investimento em plugins: R$ 0 (fora o Elementor Pro opcional)**

---

## DICA FINAL — MANUTENÇÃO MENSAL

1. **Atualizar plugins:** WordPress → Painel → Atualizações → Atualizar tudo
2. **Fazer backup:** Instale o plugin **UpdraftPlus** (grátis) — backup automático semanal para Google Drive
3. **Limpar cache:** após qualquer atualização de conteúdo
4. **Verificar Analytics:** monitorar páginas mais acessadas e origem do tráfego
5. **Adicionar novos vídeos:** WordPress → Vídeos → Adicionar Novo

---

*Guia criado para Veic Vídeos — veicvideos.com · @veicvideos*
