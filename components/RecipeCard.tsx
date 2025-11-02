import Link from 'next/link';
import Image from 'next/image';
import type { RecipeSummary } from '@/types/recipe';

/**
 * Exibe o card individual de uma receita com acessibilidade.
 */
export default function RecipeCard({ r }: { r: RecipeSummary }) {
  const titleId = `titulo-${r.slug}`;
  const descId = `descricao-${r.slug}`;

  return (
    <article
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      {r.image ? (
        <Image
          src={r.image}
          alt={`Imagem da receita: ${r.title}`}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
          priority={false}
          title={`Imagem da receita ${r.title}`}
        />
      ) : (
        <div
          className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400"
          role="img"
          aria-label={`Imagem não disponível para ${r.title}`}
        >
          sem imagem
        </div>
      )}

      <div className="p-4">
        <h3 id={titleId} className="text-lg font-semibold text-gray-900">
          {r.title}
        </h3>
        <p id={descId} className="text-sm text-gray-600 mb-2 line-clamp-3">
          {r.teaser}
        </p>

        <Link
          href={`/receitas/${r.slug}`}
          className="text-blue-600 text-sm font-medium hover:underline"
          title={`Ver detalhes da receita ${r.title}`}
          aria-label={`Ver detalhes da receita ${r.title}`}
        >
          Ver receita completa
        </Link>
      </div>
    </article>
  );
}
