'use client';

import { range } from '@/lib/utils';
import { Select, SelectItem } from '@nextui-org/react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';

export function PageSelector({ size }: { size: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const maxPage = Math.ceil(size / 50);

  if (page > maxPage) redirect('/leaderboard?page=1');
  return (
    <Select
      className='w-40'
      size='sm'
      variant='bordered'
      placeholder='表示するページ'
      selectedKeys={[page.toString()]}
      onChange={(v) =>
        router.replace(`/leaderboard?page=${v.target.value || 1}`, {
          scroll: false,
        })
      }
      aria-label='ページ'
    >
      {Array.from(range(1, maxPage + 1), (i) => (
        <SelectItem key={i} textValue={`ページ${i}`}>
          ページ{i}
        </SelectItem>
      ))}
    </Select>
  );
}
