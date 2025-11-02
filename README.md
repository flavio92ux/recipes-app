# **Mini-Portal de Receitas — Desafio Técnico (Front-end / Next.js)**

## 👤 Autor
**Nome:** Flavio Franco  
**Data de entrega:** 3/nov

---

## 1. Visão geral do projeto
O objetivo foi construir um **micro-portal de receitas** inspirado em um CMS headless, com foco em **performance, SEO técnico e escalabilidade**, simulando a estrutura de um grande portal de notícias.

A aplicação foi desenvolvida em **Next.js (App Router)**, consumindo dados a partir de **JSONs locais**.  
As decisões priorizaram **renderização híbrida (SSG/ISR)**, **cache com revalidação** e **boas práticas de SEO**.

---

## 🚀 Como Executar

```bash
# Clone o repositório
git clone https://github.com/flavio92ux/recipes-app.git
cd recipes-app

# Instale as dependências
npm install

# Em um terminal, inicie a API Mock (necessário para os dados)
npm run api

# Em outro terminal, inicie o servidor de desenvolvimento
npm run dev

# O site estará disponível em:
# - Frontend: http://localhost:3000
# - API Mock: http://localhost:3001
```

### Estrutura de URLs disponíveis:
- `/` → Página inicial com lista de receitas
- `/[categoria]` → ex: `/doces`, `/salgados`
- `/receitas/[slug]` → ex: `/receitas/bolo-de-cenoura`
- `/tag/[tag]` → ex: `/tag/facil`, `/tag/rapido`
- `/sobre`, `/contato` → Páginas estáticas

### Variáveis de Ambiente:
```bash
# Crie um arquivo .env.local com:
NEXT_PUBLIC_API_URL=http://localhost:3001
REVALIDATE_SECRET=seu-segredo-aqui  # para usar o endpoint de revalidação
```

---

## ⚙️ 2. Estrutura do projeto

```
app/
├── layout.tsx          → Layout principal com metadata global
├── page.tsx           → Página inicial com lista de receitas
├── [category]/        → Rota dinâmica para categorias
├── receitas/[slug]/   → Rota dinâmica para receitas individuais
├── tag/[tag]/         → Rota dinâmica para tags
├── contato/          → Página estática de contato
├── sobre/           → Página estática institucional
├── politica-de-privacidade/ → Página estática de políticas
└── api/
    └── revalidate/   → Endpoint para invalidação de cache

components/
├── Header.tsx        → Navegação e busca (client component)
├── Footer.tsx        → Rodapé (server component)
├── RecipeCard.tsx    → Card de receita para listagens
├── RecipeList.tsx    → Grid responsivo de receitas
├── RecipeDetail.tsx  → Exibição completa da receita
└── StructuredData.tsx → Componente para JSON-LD

lib/
├── api.ts           → Cliente para API com cache configurado
└── seo.ts          → Funções para metadata e schema.org

data/               → Simulação de CMS headless
├── recipes.json     → Lista resumida de receitas
└── recipes_by_slug.json → Dados completos das receitas

server/               → Simulação de API headless
├── index.js          → Api node onde é feita a interface com CMS headless

types/
├── recipe.ts        → Interfaces Recipe e RecipeSummary
└── global.d.ts      → Declarações globais de tipo
```

### Pontos-chave da arquitetura:

1. **Separação de Responsabilidades**:
   - `app/`: Rotas e pages com metadata específica
   - `components/`: UI reutilizável e isolada
   - `lib/`: Lógica de negócios e utilitários
   - `data/`: Camada de dados simulada
   - `types/`: Definições de tipos compartilhados

2. **Padrões Aplicados**:
   - Server/Client Components claramente definidos
   - Metadata e SEO em cada nível apropriado
   - Cache e revalidação configurados por tipo de conteúdo
   - Tipagem forte em toda a aplicação

3. **Princípios de Design**:
   - Desacoplamento da fonte de dados (fácil migração para CMS)
   - Componentes reutilizáveis e coesos
   - Rotas dinâmicas com parâmetros tipados
   - Separação clara entre UI e lógica de negócios

---

## 3. Renderização (SSR / SSG / ISR)

| Página | Estratégia | Motivo |
|--------|-------------|--------|
| `/` (home) | **SSG + ISR (24h)** | Conteúdo estável, atualização diária é suficiente |
| `/[category]` | **SSG + ISR (12h)** | Categorias mudam pouco, duas atualizações por dia são adequadas |
| `/receitas/[slug]` | **SSG + ISR (24h)** | Receitas raramente são editadas após publicação |
| `/tag/[tag]` | **SSG + ISR (12h)** | Tags mudam pouco, duas atualizações por dia são adequadas |
| Páginas estáticas | **SSG (7d)** | Conteúdo institucional, raramente alterado |

> Trade-off: Priorizando performance e economia de recursos, já que o conteúdo é naturalmente estável.

---

## 4. Estratégia de cache e headers

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

## 5. SEO e Otimizações

### 5.1 Metadata e Tags Essenciais
- **Metadata Dinâmico** via API do Next.js 13+:
  - `<title>` otimizado por página/contexto
  - `<meta description>` com descrições únicas e relevantes
  - `<link rel="canonical">` prevenindo conteúdo duplicado
  - `<meta name="robots">` com diretivas apropriadas

### 5.2 Social Media e OpenGraph
- **OpenGraph completo** para compartilhamento em redes sociais:
  ```typescript
  openGraph: {
    title, description, url, siteName,
    images: [{ url, width, height, alt }],
    locale: 'pt_BR',
    type: 'website' | 'article'
  }
  ```
- **Twitter Cards** para preview rico no Twitter:
  - `twitter:card`: 'summary_large_image'
  - Título e descrição otimizados
  - Imagens dimensionadas corretamente

### 5.3 Estruturação de Dados (schema.org)
- **JSON-LD** implementado para diferentes contextos:
  ```typescript
  // Home page
  WebSite: {
    name: 'Delícias na Cozinha',
    description: '...',
    url: '...'
  }

  // Páginas de receitas
  Recipe: {
    name, author, datePublished,
    recipeCategory, recipeCuisine,
    prepTime, recipeYield,
    recipeIngredient, recipeInstructions
  }
  ```

### 5.4 URLs e Navegação
- **URLs Amigáveis**:
  - `/receitas/[slug]` → URLs descritivas
  - `/[category]` → Categorias sem prefixos
  - `/tag/[tag]` → Taxonomia clara
- **Sitemap XML** dinâmico (`/sitemap.xml`):
  - Todas as receitas com prioridade 0.8
  - Categorias com prioridade 0.7
  - Tags com prioridade 0.6
  - Páginas estáticas com prioridade 0.5

### 5.5 Performance SEO
- **Core Web Vitals** otimizados:
  - LCP melhorado com SSG/ISR
  - CLS zero com dimensões de imagem pré-definidas
  - FID minimizado com hidratação seletiva
- **Mobile-first** com design responsivo
- **Semântica HTML5** com landmarks ARIA
- **Cache inteligente** com revalidação apropriada

### 5.6 Acessibilidade (impacta SEO)
- Landmarks ARIA apropriados (`banner`, `main`, `navigation`)
- Hierarquia de headings correta (h1 → h6)
- Alt text em imagens
- Links descritivos
- Contraste de cores adequado

### 5.7 Internacionalização
- `lang="pt-BR"` configurado no HTML
- Suporte a caracteres especiais
- Formatação de datas localizada
- OpenGraph com `locale` definido
- Conteúdo em português otimizado

---

## 6. Performance

- Imagens otimizadas com `next/image` e `lazy loading` automático.
- Somente `Header` é client-component (busca/autocomplete).
- `app/page.tsx` marcado como `force-static` → TTFB baixo.
- TailwindCSS elimina CSS não utilizado (`content` configurado).
- Build: `next build` → output otimizado em ≈ 120 kB.

---

## 7. API interna

A API é simulada localmente:
- Dados em `data/*.json`.
- Funções de fetch em `lib/api.ts`.
- Endpoint mock opcional (`server/index.js`) na porta **3001**.

Scripts disponíveis:
- `npm run api` → inicia API mock.
- `npm run dev:all` → executa API + Next em paralelo.

---

## 8. Tecnologias e dependências

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

## 9. Segurança
- Endpoint `/api/revalidate` protegido por `REVALIDATE_SECRET`.
- Nenhum dado sensível armazenado localmente.
- Busca client-side sanitizada (sem interpolação direta no HTML).

---

## 10. Trade-offs e próximos passos
- Em produção, os JSONs migrariam para algum CMS.
- Revalidação baseada em **eventos de publicação**.
- Testes unitários com Jest (JSON-LD, componentes isolados).

---

## 11. Como rodar o projeto

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



