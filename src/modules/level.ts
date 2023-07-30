import levelModel from '../schemas/levelModel';
import { Model, PipelineStage } from 'mongoose';

type MemberData = { lv: number, role: string };
export const xpConf: { ch: { deny: string[], allow: string[] }, member: MemberData[] } = {
  ch: {
    deny: [
      '769231683982721034', // ADMIN
      '960917677419933796', // Team NoNICK
      '739464744930508861', // VOICE CHANNEL
      '1056160849087180800', // YOUTUBE
      '1104003818557014077', // EVENT
      '1121464276993986640', // LTM
      '1120544231036035122', // 新のにクラ SEASON1
      '912289054425514004', // ✋ゲーム募集
      '803633937553162242', // 🎥動画編集
      '1007252041942454292', // 💭つぶやき
      '1013661520208609392', // 💻プログラミング
      '858574826524639233', // 🎲botの遊び場
      '723926511203123313', // 🤖bot
    ],
    allow: [
      '1033405051894497370', // 🎮minecraft
      '1019648555037753547', // 🎮他ゲーム
    ]
  },
  member: [
    { lv: 3, role: '820583193212092417' },
    { lv: 20, role: '820621908210876417' },
    { lv: 45, role: '858923976138686474' },
  ].sort(({ lv: a }, { lv: b }) => a - b),
}

export function getNeedXP(lv: number) {
  return 5 * (lv ** 2) + (50 * lv) + 100;
}

export function getMemberLv(lv: number): { before: MemberData | null, current: MemberData | null } {
  const current = xpConf.member.findLast(({ lv: n }) => n <= lv);
  if (!current) return { before: null, current: null };
  const before = xpConf.member[xpConf.member.indexOf(current) - 1] ?? null;
  return { before, current };
}

export async function getLevelData(...pipeline: PipelineStage[]) {
  return (await levelModel.aggregate([
    { $addFields: { score: { lv: '$lv', xp: '$xp' } } },
    {
      $setWindowFields: {
        sortBy: { score: -1 },
        output: { rank: { $denseRank: {} } },
      },
    },
    ...pipeline,
  ]) as (typeof levelModel extends Model<infer U> ? U & { rank: number } : never)[]);
}

