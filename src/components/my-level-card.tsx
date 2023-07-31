import Link from 'next/link';
import { authOption } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { Card } from './ui/card';
import { LogOutButton, LoginButton } from './auth-buttons';
import { getLevelData, getNeedXP } from '@/modules/level';
import { APIUser } from 'discord-api-types/v10';
import { PartialGuild } from '@/types/discord';
import { siteConfig } from '@/config/site';
import { buttonVariants } from './ui/button';
import { AvatarFallback, AvatarImage, Avatar } from './ui/avatar';
import { cn } from '@/lib/utils';
import { Progress } from './ui/progress';

export async function MyLevelCard() {
  const session = await getServerSession(authOption);

  if (!session) return (
    <Card className='px-6 py-4'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left'>
        <div className='flex flex-col gap-1'>
          <h3 className='md:text-xl font-extrabold'>ログインしていません</h3>
          <p className='text-sm text-muted-foreground'>Discordアカウントを連携すると、ここに自分のレベル・順位が表示されます。</p>
        </div>
        <LoginButton/>
      </div>
    </Card>
  );

  const user = await fetch(
    'https://discord.com/api/v10/users/@me',
    { headers: { Authorization: `Bearer ${session.accessToken}` }, next: { revalidate: 180 } },
  ).then(async (res) => await res.json<APIUser>());

  const guilds = await fetch(
    'https://discord.com/api/v10/users/@me/guilds',
    { headers: { Authorization: `Bearer ${session.accessToken}` }, next: { revalidate: 180 } },
  ).then(async (res) => await res.json<PartialGuild[]>());

  if (!guilds.some(g => g.id == siteConfig.guildId)) return (
    <Card className='px-6 py-4'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left'>
        <div className='flex flex-col gap-1'>
          <h3 className='md:text-xl font-extrabold'>サーバーに参加していません</h3>
          <p className='text-sm text-muted-foreground'>NoNICK SERVERに参加して、みんなと雑談しよう！</p>
        </div>
        <div className='flex gap-3'>
          <Link
            className={cn(buttonVariants(), '')}
            href={siteConfig.inviteUrl}
            target='_blank'
            rel='noreferrer'
          >
            サーバーに参加
          </Link>
          <LogOutButton/>
        </div>
      </div>
    </Card>
  );

  const MyLevelData = (await getLevelData()).find(v => v.id === user.id);
  
  if (!MyLevelData) return (
    <Card className='px-6 py-4'>
      <div className='flex justify-between items-center gap-3 text-center md:text-left'>
        <div className='flex flex-col gap-1'>
          <h3 className='text-sm sm:text-base md:text-xl font-extrabold'>サーバーで一回も発言していません</h3>
          <p className='text-sm text-muted-foreground'>みんなと話してリーダーボードに参加しよう！</p>
        </div>
        <LogOutButton/>
      </div>
    </Card>
  )

  return (
    <Card className='px-6 py-4 flex justify-between items-center gap-6'>
      <div className='flex-1 flex gap-4 items-center'>
        <div
          className={cn(
            'flex w-8 h-8 rounded-full text-xl items-center justify-center font-black select-none',
            MyLevelData.rank <= 3 ? 'bg-foreground text-background' : MyLevelData.rank <= 10 ? 'bg-muted text-foreground' : 'text-muted-foreground',
          )}
        >
          {MyLevelData.rank}
        </div>
        <div className='flex-1 flex flex-col md:flex-row sm:justify-normal md:justify-between md:items-center'>
          <div className='flex gap-4 items-center'>
            <Avatar className='w-8 h-8'>
              <AvatarImage src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp` : 'https://cdn.discordapp.com/embed/avatars/0.png'}/>
              <AvatarFallback/>
            </Avatar>
            <div className='flex flex-col md:flex-row md:gap-2'>
              <p className='font-bold text-sm md:text-base'>
                {user.global_name || user.username}
              </p>
              <p className='text-muted-foreground text-sm md:text-base'>
                {user.discriminator == '0' ? `@${user.username}` : `#${user.discriminator}`}
              </p>
            </div>
          </div>
          <div className='flex items-center md:flex-col md:items-end gap-2'>
            <p className='text-muted-foreground'>Lv.<span className='text-foreground font-extrabold'>{MyLevelData.lv}</span></p>
            <Progress className='flex-1 md:flex-none md:w-40 h-1' value={Math.floor((MyLevelData.xp / getNeedXP(MyLevelData.lv)) * 100)}/>
          </div>
        </div>
      </div>
      <LogOutButton/>
    </Card>
  )
}