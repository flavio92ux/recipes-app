import { NextResponse } from 'next/server';
import { getRecipes, getCategories } from '@/lib/api';

export async function GET() {
  const baseUrl = 'http://localhost:3000';
  
  // Busca todas as receitas e categorias para gerar URLs
  const recipes = await getRecipes();
  const categories = await getCategories();

  // Gera o XML do sitemap
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Página inicial -->
      <url>
        <loc>${baseUrl}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      
      <!-- Páginas de categorias -->
      ${categories.items.map(category => `
        <url>
          <loc>${baseUrl}/${category}</loc>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
      
      <!-- Páginas de receitas -->
      ${recipes.items.map(recipe => `
        <url>
          <loc>${baseUrl}/receitas/${recipe.slug}</loc>
          <lastmod>${recipe.publishedAt.split('T')[0]}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.6</priority>
        </url>
      `).join('')}
    </urlset>`.trim();

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}