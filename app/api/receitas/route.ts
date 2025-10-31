import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * Endpoint: /api/receitas
 * - Retorna lista de receitas (mock local)
 * - Suporta query ?category=fit
 * - Aplica cache-control para simular CDN/local caching
 */
export async function GET(request: Request) {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'recipes.json');
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const json = JSON.parse(raw);

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let items = json.items;
    if (category) {
      items = items.filter(
        (r: any) => r.category.toLowerCase() === category.toLowerCase()
      );
    }

    const response = {
      total: items.length,
      page: 1,
      per_page: json.per_page,
      items,
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  } catch (error: any) {
    console.error('Erro ao ler receitas:', error);
    return NextResponse.json(
      { error: 'Falha ao carregar receitas.' },
      { status: 500 }
    );
  }
}
