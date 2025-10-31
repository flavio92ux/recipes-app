import { getRecipeBySlug } from '@/lib/api';
import RecipeDetail from '@/components/RecipeDetail';
import { recipeMetadata } from '@/lib/seo';

// Define revalidação incremental (ISR)
export const revalidate = 60;

// Geração de metadados dinâmicos (SEO)
export async function generateMetadata({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const recipe = await getRecipeBySlug(resolvedParams.slug);
  if (!recipe) {
    return { title: 'Receita não encontrada' };
  }
  return recipeMetadata(recipe);
}

export default async function RecipePage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const recipe = await getRecipeBySlug(resolvedParams.slug);

  if (!recipe) {
    return <p>Receita não encontrada.</p>;
  }

  return (
    <article className="prose max-w-none">
      <RecipeDetail r={recipe} />
    </article>
  );
}
