import { getTags, getRecipes } from '@/lib/api';
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

  return {
    title: `Receitas com tag ${tag} | Delícias na Cozinha`,
    description: `Explore nossa coleção de receitas com a tag ${tag}. Descubra pratos deliciosos e práticos para todas as ocasiões.`,
    keywords: [
      'receitas',
      tag,
      'cozinha',
      'culinária',
      'gastronomia',
    ],
    openGraph: {
      title: `Receitas com tag ${tag} | Delícias na Cozinha`,
      description: `Explore nossa coleção de receitas com a tag ${tag}. Descubra pratos deliciosos e práticos para todas as ocasiões.`,
      url: `https://deliciasnacozinha.com/tag/${tag}`,
      siteName: 'Delícias na Cozinha',
      images: [
        {
          url: `https://deliciasnacozinha.com/images/${tag}-og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `Receitas com tag ${tag} - Delícias na Cozinha`,
        },
      ],
      type: 'website',
      locale: 'pt_BR',
    },
    alternates: {
      canonical: `https://deliciasnacozinha.com/tag/${tag}`,
    },
    robots: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const resolvedParams = await params;
  const { tag } = resolvedParams;

  const data = await getRecipes(undefined, tag);

  const items: RecipeSummary[] = data.items;

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Receitas com tag: {tag}</h1>

      {items.length === 0 ? (
        <p>Nenhuma receita encontrada com a tag &quot;{tag}&quot;.</p>
      ) : (
        <RecipeList items={items} />
      )}
    </section>
  );
}
