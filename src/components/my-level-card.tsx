import Link from 'next/link';
import { authOption } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { Card } from './ui/card';
import { LogOutButton, LoginButton } from './auth-buttons';
import { getLevelData } from '@/modules/level';
import { APIUser } from 'discord-api-types/v10';
import { PartialGuild } from '@/types/discord';
import { siteConfig } from '@/config/site';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { LevelCard } from './levelCard';
import { Discord } from '@/modules/discord';

export async function MyLevelCard() {
  const session = await getServerSession(authOption);

  if (!session) return (
    <Card className='px-6 py-4'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left'>
        <div className='flex flex-col gap-1'>
          <h3 className='md:text-xl font-extrabold'>ログインしていません</h3>
          <p className='text-sm text-muted-foreground'>Discordアカウントを連携すると、ここに自分のレベル・順位が表示されます。</p>
        </div>
        <LoginButton />
      </div>
    </Card>
  );

  const userId = await fetch(
    'https://discord.com/api/v10/users/@me',
    { headers: { Authorization: `Bearer ${session.accessToken}` }, next: { revalidate: 180 } },
  ).then(async (res) => (await res.json<APIUser>()).id);

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
          <LogOutButton />
        </div>
      </div>
    </Card>
  );

  const MyLevelData = (await getLevelData()).find(v => v.id === userId);

  if (!MyLevelData) return (
    <Card className='px-6 py-4'>
      <div className='flex justify-between items-center gap-3 text-center md:text-left'>
        <div className='flex flex-col gap-1'>
          <h3 className='text-sm sm:text-base md:text-xl font-extrabold'>サーバーで一回も発言していません</h3>
          <p className='text-sm text-muted-foreground'>みんなと話してリーダーボードに参加しよう！</p>
        </div>
        <LogOutButton />
      </div>
    </Card>
  )

  const user = await Discord.fetch(userId).catch(() => ({ error: true } as const));
  
  return (
    <Card className='px-6 py-4 flex justify-between items-center gap-6'>
      <div className='flex-1 flex gap-4 items-center'>
        <LevelCard data={MyLevelData} user={user} />
      </div>
      <LogOutButton />
    </Card>
  )
}