import type { Metadata } from 'next';
import type { Recipe } from '@/types/recipe';

/**
 * Gera metadata para a página inicial (layout.tsx).
 * Usar em export const metadata no app/layout.tsx
 */
export const homeMetadata: Metadata = {
  title: 'Delícias na Cozinha | Receitas Fáceis e Rápidas',
  description:
    'Descubra receitas deliciosas e práticas para o dia a dia. Encontre opções doces, salgadas, massas, pratos fit e muito mais para todas as ocasiões. Aprenda a cozinhar com receitas simples e saborosas.',
  keywords: [
    'receitas',
    'cozinha',
    'doces',
    'salgados',
    'fáceis',
    'rápidas',
    'culinária',
    'práticas',
    'gastronomia',
  ],
  authors: [{ name: 'Delícias na Cozinha' }],
  openGraph: {
    title: 'Delícias na Cozinha | Receitas Fáceis e Rápidas',
    description:
      'Descubra receitas deliciosas e práticas para o dia a dia. Encontre opções doces, salgadas, massas, pratos fit e muito mais para todas as ocasiões. Aprenda a cozinhar com receitas simples e saborosas.',
    url: 'https://deliciasnacozinha.com',
    siteName: 'Delícias na Cozinha',
    images: [
      {
        url: 'http://localhost:3000/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Delícias na Cozinha - Receitas Fáceis e Rápidas',
      },
    ],
    type: 'website',
    locale: 'pt_BR',
  },
  icons: {
    icon: '/favicon.ico',
  },
  alternates: {
    canonical: 'http://localhost:3000/',
  },
  metadataBase: new URL('https://deliciasnacozinha.com'),
  publisher: 'Delícias na Cozinha',
  robots: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

/**
 * Gera metadata do Next (title, description, OG, twitter, canonical).
 * Usar em generateMetadata() dentro de app/receitas/[slug]/page.tsx
 */
export function recipeMetadata(recipe: Recipe): Metadata {
  const title = recipe.seo?.title ?? recipe.title;
  const description = recipe.seo?.description ?? recipe.description ?? '';
  const canonical = recipe.seo?.canonical ?? `/receitas/${recipe.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      images: recipe.image ? [{ url: recipe.image }] : undefined,
      type: 'article',
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
    },
  };
}

/**
 * Gera metadata para páginas de categorias.
 * Usar em generateMetadata() dentro de app/[category]/page.tsx
 */
export function categoryMetadata(category: string): Metadata {
  const title = `Receitas de ${category} | Delícias na Cozinha`;
  const description = `Descubra as melhores receitas de ${category} no Delícias na Cozinha. Explore nossa coleção completa de receitas práticas e deliciosas para todas as ocasiões. Encontre inspiração culinária e aprenda novas técnicas de preparo.`;

  return {
    title,
    description,
    keywords: [
      'receitas',
      category,
      'cozinha',
      'culinária',
      'doces',
      'salgados',
      'gastronomia',
    ],
    openGraph: {
      title,
      description,
      url: `https://deliciasnacozinha.com/${category}`,
      siteName: 'Delícias na Cozinha',
      images: [
        {
          url: `https://deliciasnacozinha.com/images/${category}-og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `Receitas de ${category} - Delícias na Cozinha`,
        },
      ],
      type: 'website',
      locale: 'pt_BR',
    },
    alternates: {
      canonical: `https://deliciasnacozinha.com/${category}`,
    },
    robots: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };
}

/**
 * Gera metadata para páginas de tags.
 * Usar em generateMetadata() dentro de app/tag/[tag]/page.tsx
 */
export function tagMetadata(tag: string): Metadata {
  const decodedTag = decodeURIComponent(tag);
  const title = `Receitas com tag ${decodedTag} | Delícias na Cozinha`;
  const description = `Explore nossa coleção de receitas com a tag ${decodedTag}. Descubra pratos deliciosos e práticos para todas as ocasiões. Encontre receitas selecionadas que combinam com seu estilo de vida e preferências culinárias.`;

  return {
    title,
    description,
    keywords: [
      'receitas',
      decodedTag,
      'cozinha',
      'culinária',
      'gastronomia',
    ],
    openGraph: {
      title,
      description,
      url: `https://deliciasnacozinha.com/tag/${tag}`,
      siteName: 'Delícias na Cozinha',
      images: [
        {
          url: `https://deliciasnacozinha.com/images/${tag}-og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `Receitas com tag ${decodedTag} - Delícias na Cozinha`,
        },
      ],
      type: 'website',
      locale: 'pt_BR',
    },
    alternates: {
      canonical: `https://deliciasnacozinha.com/tag/${tag}`,
    },
    robots: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };
}

/**
 * Gera JSON-LD (schema.org) para a página inicial.
 * Retorna string pronta para injetar em <script type="application/ld+json">.
 */
export function homeJsonLd(): string {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://deliciasnacozinha.com/',
    name: 'Delícias na Cozinha',
    description: 'Descubra receitas deliciosas e práticas para o dia a dia. Encontre opções doces, salgadas, massas, pratos fit e muito mais para todas as ocasiões.',
  };

  return JSON.stringify(ld);
}

/**
 * Gera JSON-LD (schema.org) para receitas.
 * Retorna string pronta para injetar em <script type="application/ld+json">.
 */
export function recipeJsonLd(recipe: Recipe): string {
  const ld: any = {
    '@context': 'https://schema.org/',
    '@type': 'Recipe',
    name: recipe.title,
    author: recipe.author ? { '@type': 'Person', name: recipe.author } : undefined,
    datePublished: recipe.publishedAt,
    description: recipe.description,
    recipeCategory: recipe.category,
    recipeCuisine: recipe.tags?.join(', '),
    prepTime: recipe.prepTime ? `PT${recipe.prepTime}M` : undefined,
    recipeYield: recipe.servings ? String(recipe.servings) : undefined,
    image: recipe.image ? [recipe.image] : undefined,
    recipeIngredient: recipe.ingredients ?? undefined,
    recipeInstructions: recipe.steps?.map((s) => ({ '@type': 'HowToStep', text: s })) ?? undefined,
  };

  // Remover propriedades undefined antes de serializar
  const cleaned = Object.fromEntries(
    Object.entries(ld).filter(([, v]) => v !== undefined && v !== null)
  );

  return JSON.stringify(cleaned);
}
