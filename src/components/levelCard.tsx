import { getNeedXP } from '@/modules/level';
import { Avatar, Card, Progress } from '@nextui-org/react';

interface LevelCardProps {
  data: {
    lv: number;
    xp: number;
  };
  user: {
    avatar: string;
    globalName: string;
    username: string;
    discriminator: string;
  };
}

export function LevelCard({ data, user }: LevelCardProps) {
  return (
    <Card radius='sm' className='px-6 py-4 flex flex-row gap-4 items-center justify-between bg-background border-muted border-1'>
      <div className='flex gap-4 items-center'>
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
      </div>
      <div className='flex items-center md:flex-col md:items-end gap-2'>
        <p className='text-muted-foreground'>
          Lv.<span className='text-foreground font-extrabold'>{data.lv}</span>
        </p>
        <Progress value={data.xp} maxValue={getNeedXP(data.lv)} size='sm' className='flex-1 md:flex-none md:w-40 h-1'/>
      </div>
    </Card>
  );
}
