// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get('secret');
    const tag = req.nextUrl.searchParams.get('tag');
    const path = req.nextUrl.searchParams.get('path');

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        {
          status: 401,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        }
      );
    }

    if (tag) {
      revalidateTag(tag, 'max');

      return NextResponse.json(
        { revalidated: true, tag },
        {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        }
      );
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json(
        { revalidated: true, path },
        {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        }
      );
    }

    return NextResponse.json(
      { message: 'Missing tag parameter' },
      {
        status: 400,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'Error revalidating' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  }
}
