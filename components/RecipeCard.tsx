import Link from 'next/link';
import Image from 'next/image';
import type { RecipeSummary } from '@/types/recipe';

/**
 * Exibe o card individual de uma receita.
 */
export default function RecipeCard({ r }: { r: RecipeSummary }) {
  return (
    <article className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      {r.image ? (
        <Image
          src={r.image}
          alt={r.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
          priority={false}
        />
      ) : (
        <div className="w-full h-48 bg-gray-100" />
      )}  
      <div className="p-4">
        <h3 className="text-lg font-semibold">{r.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{r.teaser}</p>
        <Link
          href={`/receitas/${r.slug}`}
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          Ver receita
        </Link>
      </div>
    </article>
  );
}
