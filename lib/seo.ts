import type { Metadata } from 'next';
import type { Recipe } from '@/types/recipe';

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
