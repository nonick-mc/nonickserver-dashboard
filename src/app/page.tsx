import { LeaderBoard } from '@/components/leaderboard';
import { PageSelect } from '@/components/page-selects';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { buttonVariants } from '@/components/ui/button';
import levelModel from '@/schemas/levelModel';
import Link from 'next/link';
import { Suspense } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default async function Home({ searchParams: { page } }: { searchParams: { page: string } }) {
  const modelSize = await levelModel.countDocuments();

  return (
    <main className='container max-w-screen-lg my-10'>
      <div className='flex flex-col gap-6 text-center justify-center'>
        <AspectRatio ratio={15 / 4} className='bg-[url(/banner.png)] bg-center bg-cover rounded-lg'/>
        <h1 className='text-3xl font-black'>NoNICK SERVER リーダーボード</h1>
      </div>

      <div className='py-12 mx-auto space-y-3'>
        <Suspense fallback={(
          <div className='flex py-20 justify-center'>
            <AiOutlineLoading3Quarters className='animate-spin' size={20}/>
          </div>
        )}>
          <PageSelect size={modelSize}/>
          <LeaderBoard skip={(Number(page) - 1) * 50}/>
          <div className='flex justify-end'>
            <Link className={buttonVariants()} href='/#' passHref>
              一番上に戻る
            </Link>
          </div>
        </Suspense>
      </div>
    </main>
  );
}
