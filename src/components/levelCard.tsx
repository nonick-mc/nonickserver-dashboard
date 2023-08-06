import { cn } from "@/lib/utils";
import { LevelData, getNeedXP } from "@/modules/level";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { IUserSchema } from "@/schemas/userModel";

export function LevelCard({ data, user }: { data: LevelData, user: IUserSchema | { error: true } }) {
  return (
    <>
      <div
        className={cn(
          'flex w-8 h-8 rounded-full text-xl items-center justify-center font-black select-none',
          data.rank <= 3 ? 'bg-foreground text-background' : data.rank <= 10 ? 'bg-muted text-foreground' : 'text-muted-foreground',
        )}
      >
        {data.rank}
      </div>
      <div className='flex-1 flex flex-col md:flex-row sm:justify-normal md:justify-between md:items-center'>
        {'error' in user || !user.avatar ? (
          <div className='flex gap-4 items-center'>
            <Avatar className='w-8 h-8'>
              <AvatarFallback />
            </Avatar>
            <p className='font-bold text-sm md:text-base text-muted-foreground'>
              読み込みに問題が発生しました
            </p>
          </div>
        ) : (
          <>
            <div className='flex gap-4 items-center'>
              <Avatar className='w-8 h-8'>
                <AvatarImage src={user.avatar} />
                <AvatarFallback />
              </Avatar>
              <div className='flex flex-col md:flex-row md:gap-2'>
                <p className={'font-bold text-sm md:text-base'}>
                  {user.globalName || user.username}
                </p>
                <p className={'text-muted-foreground text-sm md:text-base'}>
                  {user.discriminator == '0' ? `@${user.username}` : `#${user.discriminator}`}
                </p>
              </div>
            </div>
            <div className='flex items-center md:flex-col md:items-end gap-2'>
              <p className='text-muted-foreground'>Lv.<span className='text-foreground font-extrabold'>{data.lv}</span></p>
              <Progress className='flex-1 md:flex-none md:w-40 h-1' value={Math.floor((data.xp / getNeedXP(data.lv)) * 100)} color="" />
            </div>
          </>
        )}
      </div>
    </>
  );
}