import { getRecipes } from '@/lib/api';
import RecipeList from '@/components/RecipeList';
import { RecipeSummary } from '@/types/recipe';

export async function generateStaticParams(): Promise<{ category: string }[]> {
  try {
    const res = await fetch('http://localhost:3001/api/categorias');

    if (!res.ok) return [];

    const json = await res.json();

    const items = json.items || [];
    if (items.length === 0) return [];
    if (typeof items[0] === 'string') {
      return items.map((c: string) => ({ category: c }));
    }

    return items;
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
