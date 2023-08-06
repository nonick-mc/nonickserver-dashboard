import dbConnect from '@/utils/dbConnext';
import levelModel from '@/schemas/levelModel';
import { Discord } from '@/modules/discord';
import { getLevelData } from '@/modules/level';
import { FadeUpDiv, FadeUpStagger } from './animation';
import { PageSelect } from './page-selects';
import { LevelCard } from './levelCard';
import { LevelCardWrapper } from './levelCardWrapper';

export async function LeaderBoard({ skip }: { skip: number }) {
  await dbConnect();
  const modelSize = await levelModel.countDocuments();
  const levelData = await getLevelData({ $skip: skip }, { $limit: 50 });
  const userLevelData = await Promise.all(levelData.map(async (v) => ({
    ...v,
    user: await Discord.fetch(v.id).catch(() => ({ error: true } as const)),
  })));

  return (
    <FadeUpStagger className='flex flex-col gap-6'>
      <FadeUpDiv className='flex justify-end items-center'>
        <PageSelect size={modelSize} />
      </FadeUpDiv>
      <div className='flex flex-col gap-4'>
        {userLevelData.map(({ id, xp, lv, rank, boost, last, user }, index) => (
          <LevelCardWrapper index={index} isAdmin={false} key={index}>
            <LevelCard data={{ boost, id, last, lv, rank, xp }} user={user} />
          </LevelCardWrapper>
        ))}
      </div>
      {/* <FadeUpDiv className='flex justify-end'>
        <ScrollToTopButton/>
      </FadeUpDiv> */}
    </FadeUpStagger >
  )
}