import dbConnect from '@/utils/dbConnext';
import levelModel from '@/schemas/levelModel';
import { cn } from '@/lib/utils';
import discord from '@/modules/discord';
import { getLevelData, getNeedXP } from '@/modules/level';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { FadeUpCard, FadeUpDiv, FadeUpStagger } from './animation';
import { PageSelect } from './page-selects';

export async function LeaderBoard({ skip }: { skip: number }) {
  await dbConnect();
  const modelSize = await levelModel.countDocuments();
  const levelData = await getLevelData({ $skip: skip }, { $limit: 50 });
  const userLevelData = await Promise.all(levelData.map(async (v) => ({
    ...v,
    user: await discord.fetch(v.id),
  })));

  return (
    <FadeUpStagger className='flex flex-col gap-6'>
      <FadeUpDiv className='flex justify-end items-center'>
        <PageSelect size={modelSize}/>
      </FadeUpDiv>
      <div className='flex flex-col gap-4'>
        {userLevelData.map(({ id, xp, lv, rank, user }, index) => (
          <FadeUpCard
            className='px-6 py-4 flex gap-4 items-center'
            key={index}
          >
            <div
              className={cn(
                'flex w-8 h-8 rounded-full text-xl items-center justify-center font-black select-none',
                rank <= 3 ? 'bg-foreground text-background' : rank <= 10 ? 'bg-muted text-foreground' : 'text-muted-foreground',
              )}
            >
              {rank}
            </div>
            <div className='flex-1 flex flex-col md:flex-row sm:justify-normal md:justify-between md:items-center'>
              <div className='flex gap-4 items-center'>
                <Avatar className='w-8 h-8'>
                  <AvatarImage src={user.avatar}/>
                  <AvatarFallback/>
                </Avatar>
                {!user.name ? (
                  <p className='font-bold text-sm md:text-base text-muted-foreground'>
                    読み込みに問題が発生しました
                  </p>
                ) : (
                  <div className='flex flex-col md:flex-row md:gap-2'>
                    <p className='font-bold text-sm md:text-base'>
                      {user.global_name || user.name}
                    </p>
                    <p className='text-muted-foreground text-sm md:text-base'>
                      {user.discriminator == '0' ? `@${user.name}` : `#${user.discriminator}`}
                    </p>
                  </div>
                )} 
              </div>
              <div className='flex items-center md:flex-col md:items-end gap-2'>
                <p className='text-muted-foreground'>Lv.<span className='text-foreground font-extrabold'>{lv}</span></p>
                <Progress className='flex-1 md:flex-none md:w-40 h-1' value={Math.floor((xp / getNeedXP(lv)) * 100)}/>
              </div>
            </div>
          </FadeUpCard>
        ))}
      </div>
      {/* <FadeUpDiv className='flex justify-end'>
        <ScrollToTopButton/>
      </FadeUpDiv> */}
    </FadeUpStagger>
  )
}