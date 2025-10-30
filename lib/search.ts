import { getRecipes } from '@/lib/api';
import type { RecipeSummary } from '@/types/recipe';

/**
 * Normaliza texto removendo acentos e transformando em minúsculas.
 */
function normalize(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/**
 * Busca receitas por termo ou categoria.
 * @param query termo de busca digitado pelo usuário
 * @param category categoria opcional
 */
export async function searchRecipes(
  query?: string,
  category?: string
): Promise<RecipeSummary[]> {
  const data = await getRecipes();
  let items = data.items;

  if (category) {
    const normalizedCategory = normalize(category);
    items = items.filter((r) =>
      normalize(r.category).includes(normalizedCategory)
    );
  }

  if (query && query.trim().length > 0) {
    const normalizedQuery = normalize(query);
    items = items.filter((r) => {
      const haystack =
        normalize(r.title) +
        ' ' +
        normalize(r.teaser ?? '') +
        ' ' +
        normalize(r.category);
      return haystack.includes(normalizedQuery);
    });
  }

  return items;
}
