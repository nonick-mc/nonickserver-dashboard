import { LeaderBoard } from '@/components/leaderboard';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Suspense } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

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

      <div className='py-12 mx-auto'>
        <Suspense fallback={(
          <div className='flex py-20 justify-center'>
            <AiOutlineLoading3Quarters className='animate-spin' size={30}/>
          </div>
        )}>
          <LeaderBoard skip={((Number(page) || 1) - 1) * 50}/>
        </Suspense>
      </div>
    </main>
  );
}
