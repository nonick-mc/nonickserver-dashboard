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
  // await dbConnect();
  // const levels = await getLevelData();
  //testData
  const levels = [
    {
      id: '841942479446999081',
      lv: 82,
      xp: 19187,
      boost: 1,
      last: new Date(),
      rank: 1,
    },
    {
      id: '735110742222831657',
      lv: 81,
      xp: 15460,
      boost: 1,
      last: new Date(),
      rank: 2,
    },
    {
      id: '1021694511644155965',
      lv: 77,
      xp: 22469,
      boost: 1,
      last: new Date(),
      rank: 3,
    },
    {
      id: '695420898961784913',
      lv: 71,
      xp: 24956,
      boost: 1,
      last: new Date(),
      rank: 4,
    },
    {
      id: '973951195183972402',
      lv: 67,
      xp: 25366,
      boost: 1,
      last: new Date(),
      rank: 5,
    },
    {
      id: '517268384619036697',
      lv: 67,
      xp: 10957,
      boost: 1,
      last: new Date(),
      rank: 6,
    },
    {
      id: '831859839911067730',
      lv: 66,
      xp: 14996,
      boost: 1,
      last: new Date(),
      rank: 7,
    },
    {
      id: '947315844235554846',
      lv: 65,
      xp: 2906,
      boost: 1,
      last: new Date(),
      rank: 8,
    },
    {
      id: '928273042671558656',
      lv: 62,
      xp: 7845,
      boost: 1,
      last: new Date(),
      rank: 9,
    },
    {
      id: '845214644658110484',
      lv: 61,
      xp: 6949,
      boost: 1,
      last: new Date(),
      rank: 10,
    },
  ];
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
        <Leaderboard
          levels={levels.slice(((Number(page) || 1) - 1) * 50, 50)}
        />
      </div>
    </>
  );
}
