# Guia Completo: Site Veic Vídeos no WordPress + Elementor

---

## PARTE 1 — Configuração Inicial

### 1.1 Hospedagem e Instalação do WordPress

**Recomendação de hospedagem compatível com Elementor:**
- **Hostgator Brasil** ou **Locaweb** (suporte local, bom custo-benefício)
- **Hostinger** (mais barato, bom desempenho)

**Passos após contratar a hospedagem:**
1. Acesse o painel da hospedagem (cPanel)
2. Procure por "WordPress" ou "Instalador de Apps"
3. Clique em instalar WordPress — leva menos de 2 minutos
4. Defina: domínio, usuário e senha de admin
5. Acesse: `seudominio.com.br/wp-admin`

---

### 1.2 Conectando seu Domínio GoDaddy

1. Entre no painel da GoDaddy → **Meus Domínios**
2. Clique no domínio → **Gerenciar DNS**
3. Altere os registros **Nameservers** para os da sua hospedagem
   - Exemplo Hostinger: `ns1.dns-parking.com` / `ns2.dns-parking.com`
   - A hospedagem te fornece esses endereços ao contratar
4. Salve e aguarde até 24h para propagar (normalmente 1–2h)

> **Dica:** Você pode verificar a propagação em: https://dnschecker.org

---

## PARTE 2 — Instalação dos Plugins

### 2.1 Plugins obrigatórios

Vá em **WordPress Admin → Plugins → Adicionar Novo** e instale:

| Plugin | Função | Gratuito? |
|--------|--------|-----------|
| **Elementor** | Editor visual de páginas | Sim (básico) |
| **Elementor Pro** | Recursos avançados (popups, slider) | Pago ~R$120/ano |
| **Hello Elementor** | Tema leve e compatível | Sim |
| **WP Rocket** ou **LiteSpeed Cache** | Velocidade do site | WP Rocket ~R$70/ano |
| **Smush** | Compressão de imagens | Sim |
| **Really Simple SSL** | Certificado HTTPS | Sim |

### 2.2 Tema recomendado

Instale o tema **Hello Elementor**:
- **Aparência → Temas → Adicionar Novo** → busque "Hello Elementor" → Instalar → Ativar

---

## PARTE 3 — Cores, Fontes e Logo no Elementor

### 3.1 Configurar cores da marca

1. No painel do WordPress, clique em **Elementor → Kit do Site**
2. Clique em **Global Colors** (Cores Globais)
3. Adicione suas cores:

| Nome | HEX |
|------|-----|
| Preto Veic | `#131210` |
| Creme Veic | `#FEFBF3` |
| Amarelo Veic | `#FFB600` |

Agora toda vez que você usar cor no Elementor, pode clicar em "Global" e escolher as cores da marca.

### 3.2 Configurar fontes globais

1. No **Kit do Site → Global Fonts**
2. Configure:
   - **Primary** (texto): Inter — Regular 400, Medium 500
   - **Secondary** (títulos): Impact — deixe como está
   - **Text** (corpo): Inter — Regular 400
   - **Accent** (destaques): Alex Brush (para usar com moderação)

Para carregar as fontes Google no Elementor:
- Elementor → Configurações → Avançado → Google Fonts: **Ativar**

### 3.3 Subir o Logo

1. **WordPress Admin → Elementor → Kit do Site → Configurações do Site → Logo do Site**
2. Faça upload do arquivo `logo_1.png` (logo completo amarelo no fundo preto)
3. Para header: use a versão PNG com fundo transparente
   - Recomendo pedir ao designer um PNG transparente do logo completo

---

## PARTE 4 — Estrutura de Páginas

### 4.1 Páginas a criar

Vá em **WordPress → Páginas → Adicionar Nova** e crie:

1. **Início** (página principal — defina como página inicial em Configurações → Leitura)
2. **Portfólio**
3. **Sobre**
4. **Contato**

### 4.2 Definir página inicial

- **Configurações → Leitura → Sua página inicial exibe → Uma página estática**
- Selecione "Início" em Página inicial

---

## PARTE 5 — Montando o Site no Elementor

### 5.1 Cores de fundo

Para cada seção, clique nela → Estilo → Fundo → Cor → `#131210` (preto)

### 5.2 Seção Hero (topo da página)

1. Adicione nova seção de **largura total** (full width)
2. Coloque um **Container** com padding: 120px topo, 80px lados
3. Elementos dentro (arraste os widgets):
   - **Heading** → "Revele Sua Marca no Digital" → Fonte: Impact, maiúsculas, tamanho 72px, cor `#FEFBF3`
   - Palavra "Marca" → cor `#FFB600`
   - **Text Editor** → subtítulo → fonte Inter, 18px, cor `#FEFBF3` com 65% opacidade
   - **Button** → "Ver Portfólio" → cor fundo `#FFB600`, texto `#131210`, arredondamento 4px
   - **Image** → isotipo SVG ao fundo, posição absolute direita, opacidade 5%

### 5.3 Seção de Vídeos em Destaque (Banner rolante)

**Opção A — Plugin Elementor Pro (Carousel/Loop)**

1. Instale o **Elementor Pro** (tem widget de Carrossel)
2. Crie um **Loop Grid** com seus vídeos do YouTube
3. Configure animação CSS para movimento infinito

**Opção B — Plugin gratuito recomendado: "Smart Slider 3"**

1. Instale **Smart Slider 3** (gratuito)
2. Crie um slider com as thumbnails dos vídeos
3. Configure autoplay e velocidade
4. Insira na página via widget do Elementor

### 5.4 Portfólio com Filtros

**Plugin recomendado: "The Plus Addons for Elementor" ou "JetSmartFilters"**

Opção mais simples e gratuita:
1. Instale o plugin **Essential Addons for Elementor** (gratuito)
2. Use o widget **Filterable Gallery**
3. Configure categorias: Tipo de vídeo + Nicho
4. Cada item do portfólio = miniatura do YouTube + título + tags

---

## PARTE 6 — Gerenciando os Vídeos

### 6.1 Como adicionar um vídeo novo

**Método recomendado: Custom Post Type (CPT)**

1. Instale o plugin **CPT UI** (gratuito)
2. Crie um tipo de post chamado "Vídeos"
3. Instale o plugin **Advanced Custom Fields (ACF)** (gratuito)
4. Crie campos para cada vídeo:
   - **URL do YouTube** (texto)
   - **Orientação** (seleção: Vertical / Horizontal)
   - **Tipo** (seleção: Institucional, Produto, Reels, Evento, Marca Pessoal)
   - **Nicho** (seleção: Cervejaria, Bar, Choperia, Gastronomia, Marca Pessoal)
   - **Cliente** (texto)
   - **Thumbnail** (imagem)

**Para adicionar um vídeo:**
1. Vá em **WordPress → Vídeos → Adicionar Novo**
2. Preencha: Título, URL do YouTube, Orientação, Tipo, Nicho, Cliente
3. Faça upload da thumbnail (capture um frame do vídeo)
4. Publique — aparece automaticamente no portfólio!

### 6.2 Como remover um vídeo

1. Vá em **WordPress → Vídeos**
2. Passe o mouse sobre o vídeo
3. Clique em **Lixeira** — removido instantaneamente

### 6.3 URL do YouTube — como pegar

Para qualquer vídeo do YouTube:
- URL completa: `https://www.youtube.com/watch?v=XXXXXXXXXXX`
- O ID do vídeo é o `XXXXXXXXXXX` depois de `v=`
- Para vídeo vertical (Shorts): funciona da mesma forma

---

## PARTE 7 — Modal de Vídeo (player ao clicar)

### Opção 1 — Elementor Pro (Popup)

1. Templates → Popups → Criar Novo Popup
2. Adicione widget de **Vídeo** dentro do popup
3. Configure para abrir ao clicar na thumbnail
4. Ajuste para orientação vertical (9:16) ou horizontal (16:9)

### Opção 2 — Plugin Gratuito: "Otter Blocks" ou "LightBox"

1. Instale **WP Video Lightbox** (gratuito)
2. Coloque shortcode `[wp_video_lightbox video="URL_YOUTUBE"]` na thumbnail
3. Simples e funciona bem

---

## PARTE 8 — Ajustes Visuais Importantes

### 8.1 Fundo preto no site inteiro

1. **Elementor → Kit do Site → Configurações do Site → Tipografia e Cores do Corpo**
2. Cor de fundo do body: `#131210`
3. Cor de texto padrão: `#FEFBF3`

### 8.2 Botão de WhatsApp flutuante

1. Instale o plugin **WPForms** ou **Click to Chat**
2. Configure para abrir: `https://wa.me/5531989736847`
3. Posição: canto inferior direito
4. Cor: `#FFB600`

### 8.3 SSL (HTTPS)

1. Na sua hospedagem, ative o **Certificado SSL Gratuito Let's Encrypt** (todo plano tem)
2. Instale o plugin **Really Simple SSL** no WordPress
3. Ative — o site passa de `http://` para `https://` automaticamente

---

## PARTE 9 — SEO Básico

1. Instale o plugin **Yoast SEO** (gratuito)
2. Configure:
   - Título do site: "Veic Vídeos — Produtora de Vídeos Estratégicos em BH"
   - Descrição: "Produzimos vídeos estratégicos para bares, cervejarias e negócios que querem se posicionar no digital com autoridade."
3. Em cada página, preencha o "Snippet de SEO" do Yoast

---

## PARTE 10 — Checklist Final Antes de Publicar

- [ ] Domínio conectado e HTTPS funcionando
- [ ] Logo subido e aparecendo corretamente
- [ ] Cores da marca configuradas globalmente
- [ ] Fontes Inter e Impact configuradas
- [ ] Página inicial definida
- [ ] Pelo menos 4 vídeos cadastrados no portfólio
- [ ] Filtros de tipo e nicho funcionando
- [ ] Modal de vídeo abrindo ao clicar
- [ ] Link do WhatsApp funcionando
- [ ] SEO básico configurado
- [ ] Site testado no celular (responsivo)
- [ ] Velocidade testada em: https://pagespeed.web.dev

---

## RESUMO RÁPIDO DE PLUGINS

| Plugin | Para que serve | Custo |
|--------|----------------|-------|
| Elementor | Editor visual | Grátis |
| Elementor Pro | Popups, carrossel avançado | ~R$120/ano |
| Hello Elementor | Tema base | Grátis |
| CPT UI | Criar tipo "Vídeos" | Grátis |
| Advanced Custom Fields | Campos do vídeo | Grátis |
| Essential Addons | Galeria com filtros | Grátis |
| WP Video Lightbox | Player ao clicar | Grátis |
| Yoast SEO | SEO | Grátis |
| Really Simple SSL | HTTPS | Grátis |
| Click to Chat | WhatsApp flutuante | Grátis |

---

## Contato para suporte WordPress

Se travar em qualquer passo, pesquise no YouTube: "Elementor [nome do passo] tutorial português" — há muito conteúdo em PT-BR gratuito.

---

*Guia criado para Veic Vídeos — @veicvideos*
