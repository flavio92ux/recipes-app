import React from 'react';
import type { Recipe } from '@/types/recipe';
import Image from 'next/image';

/**
 * Componente presentacional que exibe todos os dados da receita.
 * Não configura metadata (isso fica em lib/seo.ts / generateMetadata).
 */
export default function RecipeDetail({ r }: { r: Recipe }) {
  return (
    <article className="prose lg:prose-xl max-w-none">
      <header>
        <h1 className="text-3xl font-bold">{r.title}</h1>
        <div className="text-sm text-gray-600 mt-1">
          {r.author && <span>Por {r.author}</span>}
          {r.publishedAt && (
            <span className="ml-3">
              • {new Date(r.publishedAt).toLocaleDateString('pt-BR')}
            </span>
          )}
          {r.prepTime && <span className="ml-3">• {r.prepTime} min</span>}
        </div>
      </header>

      <figure className="mt-4">
        {r.image ? (
          // usamos Image quando disponível (Next Image otimiza no build / runtime)
          // Note: next.config.js configurado com images.unoptimized: true no skeleton
          // para não quebrar em ambiente local; em produção remova unoptimized.
          // Se preferir, troque por <img> simples.
          // width/height são placeholders para evitar warning do Next.
          <Image
            src={r.image}
            alt={r.title}
            width={1200}
            height={700}
            className="w-full h-64 object-cover rounded"
            priority={false}
          />
        ) : (
          <div className="w-full h-64 bg-gray-100 rounded" />
        )}
        {r.description && <figcaption className="text-sm text-gray-500 mt-2">{r.description}</figcaption>}
      </figure>

      {r.tags && r.tags.length > 0 && (
        <div className="mt-4">
          <strong>Tags: </strong>
          <span className="text-sm text-gray-700">
            {r.tags.map((t, i) => (
              <span key={t} className="inline-block mr-2">
                <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">{t}</span>
              </span>
            ))}
          </span>
        </div>
      )}

      {r.ingredients && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Ingredientes</h2>
          <ul className="list-disc ml-6 mt-2">
            {r.ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        </section>
      )}

      {r.steps && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Modo de preparo</h2>
          <ol className="list-decimal ml-6 mt-2">
            {r.steps.map((step, idx) => (
              <li key={idx} className="mb-2">{step}</li>
            ))}
          </ol>
        </section>
      )}

      <footer className="mt-8 text-sm text-gray-500">
        <div>Rendimentos: {r.servings ?? '—'}</div>
      </footer>
    </article>
  );
}
