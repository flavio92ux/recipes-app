import fs from 'fs';
import path from 'path';
import type { Recipe, RecipeSummary } from '@/types/recipe';

/**
 * Caminho base para os arquivos de dados locais.
 */
const dataDir = path.join(process.cwd(), 'data');

/**
 * Retorna todas as receitas (resumo).
 * Simula uma requisição GET /api/receitas
 */
export async function getRecipes(): Promise<{ total: number; items: RecipeSummary[] }> {
  const filePath = path.join(dataDir, 'recipes.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const json = JSON.parse(raw);
  return {
    total: json.total,
    items: json.items,
  };
}

/**
 * Retorna uma receita completa pelo slug.
 * Simula uma requisição GET /api/receitas/[slug]
 */
export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const filePath = path.join(dataDir, 'recipes_by_slug.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const map = JSON.parse(raw);
  return map[slug] ?? null;
}
