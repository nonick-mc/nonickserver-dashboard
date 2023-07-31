'use client';

import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';

export function PageSelect({ size }: { size: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') || 1);

  if (currentPage > Math.ceil(size / 50)) redirect('/');

  return (
    <div className='flex justify-end'>
      <Select
        defaultValue={`${currentPage}`}
        onValueChange={(v) => router.replace(`/?page=${v}`, { scroll: false })}
      >
        <SelectTrigger className='w-40'>
          <SelectValue placeholder='表示するページ'/>
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className='h-[300px]'>
            {Array(Math.ceil(size / 50)).fill(0).map((v, index) => (
              <SelectItem value={`${index + 1}`} key={index}>
                ページ{index + 1}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  )
}