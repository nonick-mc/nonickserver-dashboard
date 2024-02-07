import { LevelData } from '@/modules/level';
import { Suspense } from 'react';
import { LevelCard } from './levelCard';
import { LevelCardSkeleton } from './levelCardSkeleton';

export function Leaderboard({ levels }: { levels: LevelData[] }) {
  return (
    <div className='flex flex-col gap-4'>
      {levels.map((v) => (
        <Suspense key={v.id} fallback={<LevelCardSkeleton />}>
          <LevelCard data={v} />
        </Suspense>
      ))}
    </div>
  );
}
