import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

export function LevelCardSkelton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Skeleton className={cn('h-[97px] md:h-[72px]', className)} {...props}/>
  )
}