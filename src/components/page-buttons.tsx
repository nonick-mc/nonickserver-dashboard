'use client';

import { redirect, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import { FiChevronsLeft, FiChevronLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function PageButtons({ size }: { size: number }) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') || 1);

  const isDisabledPrev =  currentPage <= 1;
  const isDisabledNext = currentPage >= size;

  const middleButtonVariant = 'rounded-none border-r-0 border-l-0';

  return (
    <div className='flex items-center justify-end gap-1'>
      <div className='flex'>
        <Link href={`/?page=1`} passHref>
          <Button size='icon' variant='outline' className='border-r-0 rounded-l-md rounded-r-none' disabled={isDisabledPrev}><FiChevronsLeft/></Button>
        </Link>
        <Link href={`/?page=${currentPage - 1}`} passHref>
          <Button size='icon' variant='outline' className='border-l-0 rounded-r-md rounded-l-none' disabled={isDisabledPrev}><FiChevronLeft/></Button>
        </Link>
      </div>
      <div className='flex'>
        <Button size='icon' variant='outline' className={cn(middleButtonVariant, 'border-l rounded-l-md')}>1</Button>
        <Button size='icon' variant='outline' className={middleButtonVariant}>2</Button>
        <Button size='icon' variant='outline' className={middleButtonVariant}>...</Button>
        <Button size='icon' variant='outline' className={middleButtonVariant}>5</Button>
        <Button size='icon' variant='outline' className={cn(middleButtonVariant, 'border-r rounded-r-md')}>6</Button>
      </div>
      <div className='flex'>
        <Link href={`/?page=${currentPage + 1}`} passHref>
          <Button size='icon' variant='outline' className='border-r-0 rounded-l-md rounded-r-none' disabled={isDisabledNext}><FiChevronRight/></Button>
        </Link>
        <Link href={`/?page=${Math.floor(size / 100)}`} passHref>
          <Button size='icon' variant='outline' className='border-l-0 rounded-r-md rounded-l-none' disabled={isDisabledNext}><FiChevronsRight/></Button>
        </Link>
      </div>
    </div>
  )
}