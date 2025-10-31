import { getRecipeBySlug, getSlugs } from '@/lib/api';
import RecipeDetail from '@/components/RecipeDetail';
import { recipeMetadata } from '@/lib/seo';

// Define revalidação incremental (ISR)
export const revalidate = 60;

// Permite que rotas não retornadas por generateStaticParams sejam geradas sob
// demanda — comportamento equivalente a `fallback: 'blocking'` no /pages.
export const dynamicParams = true;

// Gera static params a partir da API de desenvolvimento (localhost:3001).
// OBS: o servidor em 3001 precisa estar rodando durante o build para que
// esses slugs sejam obtidos.
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const data = await getSlugs();
    const items: string[] = data.items || [];

    if (items.length === 0) return [];
    if (typeof items[0] === 'string') {
      return items.map((c: string) => ({ slug: c }));
    }

    return [];
  } catch (err) {
    console.warn('generateStaticParams: falha ao buscar slugs em 3001', err);
    return [];
  }
}

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
