import { Card } from '@nextui-org/react';
import { LoginButton } from './loginButton';
import { LevelCard } from './levelCard';
import { getServerSession } from 'next-auth';
import { authOption } from '@/app/api/auth/[...nextauth]/route';
import { LevelData } from '@/modules/level';
import { Suspense } from 'react';
import { LevelCardSkeleton } from './levelCardSkeleton';

export async function MyLevelCard({ levels }: { levels: LevelData[] }) {
  const session = await getServerSession(authOption);
  const myLevel = levels.find((v) => v.id === session?.user?.id);

  if (myLevel) {
    return (
      <Suspense fallback={<LevelCardSkeleton />}>
        <LevelCard data={myLevel} />
      </Suspense>
    );
  }

  return (
    <Card
      shadow='none'
      radius='sm'
      className='px-6 py-4 flex flex-col md:flex-row gap-4 md:items-center justify-between bg-background border-muted border-1'
    >
      <div className='flex flex-col'>
        <p className='font-bold text-sm md:text-base'>ログインしていません</p>
        <p className='text-muted-foreground text-sm md:text-base'>
          Discordアカウントを連携すると、ここに自分のレベル・順位が表示されます。
        </p>
      </div>
      <LoginButton />
    </Card>
  );
}
