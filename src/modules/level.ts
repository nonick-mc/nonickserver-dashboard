import levelModel, { ILevelSchema } from '@/models/levelModel';
import { PipelineStage } from 'mongoose';

export function getNeedXP(lv: number) {
  return 5 * lv ** 2 + 50 * lv + 100;
}

export interface LevelData extends ILevelSchema {
  rank: number;
}

export async function getLevelData(...pipeline: PipelineStage[]) {
  return levelModel.aggregate<LevelData>([
    { $addFields: { score: { lv: '$lv', xp: '$xp' } } },
    {
      $setWindowFields: {
        sortBy: { score: -1 },
        output: { rank: { $rank: {} } },
      },
    },
    { $project: { score: 0, _id: 0 } },
    ...pipeline,
  ]);
}
