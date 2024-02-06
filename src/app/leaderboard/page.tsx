import { LevelCard } from '@/components/levelCard';
import { Discord } from '@/modules/discord';
import { getLevelData } from '@/modules/level';
import dbConnect from '@/util/dbConnect';
import { Image } from '@nextui-org/react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'リーダーボード',
};

export default async function Page() {
  await dbConnect();
  // const levels = await getLevelData({ $skip: 0 }, { $limit: 50 });
  // console.info(levels);
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
        <LevelCard
          data={{ rank: 4, lv: 71, xp: 24368 }}
          user={await Discord.getUserData('695420898961784913')}
        />
      </div>
    </>
  );
}
