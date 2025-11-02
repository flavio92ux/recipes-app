import React from 'react';
import type { Recipe } from '@/types/recipe';
import Image from 'next/image';

/**
 * Componente que exibe uma receita completa, com acessibilidade aprimorada.
 */
export default function RecipeDetail({ r }: { r: Recipe }) {
  const titleId = `titulo-receita-${r.slug ?? r.id}`;

  return (
    <article
      role="article"
      aria-labelledby={titleId}
      className="prose lg:prose-xl max-w-none"
    >
      <header>
        <h1 id={titleId} className="text-3xl font-bold text-gray-900">
          {r.title}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          {r.author && <span>Por {r.author}</span>}
          {r.publishedAt && (
            <span className="ml-3">
              • Publicada em {new Date(r.publishedAt).toLocaleDateString('pt-BR')}
            </span>
          )}
          {r.prepTime && <span className="ml-3">• Preparo: {r.prepTime} min</span>}
        </p>
      </header>

      <figure className="mt-4">
        {r.image ? (
          <Image
            src={r.image}
            alt={`Foto ilustrativa da receita ${r.title}`}
            width={1200}
            height={700}
            className="w-full h-64 object-cover rounded"
            priority={false}
          />
        ) : (
          <div
            className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400"
            role="img"
            aria-label={`Imagem não disponível para ${r.title}`}
          >
            sem imagem
          </div>
        )}
        {r.description && (
          <figcaption className="text-sm text-gray-500 mt-2">
            {r.description}
          </figcaption>
        )}
      </figure>

      {r.tags && r.tags.length > 0 && (
        <section aria-label="Tags da receita" className="mt-4">
          <strong className="text-gray-800">Tags:</strong>
          <ul className="inline-flex flex-wrap gap-2 ml-2" role="list">
            {r.tags.map((t) => (
              <li key={t}>
                <span
                  className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-700"
                  role="listitem"
                >
                  {t}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {r.ingredients && (
        <section aria-labelledby="ingredientes" className="mt-6">
          <h2 id="ingredientes" className="text-xl font-semibold text-gray-900">
            Ingredientes
          </h2>
          <ul className="list-disc ml-6 mt-2">
            {r.ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        </section>
      )}

      {r.steps && (
        <section aria-labelledby="preparo" className="mt-6">
          <h2 id="preparo" className="text-xl font-semibold text-gray-900">
            Modo de preparo
          </h2>
          <ol className="list-decimal ml-6 mt-2">
            {r.steps.map((step, idx) => (
              <li key={idx} className="mb-2">{step}</li>
            ))}
          </ol>
        </section>
      )}

      <footer className="mt-8 text-sm text-gray-500">
        {r.servings && <p>Rendimento: {r.servings} porções</p>}
      </footer>
    </article>
  );
}
