// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get('secret');
    const tag = req.nextUrl.searchParams.get('tag');

    // Verificação simples de segurança
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    if (!tag) {
      return NextResponse.json({ message: 'Missing tag parameter' }, { status: 400 });
    }

    // Invalida o cache associado à tag
    revalidateTag(tag, 'max');

    return NextResponse.json({ revalidated: true, tag });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
