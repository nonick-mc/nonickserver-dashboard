import React, { Suspense } from 'react';
import { LeaderBoard } from '@/components/leaderboard';
import { LevelCardSkelton } from '@/components/level-card-skelton';
import { MyLevelCard } from '@/components/my-level-card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home({ searchParams: { page } }: { searchParams: { page: string } }) {
  return (
    <main className='container max-w-screen-lg my-10'>
      <div className='flex flex-col gap-6 text-center justify-center'>
        <AspectRatio  ratio={15 / 5} className='bg-[url(/banner.png)] bg-center bg-cover rounded-lg'/>
        <div className='space-y-3'>
          <h1 className='text-3xl md:text-4xl font-black'>
            NoNICK SERVER <span className='inline-block'>リーダーボード</span>
          </h1>
          <h2 className='text-sm md:text-base text-muted-foreground'>
            サーバーメンバーのレベルの順位を一覧で見ることができます。
          </h2>
        </div>
      </div>

      <div className='py-12 mx-auto flex flex-col gap-12'>
        <div className='flex flex-col gap-6'>
          <h3 className='font-black text-2xl'>あなたの順位</h3>
          <Suspense fallback={(<LevelCardSkelton/>)}>
            <MyLevelCard/>
          </Suspense>
        </div>
        <div className='flex flex-col gap-6'>
          <h3 className='font-black text-2xl'>みんなの順位</h3>
          <Suspense fallback={(
            <React.Fragment>
              <div className='flex justify-end'>
                <Skeleton className='w-40 h-10'/>
              </div>
              <div className='flex flex-col gap-4'>
                <LevelCardSkelton/>
                <LevelCardSkelton className='opacity-80'/>
                <LevelCardSkelton className='opacity-60'/>
                <LevelCardSkelton className='opacity-40'/>
                <LevelCardSkelton className='opacity-20'/>
                <LevelCardSkelton className='opacity-5'/>
              </div>
            </React.Fragment>
          )}>
            <LeaderBoard skip={((Number(page) || 1) - 1) * 50}/>
          </Suspense>
        </div>
      </div>
    </main>
  );
}