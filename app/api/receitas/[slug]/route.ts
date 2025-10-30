import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * Endpoint: /api/receitas/[slug]
 * - Retorna os detalhes de uma receita específica.
 * - Simula uma API headless local lendo recipes_by_slug.json
 */
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const dataPath = path.join(process.cwd(), 'src', 'data', 'recipes_by_slug.json');
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const json = JSON.parse(raw);

    const recipe = json[slug];

    if (!recipe) {
      return NextResponse.json({ error: 'Receita não encontrada.' }, { status: 404 });
    }

    return NextResponse.json(recipe, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  } catch (error: any) {
    console.error('Erro ao ler receita:', error);
    return NextResponse.json(
      { error: 'Falha ao carregar receita.' },
      { status: 500 }
    );
  }
}
