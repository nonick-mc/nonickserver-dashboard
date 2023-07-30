import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const currentPage = Number(request.nextUrl.searchParams.get('page') || 1);

  if (isNaN(currentPage) || currentPage < 1) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}