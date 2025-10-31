import { getRecipes } from '@/lib/api';
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
