import { getSlugs } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'http://localhost:3000';
  const { items } = await getSlugs();

  const urls = items
    .map((slug: string) => `<url><loc>${baseUrl}/receitas/${slug}</loc></url>`)
    .join('');

  const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc></url>
  ${urls}
</urlset>
  `.trim();

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
