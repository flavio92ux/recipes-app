import { NextResponse } from 'next/server';

export async function GET() {
  const content = `
User-agent: *
Allow: /

Sitemap: https://localhost:3000/sitemap.xml
  `.trim();

  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
