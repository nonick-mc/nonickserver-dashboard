import { Card, Skeleton } from '@nextui-org/react';

export function LevelCardSkeleton() {
  return (
    <Card
      shadow='none'
      radius='sm'
      className='px-6 py-4 flex flex-col md:flex-row gap-4 md:items-center justify-between bg-background border-muted border-1'
    >
      <div className='flex gap-4 items-center w-3/5'>
        <Skeleton className='w-8 h-8 rounded-full' aria-label='rank' />
        <Skeleton className='w-8 h-8 rounded-full' aria-label='avatar' />
        <div className='flex flex-col md:flex-row gap-2 grow'>
          <Skeleton className='h-3 w-2/5 rounded-lg' />
          <Skeleton className='h-3 w-2/5 rounded-lg' />
        </div>
      </div>
      <div className='flex items-center md:flex-col md:items-end gap-2 w-full md:w-40'>
        <Skeleton className='h-3 w-full rounded-lg' />
      </div>
    </Card>
  );
}
