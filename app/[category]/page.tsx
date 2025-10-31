import { getCategories, getRecipes } from '@/lib/api';
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

  return {
    title: `Receitas de ${category} | Delícias na Cozinha`,
    description: `Descubra as melhores receitas de ${category} no Delícias na Cozinha. Receitas práticas e deliciosas para todas as ocasiões.`,
    keywords: [
      'receitas',
      category,
      'cozinha',
      'culinária',
      'doces',
      'salgados',
      'gastronomia',
    ],
    openGraph: {
      title: `Receitas de ${category} | Delícias na Cozinha`,
      description: `Descubra as melhores receitas de ${category} no Delícias na Cozinha. Receitas práticas e deliciosas para todas as ocasiões.`,
      url: `https://deliciasnacozinha.com/${category}`,
      siteName: 'Delícias na Cozinha',
      images: [
        {
          url: `https://deliciasnacozinha.com/images/${category}-og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `Receitas de ${category} - Delícias na Cozinha`,
        },
      ],
      type: 'website',
      locale: 'pt_BR',
    },
    alternates: {
      canonical: `https://deliciasnacozinha.com/${category}`,
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

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const { category } = resolvedParams;

  const data = await getRecipes(category);

  const items: RecipeSummary[] = data.items;

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
