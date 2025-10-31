import type { Recipe, RecipeSummary } from '@/types/recipe';

/**
 * Base URL para a API
 */
const API_BASE_URL = 'http://localhost:3001';

/**
 * Retorna todas as receitas (resumo).
 * Faz uma requisição GET /api/receitas
 */
export async function getRecipes(): Promise<{ total: number; items: RecipeSummary[] }> {
  const response = await fetch('http://localhost:3001/api/receitas', {
    next: { tags: ['home'] }
  });
  const json = await response.json();
  return {
    total: json.total,
    items: json.items,
  };
}

/**
 * Retorna uma receita completa pelo slug.
 * Faz uma requisição GET /api/receitas/[slug]
 */
export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const response = await fetch(`${API_BASE_URL}/api/receitas/${slug}`);
  if (!response.ok) return null;
  return response.json();
}

/**
 * Retorna todas as receitas de uma categoria específica
 * Faz uma requisição GET /api/receitas?category=[category]
 */
export async function getRecipesByCategory(category: string): Promise<{ total: number; items: RecipeSummary[] }> {
  const response = await fetch(`${API_BASE_URL}/api/receitas?category=${encodeURIComponent(category)}`);
  const json = await response.json();
  return {
    total: json.total,
    items: json.items,
  };
}

/**
 * Retorna todas as categorias disponíveis
 * Faz uma requisição GET /api/categorias
 */
export async function getCategories(): Promise<{ total: number; items: string[] }> {
  const response = await fetch(`${API_BASE_URL}/api/categorias`);
  const json = await response.json();

  return {
    total: json.total,
    items: json.items,
  };
}

export async function getSlugs(): Promise<{ total: number; items: string[] }> {
  const response = await fetch(`${API_BASE_URL}/api/slugs`);
  const json = await response.json();

  return {
    total: json.total,
    items: json.items,
  };
}
