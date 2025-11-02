# **Mini-Portal de Receitas — Desafio Técnico (Front-end / Next.js)**

## 👤 Autor
**Nome:** Flavio Franco  
**Data de entrega:** 2/nov

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
| `/` (home) | **SSG (static)** | Performance e escalabilidade — TTFB mínimo |
| `/[category]` | **SSR / on-demand static** | Número alto de categorias, renderização sob demanda |
| `/receitas/[slug]` | **ISR (revalidate=60)** | Balanceia frescor e custo de rebuild |
| `/tag/[tag]` | **SSG + dynamicParams** | Baixo custo, cacheável |

> Trade-off: usar ISR evita rebuilds totais e mantém conteúdo fresco via revalidação seletiva.

---

## ⚡️ 4. Estratégia de cache e headers

- Cada `fetch` usa `next: { revalidate: 60, tags: ['recipes', 'category'] }`.
- Endpoint `/api/revalidate` permite invalidação seletiva:
  - `POST /api/revalidate?tag=recipes&secret=...`
  - `POST /api/revalidate?path=/receitas/bolo-de-cenoura`
- HTML gerado via SSG/ISR é servido com cache controlado pelo Next e CDN.
- Estratégia simulada, mas equivalente à produção com Redis/edge cache.

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


