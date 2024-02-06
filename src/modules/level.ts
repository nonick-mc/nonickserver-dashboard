import levelModel from '@/database/models/levelModel';
import { Model, PipelineStage } from 'mongoose';

export function getNeedXP(lv: number) {
  return 5 * lv ** 2 + 50 * lv + 100;
}

export type LevelData = {
  id: string;
  lv: number;
  xp: number;
  boost: number;
  last: Date;
  rank: number;
};
export async function getLevelData(
  ...pipeline: PipelineStage[]
): Promise<(LevelData & { rank: number })[]> {
  return (await levelModel.aggregate([
    { $addFields: { score: { lv: '$lv', xp: '$xp' } } },
    {
      $setWindowFields: {
        sortBy: { score: -1 },
        output: { rank: { $rank: {} } },
      },
    },
    { $project: { score: 0, _id: 0 } },
    ...pipeline,
  ])) as (typeof levelModel extends Model<infer U>
    ? U & { rank: number }
    : never)[];
}
