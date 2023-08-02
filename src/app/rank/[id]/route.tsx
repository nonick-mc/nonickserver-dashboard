import { ImageResponse, NextResponse } from 'next/server';
import { getLevelData, getNeedXP } from '@/modules/level';
import dbConnect from '@/utils/dbConnext';
import { getAvatarIndex, getDisplayUserAvatar, getMember, getMemberHoistRole } from '@/modules/discord';
import { siteConfig } from '@/config/site';

const MPlus = await fetch(`${siteConfig.metadata.url}/rank/MPLUS-1P-BOLD.ttf`).then(v => v.arrayBuffer());

function siUnit(num: number, method: (n: number) => number = Math.floor) {
  if (num <= 0) return String(num);
  const units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'R', 'Q'];
  const i = Math.min(Math.floor(Math.log10(num) / 3), units.length);
  const res = method(num / Math.pow(10, i * 3) * 100) / 100;
  return `${res}${units[i - 1] ?? ''}`;
}

export async function GET(_: any, { params: { id } }: { params: { id: string } }) {
  await dbConnect();
  const data = (await getLevelData()).find(v => v.id === id);
  if (!data) return NextResponse.json({ message: 'data not found' }, { status: 404 });

  const member = await getMember(data.id);
  if (!member.user) return NextResponse.json({ message: 'user not found' }, { status: 404 });
  const hoist = await getMemberHoistRole(member);
  const need = getNeedXP(data.lv);

  return new ImageResponse(
    (
      <div style={{
        display: 'flex', width: '100%', height: '100%',
        color: '#fff', fontFamily: 'MPlus',
      }}>
        <img src={`${siteConfig.metadata.url}/rank/${getAvatarIndex(member.user)}.png`} style={{ width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', top: '50%', width: '100%', height: '50%', backgroundColor: '#1b1b1f' }} />
        <img src={getDisplayUserAvatar(member.user)} style={{
          position: 'absolute', left: '25px', top: '55px',
          width: '200px', height: '200px', backgroundColor: '#232529',
          borderRadius: '50%', border: '10px #1b1b1f',
        }} />
        <span style={{
          position: 'absolute', left: '240px', bottom: '100px', fontSize: `28px`,
          width: '475px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
        }}>
          {member.user.global_name || member.user.username}
        </span>
        <div style={{
          position: 'absolute', left: '25px', bottom: '18px', width: '200px',
          display: 'flex', justifyContent: 'center'
        }}>
          <span style={{ fontSize: '22px' }}>Lv.{data.lv}</span>
        </div>
        <div style={{
          position: 'absolute', right: '25px', bottom: '15px', width: '490px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: '30px' }}>RANK: #{data.rank}</span>
          <span style={{ fontSize: '22px' }}>XP:{siUnit(data.xp)} / {siUnit(need)}</span>
        </div>
        <div style={{
          display: 'flex', width: '500px', height: '30px',
          position: 'absolute', left: '230px', bottom: '60px',
          backgroundColor: '#454952', borderRadius: '35px', border: '5px #232529',
        }}>
          <div style={{ width: `${(data.xp / need) * 100}%`, borderRadius: '25px', backgroundColor: hoist?.color ? `#${hoist.color.toString(16)}` : '#fff' }} />
        </div>
      </div>
    ),
    {
      width: 750,
      height: 300,
      fonts: [
        { name: 'MPlus', data: MPlus }
      ]
    }
  );
}