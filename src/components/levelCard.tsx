import { cn } from '@/lib/utils';
import { UserData, getUserData } from '@/modules/discord';
import { LevelData, getNeedXP } from '@/modules/level';
import { Avatar, Card, Progress, Tooltip } from '@nextui-org/react';
import { wait } from '@/lib/utils';

export interface LevelCardProps {
  data: {
    rank: number;
    lv: number;
    xp: number;
  };
  user: UserData | { error: string };
}

export async function LevelCard({ data }: { data: LevelData }) {
  const needXP = getNeedXP(data.lv);
  const user = await getUserData(data.id);
  return (
    <Card
      shadow='none'
      radius='sm'
      className='px-6 py-4 flex flex-col md:flex-row gap-4 md:items-center justify-between bg-background border-muted border-1'
    >
      <div className='flex gap-4 items-center'>
        <div
          className={cn(
            'flex w-8 h-8 rounded-full text-xl items-center justify-center font-black select-none',
            data.rank <= 3
              ? 'bg-foreground text-background'
              : data.rank <= 10
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground',
          )}
        >
          {data.rank}
        </div>
        {'error' in user ? (
          <div className='flex gap-4 items-center'>
            <Avatar
              src='https://cdn.discordapp.com/embed/avatars/0.png'
              className='w-8 h-8'
            />
            <p className='font-bold text-sm md:text-base text-muted-foreground'>
              読み込みに問題が発生しました
            </p>
          </div>
        ) : (
          <>
            <Avatar src={user.avatar} className='w-8 h-8' />
            <div className='flex flex-col md:flex-row md:gap-2'>
              <p className='font-bold text-sm md:text-base'>
                {user.globalName || user.username}
              </p>
              <p className='text-muted-foreground text-sm md:text-base'>
                {user.discriminator === '0'
                  ? `@${user.username}`
                  : `#${user.discriminator}`}
              </p>
            </div>
          </>
        )}
      </div>
      <div className='flex items-center md:flex-col md:items-end gap-2 w-full md:w-40'>
        <p className='text-muted-foreground'>
          Lv.<span className='text-foreground font-extrabold'>{data.lv}</span>
        </p>
        <Tooltip content={`${data.xp} / ${needXP}`} placement='bottom'>
          <Progress
            value={data.xp}
            maxValue={needXP}
            size='sm'
            aria-label='xp'
            classNames={{
              indicator: '!bg-foreground'
            }}
          />
        </Tooltip>
      </div>
    </Card>
  );
}
