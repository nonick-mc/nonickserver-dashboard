import { LevelCard } from '@/components/levelCard';
import { Image } from '@nextui-org/react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'リーダーボード',
};

export default function Page() {
  return (
    <>
      <div className='flex flex-col gap-6 text-center justify-center'>
        <div className='mx-auto'>
          <Image src='/banner.png' className='aspect-[15/5] object-cover' />
        </div>
        <h1 className='text-3xl md:text-4xl font-black'>
          NoNICK SERVER <span>リーダーボード</span>
        </h1>
        <h2 className='text-sm md:text-base text-muted-foreground'>
          サーバーメンバーのレベルの順位を一覧で見ることができます。
        </h2>
      </div>
      <div className='my-12 mx-auto flex flex-col gap-12'>
        <h3 className='font-black text-2xl'>あなたの順位</h3>
        <LevelCard
          data={{ lv: 71, xp: 23850 }}
          user={{
            avatar:
              'https://cdn.discordapp.com/avatars/695420898961784913/aa655d4b7389085f4ec4c95150da407a.png',
            discriminator: '0',
            globalName: 'akki256.',
            username: 'akki0256',
          }}
        />
      </div>
    </>
  );
}
