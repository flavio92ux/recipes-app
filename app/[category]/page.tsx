import { getCategories, getRecipes } from '@/lib/api';
import { categoryMetadata } from '@/lib/seo';
import RecipeList from '@/components/RecipeList';
import { RecipeSummary } from '@/types/recipe';
import { Metadata } from 'next';

export async function generateStaticParams(): Promise<{ category: string }[]> {
  try {
    const data = await getCategories()

    const items = data.items || [];
    if (items.length === 0) return [];
    if (typeof items[0] === 'string') {
      return items.map((c: string) => ({ category: c }));
    }

    return items.map((c: string) => ({ category: c }));
  } catch (err) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { category } = resolvedParams;

  return categoryMetadata(category);
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const { category } = resolvedParams;

  const data = await getRecipes(category);

  const items: RecipeSummary[] = data.items;

  return (
    <section>
      <h1 className="text-3xl font-bold mb-2">Receitas de {category}</h1>
      <h2 className="text-lg text-gray-600 mb-6">Explore nossa coleção de receitas deliciosas da categoria {category}</h2>

      {items.length === 0 ? (
        <p>Nenhuma receita encontrada para a categoria &quot;{category}&quot;.</p>
      ) : (
        <RecipeList items={items} />
      )}
    </section>
  );
}
