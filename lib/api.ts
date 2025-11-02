import type { Recipe, RecipeSummary } from '@/types/recipe';

const API_BASE_URL = 'http://localhost:3001';

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
    { next: { revalidate: 60, tags } }
  );

  if (!response.ok) throw new Error(`Erro ao buscar receitas: ${response.statusText}`);
  return response.json();
}

/**
 * Retorna uma receita completa pelo slug
 */
export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const response = await fetch(`${API_BASE_URL}/api/receitas/${slug}`, {
    next: { revalidate: 60, tags: [`recipe:${slug}`] },
  });
  if (!response.ok) return null;
  return response.json();
}

/**
 * Categorias e tags
 */
export async function getCategories() {
  const response = await fetch(`${API_BASE_URL}/api/categorias`, {
    next: { revalidate: 3600, tags: ['categories'] },
  });
  return response.json();
}

export async function getTags() {
  const response = await fetch(`${API_BASE_URL}/api/tags`, {
    next: { revalidate: 3600, tags: ['tags'] },
  });
  return response.json();
}

export async function getSlugs() {
  const response = await fetch(`${API_BASE_URL}/api/slugs`, {
    next: { revalidate: 3600, tags: ['slugs'] },
  });
  return response.json();
}
