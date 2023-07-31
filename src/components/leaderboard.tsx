import dbConnect from '@/utils/dbConnext';
import levelModel from '@/schemas/levelModel';
import { APIUser } from 'discord-api-types/v10';
import { cn, wait } from '@/lib/utils';
import { getLevelData, getNeedXP } from '@/modules/level';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { FadeUpCard, FadeUpDiv, FadeUpStagger } from './animation';
import { PageSelect } from './page-selects';
import { ScrollToTopButton } from './scroll-to-top-button';

export async function LeaderBoard({ skip }: { skip: number }) {
  await dbConnect();
  const modelSize = await levelModel.countDocuments();
  const levelData = await getLevelData({ $skip: skip }, { $limit: 50 });
  const userLevelData = await Promise.all(levelData.map(async (v) => ({
    ...v,
    user: await fetch(
      `https://discord.com/api/v10/users/${v.id}`,
      { headers: { Authorization: `Bot ${process.env.BOT_TOKEN!}` }, next: { revalidate: 2 * 60 * 60 }, }
    ).then(async (res) => {
      await wait(100);
      return await res.json<APIUser>()
    }),
  })))

  return (
    <FadeUpStagger className='flex flex-col gap-6'>
      <FadeUpDiv className='flex justify-end'>
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
            <div className='flex-1 flex justify-between items-center'>
              <div className='flex gap-4 items-center'>
                <Avatar className='w-8 h-8'>
                  <AvatarImage src={user.avatar ? `https://cdn.discordapp.com/avatars/${id}/${user.avatar}.webp` : 'https://cdn.discordapp.com/embed/avatars/0.png'}/>
                  <AvatarFallback/>
                </Avatar>
                {!user.username ? (
                  <p className='font-bold text-sm md:text-base text-muted-foreground'>
                    読み込みに問題が発生しました
                  </p>
                ) : (
                  <div className='flex flex-col md:flex-row md:gap-2'>
                    <p className='font-bold text-sm md:text-base'>
                      {user.global_name || user.username}
                    </p>
                    <p className='text-muted-foreground text-sm md:text-base'>
                      {user.discriminator == '0' ? `@${user.username}` : `#${user.discriminator}`}
                    </p>
                  </div>
                )} 
              </div>
              <div className='flex flex-col items-end gap-2'>
                <p className='text-muted-foreground'>Lv.<span className='text-foreground font-extrabold'>{lv}</span></p>
                <Progress className='w-20 lg:w-40 h-1' value={Math.floor((xp / getNeedXP(lv)) * 100)}/>
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