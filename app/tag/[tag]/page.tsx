import { getTags, getRecipes } from '@/lib/api';
import { tagMetadata } from '@/lib/seo';
import RecipeList from '@/components/RecipeList';
import { RecipeSummary } from '@/types/recipe';
import { Metadata } from 'next';

export async function generateStaticParams(): Promise<{ tag: string }[]> {
  try {
    const data = await getTags();

    const items = data.items || [];
    if (items.length === 0) return [];
    if (typeof items[0] === 'string') {
      return items.map((t: string) => ({ tag: t }));
    }

    return items.map((t: string) => ({ tag: t }));
  } catch (err) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { tag } = resolvedParams;

  return tagMetadata(tag);
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const resolvedParams = await params;
  const { tag } = resolvedParams;
  const decodedTag = decodeURIComponent(tag);

  const data = await getRecipes(undefined, decodedTag);

  const items: RecipeSummary[] = data.items;

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Receitas com tag: {decodedTag}</h1>

      {items.length === 0 ? (
        <p>Nenhuma receita encontrada com a tag &quot;{decodedTag}&quot;.</p>
      ) : (
        <RecipeList items={items} />
      )}
    </section>
  );
}
