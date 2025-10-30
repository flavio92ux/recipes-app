import Link from 'next/link';
import type { RecipeSummary } from '@/types/recipe';

/**
 * Exibe o card individual de uma receita.
 */
export default function RecipeCard({ r }: { r: RecipeSummary }) {
  return (
    <article className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <img
        src={r.image}
        alt={r.title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
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
