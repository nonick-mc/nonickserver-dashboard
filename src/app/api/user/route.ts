import discord, { UserData } from '@/modules/discord';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  if (req.headers.get('Authorization') !== `Bot ${process.env.DISCORD_CLIENT_TOKEN}`) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  const data = await req.json<UserData & { id: string }>();
  return NextResponse.json({ message: 'ok', data: discord.cache.set(data.id, data) }, { status: 200 });
}