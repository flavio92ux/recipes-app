import { getRecipes } from '@/lib/api';
// Força Next.js a tratar essa rota como estática
export const dynamic = 'force-static';
// Revalidação a cada 60s
export const revalidate = 60;

// Pré-gera todas as páginas de categoria conhecidas no build
export async function generateStaticParams() {
  const data = await getRecipes();
  const categories = new Set(data.items.map(recipe => recipe.category.toLowerCase()));
  return Array.from(categories).map(category => ({ category }));
}

import RecipeList from '@/components/RecipeList';
import { RecipeSummary } from '@/types/recipe';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const { category } = resolvedParams;

  const data = await getRecipes();

  const items: RecipeSummary[] = data.items.filter(
    (recipe) => recipe.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Receitas: {category}</h1>

      {items.length === 0 ? (
        <p>Nenhuma receita encontrada para a categoria &quot;{category}&quot;.</p>
      ) : (
        <RecipeList items={items} />
      )}
    </section>
  );
}
