import type { Recipe, RecipeSummary } from '@/types/recipe';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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
    getFetchOptions(60, tags)
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
    getFetchOptions(60, [`recipe:${slug}`])
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
    getFetchOptions(3600, ['categories'])
  );
  return response.json();
}

export async function getTags() {
  const response = await fetch(
    `${API_BASE_URL}/api/tags`,
    getFetchOptions(3600, ['tags'])
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
