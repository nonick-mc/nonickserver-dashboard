import userModel, { IUserSchema } from '@/schemas/userModel';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  if (req.headers.get('Authorization') !== `Bot ${process.env.DISCORD_CLIENT_TOKEN}`) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  const data = await req.json<IUserSchema>();
  const result = await userModel.findOneAndUpdate({ id: data.id }, { $set: data }, { upsert: true, new: true }).lean();
  return NextResponse.json(result, { status: 200 });
}