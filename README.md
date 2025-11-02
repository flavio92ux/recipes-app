# **Mini-Portal de Receitas — Desafio Técnico (Front-end / Next.js)**

## 👤 Autor
**Nome:** Flavio Franco  
**Data de entrega:** 3/nov

---

## 🧱 1. Visão geral do projeto
O objetivo foi construir um **micro-portal de receitas** inspirado em um CMS headless, com foco em **performance, SEO técnico e escalabilidade**, simulando a estrutura de um grande portal de notícias.

A aplicação foi desenvolvida em **Next.js (App Router)**, consumindo dados a partir de **JSONs locais**.  
As decisões priorizaram **renderização híbrida (SSG/ISR)**, **cache com revalidação** e **boas práticas de SEO**.

---

## ⚙️ 2. Estrutura do projeto
app/ → rotas (home, categorias, slug, políticas)
components/ → UI reutilizável (Header, Footer, RecipeCard/List/Detail)
lib/ → API simulada e utilitários de SEO
data/ → JSONs simulando API headless
types/ → Tipagens (Recipe, RecipeSummary)


- Mantive a camada de dados isolada (`lib/api.ts` → `data/`) para permitir troca futura por CMS real.
- Os componentes seguem o padrão **server/client boundary** do App Router.

---

## 🧩 3. Renderização (SSR / SSG / ISR)

| Página | Estratégia | Motivo |
|--------|-------------|--------|
| `/` (home) | **SSG + ISR (24h)** | Conteúdo estável, atualização diária é suficiente |
| `/[category]` | **SSG + ISR (12h)** | Categorias mudam pouco, duas atualizações por dia são adequadas |
| `/receitas/[slug]` | **SSG + ISR (24h)** | Receitas raramente são editadas após publicação |
| `/tag/[tag]` | **SSG + ISR (12h)** | Tags mudam pouco, duas atualizações por dia são adequadas |
| Páginas estáticas | **SSG (7d)** | Conteúdo institucional, raramente alterado |

> Trade-off: Priorizando performance e economia de recursos, já que o conteúdo é naturalmente estável.

---

## ⚡️ 4. Estratégia de cache e headers

- Cada `fetch` usa cache e revalidação otimizados para o tipo de conteúdo:
  - Receitas: 24 horas de cache (`revalidate: 86400`)
  - Listagens (categorias/tags): 12 horas (`revalidate: 43200`)
  - Páginas estáticas: 7 dias (`revalidate: 604800`)
- Endpoint `/api/revalidate` permite invalidação sob demanda:
  - `POST /api/revalidate?tag=recipe:bolo-de-cenoura&secret=...`
  - `POST /api/revalidate?tag=category:doces&secret=...`
- Headers de cache configurados via `Cache-Control`:
  - `public` - permitindo cache em CDNs
  - `s-maxage` - controle de cache no servidor
  - `stale-while-revalidate` - servindo cache enquanto atualiza
- Estratégia adaptada para o fluxo editorial de receitas

---

## 🔍 5. SEO (básico e técnico)

- `<title>` e `<meta description>` dinâmicos via `Metadata` do Next.
- `openGraph`, `twitter` e `canonical` configurados em `lib/seo.ts`.
- **JSON-LD (schema.org)**:
  - `@type: WebSite` na home.
  - `@type: Recipe` em cada receita.
- Faltam: `robots.txt` e `sitemap` (em produção seriam gerados dinamicamente).

---

## 🧮 6. Performance

- Imagens otimizadas com `next/image` e `lazy loading` automático.
- Somente `Header` é client-component (busca/autocomplete).
- `app/page.tsx` marcado como `force-static` → TTFB baixo.
- TailwindCSS elimina CSS não utilizado (`content` configurado).
- Build: `next build` → output otimizado em ≈ 120 kB.

---

## 🔗 7. API interna

A API é simulada localmente:
- Dados em `data/*.json`.
- Funções de fetch em `lib/api.ts`.
- Endpoint mock opcional (`server/index.js`) na porta **3001**.

Scripts disponíveis:
- `npm run api` → inicia API mock.
- `npm run dev:all` → executa API + Next em paralelo.

---

## 🧰 8. Tecnologias e dependências

- **Next.js 16 (App Router)**
- **TypeScript 5**
- **TailwindCSS 3 + PostCSS**
- **React 19**
- **Express + CORS** (para API mock local)
- **ESLint + Config Next**

Motivo das escolhas:
- Modernidade e compatibilidade com RSC/ISR.
- Tailwind pela velocidade e legibilidade do código de estilo.

---

## 🔐 9. Segurança
- Endpoint `/api/revalidate` protegido por `REVALIDATE_SECRET`.
- Nenhum dado sensível armazenado localmente.
- Busca client-side sanitizada (sem interpolação direta no HTML).

---

## 🧭 10. Trade-offs e próximos passos
- Em produção, os JSONs migrariam para CMS (AEM, Contentful, etc.).
- Revalidação baseada em **eventos de publicação**.
- Monitoramento de Core Web Vitals via WebPageTest/Cloudflare Analytics.
- Testes unitários com Jest (JSON-LD, componentes isolados).
- Adicionar A11y completa e sitemap dinâmico.

---

## 🧪 11. Como rodar o projeto

```bash
# 1. Instalar dependências
npm install

# 2. Rodar servidor mock (API local) + frontend
npm run dev:all

# ou separadamente:
npm run api     # inicia API local (porta 3001)
npm run dev     # inicia frontend (porta 3000)

# 3. Build de produção
npm run build && npm start

---

## 📦 12. Resultado do build

O build foi gerado com sucesso usando **Next.js 16.0.1 (Turbopack)** e o ambiente `.env.local`.

```bash
$ npm run build

> recipes-app@0.1.0 build
> next build

▲ Next.js 16.0.1 (Turbopack)
- Environments: .env.local

Creating an optimized production build ...
✔ Compiled successfully in 2.8s
✔ Finished TypeScript in 2.5s
✔ Collecting page data in 488.4ms
✔ Generating static pages (51/51) in 876.7ms
✔ Finalizing page optimization in 11.9ms

Route (app)                                Revalidate  Expire
┌ ○ /                                      1m           1y
├ ○ /_not-found                            1h           1y
├ ○ /[category]                            1m           1y
│  ├ /doce
│  ├ /massa
│  ├ /fit
│  [+5 more paths]
├ ○ /api/revalidate                        1h           1y
├ ○ /contato                               1h           1y
├ ○ /politica-de-privacidade               1h           1y
├ ○ /receitas/[slug]                       1m           1y
│  ├ /receitas/pudim-de-leite-ninho
│  ├ /receitas/bolo-de-cenoura-com-cobertura-de-chocolate
│  ├ /receitas/lasanha-de-frango-com-catupriy
│  [+31 more paths]
├ ○ /robots.txt                            1m           1y
├ ○ /sitemap.xml                           1m           1y
├ ○ /sobre                                 1h           1y
└ ○ /tag/[tag]                             1m           1y
  ├ /tag/sobremesa
  ├ /tag/cremosa
  ├ /tag/festa
  [+26 more paths]

○  (Static)   prerendered as static content  
●  (SSG)      prerendered as static HTML (uses generateStaticParams)  
ƒ  (Dynamic)  server-rendered on demand



