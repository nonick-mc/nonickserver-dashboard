import { Leaderboard } from '@/components/leaderboard';
import { MyLevelCard } from '@/components/myLevelCard';
import { PageSelector } from '@/components/pageSelector';
import { dbConnect } from '@/lib/dbConnect';
import { getLevelData } from '@/modules/level';
import { Image } from '@nextui-org/react';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'リーダーボード',
};

export default async function Page({
  searchParams: { page },
}: { searchParams: { page: string } }) {
  await dbConnect();
  const levels = await getLevelData();
  const skip = ((Number(page) || 1) - 1) * 50;
  return (
    <>
      <div className='flex flex-col gap-6 text-center justify-center'>
        <div className='mx-auto'>
          <Image src='/banner.png' className='aspect-[15/5] object-cover' />
        </div>
        <h1 className='text-3xl md:text-4xl font-black max-sm:flex max-sm:flex-col'>
          NoNICK SERVER <span>リーダーボード</span>
        </h1>
        <h2 className='text-sm md:text-base text-muted-foreground'>
          サーバーメンバーのレベルの順位を一覧で見ることができます。
        </h2>
      </div>
      <div className='my-12 mx-auto flex flex-col gap-12'>
        <h3 className='font-black text-2xl'>あなたの順位</h3>
        <Suspense>
          <MyLevelCard levels={levels} />
        </Suspense>
      </div>
      <div className='my-12 mx-auto flex flex-col gap-12'>
        <div className='flex justify-between items-center'>
          <h3 className='font-black text-2xl'>みんなの順位</h3>
          <PageSelector size={levels.length} />
        </div>
        <Leaderboard levels={levels.slice(skip, skip + 50)} />
      </div>
    </>
  );
}
