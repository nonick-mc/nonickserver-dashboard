'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button, buttonVariants } from './ui/button';

export function ScrollToTopButton() {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page');

  return (
    <Link
      className={buttonVariants({ variant: 'outline' })}
      href={`/#${currentPage ? `?page=${currentPage}` : ''}`}
      replace
    >
      一番上に戻る
    </Link>
  )
}