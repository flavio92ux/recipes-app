import { getRecipes } from '@/lib/api';
import RecipeList from '@/components/RecipeList';
import { RecipeSummary } from '@/types/recipe';
export const dynamic = 'force-static';


export async function generateStaticParams(): Promise<{ category: string }[]> {
  try {
    const res = await fetch('http://localhost:3001/api/receitas');

    if (!res.ok) return [];

    const data = await res.json();

    const items: RecipeSummary[] = data.items || [];
    const categories = Array.from(
      new Set(items.map((r) => r.category?.toLowerCase()).filter(Boolean))
    );
    return categories.map((category) => ({ category }));
  } catch (err) {
    return [];
  }
}

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
