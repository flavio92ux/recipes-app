import { getRecipes } from '@/lib/api';
import RecipeList from '@/components/RecipeList';
import { RecipeSummary } from '@/types/recipe';

// Revalidação a cada 60s para simular ISR de página estática
export const revalidate = 60;

export default async function HomePage({ searchParams }: { searchParams?: { category?: string } | Promise<{ category?: string } | undefined> }) {
  const data = await getRecipes();

  const resolved = await searchParams;
  const category = resolved?.category;

  let items: RecipeSummary[] = data.items;

  if (category) {
    items = items.filter(
      (r) => r.category.toLowerCase() === category.toLowerCase()
    );
  }

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">
        {category ? `Receitas: ${category}` : 'Últimas receitas'}
      </h1>

      {items.length === 0 ? (
        <p>Nenhuma receita encontrada.</p>
      ) : (
        <RecipeList items={items} />
      )}
    </section>
  );
}