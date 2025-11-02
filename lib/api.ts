import type { Recipe, RecipeSummary } from '@/types/recipe';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Tempos de revalidação em segundos
const REVALIDATE_TIMES = {
  RECIPE: 24 * 60 * 60,      // 24 horas
  LISTING: 12 * 60 * 60,     // 12 horas
  STATIC: 7 * 24 * 60 * 60,  // 7 dias
} as const;

interface FetchOptions extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

function getFetchOptions(revalidate: number, tags: string[]): FetchOptions {
  return {
    next: { revalidate, tags },
    headers: {
      'Cache-Control': `public, s-maxage=${revalidate}, stale-while-revalidate=${revalidate * 2}`,
    },
  };
}

/**
 * Retorna todas as receitas (resumo)
 */
export async function getRecipes(
  category?: string,
  tag?: string
): Promise<{ total: number; items: RecipeSummary[] }> {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (tag) params.append('tag', tag);

  const tags = ['recipes'];
  if (category) tags.push(`category:${category}`);
  if (tag) tags.push(`tag:${tag}`);

  const response = await fetch(
    `${API_BASE_URL}/api/receitas${params.toString() ? `?${params}` : ''}`,
    getFetchOptions(REVALIDATE_TIMES.LISTING, tags)
  );

  if (!response.ok) throw new Error(`Erro ao buscar receitas: ${response.statusText}`);
  return response.json();
}

/**
 * Retorna uma receita completa pelo slug
 */
export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const response = await fetch(
    `${API_BASE_URL}/api/receitas/${slug}`,
    getFetchOptions(REVALIDATE_TIMES.RECIPE, [`recipe:${slug}`])
  );
  if (!response.ok) return null;
  return response.json();
}

/**
 * Categorias e tags
 */
export async function getCategories() {
  const response = await fetch(
    `${API_BASE_URL}/api/categorias`,
    getFetchOptions(REVALIDATE_TIMES.LISTING, ['categories'])
  );
  return response.json();
}

export async function getTags() {
  const response = await fetch(
    `${API_BASE_URL}/api/tags`,
    getFetchOptions(REVALIDATE_TIMES.LISTING, ['tags'])
  );
  return response.json();
}

export async function getSlugs() {
  const response = await fetch(
    `${API_BASE_URL}/api/slugs`,
    getFetchOptions(3600, ['slugs'])
  );
  return response.json();
}
